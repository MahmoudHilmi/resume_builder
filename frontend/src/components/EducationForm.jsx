import React from "react";
import { Plus, Trash2, GraduationCap, Calendar, School, Award } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newItem]);
  };

  const removeEducation = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const updateEducation = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Education</h3>
          <p className="text-sm text-slate-500">Add your academic background</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={item.id || index} className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute -top-3 -right-3 p-1.5 bg-red-50 text-red-500 rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institution */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <School className="w-3 h-3" /> Institution / University
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Degree */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Award className="w-3 h-3" /> Degree
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="e.g. Bachelor of Science"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Field of Study */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                   Field of Study
                </label>
                <input
                  type="text"
                  value={item.field}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* Graduation Date */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" /> Graduation Date
                </label>
                <input
                  type="month"
                  value={item.graduation_date}
                  onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {/* GPA */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={item.gpa}
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  placeholder="e.g. 3.8 / 4.0"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <GraduationCap className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-sm text-slate-400">No education added yet</p>
            <button
              type="button"
              onClick={addEducation}
              className="mt-4 text-xs font-semibold text-green-600 hover:text-green-700 underline"
            >
              Add your degree
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
