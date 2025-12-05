"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { timestampToDate, dateToTimestamp } from "@/lib/tools/date-utils";
import { toast } from "sonner";

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState<"timestamp" | "date">("timestamp");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    try {
      if (mode === "timestamp") {
        if (!timestamp.trim()) {
          toast.error("Please enter a timestamp");
          return;
        }
        const ts = parseInt(timestamp, 10);
        if (isNaN(ts)) {
          toast.error("Invalid timestamp");
          return;
        }
        const date = timestampToDate(ts);
        setResult(date.toISOString());
        toast.success("Converted successfully!");
      } else {
        if (!dateString.trim()) {
          toast.error("Please enter a date");
          return;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          toast.error("Invalid date");
          return;
        }
        const ts = dateToTimestamp(date);
        setResult(ts.toString());
        toast.success("Converted successfully!");
      }
    } catch (err) {
      toast.error("Conversion failed");
    }
  };

  const handleClear = () => {
    setTimestamp("");
    setDateString("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and dates"
      category="Date/Time Tools"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            onClick={() => setMode("timestamp")}
            variant={mode === "timestamp" ? "default" : "outline"}
            size="sm"
          >
            Timestamp to Date
          </Button>
          <Button
            onClick={() => setMode("date")}
            variant={mode === "date" ? "default" : "outline"}
            size="sm"
          >
            Date to Timestamp
          </Button>
        </div>

        <div className="space-y-4">
          {mode === "timestamp" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="timestamp">Unix Timestamp</Label>
                <Input
                  id="timestamp"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="1609459200"
                  type="number"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={dateString}
                  onChange={(e) => setDateString(e.target.value)}
                  placeholder="2021-01-01T00:00:00Z or 2021-01-01"
                  type="text"
                />
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              Convert
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">
                {mode === "timestamp" ? "Date (ISO)" : "Unix Timestamp"}
              </Label>
              <CopyButton text={result} />
            </div>
            <Textarea
              id="result"
              value={result}
              readOnly
              className="font-mono text-sm bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Timestamp to Date:</strong> Enter a Unix timestamp (seconds since Jan 1, 1970)</li>
            <li><strong>Date to Timestamp:</strong> Enter a date in ISO format or standard date format</li>
            <li>Unix timestamps are in seconds (not milliseconds)</li>
            <li>Copy the result to use it</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


