import React from "react";
import { Plus, Trash2, Calendar, Building2, Briefcase, GripVertical } from "lucide-react";
import AIEnhancer from "./AIEnhancer";

const ExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newItem]);
  };

  const removeExperience = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const updateExperience = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Professional Experience</h3>
          <p className="text-sm text-slate-500">Add your work history starting with the most recent</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Work
        </button>
      </div>

      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={item.id || index} className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute -top-3 -right-3 p-1.5 bg-red-50 text-red-500 rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Briefcase className="w-3 h-3" /> Position
                </label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" /> Company
                </label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Start Date */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" /> Start Date
                </label>
                <input
                  type="month"
                  value={item.start_date}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* End Date */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" /> {item.is_current ? "Present" : "End Date"}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="month"
                    value={item.end_date}
                    disabled={item.is_current}
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all disabled:opacity-50"
                  />
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.is_current}
                      onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-xs text-slate-500 font-medium">Current</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</label>
                  <AIEnhancer
                    text={item.description}
                    onImprove={(val) => updateExperience(index, "description", val)}
                    type="experience"
                  />
                </div>
                <textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your key responsibilities and achievements..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <Briefcase className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-sm text-slate-400">No experience added yet</p>
            <button
              type="button"
              onClick={addExperience}
              className="mt-4 text-xs font-semibold text-green-600 hover:text-green-700 underline"
            >
              Add your first work experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
