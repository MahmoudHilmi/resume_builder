import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── dummy data (replace with your real import) ──────────────────────────────
const dummyResumeData = [
  { _id: "r1", title: "Software Engineer", updatedAt: new Date() },
  {
    _id: "r2",
    title: "Product Manager",
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    _id: "r3",
    title: "UX Designer",
    updatedAt: new Date(Date.now() - 172800000),
  },
];

// ─── palette ─────────────────────────────────────────────────────────────────
const COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
  "#3b82f6",
];

// ─── tiny reusable Modal wrapper ─────────────────────────────────────────────
const Modal = ({ onBackdropClick, onSubmit, title, children }) => (
  <div
    onClick={onBackdropClick}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7 animate-modal"
    >
      <h2 className="text-lg font-semibold text-slate-800 mb-5">{title}</h2>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  // ── close helpers that also reset shared title state ──
  const closeCreate = () => {
    setShowCreate(false);
    setTitle("");
  };
  const closeUpload = () => {
    setShowUpload(false);
    setTitle("");
    setResumeFile(null);
  };
  const closeEdit = () => {
    setEditResumeId(null);
    setTitle("");
  };

  const createResume = (e) => {
    e.preventDefault();
    closeCreate();
    navigate("/app/builder/res123");
  };

  const uploadResume = (e) => {
    e.preventDefault();
    closeUpload();
    navigate("/app/builder/res123");
  };

  // BUG FIX: was calling setShowEditResume (undefined) — now uses closeEdit
  const editTitle = (e) => {
    e.preventDefault();
    setAllResumes((prev) =>
      prev.map((r) => (r._id === editResumeId ? { ...r, title } : r)),
    );
    closeEdit();
  };

  // BUG FIX: replaced window.confirm + alert with inline state
  const deleteResume = (id) => {
    setAllResumes((prev) => prev.filter((r) => r._id !== id));
  };

  const openEdit = (e, resume) => {
    e.stopPropagation();
    setEditResumeId(resume._id);
    setTitle(resume.title);
  };

  return (
    <>
      {/* ── page-level animation keyframes ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-modal {
          animation: fadeUp .22s ease both;
        }
        .resume-card {
          animation: fadeUp .3s ease both;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-5 py-10">
          {/* ── header ── */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-1">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Welcome back, <span className="text-green-500">Joe Doe</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage and build your resumes below
            </p>
          </div>

          {/* ── action cards ── */}
          <div className="flex flex-wrap gap-3 mb-8">
            <ActionCard
              icon={<PlusIcon className="w-5 h-5" />}
              label="New Resume"
              color="#6366f1"
              onClick={() => setShowCreate(true)}
            />
            <ActionCard
              icon={<UploadCloud className="w-5 h-5" />}
              label="Upload Existing"
              color="#8b5cf6"
              onClick={() => setShowUpload(true)}
            />
          </div>

          {/* ── divider ── */}
          {allResumes.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Your Resumes
              </span>
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">
                {allResumes.length} total
              </span>
            </div>
          )}

          {/* ── resume grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allResumes.map((resume, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <div
                  key={resume._id}
                  className="resume-card"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ResumeCard
                    resume={resume}
                    color={color}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    onDelete={(e) => {
                      e.stopPropagation();
                      deleteResume(resume._id);
                    }}
                    onEdit={(e) => openEdit(e, resume)}
                  />
                </div>
              );
            })}
          </div>

          {/* ── empty state ── */}
          {allResumes.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <FilePenIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No resumes yet — create your first one!</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Create Modal ── */}
      {showCreate && (
        <Modal
          onBackdropClick={closeCreate}
          onSubmit={createResume}
          title="Create a Resume"
        >
          <ModalInput
            value={title}
            onChange={setTitle}
            placeholder="e.g. Software Engineer 2025"
          />
          <ModalActions onCancel={closeCreate} submitLabel="Create Resume" />
        </Modal>
      )}

      {/* ── Upload Modal ── */}
      {showUpload && (
        <Modal
          onBackdropClick={closeUpload}
          onSubmit={uploadResume}
          title="Upload a Resume"
        >
          <ModalInput
            value={title}
            onChange={setTitle}
            placeholder="Resume title"
          />
          <label htmlFor="resume-input" className="block cursor-pointer mb-5">
            <div
              className={`
              flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8
              transition-colors duration-200
              ${
                resumeFile
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-400 hover:border-green-400 hover:text-green-500"
              }
            `}
            >
              <UploadCloud className="w-8 h-8 stroke-[1.5]" />
              <p className="text-sm font-medium">
                {resumeFile ? resumeFile.name : "Click to upload PDF"}
              </p>
              {!resumeFile && <p className="text-xs">PDF only</p>}
            </div>
            <input
              id="resume-input"
              type="file"
              accept=".pdf"
              hidden
              required
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </label>
          <ModalActions onCancel={closeUpload} submitLabel="Upload Resume" />
        </Modal>
      )}

      {/* ── Edit Title Modal ── */}
      {editResumeId && (
        <Modal
          onBackdropClick={closeEdit}
          onSubmit={editTitle}
          title="Rename Resume"
        >
          <ModalInput
            value={title}
            onChange={setTitle}
            placeholder="New title"
          />
          <ModalActions onCancel={closeEdit} submitLabel="Save Changes" />
        </Modal>
      )}
    </>
  );
};

// ─── sub-components ───────────────────────────────────────────────────────────

const ActionCard = ({ icon, label, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 border-dashed bg-white text-sm font-medium transition-all duration-200 hover:shadow-md"
    style={{ borderColor: color + "50", color }}
  >
    <span
      className="p-1.5 rounded-lg transition-transform duration-200 group-hover:scale-110"
      style={{ background: color + "18" }}
    >
      {icon}
    </span>
    {label}
  </button>
);

const ResumeCard = ({ resume, color, onClick, onDelete, onEdit }) => (
  <button
    type="button"
    onClick={onClick}
    className="relative w-full h-44 flex flex-col items-center justify-center rounded-xl gap-2 border group hover:shadow-lg transition-all duration-200 overflow-hidden text-left"
    style={{
      background: `linear-gradient(145deg, ${color}0d, ${color}28)`,
      borderColor: color + "35",
    }}
  >
    {/* icon */}
    <FilePenIcon
      className="w-7 h-7 transition-transform duration-200 group-hover:scale-110"
      style={{ color }}
    />

    {/* title */}
    <p
      className="text-xs font-semibold px-3 text-center leading-tight line-clamp-2"
      style={{ color }}
    >
      {resume.title}
    </p>

    {/* date */}
    <p
      className="absolute bottom-2 text-[10px]"
      style={{ color: color + "90" }}
    >
      {new Date(resume.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </p>

    {/* hover actions */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-0.5 bg-white/80 backdrop-blur-sm rounded-lg px-1 py-0.5 shadow-sm"
    >
      <button
        type="button"
        onClick={onEdit}
        aria-label="Rename resume"
        className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-green-600 transition-colors"
      >
        <PencilIcon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete resume"
        className="p-1 rounded hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors"
      >
        <TrashIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  </button>
);

// ── shared modal pieces ──
const ModalInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    required
    autoFocus
    className="w-full px-4 py-2.5 mb-5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-slate-400"
  />
);

const ModalActions = ({ onCancel, submitLabel }) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
    >
      {submitLabel}
    </button>
  </div>
);

export default Dashboard;
