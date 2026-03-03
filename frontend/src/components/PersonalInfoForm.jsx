import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const fields = [
  {
    key: "full_Name",
    label: "Full Name",
    icon: User,
    type: "text",
    required: true,
    placeholder: "John Doe",
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    required: true,
    placeholder: "john@example.com",
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    type: "text",
    placeholder: "New York, NY",
  },
  {
    key: "profession",
    label: "Profession",
    icon: BriefcaseBusiness,
    type: "text",
    placeholder: "Software Engineer",
  },
  {
    key: "linkedin",
    label: "LinkedIn Profile",
    icon: Linkedin,
    type: "url",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    key: "website",
    label: "Personal Website",
    icon: Globe,
    type: "url",
    placeholder: "https://yourwebsite.com",
  },
];

const PersonalInfoForm = ({
  data = {},
  onChange = () => {},
  removeBackground = false,
  setRemoveBackground = () => {},
}) => {
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    if (!data?.image) {
      setPreview(null);
      return;
    }

    if (typeof data.image === "string") {
      setPreview(data.image);
      return;
    }

    const objectUrl = URL.createObjectURL(data.image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data?.image]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setImageError("Only JPG and PNG files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError("File size must be less than 2MB.");
      e.target.value = "";
      return;
    }

    handleChange("image", file);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(null);
    handleChange("image", null);
    setRemoveBackground(false);
  };

  const isFileImage = data?.image && typeof data.image === "object";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          Get started with your personal information
        </p>
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <label
            className="cursor-pointer block"
            aria-label="Upload profile image"
          >
            {preview ? (
              <img
                src={preview}
                alt="User profile"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 hover:opacity-75 transition-opacity duration-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition flex items-center justify-center">
                <User className="w-6 h-6 text-slate-400" />
              </div>
            )}

            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={ALLOWED_TYPES.join(",")}
            />
          </label>

          {preview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="Remove image"
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-700">
            {preview ? "Profile photo" : "Upload a photo"}
          </p>
          <p className="text-xs text-gray-400">JPG or PNG, max 2MB</p>

          {/* Remove Background Toggle */}
          {isFileImage && (
            <label className="inline-flex items-center gap-2 mt-1 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
                aria-label="Toggle remove background"
              />
              <div
                className="
                  relative w-8 h-4 rounded-full transition-colors duration-200
                  bg-slate-300 peer-checked:bg-green-500
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5
                  after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm
                  after:transition-transform after:duration-200
                  peer-checked:after:translate-x-4
                "
              />
              <span className="text-xs text-gray-600">Remove background</span>
            </label>
          )}

          {imageError && (
            <p role="alert" className="text-xs text-red-500 mt-0.5">
              {imageError}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4">
        {fields.map(
          ({ key, label, icon: Icon, type, required, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <label
                htmlFor={key}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {required && (
                  <span className="text-red-400 normal-case tracking-normal font-normal">
                    *
                  </span>
                )}
              </label>

              <input
                id={key}
                name={key}
                type={type}
                value={data[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                required={required}
                className="
                w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-gray-300 transition-colors duration-150
              "
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
