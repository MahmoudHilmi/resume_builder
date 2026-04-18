import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
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
import ResumePreview from "../components/ResumePreview";
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import ProjectForm from "../components/ProjectForm";
import { Printer, Download } from "lucide-react";

// ─── section config ───────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "personal", name: "Personal", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "skills", name: "Skills", icon: Sparkles },
  { id: "projects", name: "Projects", icon: FolderIcon },
];

const INITIAL_DATA = {
  id: "",
  title: "",
  personal_info: {
    full_name: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    linkedin: "",
    website: "",
    image: null,
  },
  professional_summary: "",
  experience: [],
  education: [],
  skills: [],
  project: [],
  template: "classic",
  accent_color: "#6366f1",
  public: false,
};

// ─── ResumeBuilder ────────────────────────────────────────────────────────────
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(INITIAL_DATA);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // mobile preview toggle

  // Determine active section from URL
  const currentPath = location.pathname.split("/").pop();
  const activeSectionIndex = Math.max(0, SECTIONS.findIndex(s => s.id === currentPath));
  const activeSection = SECTIONS[activeSectionIndex];

  // ── load existing resume ──
  useEffect(() => {
    if (!resumeId) return;
    const resume = dummyResumeData?.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title =
        resume.title || resume.personal_info?.full_name || "Resume Builder";
    }
  }, [resumeId]);

  const goTo = (i) => {
    const nextSection = SECTIONS[Math.max(0, Math.min(i, SECTIONS.length - 1))];
    navigate(`/app/builder/${resumeId}/${nextSection.id}`);
  };
  const goPrev = () => goTo(activeSectionIndex - 1);
  const goNext = () => goTo(activeSectionIndex + 1);
  const isFirst = activeSectionIndex === 0;
  const isLast = activeSectionIndex === SECTIONS.length - 1;
  const progress = (activeSectionIndex / (SECTIONS.length - 1)) * 100;

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

            {/* actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 px-3 py-1.5 rounded-lg transition-all shadow-sm group"
              >
                <Printer className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPreview((v) => !v)}
                className="lg:hidden inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                {showPreview ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
                {showPreview ? "Edit" : "Preview"}
              </button>
            </div>
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
                    const Icon = sec.icon;
                    const visited = i < activeSectionIndex;
                    return (
                      <NavLink
                        key={sec.id}
                        to={`${sec.id}`}
                        className={({ isActive }) => `
                          relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium
                          rounded-t-lg transition-all duration-150 whitespace-nowrap
                          ${
                            isActive
                              ? "bg-white text-green-600 shadow-sm border border-b-white border-slate-200 -mb-px"
                              : visited
                                ? "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                                : "text-slate-400 hover:text-slate-600 hover:bg-white/60"
                          }
                        `}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {sec.name}
                        {visited && i !== activeSectionIndex && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1.5 right-1" />
                        )}
                      </NavLink>
                    );
                  })}
                </div>

                {/* form body */}
                <div className="p-6 min-h-[420px]">
                  <div key={location.pathname} className="section-animate">
                    <Outlet 
                      context={{ 
                        resumeData, 
                        setResumeData,
                        removeBackground,
                        setRemoveBackground
                      }} 
                    />
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
            <div className="lg:col-span-7 max-lg:mt-6">
              <div>{/* buttons */}</div>

              {/* Resume Preview */}
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ResumeBuilder;
