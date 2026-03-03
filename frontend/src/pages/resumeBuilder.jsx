import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";

// ─── section config ───────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "personal",    name: "Personal",   icon: User           },
  { id: "summary",     name: "Summary",    icon: FileText       },
  { id: "experience",  name: "Experience", icon: Briefcase      },
  { id: "education",   name: "Education",  icon: GraduationCap  },
  { id: "skills",      name: "Skills",     icon: Sparkles       },
  { id: "projects",    name: "Projects",   icon: FolderIcon     },
];

const INITIAL_DATA = {
  id: "",
  title: "",
  personalInfo: {},
  professionalSummary: "",
  experience: [],       // fixed typo: "experince" → "experience"
  education: [],
  skills: [],
  projects: [],
  template: "classic",
  accent_color: "#6366f1", // fixed typo: "accebt_color" → "accent_color"
  public: false,
};

// ─── ResumeBuilder ────────────────────────────────────────────────────────────
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData]             = useState(INITIAL_DATA);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [showPreview, setShowPreview]           = useState(false); // mobile preview toggle

  // ── load existing resume ──
  useEffect(() => {
    if (!resumeId) return;
    const resume = dummyResumeData?.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title || resume.full_name || "Resume Builder";
    }
  }, [resumeId]);

  const goTo     = (i) => setActiveSectionIndex(Math.max(0, Math.min(i, SECTIONS.length - 1)));
  const goPrev   = () => goTo(activeSectionIndex - 1);
  const goNext   = () => goTo(activeSectionIndex + 1);
  const isFirst  = activeSectionIndex === 0;
  const isLast   = activeSectionIndex === SECTIONS.length - 1;
  const progress = (activeSectionIndex / (SECTIONS.length - 1)) * 100;

  const activeSection = SECTIONS[activeSectionIndex];

  return (
    <>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .section-animate { animation: fadeSlide .22s ease both; }

        /* custom scrollbar */
        .thin-scroll::-webkit-scrollbar       { width: 4px; }
        .thin-scroll::-webkit-scrollbar-track { background: transparent; }
        .thin-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
      `}</style>

      <div className="min-h-screen bg-slate-50 flex flex-col">

        {/* ── top bar ── */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
            {/* back */}
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* title */}
            <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">
              {resumeData.title || "Untitled Resume"}
            </p>

            {/* mobile preview toggle */}
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="lg:hidden inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </header>

        {/* ── main ── */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-5 py-7">
          <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ── editor panel ── */}
            <div
              className={`lg:col-span-5 ${showPreview ? "hidden lg:block" : "block"}`}
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* progress bar */}
                <div className="h-1 bg-slate-100">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* section tabs */}
                <div className="flex overflow-x-auto thin-scroll border-b border-slate-100 px-1 gap-0.5 pt-1 bg-slate-50/60">
                  {SECTIONS.map((sec, i) => {
                    const Icon    = sec.icon;
                    const active  = i === activeSectionIndex;
                    const visited = i < activeSectionIndex;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => goTo(i)}
                        className={`
                          relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium
                          rounded-t-lg transition-all duration-150 whitespace-nowrap
                          ${active
                            ? "bg-white text-green-600 shadow-sm border border-b-white border-slate-200 -mb-px"
                            : visited
                              ? "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                              : "text-slate-400 hover:text-slate-600 hover:bg-white/60"}
                        `}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {sec.name}
                        {visited && !active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1.5 right-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* form body */}
                <div className="p-6 min-h-[420px]">
                  <div key={activeSection.id} className="section-animate">
                    {activeSection.id === "personal" && (
                      <PersonalInfoForm
                        data={resumeData.personalInfo}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, personalInfo: data }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    )}

                    {activeSection.id === "summary" && (
                      <SummaryPlaceholder />
                    )}

                    {["experience", "education", "skills", "projects"].includes(activeSection.id) && (
                      <SectionPlaceholder name={activeSection.name} Icon={activeSection.icon} />
                    )}
                  </div>
                </div>

                {/* navigation footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={isFirst}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {/* step dots */}
                  <div className="flex items-center gap-1.5">
                    {SECTIONS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-200 ${
                          i === activeSectionIndex
                            ? "w-4 h-2 bg-green-500"
                            : i < activeSectionIndex
                              ? "w-2 h-2 bg-emerald-400"
                              : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isLast}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── preview panel ── */}
            <div className={`lg:col-span-7 ${showPreview ? "block" : "hidden lg:block"}`}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* preview header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Live Preview
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                  </div>
                </div>

                {/* A4 preview area */}
                <div className="p-5 bg-slate-100 min-h-[600px] flex items-start justify-center">
                  <div
                    className="w-full bg-white shadow-xl rounded-lg"
                    style={{ aspectRatio: "210 / 297", maxWidth: 480 }}
                  >
                    <PreviewContent resumeData={resumeData} accentColor={resumeData.accent_color} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

// ─── Preview Content (minimal live preview) ───────────────────────────────────
const PreviewContent = ({ resumeData, accentColor = "#6366f1" }) => {
  const p = resumeData?.personalInfo || {};
  const hasAnyInfo = p.fullName || p.email || p.profession;

  if (!hasAnyInfo) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-300 p-8">
        <FileText className="w-10 h-10 opacity-40" />
        <p className="text-xs text-center">
          Fill in your details on the left to see a live preview
        </p>
      </div>
    );
  }

  return (
    <div className="p-7 h-full text-slate-800 text-[11px] leading-relaxed">
      {/* header block */}
      <div className="mb-4 pb-3 border-b-2" style={{ borderColor: accentColor }}>
        {p.fullName && (
          <h1 className="text-lg font-bold tracking-tight" style={{ color: accentColor }}>
            {p.fullName}
          </h1>
        )}
        {p.profession && <p className="text-slate-500 text-[10px] mt-0.5">{p.profession}</p>}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-[10px] text-slate-400">
          {p.email    && <span>{p.email}</span>}
          {p.phone    && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
        </div>
      </div>

      {/* placeholder body lines */}
      {[0.9, 0.7, 0.8, 0.6, 0.75].map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-slate-100 mb-2"
          style={{ width: `${w * 100}%` }}
        />
      ))}
    </div>
  );
};

// ─── placeholder form sections ────────────────────────────────────────────────
const SummaryPlaceholder = () => (
  <div className="space-y-3">
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 block mb-2">
        Professional Summary
      </label>
      <textarea
        rows={5}
        placeholder="Write a short summary highlighting your key skills and career goals..."
        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none placeholder-slate-400 transition"
      />
    </div>
  </div>
);

const SectionPlaceholder = ({ name, Icon }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-300">
    <Icon className="w-9 h-9 opacity-50" />
    <p className="text-sm font-medium text-slate-400">{name} section</p>
    <p className="text-xs text-slate-300">Coming soon</p>
  </div>
);


export default ResumeBuilder;