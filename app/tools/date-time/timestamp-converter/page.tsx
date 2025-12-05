"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { timestampToDate, dateToTimestamp } from "@/lib/tools/date-utils";
import { toast } from "sonner";
import { useToolAnalytics } from "@/hooks/use-tool-analytics";

export default function TimestampConverterPage() {
  const analytics = useToolAnalytics("timestamp-converter");
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
        analytics.trackUsage("convert", { direction: "timestamp_to_date", timestamp: ts });
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
        analytics.trackUsage("convert", { direction: "date_to_timestamp", date: dateString });
      }
    } catch (err) {
      toast.error("Conversion failed");
      analytics.trackError("Conversion failed", { mode, timestamp, dateString });
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
      description="Convert between Unix timestamps and dates instantly. Perfect for developers working with APIs, log files, databases, and scheduling systems. Supports both timestamp-to-date and date-to-timestamp conversions."
      category="Date/Time Tools"
      content={{
        aboutText:
          "A Unix timestamp (also called Epoch time) represents the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (Coordinated Universal Time). This standardized time format is widely used in programming, databases, APIs, and system logs because it's timezone-independent and easy to work with programmatically. This tool converts between human-readable dates and Unix timestamps, making it essential for developers, system administrators, and data analysts.",
        useCases: [
          "API development: Convert timestamps from API responses to readable dates for debugging and display",
          "Log analysis: Parse Unix timestamps from log files to understand when events occurred",
          "Database queries: Convert between timestamps and dates when querying or updating database records",
          "Scheduling systems: Convert user-friendly dates to timestamps for cron jobs and scheduled tasks",
          "Data migration: Transform date formats when migrating data between systems",
          "Debugging: Quickly convert timestamps found in error messages or stack traces to readable dates",
          "Time calculations: Calculate time differences, add/subtract time periods, and compare dates",
        ],
        examples: [
          {
            input: "1609459200",
            output: "2021-01-01T00:00:00.000Z",
            description: "Convert Unix timestamp to ISO date string",
          },
          {
            input: "2021-01-01T00:00:00Z",
            output: "1609459200",
            description: "Convert ISO date string to Unix timestamp",
          },
          {
            input: "1640995200",
            output: "2022-01-01T00:00:00.000Z",
            description: "New Year 2022 timestamp conversion",
          },
        ],
        faqs: [
          {
            question: "What's the difference between seconds and milliseconds in timestamps?",
            answer:
              "Unix timestamps can be in seconds (10 digits, e.g., 1609459200) or milliseconds (13 digits, e.g., 1609459200000). This tool uses seconds format. JavaScript's Date.getTime() returns milliseconds, so divide by 1000 to get seconds. Most APIs and databases use seconds format.",
          },
          {
            question: "What timezone are Unix timestamps in?",
            answer:
              "Unix timestamps are always in UTC (Coordinated Universal Time), regardless of your local timezone. When converting to a date, the result is in UTC. You can convert to your local timezone using timezone conversion tools.",
          },
          {
            question: "Can I convert dates with timezones?",
            answer:
              "Yes, you can enter dates in various formats including ISO 8601 with timezone (e.g., '2021-01-01T00:00:00+05:30'). The tool will convert them to UTC timestamps. For timezone-specific conversions, use our Timezone Converter tool.",
          },
          {
            question: "What is the valid range for Unix timestamps?",
            answer:
              "Unix timestamps can represent dates from January 1, 1970 (timestamp 0) to January 19, 2038 (timestamp 2147483647) for 32-bit systems. 64-bit systems can handle much larger ranges. Negative timestamps represent dates before 1970.",
          },
          {
            question: "Why do I get different results for the same date?",
            answer:
              "This usually happens when the input date format is ambiguous or includes timezone information. Ensure you're using a consistent format. ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ) is recommended for unambiguous results.",
          },
        ],
        relatedTools: [
          { id: "timezone-converter", name: "Timezone Converter", route: "/tools/date-time/timezone-converter" },
          { id: "date-calculator", name: "Date Calculator", route: "/tools/date-time/date-calculator" },
          { id: "age-calculator", name: "Age Calculator", route: "/tools/date-time/age-calculator" },
        ],
      }}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setMode("timestamp");
              analytics.trackInteraction("mode", "switch", { mode: "timestamp" });
            }}
            variant={mode === "timestamp" ? "default" : "outline"}
            size="sm"
          >
            Timestamp to Date
          </Button>
          <Button
            onClick={() => {
              setMode("date");
              analytics.trackInteraction("mode", "switch", { mode: "date" });
            }}
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


