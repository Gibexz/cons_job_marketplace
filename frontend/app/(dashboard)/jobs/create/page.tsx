"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface JobFormData {
  title: string;
  description: string;
  company: string;
  lat: string;
  lng: string;
  skills: string[];
  active: boolean;
}

const initialForm: JobFormData = {
  title: "",
  description: "",
  company: "",
  lat: "",
  lng: "",
  skills: [],
  active: true,
};

export default function CreateJobPage() {
  const router = useRouter();
  const [form, setForm] = useState<JobFormData>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed && !form.skills.includes(trimmed)) {
        setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      showToast("Title and description are required.", "error");
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        title: form.title.trim(),
        description: form.description.trim(),
        skills: form.skills,
        active: form.active,
      };
      if (form.company.trim()) body.company = form.company.trim();
      if (form.lat !== "") body.lat = parseFloat(form.lat);
      if (form.lng !== "") body.lng = parseFloat(form.lng);

      await apiFetch("/jobs", { method: "POST", body: JSON.stringify(body) });
      showToast("Job created successfully!", "success");
      setForm(initialForm);
      setSkillInput("");
    } catch {
      showToast("Failed to create job. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-medium shadow-xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-orange-500 text-white"
              : "bg-black text-white"
          }`}
          style={{ minWidth: "220px", textAlign: "center" }}
        >
          {toast.type === "success" ? "✓ " : "✕ "}
          {toast.message}
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-orange-100">
        <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-50 hover:bg-orange-100 active:scale-95 transition-all duration-150"
            aria-label="Go back"
          >
            <svg
              className="w-4 h-4 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-[17px] font-semibold text-black leading-tight tracking-tight">
              Create Job
            </h1>
            <p className="text-xs text-orange-400 font-normal mt-0.5">
              Fill in the details below
            </p>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
          {/* Section: Basic Info */}
          <div className="px-5 pt-6 pb-5 border-b border-orange-50">
            <SectionLabel icon="💼" label="Basic Info" />
            <div className="mt-4 space-y-3.5">
              <FieldWrapper label="Job Title" required>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Civil Engineer"
                  className={inputClass}
                />
              </FieldWrapper>
              <FieldWrapper label="Company">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Construction Co."
                  className={inputClass}
                />
              </FieldWrapper>
            </div>
          </div>

          {/* Section: Description */}
          <div className="px-5 pt-5 pb-5 border-b border-orange-50">
            <SectionLabel icon="📝" label="Description" />
            <div className="mt-4">
              <FieldWrapper label="Job Description" required>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and expectations..."
                  rows={5}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </FieldWrapper>
            </div>
          </div>

          {/* Section: Skills */}
          <div className="px-5 pt-5 pb-5 border-b border-orange-50">
            <SectionLabel icon="⚡" label="Skills" />
            <div className="mt-4">
              <FieldWrapper label="Required Skills">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className={inputClass}
                />
              </FieldWrapper>
              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="w-3.5 h-3.5 flex items-center justify-center rounded-full text-orange-300 hover:text-orange-600 hover:bg-orange-200 transition-colors"
                        aria-label={`Remove ${skill}`}
                      >
                        <svg
                          viewBox="0 0 10 10"
                          fill="currentColor"
                          className="w-2.5 h-2.5"
                        >
                          <path
                            d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section: Location */}
          <div className="px-5 pt-5 pb-5 border-b border-orange-50">
            <SectionLabel icon="📍" label="Location" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <FieldWrapper label="Latitude">
                <input
                  type="number"
                  name="lat"
                  value={form.lat}
                  onChange={handleChange}
                  placeholder="e.g. 40.7128"
                  step="any"
                  className={inputClass}
                />
              </FieldWrapper>
              <FieldWrapper label="Longitude">
                <input
                  type="number"
                  name="lng"
                  value={form.lng}
                  onChange={handleChange}
                  placeholder="e.g. -74.006"
                  step="any"
                  className={inputClass}
                />
              </FieldWrapper>
            </div>
          </div>

          {/* Section: Status */}
          <div className="px-5 pt-5 pb-5 border-b border-orange-50">
            <SectionLabel icon="🔆" label="Status" />
            <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-black">Active Listing</p>
                <p className="text-xs text-orange-400 mt-0.5">
                  {form.active
                    ? "Visible to applicants"
                    : "Hidden from applicants"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                  form.active ? "bg-orange-500" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={form.active}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    form.active ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button — inline with form */}
          <div className="px-5 pt-5 pb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                loading
                  ? "bg-orange-300 text-white cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white shadow-lg shadow-orange-100"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Publishing Job...
                </span>
              ) : (
                "Publish Job"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

const inputClass =
  "w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150";

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base leading-none">{icon}</span>
      <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-black px-0.5">
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
