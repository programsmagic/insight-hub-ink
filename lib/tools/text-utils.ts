/**
 * Text utility functions for text tools
 */

export function convertCase(text: string, caseType: "upper" | "lower" | "title" | "sentence" | "camel" | "kebab" | "snake" | "pascal"): string {
  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel":
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, "");
    case "kebab":
      return text
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    case "snake":
      return text
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s-]+/g, "_")
        .toLowerCase();
    case "pascal":
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, "");
    default:
      return text;
  }
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function countCharacters(text: string, includeSpaces: boolean = true): number {
  return includeSpaces ? text.length : text.replace(/\s/g, "").length;
}

export function countLines(text: string): number {
  return text.split("\n").length;
}

export function reverseText(text: string, byWord: boolean = false): string {
  if (byWord) {
    return text.split(/\s+/).reverse().join(" ");
  }
  return text.split("").reverse().join("");
}

export function removeDuplicates(text: string, byLine: boolean = true): string {
  if (byLine) {
    const lines = text.split("\n");
    const unique = Array.from(new Set(lines));
    return unique.join("\n");
  }
  const words = text.split(/\s+/);
  const unique = Array.from(new Set(words));
  return unique.join(" ");
}

export function sortLines(text: string, order: "asc" | "desc" = "asc"): string {
  const lines = text.split("\n");
  const sorted = lines.sort((a, b) => {
    const comparison = a.localeCompare(b);
    return order === "asc" ? comparison : -comparison;
  });
  return sorted.join("\n");
}

export function replaceText(text: string, search: string, replace: string, useRegex: boolean = false, caseSensitive: boolean = true): string {
  if (useRegex) {
    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(search, flags);
    return text.replace(regex, replace);
  }
  if (caseSensitive) {
    return text.split(search).join(replace);
  }
  const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return text.replace(regex, replace);
}

export function extractURLs(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

export function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
}

export function extractNumbers(text: string): string[] {
  const numberRegex = /-?\d+\.?\d*/g;
  return text.match(numberRegex) || [];
}

export function addLineNumbers(text: string, startFrom: number = 1): string {
  const lines = text.split("\n");
  return lines.map((line, index) => `${startFrom + index}: ${line}`).join("\n");
}

export function removeLineNumbers(text: string): string {
  return text.replace(/^\d+:\s*/gm, "");
}

export function encodeBase64(text: string): string {
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(text)));
  }
  return Buffer.from(text, "utf-8").toString("base64");
}

export function decodeBase64(base64: string): string {
  try {
    if (typeof window !== "undefined") {
      return decodeURIComponent(escape(atob(base64)));
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch (error) {
    throw new Error("Invalid Base64 string");
  }
}

export function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToText(binary: string): string {
  return binary
    .split(" ")
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("");
}

export function textToHex(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
}

export function hexToText(hex: string): string {
  return hex
    .split(" ")
    .map((hexChar) => String.fromCharCode(parseInt(hexChar, 16)))
    .join("");
}

const morseCodeMap: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/",
};

const reverseMorseCodeMap: Record<string, string> = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
);

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseCodeMap[char] || char)
    .join(" ");
}

export function morseToText(morse: string): string {
  return morse
    .split(" ")
    .map((code) => reverseMorseCodeMap[code] || code)
    .join("");
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateLoremIpsum(words: number = 50): string {
  const lorem = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur",
  ];

  const result: string[] = [];
  for (let i = 0; i < words; i++) {
    result.push(lorem[i % lorem.length]);
  }

  return result.join(" ") + ".";
}

