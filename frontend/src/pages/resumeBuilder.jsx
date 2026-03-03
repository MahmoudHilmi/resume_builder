import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    id: "",
    title: "",
    persinalInfo: {},
    professionalSummary: "",
    experince: [],
    education: [],
    skills: [],
    projects: [],
    template: "classic",
    accebt_color: "#3b82f6",
    public: false,
  });
  const { resumeId } = useParams();

  const loadingExustungResume = async (resumeId) => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadingExustungResume(resumeId);
    }
  }, [resumeId]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4 " />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Editor Section */}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
