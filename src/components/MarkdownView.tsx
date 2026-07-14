import React from "react";

interface MarkdownViewProps {
  content: string;
}

export function MarkdownView({ content }: MarkdownViewProps) {
  if (!content) return null;

  // Split content by lines
  const lines = content.split("\n");

  return (
    <div className="space-y-4 text-right leading-relaxed text-gray-700 font-sans text-sm md:text-base">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;

        // Custom headers
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={index} className="text-base md:text-lg font-bold text-[#0B2E1E] mt-4 mb-2">
              {parseBold(trimmed.replace(/^###\s*/, ""))}
            </h4>
          );
        }
        if (trimmed.startsWith("##")) {
          return (
            <h3 key={index} className="text-lg md:text-xl font-bold text-[#0B2E1E] mt-6 mb-3 border-r-4 border-[#C29F6C] pr-3">
              {parseBold(trimmed.replace(/^##\s*/, ""))}
            </h3>
          );
        }
        if (trimmed.startsWith("#")) {
          return (
            <h2 key={index} className="text-xl md:text-2xl font-bold text-[#0B2E1E] mt-8 mb-4 border-b border-[#E5DFD4] pb-2">
              {parseBold(trimmed.replace(/^#\s*/, ""))}
            </h2>
          );
        }

        // Bullet list item
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          return (
            <li key={index} className="list-none pr-5 relative text-gray-700 my-1.5">
              <span className="absolute right-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#C29F6C]" />
              {parseBold(trimmed.replace(/^[-*]\s*/, ""))}
            </li>
          );
        }

        // Blockquotes
        if (trimmed.startsWith(">")) {
          return (
            <blockquote key={index} className="border-r-4 border-[#C29F6C] bg-[#F2EFEA] p-4 my-4 text-[#0B2E1E] italic rounded-l-md font-medium">
              {parseBold(trimmed.replace(/^>\s*/, ""))}
            </blockquote>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {parseBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function parseBold(text: string): React.ReactNode[] {
  // simple parser to replace **text** with bold elements
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-bold text-[#0B2E1E] bg-[#F2EFEA] px-1 rounded">
          {part}
        </strong>
      );
    }
    return part;
  });
}
export default MarkdownView;
