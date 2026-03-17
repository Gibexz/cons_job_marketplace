"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

// ── Types ──────────────────────────────────────────────
interface Company {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  rating: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _count?: { jobs: number };
}

type ViewMode = "list" | "create" | "edit";

const MAX_COMPANIES = 5;

// ── Helpers ────────────────────────────────────────────
const getRatingStars = (rating: number) => {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

// ── Page ───────────────────────────────────────────────
export default function CompanyProfilePage() {
  const router = useRouter();

  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [companies, setCompanies]     = useState<Company[]>([]);
  const [view, setView]               = useState<ViewMode>("list");
  const [selectedCompany, setSelected] = useState<Company | null>(null);
  const [success, setSuccess]         = useState("");
  const [error, setError]             = useState("");

  // ── Form State ────────────────────────────────────────
  const [name, setName]       = useState("");
  const [logo, setLogo]       = useState("");
  const [address, setAddress] = useState("");

  // ── Fetch Companies ───────────────────────────────────
  const fetchCompanies = async () => {
    try {
      // API: GET /company/my-companies
      const data: Company[] = await apiFetch("/company/my-companies");
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load your companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ── Clear banners on view change ──────────────────────
  useEffect(() => {
    setSuccess("");
    setError("");
  }, [view]);

  // ── Open Create Form ──────────────────────────────────
  const openCreate = () => {
    setName("");
    setLogo("");
    setAddress("");
    setSelected(null);
    setView("create");
  };

  // ── Open Edit Form ────────────────────────────────────
  const openEdit = (company: Company) => {
    setName(company.name        ?? "");
    setLogo(company.logo        ?? "");
    setAddress(company.address  ?? "");
    setSelected(company);
    setView("edit");
  };

  // ── Submit Create ─────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Company name is required.");
      return;
    }

    setSaving(true);
    try {
      // API: POST /company/create
      const created: Company = await apiFetch("/company/create", {
        method: "POST",
        body: JSON.stringify({
          name:    name.trim(),
          logo:    logo.trim()    || undefined,
          address: address.trim() || undefined,
        }),
      });

      setCompanies((prev) => [created, ...prev]);
      setSuccess(`"${created.name}" has been created successfully!`);
      setView("list");
    } catch (err: any) {
      setError(err?.message ?? "Failed to create company.");
    } finally {
      setSaving(false);
    }
  };

  // ── Submit Update ─────────────────────────────────────
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!selectedCompany) return;

    setSaving(true);
    try {
      // API: PATCH /company/:id
      const updated: Company = await apiFetch(`/company/${selectedCompany.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name:    name.trim(),
          logo:    logo.trim()    || undefined,
          address: address.trim() || undefined,
        }),
      });

      setCompanies((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
      setSuccess(`"${updated.name}" has been updated successfully!`);
      setView("list");
    } catch (err: any) {
      setError(err?.message ?? "Failed to update company.");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ff6600]" />
          <p className="text-sm text-gray-500">Loading your companies...</p>
        </div>
      </div>
    );
  }

  const atLimit = companies.length >= MAX_COMPANIES;

  // ── Render ────────────────────────────────────────────
  return (
    <>
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
            {view === "create"
              ? "Add New Company"
              : view === "edit"
              ? `Edit — ${selectedCompany?.name}`
              : "Company Profiles"}
          </h1>
          <p className="text-sm text-gray-500">
            {view === "list"
              ? `You have ${companies.length} of ${MAX_COMPANIES} companies.`
              : view === "create"
              ? "Fill in the details to register a new company."
              : "Update your company's information below."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Back button when in create/edit view */}
          {view !== "list" && (
            <button
              type="button"
              onClick={() => setView("list")}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          {/* Back to Settings */}
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Settings
          </button>
        </div>
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

      {/* ════════════════════════════════════
           VIEW: LIST
      ════════════════════════════════════ */}
      {view === "list" && (
        <div className="space-y-6">

          {/* ── Limit Progress Bar ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-600">Company Slots Used</span>
              <span className={atLimit ? "text-red-500" : "text-[#ff6600]"}>
                {companies.length} / {MAX_COMPANIES}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  atLimit ? "bg-red-400" : "bg-[#ff6600]"
                }`}
                style={{ width: `${(companies.length / MAX_COMPANIES) * 100}%` }}
              />
            </div>
            {atLimit && (
              <p className="mt-2 text-xs text-red-500 font-medium">
                ⚠ You have reached the maximum of {MAX_COMPANIES} companies.
              </p>
            )}
          </div>

          {/* ── Company Cards Grid ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Existing Companies */}
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Top */}
                <div className="flex items-start gap-4">
                  {/* Logo / Initials */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg font-black text-white">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      company.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-gray-900">{company.name}</p>
                    {company.address && (
                      <p className="truncate text-xs text-gray-500">{company.address}</p>
                    )}
                    <p className="mt-0.5 text-xs text-[#ff6600]">
                      {getRatingStars(company.rating)}{" "}
                      <span className="text-gray-400">({company.rating.toFixed(1)})</span>
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {company._count?.jobs ?? 0} job{company._count?.jobs !== 1 ? "s" : ""}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span>
                    Since {new Date(company.createdAt).getFullYear()}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(company)}
                    className="flex-1 rounded-lg bg-[#ff6600] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]"
                  >
                    Edit
                  </button>
                  {/* No delete — admin only */}
                  <div className="group relative">
                    <button
                      type="button"
                      disabled
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-400 cursor-not-allowed"
                    >
                      🔒 Delete
                    </button>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Only an admin can delete companies at your request.
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ── Add New Company Card ── */}
            {!atLimit && (
              <button
                type="button"
                onClick={openCreate}
                className="group flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-5 text-center transition-all hover:border-[#ff6600] hover:bg-orange-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-400 transition-colors group-hover:bg-orange-100 group-hover:text-[#ff6600]">
                  +
                </div>
                <p className="text-xs font-bold text-gray-500 group-hover:text-[#ff6600]">
                  Add New Company
                </p>
                <p className="text-xs text-gray-400">
                  {MAX_COMPANIES - companies.length} slot{MAX_COMPANIES - companies.length !== 1 ? "s" : ""} remaining
                </p>
              </button>
            )}
          </div>

          {/* ── No Delete Info Banner ── */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg">ℹ️</span>
              <div>
                <p className="text-xs font-bold text-amber-700">Company Deletion Policy</p>
                <p className="mt-0.5 text-xs text-amber-600 leading-relaxed">
                  Companies linked to your account cannot be self-deleted.
                  If you need a company removed, please contact an administrator
                  with your reason — they will review and action your request.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ════════════════════════════════════
           VIEW: CREATE / EDIT FORM
      ════════════════════════════════════ */}
      {(view === "create" || view === "edit") && (
        <form
          onSubmit={view === "create" ? handleCreate : handleUpdate}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* ── LEFT: Form Fields ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Company Info Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                Company Information
              </h2>
              <div className="space-y-4">

                {/* ── Name: READ-ONLY in edit mode ── */}
                {view === "edit" ? (
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                      Company Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        disabled
                        className="w-full cursor-not-allowed rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 pr-10 text-sm text-gray-400 outline-none"
                      />
                      {/* Lock Icon */}
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </div>
                    {/* Notice */}
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-amber-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"
                        />
                      </svg>
                      Company name cannot be changed after creation.
                    </p>
                  </div>
                ) : (
                  /* ── Name: EDITABLE in create mode ── */
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. BuildRight Ltd."
                      maxLength={100}
                      required
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                    />
                    <p className="mt-1 text-xs text-gray-400">{name.length}/100</p>
                  </div>
                )}

                {/* Address — editable in both modes */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Address{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 12 Construction Lane, London"
                    maxLength={255}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>

                {/* Logo URL — editable in both modes */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Logo URL{" "}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                  {/* Logo Preview */}
                  {logo && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={logo}
                        alt="Logo preview"
                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <p className="text-xs text-gray-400">Logo preview</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Edit-only: read-only rating display */}
            {view === "edit" && selectedCompany && (
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Company Stats
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-orange-50 p-4 text-center">
                    <p className="text-2xl font-black text-[#ff6600]">
                      {selectedCompany._count?.jobs ?? 0}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Total Jobs</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-black text-gray-800">
                      {selectedCompany.rating.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="col-span-2 rounded-lg bg-gray-50 p-4 text-center sm:col-span-1">
                    <p className="text-2xl font-black text-gray-800">
                      {new Date(selectedCompany.createdAt).getFullYear()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Year Joined</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: Summary + Submit ── */}
          <div className="space-y-6">

            {/* Preview Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                Preview
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-xl font-black text-white overflow-hidden">
                  {logo ? (
                    <img
                      src={logo}
                      alt="preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    (name.charAt(0).toUpperCase() || "?")
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {name || <span className="text-gray-400 font-normal">Company Name</span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    {address || "No address set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <button
                type="submit"
                disabled={saving || !name.trim()}
                className="w-full rounded-lg bg-[#ff6600] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : view === "create"
                  ? "Create Company"
                  : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className="mt-3 w-full rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>

            {/* Slot Info Card */}
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
              <p className="mb-1 text-xs font-bold text-[#ff6600]">
                {view === "create" ? "💡 Company Limit" : "💡 Note"}
              </p>
              <p className="text-xs leading-relaxed text-orange-700">
                {view === "create"
                  ? `You can register up to ${MAX_COMPANIES} companies. You currently have ${companies.length}.`
                  : "Company ratings are managed by the platform and cannot be manually edited."}
              </p>
            </div>

          </div>
        </form>
      )}
    </>
  );
}