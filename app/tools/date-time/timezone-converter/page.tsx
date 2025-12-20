"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { convertTimezone, getTimezoneList } from "@/lib/tools/date-utils";
import { toast } from "sonner";

export default function TimezoneConverterPage() {
  const [dateTime, setDateTime] = useState("");
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("America/New_York");
  const [timezones, setTimezones] = useState<string[]>([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    setTimezones(getTimezoneList());
  }, []);

  const handleConvert = () => {
    if (!dateTime) {
      toast.error("Please enter a date and time");
      return;
    }

    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        toast.error("Invalid date format");
        return;
      }

      const converted = convertTimezone(date, fromTz, toTz);
      setResult(converted.toISOString());
      toast.success("Converted successfully!");
    } catch (err) {
      toast.error("Conversion failed");
    }
  };

  const handleClear = () => {
    setDateTime("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Time Zone Converter"
      description="Convert times between different time zones"
      category="Date/Time Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="datetime">Date and Time</Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-tz">From Timezone</Label>
              <select
                id="from-tz"
                value={fromTz}
                onChange={(e) => setFromTz(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-tz">To Timezone</Label>
              <select
                id="to-tz"
                value={toTz}
                onChange={(e) => setToTz(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Converted Time</p>
              <CopyButton text={result} />
            </div>
            <p className="mt-2 font-mono text-sm">{result}</p>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a date and time</li>
            <li>Select the source timezone</li>
            <li>Select the target timezone</li>
            <li>Click "Convert" to see the converted time</li>
            <li>Result is shown in ISO format</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}









