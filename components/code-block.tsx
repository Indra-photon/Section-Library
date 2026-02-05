'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 rounded-t-lg">
          <span className="text-sm font-mono text-zinc-400">{filename}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
          >
            {copied ? (
              <>
                <Check className="mr-2 size-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 size-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code */}
      <div className={cn(
        "relative overflow-x-auto",
        filename ? "rounded-b-lg" : "rounded-lg"
      )}>
        {!filename && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
          >
            {copied ? (
              <>
                <Check className="mr-2 size-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 size-4" />
                Copy
              </>
            )}
          </Button>
        )}

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
            background: '#1e1e1e',
            fontSize: '0.875rem',
            padding: '1rem',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#858585',
            userSelect: 'none',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}