import React, { useState } from "react";
import { Plus, X, Sparkles, BrainCircuit } from "lucide-react";

const SkillsForm = ({ data = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (e) => {
    e?.preventDefault();
    const skill = inputValue.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(data.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Skills</h3>
        <p className="text-sm text-slate-500">Add your technical and soft skills</p>
      </div>

      <div className="space-y-4">
        {/* Input area */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React, Node.js, Leadership..."
              className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
               <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Skills list */}
        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
          {data.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:border-green-200 hover:text-green-600 transition-all shadow-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="p-0.5 hover:bg-red-50 hover:text-red-500 rounded transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {data.length === 0 && (
            <p className="text-xs text-slate-400 italic">No skills added yet. Type and press Enter.</p>
          )}
        </div>

        {/* Suggestions/Tips */}
        <div className="p-3 bg-indigo-50/30 border border-indigo-100/50 rounded-xl">
          <p className="text-[10px] text-indigo-500 font-medium flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Tip: Add 5-10 core skills related to your target job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
