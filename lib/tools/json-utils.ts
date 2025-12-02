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

/**
 * Generate TypeScript interface from JSON
 */
export function jsonToTypeScript(json: string, interfaceName: string = "GeneratedType"): string {
  try {
    const parsed = JSON.parse(json);
    return generateTypeScriptInterface(parsed, interfaceName);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function generateTypeScriptInterface(obj: any, name: string, depth: number = 0): string {
  const indent = "  ".repeat(depth);
  let result = "";

  if (depth === 0) {
    result += `export interface ${name} {\n`;
  }

  if (Array.isArray(obj) && obj.length > 0) {
    const itemType = generateTypeScriptInterface(obj[0], "", depth + 1);
    return `Array<${itemType.trim()}>`;
  } else if (obj !== null && typeof obj === "object") {
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`;
      let type: string;

      if (value === null) {
        type = "null";
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          type = "any[]";
        } else {
          const itemType = generateTypeScriptInterface(value[0], "", depth + 1);
          type = `Array<${itemType.trim()}>`;
        }
      } else if (typeof value === "object") {
        const nested = generateTypeScriptInterface(value, "", depth + 1);
        type = nested.trim();
      } else {
        type = typeof value;
      }

      result += `${indent}  ${safeKey}: ${type};\n`;
    }
  } else {
    return typeof obj;
  }

  if (depth === 0) {
    result += "}\n";
  }

  return result;
}

/**
 * Convert JSON to SQL INSERT statements
 */
export function jsonToSQL(json: string, tableName: string = "data"): string {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array of objects");
    }
    if (parsed.length === 0) {
      return `-- No data to insert into ${tableName}`;
    }

    const headers = Object.keys(parsed[0]);
    const safeTableName = tableName.replace(/[^a-zA-Z0-9_]/g, "_");
    const safeHeaders = headers.map((h) => `\`${h.replace(/`/g, "``")}\``);

    const sqlStatements: string[] = [];

    for (const row of parsed) {
      const values = headers.map((header) => {
        const value = row[header];
        if (value === null || value === undefined) {
          return "NULL";
        } else if (typeof value === "string") {
          return `'${value.replace(/'/g, "''")}'`;
        } else if (typeof value === "number" || typeof value === "boolean") {
          return String(value);
        } else {
          return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
        }
      });

      sqlStatements.push(
        `INSERT INTO \`${safeTableName}\` (${safeHeaders.join(", ")}) VALUES (${values.join(", ")});`
      );
    }

    return sqlStatements.join("\n");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to convert JSON to SQL");
  }
}

/**
 * Simple JSONPath-like query (basic implementation)
 */
export function jsonPathQuery(json: string, path: string): { matches: any[]; error?: string } {
  try {
    const parsed = JSON.parse(json);
    const matches: any[] = [];

    // Simple path implementation for common cases
    if (path === "$" || path === "") {
      return { matches: [parsed] };
    }

    // Handle $.* pattern
    if (path.startsWith("$.")) {
      const keys = path.slice(2).split(".");
      let current: any = parsed;

      for (const key of keys) {
        if (current === null || current === undefined) {
          return { matches: [], error: `Path not found: ${path}` };
        }

        if (key === "*" && Array.isArray(current)) {
          return { matches: current };
        } else if (key === "*" && typeof current === "object") {
          return { matches: Object.values(current) };
        } else if (Array.isArray(current)) {
          const index = parseInt(key, 10);
          if (!isNaN(index)) {
            current = current[index];
          } else {
            current = current.find((item: any) => item && item[key] !== undefined);
            if (current) current = current[key];
          }
        } else {
          current = current[key];
        }
      }

      if (current !== undefined) {
        matches.push(current);
      }
    } else {
      return { matches: [], error: "Path must start with $." };
    }

    return { matches };
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Invalid JSON or path",
    };
  }
}

/**
 * Validate JSON against a simple schema (basic implementation)
 */
export function validateJSONSchema(
  json: string,
  schema: string
): { valid: boolean; errors: string[] } {
  try {
    const data = JSON.parse(json);
    const schemaObj = JSON.parse(schema);
    const errors: string[] = [];

    // Basic schema validation
    if (schemaObj.type) {
      if (schemaObj.type === "object" && typeof data !== "object") {
        errors.push("Expected object type");
      } else if (schemaObj.type === "array" && !Array.isArray(data)) {
        errors.push("Expected array type");
      } else if (schemaObj.type === "string" && typeof data !== "string") {
        errors.push("Expected string type");
      } else if (schemaObj.type === "number" && typeof data !== "number") {
        errors.push("Expected number type");
      } else if (schemaObj.type === "boolean" && typeof data !== "boolean") {
        errors.push("Expected boolean type");
      }
    }

    if (schemaObj.required && Array.isArray(schemaObj.required)) {
      for (const field of schemaObj.required) {
        if (!(field in data)) {
          errors.push(`Missing required field: ${field}`);
        }
      }
    }

    if (schemaObj.properties && typeof data === "object" && !Array.isArray(data)) {
      for (const [key, propSchema] of Object.entries(schemaObj.properties)) {
        if (key in data) {
          const value = data[key];
          const prop = propSchema as any;
          if (prop.type) {
            if (prop.type === "string" && typeof value !== "string") {
              errors.push(`Field '${key}' must be a string`);
            } else if (prop.type === "number" && typeof value !== "number") {
              errors.push(`Field '${key}' must be a number`);
            } else if (prop.type === "boolean" && typeof value !== "boolean") {
              errors.push(`Field '${key}' must be a boolean`);
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : "Invalid JSON or schema"],
    };
  }
}

