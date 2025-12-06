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
          <Card className="p-6 text-center border-accent/20 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-primary mb-2 animate-scale-in">{stats.characters}</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Characters</div>
          </Card>
          <Card className="p-6 text-center border-accent/20 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-primary mb-2 animate-scale-in">{stats.charactersNoSpaces}</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">No Spaces</div>
          </Card>
          <Card className="p-6 text-center border-accent/20 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-primary mb-2 animate-scale-in">{stats.words}</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Words</div>
          </Card>
          <Card className="p-6 text-center border-accent/20 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-primary mb-2 animate-scale-in">{stats.lines}</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Lines</div>
          </Card>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="input" className="text-base">Your Text</Label>
            <CopyButton text={input} />
          </div>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="font-mono text-sm min-h-[400px] input-area"
          />
        </div>

        {/* Info */}
        <div className="text-sm bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/10 p-6 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 rounded bg-accent/10 flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-base mb-3 text-foreground">How it works:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Real-time character counting as you type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Shows character count with and without spaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Also displays word and line counts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">Perfect for social media posts, tweets, and character-limited content</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}



