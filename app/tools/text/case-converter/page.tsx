"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { convertCase } from "@/lib/tools/text-utils";
import { toast } from "sonner";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "kebab" | "snake" | "pascal";

const caseTypes: Array<{ value: CaseType; label: string; description: string }> = [
  { value: "upper", label: "UPPER CASE", description: "ALL CAPITAL LETTERS" },
  { value: "lower", label: "lower case", description: "all lowercase letters" },
  { value: "title", label: "Title Case", description: "First Letter Of Each Word" },
  { value: "sentence", label: "Sentence case", description: "First letter of sentence" },
  { value: "camel", label: "camelCase", description: "firstWordLowercase" },
  { value: "pascal", label: "PascalCase", description: "FirstWordUppercase" },
  { value: "kebab", label: "kebab-case", description: "words-separated-by-hyphens" },
  { value: "snake", label: "snake_case", description: "words_separated_by_underscores" },
];

export default function TextCaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("lower");

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Convert text between different cases instantly: uppercase, lowercase, title case, sentence case, camelCase, kebab-case, snake_case, and PascalCase. Perfect for developers, content creators, and anyone working with code or text formatting."
      category="Text Tools"
      content={{
        aboutText:
          "A text case converter is a versatile tool that transforms text between different capitalization formats. This is essential for developers working with code (variable names, function names, CSS classes), content creators formatting titles, and anyone who needs to standardize text formatting. Each case format has specific rules and use cases in programming and writing.",
        useCases: [
          "Convert variable names between camelCase, snake_case, and PascalCase in code",
          "Format titles and headings for articles and blog posts",
          "Standardize CSS class names to kebab-case",
          "Convert database column names to different naming conventions",
          "Format API endpoint names and route paths",
          "Prepare text for different programming language conventions",
        ],
        examples: [
          {
            description: "Converting to different cases",
            input: "hello world example",
            output: "HelloWorldExample (PascalCase), helloWorldExample (camelCase), hello-world-example (kebab-case), hello_world_example (snake_case)",
          },
          {
            description: "Title case conversion",
            input: "the quick brown fox",
            output: "The Quick Brown Fox",
          },
        ],
        faqs: [
          {
            question: "What's the difference between camelCase and PascalCase?",
            answer:
              "camelCase starts with a lowercase letter (e.g., 'myVariable'), while PascalCase starts with an uppercase letter (e.g., 'MyVariable'). camelCase is common in JavaScript/Java, while PascalCase is used for class names in many languages.",
          },
          {
            question: "When should I use kebab-case?",
            answer:
              "kebab-case (words-separated-by-hyphens) is commonly used for CSS class names, HTML attributes, URL slugs, and file names. It's more readable than camelCase for multi-word identifiers.",
          },
          {
            question: "What is snake_case used for?",
            answer:
              "snake_case (words_separated_by_underscores) is commonly used in Python, Ruby, and database column names. It's also used for constants in many programming languages.",
          },
        ],
        relatedTools: [
          { id: "text-case-converter", name: "Text Case Converter", route: "/tools/text/case-converter" },
          { id: "word-counter", name: "Word Counter", route: "/tools/text/word-counter" },
          { id: "text-reverser", name: "Text Reverser", route: "/tools/text/reverser" },
        ],
      }}
    >
      <div className="space-y-6">
        {/* Case Type Selector */}
        <div className="space-y-4">
          <Label>Select Case Type</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {caseTypes.map((caseType) => (
              <button
                key={caseType.value}
                onClick={() => {
                  setSelectedCase(caseType.value);
                  if (input) {
                    try {
                      const converted = convertCase(input, caseType.value);
                      setOutput(converted);
                    } catch (err) {
                      toast.error("Failed to convert text");
                      setOutput("");
                    }
                  }
                }}
                className={`p-4 border rounded-lg text-left transition-all ${
                  selectedCase === caseType.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{caseType.label}</div>
                <div className="text-xs text-muted-foreground">{caseType.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input Text</Label>
              <Button onClick={handleClear} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value) {
                  try {
                    const converted = convertCase(e.target.value, selectedCase);
                    setOutput(converted);
                  } catch (err) {
                    toast.error("Failed to convert text");
                    setOutput("");
                  }
                } else {
                  setOutput("");
                }
              }}
              placeholder="Enter text to convert..."
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Converted Text</Label>
              <div className="flex gap-2">
                {output && (
                  <>
                    <CopyButton text={output} />
                    <DownloadButton content={output} filename="converted-text.txt" />
                  </>
                )}
              </div>
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">Case Types:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>UPPER CASE:</strong> All letters in uppercase</li>
            <li><strong>lower case:</strong> All letters in lowercase</li>
            <li><strong>Title Case:</strong> First letter of each word capitalized</li>
            <li><strong>Sentence case:</strong> First letter of sentence capitalized</li>
            <li><strong>camelCase:</strong> First word lowercase, subsequent words capitalized</li>
            <li><strong>PascalCase:</strong> First letter of each word capitalized</li>
            <li><strong>kebab-case:</strong> Words separated by hyphens</li>
            <li><strong>snake_case:</strong> Words separated by underscores</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

