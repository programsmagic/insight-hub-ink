"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { countWords, countCharacters, countLines, countSentences, countParagraphs } from "@/lib/tools/text-utils";

export default function WordCounterPage() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    if (!input.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        lines: 0,
        sentences: 0,
        paragraphs: 0,
      };
    }

    return {
      words: countWords(input),
      characters: countCharacters(input, true),
      charactersNoSpaces: countCharacters(input, false),
      lines: countLines(input),
      sentences: countSentences(input),
      paragraphs: countParagraphs(input),
    };
  }, [input]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in text instantly"
      category="Text Tools"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.words}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.characters}</div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-muted-foreground">No Spaces</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.lines}</div>
            <div className="text-sm text-muted-foreground">Lines</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
            <div className="text-sm text-muted-foreground">Sentences</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
            <div className="text-sm text-muted-foreground">Paragraphs</div>
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
            <li>Real-time counting as you type</li>
            <li>Counts words, characters (with and without spaces), lines, sentences, and paragraphs</li>
            <li>Perfect for writers, students, and content creators</li>
            <li>Useful for meeting word count requirements and character limits</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

