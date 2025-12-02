/**
 * JSON utility functions for JSON tools
 */

export function formatJSON(json: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

export function minifyJSON(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

export function validateJSON(json: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(json);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
}

export function escapeJSON(json: string): string {
  return json.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function unescapeJSON(json: string): string {
  return json.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

export function sortJSONKeys(json: string): string {
  try {
    const parsed = JSON.parse(json);
    const sorted = sortObjectKeys(parsed);
    return JSON.stringify(sorted, null, 2);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => sortObjectKeys(item));
  } else if (obj !== null && typeof obj === "object") {
    const sorted: any = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = sortObjectKeys(obj[key]);
      });
    return sorted;
  }
  return obj;
}

export function mergeJSON(...jsonStrings: string[]): string {
  try {
    const parsed = jsonStrings.map((json) => JSON.parse(json));
    const merged = Object.assign({}, ...parsed);
    return JSON.stringify(merged, null, 2);
  } catch (error) {
    throw new Error("Invalid JSON in one or more inputs");
  }
}

export function jsonToCSV(json: string): string {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array of objects");
    }
    if (parsed.length === 0) {
      return "";
    }

    const headers = Object.keys(parsed[0]);
    const csvRows = [headers.join(",")];

    for (const row of parsed) {
      const values = headers.map((header) => {
        const value = row[header];
        if (value === null || value === undefined) {
          return "";
        }
        const stringValue = String(value);
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to convert JSON to CSV");
  }
}

export function jsonToXML(json: string, rootName: string = "root"): string {
  try {
    const parsed = JSON.parse(json);
    return objectToXML(parsed, rootName);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function objectToXML(obj: any, rootName: string, indent: number = 0): string {
  const spaces = "  ".repeat(indent);
  let xml = "";

  if (Array.isArray(obj)) {
    for (const item of obj) {
      xml += `${spaces}<${rootName}>\n`;
      xml += objectToXML(item, "item", indent + 1);
      xml += `${spaces}</${rootName}>\n`;
    }
  } else if (obj !== null && typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      const safeKey = key.replace(/[^a-zA-Z0-9_]/g, "_");
      if (typeof value === "object" && value !== null) {
        xml += `${spaces}<${safeKey}>\n`;
        xml += objectToXML(value, safeKey, indent + 1);
        xml += `${spaces}</${safeKey}>\n`;
      } else {
        const escapedValue = String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        xml += `${spaces}<${safeKey}>${escapedValue}</${safeKey}>\n`;
      }
    }
  } else {
    const escapedValue = String(obj).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    xml += `${spaces}${escapedValue}\n`;
  }

  return xml;
}

export function jsonToYAML(json: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(json);
    return objectToYAML(parsed, 0, indent);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function objectToYAML(obj: any, depth: number, indent: number): string {
  const spaces = " ".repeat(depth * indent);
  let yaml = "";

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === "object" && item !== null) {
        yaml += `${spaces}- `;
        const itemYaml = objectToYAML(item, depth + 1, indent);
        yaml += itemYaml.replace(/^ +/, "");
      } else {
        yaml += `${spaces}- ${formatYAMLValue(item)}\n`;
      }
    }
  } else if (obj !== null && typeof obj === "object") {
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      if (typeof value === "object" && value !== null) {
        yaml += `${spaces}${key}:\n`;
        yaml += objectToYAML(value, depth + 1, indent);
      } else {
        yaml += `${spaces}${key}: ${formatYAMLValue(value)}\n`;
      }
    }
  } else {
    yaml += `${spaces}${formatYAMLValue(obj)}\n`;
  }

  return yaml;
}

function formatYAMLValue(value: any): string {
  if (value === null) return "null";
  if (typeof value === "string") {
    if (value.includes(":") || value.includes("\n") || value.includes('"')) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  return String(value);
}

export function jsonDiff(json1: string, json2: string): {
  added: any[];
  removed: any[];
  modified: Array<{ key: string; oldValue: any; newValue: any }>;
} {
  try {
    const obj1 = JSON.parse(json1);
    const obj2 = JSON.parse(json2);
    return compareObjects(obj1, obj2);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function compareObjects(obj1: any, obj2: any, path: string = ""): {
  added: any[];
  removed: any[];
  modified: Array<{ key: string; oldValue: any; newValue: any }>;
} {
  const result = {
    added: [] as any[],
    removed: [] as any[],
    modified: [] as Array<{ key: string; oldValue: any; newValue: any }>,
  };

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  for (const key of keys1) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in obj2)) {
      result.removed.push({ path: fullPath, value: obj1[key] });
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object" && obj1[key] !== null && obj2[key] !== null && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) {
      const nested = compareObjects(obj1[key], obj2[key], fullPath);
      result.added.push(...nested.added);
      result.removed.push(...nested.removed);
      result.modified.push(...nested.modified);
    } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      result.modified.push({
        key: fullPath,
        oldValue: obj1[key],
        newValue: obj2[key],
      });
    }
  }

  for (const key of keys2) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in obj1)) {
      result.added.push({ path: fullPath, value: obj2[key] });
    }
  }

  return result;
}

