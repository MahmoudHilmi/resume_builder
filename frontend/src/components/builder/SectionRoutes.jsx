import React from "react";
import { useOutletContext } from "react-router-dom";
import PersonalInfoForm from "../PersonalInfoForm";
import SummaryForm from "../SummaryForm";
import ExperienceForm from "../ExperienceForm";
import EducationForm from "../EducationForm";
import SkillsForm from "../SkillsForm";
import ProjectForm from "../ProjectForm";

export const PersonalRoute = () => {
  const { resumeData, setResumeData, removeBackground, setRemoveBackground } = useOutletContext();
  return (
    <PersonalInfoForm
      data={resumeData.personal_info}
      onChange={(data) =>
        setResumeData((prev) => ({
          ...prev,
          personal_info: data,
        }))
      }
      removeBackground={removeBackground}
      setRemoveBackground={setRemoveBackground}
    />
  );
};

export const SummaryRoute = () => {
  const { resumeData, setResumeData } = useOutletContext();
  return (
    <SummaryForm
      data={resumeData.professional_summary}
      onChange={(val) =>
        setResumeData((prev) => ({
          ...prev,
          professional_summary: val,
        }))
      }
    />
  );
};

export const ExperienceRoute = () => {
  const { resumeData, setResumeData } = useOutletContext();
  return (
    <ExperienceForm
      data={resumeData.experience}
      onChange={(val) =>
        setResumeData((prev) => ({
          ...prev,
          experience: val,
        }))
      }
    />
  );
};

export const EducationRoute = () => {
  const { resumeData, setResumeData } = useOutletContext();
  return (
    <EducationForm
      data={resumeData.education}
      onChange={(val) =>
        setResumeData((prev) => ({
          ...prev,
          education: val,
        }))
      }
    />
  );
};

export const SkillsRoute = () => {
  const { resumeData, setResumeData } = useOutletContext();
  return (
    <SkillsForm
      data={resumeData.skills}
      onChange={(val) =>
        setResumeData((prev) => ({
          ...prev,
          skills: val,
        }))
      }
    />
  );
};

export const ProjectsRoute = () => {
  const { resumeData, setResumeData } = useOutletContext();
  return (
    <ProjectForm
      data={resumeData.project}
      onChange={(val) =>
        setResumeData((prev) => ({
          ...prev,
          project: val,
        }))
      }
    />
  );
};
