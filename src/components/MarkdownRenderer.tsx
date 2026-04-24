'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidRenderer from './MermaidRenderer';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-sm max-w-none prose-blue prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 1. Link handling
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {children}
            </a>
          ),
          
          // 2. The Logic Bridge: Mermaid vs. Standard Code
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';

            // Check if it's a Mermaid diagram
            if (lang === 'mermaid') {
              return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
            }

            // Standard code block (Syntax highlighting style)
            return !inline && match ? (
              <pre className="overflow-x-auto rounded-lg p-3 bg-gray-900 text-xs my-2">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              // Inline code (e.g. `const x = 1`)
              <code className="bg-gray-100 px-1 rounded text-blue-600 font-semibold" {...props}>
                {children}
              </code>
            );
          },

          // 3. Table handling
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 border rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="px-3 py-2 bg-gray-50 text-left font-bold text-xs uppercase text-gray-600">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 text-xs border-t text-gray-700">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}