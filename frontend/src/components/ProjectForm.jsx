import React from "react";
import { Plus, Trash2, FolderIcon, Layout, FileText } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      type: "", // e.g. Web App, Research, Mobile App
      description: "",
    };
    onChange([...data, newItem]);
  };

  const removeProject = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const updateProject = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Projects</h3>
          <p className="text-sm text-slate-500">Showcase your best work and personal projects</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={item.id || index} className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="absolute -top-3 -right-3 p-1.5 bg-red-50 text-red-500 rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <FolderIcon className="w-3 h-3" /> Project Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="e.g. Portfolio Website"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Layout className="w-3 h-3" /> Project Type
                </label>
                <input
                  type="text"
                  value={item.type}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="e.g. Web Application"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Project Description */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <FileText className="w-3 h-3" /> Description
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Briefly describe what you built and the technologies used..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <FolderIcon className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-sm text-slate-400">No projects added yet</p>
            <button
              type="button"
              onClick={addProject}
              className="mt-4 text-xs font-semibold text-green-600 hover:text-green-700 underline"
            >
              Add your first project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
