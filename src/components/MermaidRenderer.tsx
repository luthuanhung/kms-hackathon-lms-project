'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with a clean theme for your LMS
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3b82f6', // Matching your blue-600 theme
    primaryTextColor: '#fff',
    lineColor: '#93c5fd',
  }
});

export default function MermaidRenderer({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Force a re-render for new messages
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }
  }, [chart]);

  return <div ref={ref} className="flex justify-center my-4 overflow-x-auto" />;
}