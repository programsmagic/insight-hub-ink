/**
 * Blog Post Template System
 * Ensures consistent structure, SEO optimization, and content quality
 */

export interface BlogPostTemplate {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  h2Sections: string[];
  minWords: number;
  internalLinks: {
    to: string;
    anchorText: string;
    context: string;
  }[];
  schemaTypes: ('Article' | 'HowTo' | 'FAQPage')[];
  imageRequirements: {
    featured: boolean;
    screenshots: number;
    altTextPattern: string;
  };
}

/**
 * Tool Tutorial Template
 */
export const toolTutorialTemplate: BlogPostTemplate = {
  title: 'How to Use [Tool Name]: Complete Guide 2025',
  description: 'Learn how to use [Tool Name] with our step-by-step guide. [Brief benefit statement]. Perfect for developers and professionals.',
  keywords: ['[tool name]', 'how to use [tool name]', '[tool name] tutorial', '[tool name] guide'],
  h1: 'How to Use [Tool Name]: Complete Guide 2025',
  h2Sections: [
    'What is [Tool Name]?',
    'Why Use Our [Tool Name] Tool?',
    'Step-by-Step Guide to Using [Tool Name]',
    'Common Use Cases',
    'Tips and Best Practices',
    'Related Tools'
  ],
  minWords: 1500,
  internalLinks: [
    {
      to: '/tools/[tool-route]',
      anchorText: '[Tool Name] tool',
      context: 'Link to the actual tool page'
    },
    {
      to: '/tools',
      anchorText: 'free developer tools',
      context: 'Link to tools directory'
    },
    {
      to: '/tools?category=[category]',
      anchorText: '[category] tools',
      context: 'Link to related tool category'
    }
  ],
  schemaTypes: ['Article', 'HowTo'],
  imageRequirements: {
    featured: true,
    screenshots: 3,
    altTextPattern: '[Tool Name] tool interface showing [specific feature]'
  }
};

/**
 * SMM Guide Template
 */
export const smmGuideTemplate: BlogPostTemplate = {
  title: 'How to [Action]: Complete Guide 2025',
  description: 'Learn how to [action] with our comprehensive guide. [Benefit statement]. Get expert tips and strategies.',
  keywords: ['how to [action]', '[platform] growth', 'social media growth', 'buy [service]'],
  h1: 'How to [Action]: Complete Guide 2025',
  h2Sections: [
    'Understanding [Topic]',
    'Why [Topic] Matters',
    'Step-by-Step Process',
    'Best Practices',
    'Common Mistakes to Avoid',
    'How Our SMM Services Can Help'
  ],
  minWords: 1500,
  internalLinks: [
    {
      to: '/smm',
      anchorText: 'social media growth services',
      context: 'Link to SMM services page'
    },
    {
      to: '/blog',
      anchorText: 'more social media guides',
      context: 'Link to related blog posts'
    }
  ],
  schemaTypes: ['Article', 'HowTo'],
  imageRequirements: {
    featured: true,
    screenshots: 2,
    altTextPattern: '[Topic] guide showing [specific concept]'
  }
};

/**
 * FinTrack Guide Template
 */
export const fintrackGuideTemplate: BlogPostTemplate = {
  title: '[Topic]: Complete Guide 2025',
  description: 'Learn about [topic] with our comprehensive guide. [Benefit statement]. Perfect for IT professionals and developers.',
  keywords: ['[topic]', 'personal finance', 'expense tracking', 'budgeting', 'financial planning'],
  h1: '[Topic]: Complete Guide 2025',
  h2Sections: [
    'What is [Topic]?',
    'Why [Topic] Matters',
    'How to [Action]',
    'Best Practices',
    'Common Mistakes',
    'How FinTrack Can Help'
  ],
  minWords: 1500,
  internalLinks: [
    {
      to: '/fintrack',
      anchorText: 'AI finance tracker',
      context: 'Link to FinTrack page'
    },
    {
      to: '/blog',
      anchorText: 'more finance guides',
      context: 'Link to related blog posts'
    }
  ],
  schemaTypes: ['Article', 'HowTo'],
  imageRequirements: {
    featured: true,
    screenshots: 2,
    altTextPattern: '[Topic] guide showing [specific concept]'
  }
};

/**
 * Comparison Post Template
 */
export const comparisonTemplate: BlogPostTemplate = {
  title: '[Option 1] vs [Option 2]: Comparison Guide 2025',
  description: 'Compare [Option 1] and [Option 2] to find the best solution for your needs. Detailed comparison with pros, cons, and recommendations.',
  keywords: ['[option 1] vs [option 2]', '[option 1] comparison', 'best [category]'],
  h1: '[Option 1] vs [Option 2]: Comparison Guide 2025',
  h2Sections: [
    'Overview',
    '[Option 1] Features and Benefits',
    '[Option 2] Features and Benefits',
    'Side-by-Side Comparison',
    'Which Should You Choose?',
    'Try Our [Tool/Service]'
  ],
  minWords: 2000,
  internalLinks: [
    {
      to: '/tools/[tool-route]',
      anchorText: '[Tool Name]',
      context: 'Link to our tool if applicable'
    },
    {
      to: '/smm',
      anchorText: 'SMM services',
      context: 'Link to SMM if comparing SMM services'
    },
    {
      to: '/fintrack',
      anchorText: 'FinTrack',
      context: 'Link to FinTrack if comparing finance tools'
    }
  ],
  schemaTypes: ['Article'],
  imageRequirements: {
    featured: true,
    screenshots: 1,
    altTextPattern: 'Comparison of [Option 1] vs [Option 2]'
  }
};

/**
 * Validate blog post against template requirements
 */
export function validateBlogPost(
  content: {
    title: string;
    wordCount: number;
    h1Count: number;
    h2Count: number;
    internalLinks: number;
    hasFeaturedImage: boolean;
  },
  template: BlogPostTemplate
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check word count
  if (content.wordCount < template.minWords) {
    errors.push(`Content must be at least ${template.minWords} words. Current: ${content.wordCount}`);
  }

  // Check H1 count
  if (content.h1Count !== 1) {
    errors.push(`Must have exactly one H1 tag. Found: ${content.h1Count}`);
  }

  // Check H2 sections
  if (content.h2Count < template.h2Sections.length) {
    warnings.push(`Recommended to have at least ${template.h2Sections.length} H2 sections. Found: ${content.h2Count}`);
  }

  // Check internal links
  if (content.internalLinks < template.internalLinks.length) {
    warnings.push(`Recommended to have at least ${template.internalLinks.length} internal links. Found: ${content.internalLinks}`);
  }

  // Check featured image
  if (template.imageRequirements.featured && !content.hasFeaturedImage) {
    warnings.push('Featured image is recommended for better SEO and social sharing');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Get template by type
 */
export function getTemplate(type: 'tool' | 'smm' | 'fintrack' | 'comparison'): BlogPostTemplate {
  switch (type) {
    case 'tool':
      return toolTutorialTemplate;
    case 'smm':
      return smmGuideTemplate;
    case 'fintrack':
      return fintrackGuideTemplate;
    case 'comparison':
      return comparisonTemplate;
    default:
      return toolTutorialTemplate;
  }
}

