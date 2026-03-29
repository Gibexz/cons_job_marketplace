"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

// ── TYPES ──────────────────────────────────────────────────────
interface UserProfile {
  id:       string;
  name:     string;
  email:    string;
  country?: string;
}

const COUNTRIES = [
  "United Kingdom", "United States", "Canada", "Australia",
  "Germany", "France", "Spain", "Italy", "Netherlands",
  "Ireland", "Nigeria", "Ghana", "South Africa", "Kenya",
  "India", "Pakistan", "Bangladesh", "Philippines", "Other",
];

const inputClass = [
  "w-full rounded-lg border border-gray-200 px-3 py-2",
  "text-sm text-gray-900 outline-none transition-colors",
  "focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]",
  "bg-white",
].join(" ");

// ─────────────────────────────────────────────────────────────
export default function UserProfilePage() {
  const router = useRouter();

  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [pwSaving, setPwSaving]   = useState(false);
  const [success, setSuccess]     = useState("");
  const [error, setError]         = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError]     = useState("");

  // ── Profile form state ────────────────────────────────────
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [country, setCountry] = useState("");

  // ── Password form state ───────────────────────────────────
  const [currentPassword, setCurrentPassword]   = useState("");
  const [newPassword, setNewPassword]           = useState("");
  const [confirmPassword, setConfirmPassword]   = useState("");
  const [showPasswords, setShowPasswords]       = useState(false);

  // ── Fetch user on mount ───────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // API: GET /users/me
        const data: UserProfile = await apiFetch("/users/me");
        setName(data.name       ?? "");
        setEmail(data.email     ?? "");
        setCountry(data.country ?? "");
      } catch {
        setError("Failed to load your profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ── Submit profile update ─────────────────────────────────
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setSaving(true);
    try {
      // API: PATCH /users/me
      await apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name:    name.trim(),
          email:   email.trim(),
          country: country.trim() || undefined,
        }),
      });
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err?.message ?? "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // ── Submit password change ────────────────────────────────
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (!currentPassword) {
      setPwError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }

    setPwSaving(true);
    try {
      // API: POST /users/me/change-password
      await apiFetch("/users/me/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      setPwSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwError(err?.message ?? "Failed to update password.");
    } finally {
      setPwSaving(false);
    }
  };

  // ── Loading ───────────────────────────────────────────────
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

  // ── Page ──────────────────────────────────────────────────
  return (
    <>
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            User Profile
          </h1>
          <p className="text-sm text-gray-500">
            Update your personal details and password.
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT: Forms ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ══════════════════════════════════════
              SECTION 1 — Profile Details
          ══════════════════════════════════════ */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              Profile Details
            </h2>
            <p className="mb-5 text-xs text-gray-400">
              Update your name, email address, and country.
            </p>

            {/* Success / Error banners */}
            {success && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Full Name <span className="text-[#ff6600]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Smith"
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Email Address <span className="text-[#ff6600]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  required
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Changing your email will require you to log in again.
                </p>
              </div>

              {/* Country */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Country{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">— Select your country —</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-[#ff6600] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* ══════════════════════════════════════
              SECTION 2 — Change Password
          ══════════════════════════════════════ */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              Change Password
            </h2>
            <p className="mb-5 text-xs text-gray-400">
              Use a strong password of at least 8 characters.
            </p>

            {/* Password banners */}
            {pwSuccess && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {pwSuccess}
              </div>
            )}
            {pwError && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                </svg>
                {pwError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Show/hide toggle */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowPasswords((p) => !p)}
                  className="text-xs font-semibold text-gray-500 hover:text-[#ff6600] transition-colors"
                >
                  {showPasswords ? "🙈 Hide passwords" : "👁 Show passwords"}
                </button>
              </div>

              {/* Current password */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Current Password <span className="text-[#ff6600]">*</span>
                </label>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={inputClass}
                />
              </div>

              {/* New + confirm — 2 col on sm+ */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    New Password <span className="text-[#ff6600]">*</span>
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={8}
                    required
                    className={inputClass}
                  />
                  {/* Strength indicator */}
                  {newPassword.length > 0 && (
                    <div className="mt-1.5 flex items-center gap-2">
                      {[1, 2, 3, 4].map((level) => {
                        const strength =
                          newPassword.length >= 12 &&
                          /[A-Z]/.test(newPassword) &&
                          /[0-9]/.test(newPassword) &&
                          /[^A-Za-z0-9]/.test(newPassword)
                            ? 4
                            : newPassword.length >= 10 &&
                              /[A-Z]/.test(newPassword)
                            ? 3
                            : newPassword.length >= 8
                            ? 2
                            : 1;
                        return (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              level <= strength
                                ? strength === 4
                                  ? "bg-green-500"
                                  : strength === 3
                                  ? "bg-blue-500"
                                  : strength === 2
                                  ? "bg-[#ff6600]"
                                  : "bg-red-400"
                                : "bg-gray-200"
                            }`}
                          />
                        );
                      })}
                      <span className="text-[10px] text-gray-400">
                        {newPassword.length >= 12 &&
                        /[A-Z]/.test(newPassword) &&
                        /[0-9]/.test(newPassword) &&
                        /[^A-Za-z0-9]/.test(newPassword)
                          ? "Strong"
                          : newPassword.length >= 10 && /[A-Z]/.test(newPassword)
                          ? "Good"
                          : newPassword.length >= 8
                          ? "Fair"
                          : "Weak"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Confirm New Password <span className="text-[#ff6600]">*</span>
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`${inputClass} ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                        : confirmPassword && confirmPassword === newPassword
                        ? "border-green-300 focus:border-green-400 focus:ring-green-100"
                        : ""
                    }`}
                  />
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                  )}
                  {confirmPassword && confirmPassword === newPassword && (
                    <p className="mt-1 text-xs text-green-600">✓ Passwords match</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={pwSaving}
                className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {pwSaving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

        </div>

        {/* ── RIGHT: Summary ── */}
        <div className="space-y-6">

          {/* Account Summary */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Avatar */}
            <div className="mb-4 flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6600] text-2xl font-black text-white ring-4 ring-orange-100">
                {name.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <p className="font-bold text-gray-900">{name || "—"}</p>
                <p className="text-xs text-gray-500">{email || "—"}</p>
                {country && (
                  <p className="mt-0.5 text-xs text-gray-400">📍 {country}</p>
                )}
              </div>
            </div>

            {/* Summary rows */}
            <ul className="divide-y divide-gray-100 text-sm">
              {[
                { label: "Name",    value: name    || "Not set" },
                { label: "Email",   value: email   || "Not set" },
                { label: "Country", value: country || "Not set" },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between py-2.5">
                  <span className="text-gray-500">{label}</span>
                  <span className="max-w-[140px] truncate text-right font-semibold text-gray-900">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Password tips */}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
            <p className="mb-2 text-xs font-bold text-[#ff6600]">🔒 Password Tips</p>
            <ul className="space-y-1 text-xs leading-relaxed text-orange-700">
              <li>• At least 8 characters long</li>
              <li>• Mix uppercase and lowercase letters</li>
              <li>• Include numbers and symbols</li>
              <li>• Avoid using personal information</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}