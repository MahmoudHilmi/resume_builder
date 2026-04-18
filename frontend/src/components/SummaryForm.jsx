import React from "react";
import AIEnhancer from "./AIEnhancer";

const SummaryForm = ({ data = "", onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Professional Summary</h3>
          <p className="text-sm text-slate-500">Highlight your top achievements and skills</p>
        </div>
        <AIEnhancer text={data} onImprove={onChange} type="summary" />
      </div>

      <textarea
        rows={6}
        value={data}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Dedicated Software Engineer with 5+ years of experience in building scalable web applications..."
        className="
          w-full px-4 py-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          transition-all duration-200 placeholder-slate-400
        "
      />
      <div className="flex justify-between text-[10px] text-slate-400 font-medium">
        <span>Tip: Keep it concise and impactful (2-4 sentences)</span>
        <span>{data.length} characters</span>
      </div>
    </div>
  );
};

export default SummaryForm;
