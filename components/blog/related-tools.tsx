import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';
import { allTools } from '@/app/tools/data';
import type { Tool } from '@/lib/types/tools';

interface RelatedToolsProps {
  toolIds?: string[];
  category?: string;
  limit?: number;
  className?: string;
}

/**
 * Component to display related tools from blog posts
 * Automatically finds related tools based on category or provided tool IDs
 */
export function RelatedTools({
  toolIds,
  category,
  limit = 3,
  className,
}: RelatedToolsProps) {
  let relatedTools: Tool[] = [];

  if (toolIds && toolIds.length > 0) {
    // Find tools by IDs
    relatedTools = allTools.filter((tool) => toolIds.includes(tool.id));
  } else if (category) {
    // Find tools by category
    relatedTools = allTools.filter((tool) => tool.category === category);
  } else {
    // Default: show featured tools
    relatedTools = allTools.slice(0, limit);
  }

  // Limit the number of tools shown
  relatedTools = relatedTools.slice(0, limit);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <Card className={`p-6 sm:p-8 border-accent/10 ${className || ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
          <Wrench className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-4">Related Tools</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try these free tools to help with your workflow:
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <Link key={tool.id} href={tool.route}>
                <Badge
                  variant="outline"
                  className="hover:bg-accent/10 hover:text-accent hover:border-accent/30 cursor-pointer transition-all duration-200 text-sm px-4 py-2"
                >
                  {tool.name}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/tools"
              className="text-sm text-accent hover:underline"
            >
              View all 200+ free tools →
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

