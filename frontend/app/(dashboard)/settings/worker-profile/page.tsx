"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api"; // adjust path as needed

// ── Types ──────────────────────────────────────────────
type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL" | "EXPERT";

interface WorkerProfile {
  id: string;           // ← this is the source of truth
  userId: string;
  skills: string[];
  experience: ExperienceLevel;
  available: boolean;
  bio?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
  updatedAt?: string;
}

const EXPERIENCE_LEVELS: ExperienceLevel[] = ["BEGINNER", "INTERMEDIATE", "PROFESSIONAL", "EXPERT"];

const SKILL_SUGGESTIONS = [
  "Bricklaying", "Plastering", "Plumbing", "Electrical",
  "Carpentry", "Roofing", "Scaffolding", "Painting",
  "Tiling", "Welding", "Demolition", "Landscaping",
];

// ── Page ───────────────────────────────────────────────
export default function WorkerProfilePage() {
  const router = useRouter();

  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [hasProfile, setHasProfile]   = useState(false); // true if data.id exists
  const [success, setSuccess]         = useState("");
  const [error, setError]             = useState("");

  // ── Form State ────────────────────────────────────────
  const [skills, setSkills]           = useState<string[]>([]);
  const [skillInput, setSkillInput]   = useState("");
  const [experience, setExperience]   = useState<ExperienceLevel>("BEGINNER");
  const [available, setAvailable]     = useState(true);
  const [bio, setBio]                 = useState("");
  const [lat, setLat]                 = useState<string>("");
  const [lng, setLng]                 = useState<string>("");

  // ── On mount: fetch profile & check for id ────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API: GET /worker-profile/me
        const data: WorkerProfile | null = await apiFetch("/worker-profile/me");

        /**
         * SOURCE OF TRUTH:
         * If the returned object contains a valid `id`,
         * the user already has a worker profile → UPDATE mode.
         * If data is null/empty or has no id → CREATE mode.
         */
        if (data && data.id) {
          setHasProfile(true);

          // ── Populate form with existing data ──
          setSkills(data.skills        ?? []);
          setExperience(data.experience ?? "BEGINNER");
          setAvailable(data.available  ?? true);
          setBio(data.bio              ?? "");
          setLat(data.lat?.toString()  ?? "");
          setLng(data.lng?.toString()  ?? "");
        } else {
          // No id returned → CREATE mode, leave form empty
          setHasProfile(false);
        }
      } catch (err: any) {
        // Network or server error — default to CREATE mode
        // to avoid blocking the user
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ── Skill Helpers ─────────────────────────────────────
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  // ── Submit ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }

    setSaving(true);

    const payload = {
      skills,
      experience,
      available,
      bio:  bio       || undefined,
      lat:  lat       ? parseFloat(lat) : undefined,
      lng:  lng       ? parseFloat(lng) : undefined,
    };

    try {
      if (hasProfile) {
        // API: PATCH /worker-profile/update
        await apiFetch("/worker-profile/update", {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setSuccess("Worker profile updated successfully!");
      } else {
        // API: POST /worker-profile/create
        await apiFetch("/worker-profile/create", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccess("Worker profile created successfully!");
        // After creation, switch to update mode
        setHasProfile(true);
      }
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading State ─────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ff6600]" />
          <p className="text-sm text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────
  return (
    <>
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            {hasProfile ? "Update Worker Profile" : "Create Worker Profile"}
          </h1>
          <p className="text-sm text-gray-500">
            {hasProfile
              ? "Your existing profile is loaded below. Edit and save your changes."
              : "No worker profile found. Fill in the form below to get started."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="flex w-fit items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Settings
        </button>
      </div>

      {/* ── Mode Badge ── */}
      <div className="mb-5">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
            hasProfile
              ? "bg-orange-100 text-[#ff6600]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${hasProfile ? "bg-[#ff6600]" : "bg-gray-400"}`} />
          {hasProfile
            ? "Profile Found — Update Mode"
            : "No Profile Found — Create Mode"}
        </span>
      </div>

      {/* ── Success Banner ── */}
      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
          {error}
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT: Main Fields ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Skills Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              Skills
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Add skills relevant to the construction jobs you want.
            </p>

            {/* Selected Skill Tags */}
            {skills.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#ff6600]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-500 transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Skill Input */}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter or comma..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
            />
            <p className="mt-1 text-xs text-gray-400">
              Press <kbd className="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> or{" "}
              <kbd className="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 font-mono text-[10px]">,</kbd> to add a skill.
            </p>

            {/* Suggestions */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Quick Add
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s)}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Experience & Availability Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Experience & Availability
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Experience Level */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Toggle */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Current Availability
                </label>
                <div className="flex overflow-hidden rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setAvailable(true)}
                    className={`flex-1 py-2 text-xs font-bold transition-colors ${
                      available
                        ? "bg-[#ff6600] text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    ✓ Available
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailable(false)}
                    className={`flex-1 py-2 text-xs font-bold transition-colors ${
                      !available
                        ? "bg-gray-800 text-white"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    ✕ Unavailable
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bio Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              Bio
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Optional — Tell employers about your background and work style.
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              rows={4}
              placeholder="e.g. Experienced bricklayer with 10+ years on commercial sites..."
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
            />
            <p className={`mt-1 text-xs ${bio.length >= 480 ? "text-red-400" : "text-gray-400"}`}>
              {bio.length}/500 characters
            </p>
          </div>

          {/* ── Location Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              Location
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Optional — Used to match you with nearby jobs on the map.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="e.g. 51.5074"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="e.g. -0.1278"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT: Summary + Submit ── */}
        <div className="space-y-6">

          {/* Summary Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Summary
            </h2>
            <ul className="divide-y divide-gray-100 text-sm">
              {[
                {
                  label: "Skills",
                  value: skills.length > 0 ? `${skills.length} added` : "None yet",
                  highlight: skills.length > 0,
                },
                {
                  label: "Experience",
                  value: experience.charAt(0) + experience.slice(1).toLowerCase(),
                  highlight: true,
                },
                {
                  label: "Status",
                  value: available ? "Available" : "Unavailable",
                  highlight: available,
                  color: available ? "text-green-600" : "text-red-500",
                },
                {
                  label: "Bio",
                  value: bio ? "Added" : "Not set",
                  highlight: !!bio,
                },
                {
                  label: "Location",
                  value: lat && lng ? "Set" : "Not set",
                  highlight: !!(lat && lng),
                },
              ].map(({ label, value, highlight, color }) => (
                <li key={label} className="flex items-center justify-between py-2.5">
                  <span className="text-gray-500">{label}</span>
                  <span className={`font-bold ${color ?? (highlight ? "text-gray-900" : "text-gray-400")}`}>
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <button
              type="submit"
              disabled={saving}
              className={`w-full rounded-lg px-5 py-3 text-sm font-black text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                hasProfile
                  ? "bg-[#ff6600] hover:bg-[#e65c00]"
                  : "bg-gray-800 hover:bg-black"
              }`}
            >
              {saving
                ? "Saving..."
                : hasProfile
                ? "Update Profile"
                : "Create Profile"}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">
              {hasProfile
                ? "Your existing profile will be updated."
                : "Creates a new worker profile linked to your account."}
            </p>
          </div>

          {/* Tip Card */}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
            <p className="mb-1 text-xs font-bold text-[#ff6600]">💡 Tip</p>
            <p className="text-xs leading-relaxed text-orange-700">
              A complete profile with skills, experience level, and a bio
              significantly increases your chances of being invited to jobs by
              employers on the platform.
            </p>
          </div>

        </div>
      </form>
    </>
  );
}