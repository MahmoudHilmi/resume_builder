import React, { useState } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";

/**
 * A simulate AI enhancement utility that improves text based on keywords and tone.
 */
const mockEnhance = async (text, type) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!text) return text;

  // Simple heuristic-based improvements
  let improved = text;

  if (type === "summary") {
    if (text.length < 50) {
      improved = "Highly motivated professional with a strong track record of delivering high-quality results in fast-paced environments. Expert in problem-solving and strategic planning with a focus on efficiency and excellence.";
    } else {
      improved = `Experienced specialist with expertise in ${text.split(" ").slice(0, 3).join(" ")}. Proven ability to drive projects from conception to completion while maintaining high standards of quality and performance.`;
    }
  } else if (type === "experience") {
    improved = text
      .split("\n")
      .map((line) => {
        if (!line.trim()) return line;
        if (line.toLowerCase().includes("worked on")) {
          return line.replace(/worked on/gi, "Spearheaded the development of");
        }
        if (line.toLowerCase().includes("responsible for")) {
          return line.replace(/responsible for/gi, "Orchestrated and managed");
        }
        return `Streamlined ${line.charAt(0).toLowerCase()}${line.slice(1)} to improve organizational efficiency by 25%.`;
      })
      .join("\n");
  }

  return improved;
};

const AIEnhancer = ({ text, onImprove, type = "summary" }) => {
  const [isImproving, setIsImproving] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleImprove = async () => {
    if (!text || isImproving) return;
    setIsImproving(true);
    try {
      const improvedText = await mockEnhance(text, type);
      onImprove(improvedText);
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 2000);
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleImprove}
      disabled={isImproving || !text}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
        transition-all duration-200 shadow-sm
        ${
          isImproving
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : showCheck
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 hover:scale-105 active:scale-95"
        }
      `}
    >
      {isImproving ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : showCheck ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Sparkles className="w-3.5 h-3.5" />
      )}
      {isImproving ? "AI is Thinking..." : showCheck ? "Improved!" : "Improve with AI"}
    </button>
  );
};

export default AIEnhancer;
