"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { decodeJWT } from "@/lib/tools/encoding-utils";
import { toast } from "sonner";

export default function JWTDecoderPage() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any; signature: string } | null>(null);

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error("Please enter a JWT token");
      return;
    }

    try {
      const result = decodeJWT(input);
      if (!result) {
        toast.error("Invalid JWT token format");
        return;
      }
      setDecoded(result);
      toast.success("JWT decoded successfully!");
    } catch (err) {
      toast.error("Failed to decode JWT");
    }
  };

  const handleClear = () => {
    setInput("");
    setDecoded(null);
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode JWT tokens and view header and payload information"
      category="Encoding Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">JWT Token</Label>
            <div className="flex gap-2">
              <Button onClick={handleDecode} size="sm">
                Decode
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
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="font-mono text-sm min-h-[100px]"
          />
        </div>

        {decoded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <Label className="mb-2 block">Header</Label>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </Card>
            <Card className="p-4">
              <Label className="mb-2 block">Payload</Label>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Paste a JWT token in the input field</li>
            <li>Click "Decode" to view header and payload</li>
            <li>View the token structure and claims</li>
            <li>Note: This tool only decodes the token, it does not verify the signature</li>
            <li>Useful for debugging and understanding JWT tokens</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}



