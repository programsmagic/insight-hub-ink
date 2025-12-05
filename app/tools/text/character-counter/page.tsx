"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { countCharacters, countWords, countLines } from "@/lib/tools/text-utils";

export default function CharacterCounterPage() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    if (!input.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
      };
    }

    return {
      characters: countCharacters(input, true),
      charactersNoSpaces: countCharacters(input, false),
      words: countWords(input),
      lines: countLines(input),
    };
  }, [input]);

  return (
    <ToolLayout
      title="Character Counter"
      description="Count characters, words, and lines in text with real-time updates"
      category="Text Tools"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.characters}</div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-muted-foreground">No Spaces</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.words}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.lines}</div>
            <div className="text-sm text-muted-foreground">Lines</div>
          </Card>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input">Your Text</Label>
            <CopyButton text={input} />
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="font-mono text-sm min-h-[400px]"
          />
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How it works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Real-time character counting as you type</li>
            <li>Shows character count with and without spaces</li>
            <li>Also displays word and line counts</li>
            <li>Perfect for social media posts, tweets, and character-limited content</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}


