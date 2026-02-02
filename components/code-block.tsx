'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  fileName,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative group', className)}>
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
          <span className="text-sm font-mono text-muted-foreground">{fileName}</span>
        </div>
      )}

      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="size-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4 mr-2" />
              Copy
            </>
          )}
        </Button>

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: fileName ? '0 0 0.5rem 0.5rem' : '0.5rem',
            fontSize: '0.875rem',
            maxHeight: '600px',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
