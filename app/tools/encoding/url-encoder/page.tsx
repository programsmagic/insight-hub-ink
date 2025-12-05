"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { encodeURL, decodeURL } from "@/lib/tools/encoding-utils";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function URLEncoderPage() {
  const analytics = useToolAnalytics("url-encoder");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("Please enter text to process");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = encodeURL(input);
        setOutput(encoded);
        toast.success("Text encoded successfully!");
        analytics.trackUsage("encode", { inputLength: input.length });
      } else {
        const decoded = decodeURL(input);
        setOutput(decoded);
        toast.success("Text decoded successfully!");
        analytics.trackUsage("decode", { inputLength: input.length });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process text");
      analytics.trackError("Conversion failed", { mode, error: err instanceof Error ? err.message : "Unknown error" });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode or decode URL-encoded strings for safe transmission in URLs. Convert special characters to percent-encoded format and back. Essential for web development, API integration, and handling query parameters."
      category="Encoding Tools"
      content={{
        aboutText:
          "URL encoding (also called percent encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). Special characters, spaces, and non-ASCII characters are converted to a format that can be safely transmitted in URLs. This tool provides bidirectional conversion between plain text and URL-encoded strings, making it essential for web developers, API developers, and anyone working with URLs.",
        useCases: [
          "Web development: Encode query parameters and URL components for safe transmission",
          "API integration: Encode data in API requests and decode responses",
          "Form data: Encode form values before submitting to servers",
          "Link generation: Create safe URLs with special characters",
          "Data parsing: Decode URL-encoded data received from web requests",
          "Email links: Encode email addresses and other data in mailto links",
          "Social media: Encode URLs for sharing on social platforms",
        ],
        examples: [
          {
            input: "Hello World!",
            output: "Hello%20World%21",
            description: "Encode text with spaces and special characters",
          },
          {
            input: "https://example.com/search?q=test query&page=1",
            output: "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dtest%20query%26page%3D1",
            description: "Encode a complete URL with query parameters",
          },
          {
            input: "Hello%20World%21",
            output: "Hello World!",
            description: "Decode URL-encoded text back to plain text",
          },
        ],
        faqs: [
          {
            question: "What characters are encoded in URLs?",
            answer:
              "Characters that are encoded include spaces (become %20), special characters like !, @, #, $, %, &, and non-ASCII characters. Reserved characters like :, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, and = are also encoded when they appear in URL components where they have special meaning.",
          },
          {
            question: "When should I use URL encoding?",
            answer:
              "Use URL encoding when including user input in URLs, passing data in query parameters, creating links with special characters, or sending data via GET requests. It's essential for security and proper URL formatting.",
          },
          {
            question: "What's the difference between encodeURI and encodeURIComponent?",
            answer:
              "encodeURI encodes a complete URI but preserves characters that have meaning in URIs (like :, /, ?, #). encodeURIComponent encodes a component of a URI and encodes all special characters. This tool uses encodeURIComponent for encoding individual components.",
          },
          {
            question: "Can I encode entire URLs?",
            answer:
              "Yes, but be careful. Encoding an entire URL will encode characters like :, /, and ? which are necessary for the URL structure. It's better to encode only the parts that need encoding (like query parameter values) rather than the entire URL.",
          },
        ],
        relatedTools: [
          { id: "url-decoder", name: "URL Decoder", route: "/tools/encoding/url-decoder" },
          { id: "base64-encoder", name: "Base64 Encoder", route: "/tools/encoding/base64-encoder" },
          { id: "html-entity", name: "HTML Entity Encoder", route: "/tools/encoding/html-entity" },
        ],
      }}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setMode("encode");
              analytics.trackInteraction("mode", "switch", { mode: "encode" });
            }}
            variant={mode === "encode" ? "default" : "outline"}
            size="sm"
          >
            Encode
          </Button>
          <Button
            onClick={() => {
              setMode("decode");
              analytics.trackInteraction("mode", "switch", { mode: "decode" });
            }}
            variant={mode === "decode" ? "default" : "outline"}
            size="sm"
          >
            Decode
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">
                {mode === "encode" ? "Input Text" : "Encoded URL"}
              </Label>
              <div className="flex gap-2">
                <Button onClick={handleConvert} size="sm">
                  {mode === "encode" ? "Encode" : "Decode"}
                </Button>
                <Button onClick={handleClear} variant="ghost" size="sm">
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter encoded URL..."}
              className="font-mono text-sm min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">
                {mode === "encode" ? "Encoded Output" : "Decoded Output"}
              </Label>
              {output && (
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <DownloadButton content={output} filename={`${mode === "encode" ? "encoded" : "decoded"}.txt`} />
                </div>
              )}
            </div>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono text-sm min-h-[300px] bg-muted"
              placeholder={`${mode === "encode" ? "Encoded" : "Decoded"} output will appear here...`}
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Encode:</strong> Converts special characters to URL-encoded format (e.g., space becomes %20)</li>
            <li><strong>Decode:</strong> Converts URL-encoded strings back to regular text</li>
            <li>Essential for creating safe URLs and handling query parameters</li>
            <li>Copy or download the result</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


