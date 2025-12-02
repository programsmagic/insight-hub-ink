"use client";

import { useState } from "react";
import { ToolLayout, CopyButton, DownloadButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { extractEmails } from "@/lib/tools/text-utils";
import { toast } from "sonner";

export default function ExtractEmailsPage() {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const handleExtract = () => {
    if (!input.trim()) {
      toast.error("Please enter text");
      return;
    }

    try {
      const extracted = extractEmails(input);
      setEmails(extracted);
      if (extracted.length > 0) {
        toast.success(`Found ${extracted.length} email(s)!`);
      } else {
        toast.info("No emails found");
      }
    } catch (err) {
      toast.error("Failed to extract emails");
    }
  };

  const handleClear = () => {
    setInput("");
    setEmails([]);
  };

  return (
    <ToolLayout
      title="Extract Emails"
      description="Extract all email addresses from text automatically"
      category="Text Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Input Text</Label>
            <div className="flex gap-2">
              <Button onClick={handleExtract} size="sm">
                Extract Emails
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
            placeholder="Enter text containing email addresses..."
            className="font-mono text-sm min-h-[300px]"
          />
        </div>

        {emails.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label>Extracted Emails ({emails.length})</Label>
              <CopyButton text={emails.join("\n")} />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {emails.map((email, index) => (
                <div key={index} className="p-2 bg-muted rounded text-sm">
                  <a href={`mailto:${email}`} className="text-primary hover:underline">
                    {email}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <DownloadButton content={emails.join("\n")} filename="extracted-emails.txt" />
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste text containing email addresses</li>
            <li>Click "Extract Emails" to find all emails</li>
            <li>Copy or download the extracted emails</li>
            <li>Perfect for extracting contacts from documents or web pages</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

