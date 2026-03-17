// 'use client';
// import { useState, KeyboardEvent, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { apiFetch } from '@/lib/api';

// // ── TYPES ─────────────────────────────────────────────────────
// interface JobFormData {
//   title:       string;
//   description: string;
//   company:     string;
//   lat:         string;
//   lng:         string;
//   skills:      string[];
//   active:      boolean;
// }

// // ── INITIAL STATE ─────────────────────────────────────────────
// const initialForm: JobFormData = {
//   title:       '',
//   description: '',
//   company:     '',
//   lat:         '',
//   lng:         '',
//   skills:      [],
//   active:      true,
// };

// // ── SHARED INPUT CLASS — brand colour focus ring ───────────────
// const inputClass = [
//   'w-full bg-gray-50 border border-gray-200 rounded-xl',
//   'px-3.5 py-3 text-sm text-gray-900 font-medium',
//   'placeholder-gray-400 outline-none transition-all duration-150',
//   'focus:ring-2 focus:ring-[#ff6600] focus:border-[#ff6600]',
// ].join(' ');

// // ─────────────────────────────────────────────────────────────
// export default function CreateJobPage() {
//   const router = useRouter();

//   const [form, setForm]           = useState<JobFormData>(initialForm);
//   const [skillInput, setSkillInput] = useState('');
//   const [loading, setLoading]     = useState(false);
//   const [toast, setToast]         = useState<{
//     message: string;
//     type: 'success' | 'error';
//   } | null>(null);

//   // ── Toast helper ────────────────────────────────────────────
//   function showToast(message: string, type: 'success' | 'error') {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3500);
//   }

//   // ── Field change ────────────────────────────────────────────
//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   // ── Skill tag: add on Enter ──────────────────────────────────
//   function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const trimmed = skillInput.trim();
//       if (trimmed && !form.skills.includes(trimmed)) {
//         setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
//       }
//       setSkillInput('');
//     }
//   }

//   // ── Remove skill tag ────────────────────────────────────────
//   function removeSkill(skill: string) {
//     setForm((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((s) => s !== skill),
//     }));
//   }

//   // ── Form submit ─────────────────────────────────────────────
//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();

//     if (!form.title.trim() || !form.description.trim()) {
//       showToast('Title and description are required.', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       // API: POST /jobs
//       const body: Record<string, unknown> = {
//         title:       form.title.trim(),
//         description: form.description.trim(),
//         skills:      form.skills,
//         active:      form.active,
//       };
//       if (form.company.trim()) body.company = form.company.trim();
//       if (form.lat !== '')     body.lat = parseFloat(form.lat);
//       if (form.lng !== '')     body.lng = parseFloat(form.lng);

//       await apiFetch('/jobs', { method: 'POST', body: JSON.stringify(body) });

//       showToast('Job published successfully!', 'success');
//       setForm(initialForm);
//       setSkillInput('');

//       // Navigate back to jobs list after short delay so toast is visible
//       setTimeout(() => router.push('/jobs'), 1200);
//     } catch (error) {
//       console.error(error);
//       showToast('Failed to publish job. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ─────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">

//       {/* ── TOAST ───────────────────────────────────────────── */}
//       {toast && (
//         <div
//           className={`
//             fixed left-1/2 top-5 z-50 -translate-x-1/2
//             min-w-[240px] rounded-xl px-5 py-3
//             text-center text-sm font-semibold text-white shadow-xl
//             transition-all duration-300
//             ${toast.type === 'success' ? 'bg-[#ff6600]' : 'bg-[#1a1a1a]'}
//           `}
//         >
//           {toast.type === 'success' ? '✓ ' : '✕ '}
//           {toast.message}
//         </div>
//       )}

//       {/* ── STICKY HEADER ───────────────────────────────────── */}
//       <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
//         <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">

//           {/* ← Back to /jobs — explicit route, never goes wrong */}
//           <Link
//             href="/jobs"
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:border-[#ff6600] hover:bg-orange-50 hover:text-[#ff6600]"
//             aria-label="Back to Jobs"
//           >
//             <svg
//               className="h-4 w-4"
//               fill="none" viewBox="0 0 24 24"
//               stroke="currentColor" strokeWidth={2.5}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//           </Link>

//           {/* Title */}
//           <div>
//             <h1 className="text-base font-black text-gray-900 sm:text-lg">
//               Post New Job
//             </h1>
//             <p className="text-xs text-gray-500">
//               Fill in the details to publish a new position.
//             </p>
//           </div>

//           {/* Brand mark — right side */}
//           <div className="ml-auto hidden sm:block">
//             <span className="text-sm font-black text-[#ff6600]">ConsJob</span>
//             <span className="ml-1 text-sm font-black text-gray-800">MarketPlace</span>
//           </div>
//         </div>
//       </header>

//       {/* ── MAIN FORM ───────────────────────────────────────── */}
//       <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
//         <form onSubmit={handleSubmit} noValidate>
//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

//             {/* ── SECTION: Basic Info ── */}
//             <Section icon="💼" label="Basic Info">
//               <div className="space-y-4">
//                 <FieldWrapper label="Job Title" required>
//                   <input
//                     type="text"
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     placeholder="e.g. Senior Electrician"
//                     required
//                     className={inputClass}
//                   />
//                 </FieldWrapper>

//                 <FieldWrapper label="Company Name">
//                   <input
//                     type="text"
//                     name="company"
//                     value={form.company}
//                     onChange={handleChange}
//                     placeholder="e.g. Acme Construction Ltd"
//                     className={inputClass}
//                   />
//                 </FieldWrapper>
//               </div>
//             </Section>

//             {/* ── SECTION: Description ── */}
//             <Section icon="📝" label="Description">
//               <FieldWrapper label="Job Description" required>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   placeholder="Describe the role, responsibilities, and requirements..."
//                   rows={5}
//                   required
//                   className={`${inputClass} resize-none leading-relaxed`}
//                 />
//               </FieldWrapper>
//             </Section>

//             {/* ── SECTION: Skills ── */}
//             <Section icon="⚡" label="Required Skills">
//               <FieldWrapper label="Add Skills">
//                 <input
//                   type="text"
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={handleSkillKeyDown}
//                   placeholder="Type a skill and press Enter"
//                   className={inputClass}
//                 />
//                 <p className="mt-1.5 text-xs text-gray-400">
//                   Press <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[11px] text-gray-500">Enter</kbd> after each skill to add it as a tag.
//                 </p>
//               </FieldWrapper>

//               {/* Skill Tags */}
//               {form.skills.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {form.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#ff6600]"
//                     >
//                       {skill}
//                       <button
//                         type="button"
//                         onClick={() => removeSkill(skill)}
//                         aria-label={`Remove ${skill}`}
//                         className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-orange-300 transition-colors hover:bg-orange-200 hover:text-[#ff6600]"
//                       >
//                         <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
//                           <path
//                             d="M1.5 1.5l7 7M8.5 1.5l-7 7"
//                             stroke="currentColor"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </Section>

//             {/* ── SECTION: Location ── */}
//             <Section icon="📍" label="Location">
//               <div className="grid grid-cols-2 gap-4">
//                 <FieldWrapper label="Latitude">
//                   <input
//                     type="number"
//                     name="lat"
//                     value={form.lat}
//                     onChange={handleChange}
//                     placeholder="e.g. 53.4808"
//                     step="any"
//                     className={inputClass}
//                   />
//                 </FieldWrapper>
//                 <FieldWrapper label="Longitude">
//                   <input
//                     type="number"
//                     name="lng"
//                     value={form.lng}
//                     onChange={handleChange}
//                     placeholder="e.g. -2.2426"
//                     step="any"
//                     className={inputClass}
//                   />
//                 </FieldWrapper>
//               </div>
//               <p className="mt-2 text-xs text-gray-400">
//                 Coordinates are used to pin this job on the live map.
//               </p>
//             </Section>

//             {/* ── SECTION: Status ── */}
//             <Section icon="🔆" label="Listing Status">
//               <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900">
//                     Active Listing
//                   </p>
//                   <p className="mt-0.5 text-xs text-gray-500">
//                     {form.active
//                       ? 'Visible to workers on the platform'
//                       : 'Hidden — workers cannot see this job'}
//                   </p>
//                 </div>

//                 {/* Toggle switch — brand orange when active */}
//                 <button
//                   type="button"
//                   role="switch"
//                   aria-checked={form.active}
//                   onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
//                   className={`relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2
//                     ${form.active ? 'bg-[#ff6600]' : 'bg-gray-300'}`}
//                 >
//                   <span
//                     className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200
//                       ${form.active ? 'translate-x-6' : 'translate-x-0'}`}
//                   />
//                 </button>
//               </div>
//             </Section>

//             {/* ── SUBMIT ── */}
//             <div className="border-t border-gray-100 bg-gray-50 px-5 py-5">
//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//                 {/* Cancel — goes back without submitting */}
//                 <Link
//                   href="/jobs"
//                   className="w-full rounded-xl border-2 border-gray-200 py-3 text-center text-sm font-bold text-gray-600 transition-colors hover:border-gray-300 hover:bg-white sm:w-auto sm:px-6"
//                 >
//                   Cancel
//                 </Link>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`
//                     w-full rounded-xl px-6 py-3 text-sm font-bold text-white
//                     transition-all duration-200 sm:w-auto sm:px-8
//                     ${loading
//                       ? 'cursor-not-allowed bg-orange-300'
//                       : 'bg-[#ff6600] shadow-md hover:bg-[#e65c00] active:scale-[0.98]'
//                     }
//                   `}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                       </svg>
//                       Publishing...
//                     </span>
//                   ) : (
//                     'Publish Job'
//                   )}
//                 </button>
//               </div>
//             </div>

//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }

// // ── REUSABLE SUB-COMPONENTS ───────────────────────────────────

// function Section({
//   icon,
//   label,
//   children,
// }: {
//   icon: string;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="border-b border-gray-100 px-5 py-6 last:border-b-0">
//       {/* Section header */}
//       <div className="mb-4 flex items-center gap-2">
//         <span className="text-base leading-none">{icon}</span>
//         <span className="text-xs font-bold uppercase tracking-widest text-[#ff6600]">
//           {label}
//         </span>
//       </div>
//       {children}
//     </div>
//   );
// }

// function FieldWrapper({
//   label,
//   required,
//   children,
// }: {
//   label:     string;
//   required?: boolean;
//   children:  React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-gray-700">
//         {label}
//         {required && <span className="ml-0.5 text-[#ff6600]">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }



'use client';

import {
  useState,
  useEffect,
  KeyboardEvent,
  FormEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

// ── TYPES ──────────────────────────────────────────────────────
interface Company {
  id:       string;
  name:     string;
  logo?:    string;
  address?: string;
}

interface JobFormData {
  title:       string;
  description: string;
  companyId:   string; // ← UUID, not a plain name string
  lat:         string;
  lng:         string;
  skills:      string[];
  active:      boolean;
}

// ── INITIAL STATE ───────────────────────────────────────────────
const initialForm: JobFormData = {
  title:       '',
  description: '',
  companyId:   '',
  lat:         '',
  lng:         '',
  skills:      [],
  active:      true,
};

// ── SHARED INPUT CLASS ──────────────────────────────────────────
const inputClass = [
  'w-full bg-gray-50 border border-gray-200 rounded-xl',
  'px-3.5 py-3 text-sm text-gray-900 font-medium',
  'placeholder-gray-400 outline-none transition-all duration-150',
  'focus:ring-2 focus:ring-[#ff6600] focus:border-[#ff6600]',
].join(' ');

// ───────────────────────────────────────────────────────────────
export default function CreateJobPage() {
  const router = useRouter();

  const [form, setForm]               = useState<JobFormData>(initialForm);
  const [skillInput, setSkillInput]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [companies, setCompanies]     = useState<Company[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [toast, setToast]             = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // ── Fetch user's companies on mount ─────────────────────────
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // API: GET /company/my-companies
        const data: Company[] = await apiFetch('/company/my-companies');
        setCompanies(Array.isArray(data) ? data : []);

        // Auto-select if user only has one company
        if (Array.isArray(data) && data.length === 1) {
          setForm((prev) => ({ ...prev, companyId: data[0].id }));
        }
      } catch {
        showToast('Could not load your companies.', 'error');
      } finally {
        setCompaniesLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // ── Toast helper ─────────────────────────────────────────────
  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Field change ─────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // ── Skill tag helpers ─────────────────────────────────────────
  function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed && !form.skills.includes(trimmed)) {
        setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      }
      setSkillInput('');
    }
  }

  function removeSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }

  // ── Form submit ───────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      showToast('Job title is required.', 'error');
      return;
    }
    if (!form.description.trim()) {
      showToast('Job description is required.', 'error');
      return;
    }
    if (!form.companyId) {
      showToast('Please select a company for this job.', 'error');
      return;
    }
    if (form.skills.length === 0) {
      showToast('Please add at least one required skill.', 'error');
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        title:       form.title.trim(),
        description: form.description.trim(),
        companyId:   form.companyId,  // ← UUID sent to backend
        skills:      form.skills,
        active:      form.active,
      };

      if (form.lat !== '') body.lat = parseFloat(form.lat);
      if (form.lng !== '') body.lng = parseFloat(form.lng);

      // API: POST /jobs
      await apiFetch('/jobs', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      showToast('Job published successfully!', 'success');
      setForm(initialForm);
      setSkillInput('');

      setTimeout(() => router.push('/jobs'), 1200);
    } catch (error: any) {
      console.error(error);
      showToast(
        error?.message ?? 'Failed to publish job. Please try again.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  }

  // ── Selected company object (for preview) ────────────────────
  const selectedCompany = companies.find((c) => c.id === form.companyId);

  // ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── TOAST ─────────────────────────────────────────────── */}
      {toast && (
        <div
          className={`
            fixed left-1/2 top-5 z-50 -translate-x-1/2
            min-w-[240px] rounded-xl px-5 py-3
            text-center text-sm font-semibold text-white shadow-xl
            transition-all duration-300
            ${toast.type === 'success' ? 'bg-[#ff6600]' : 'bg-[#1a1a1a]'}
          `}
        >
          {toast.type === 'success' ? '✓ ' : '✕ '}
          {toast.message}
        </div>
      )}

      {/* ── STICKY HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/jobs"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:border-[#ff6600] hover:bg-orange-50 hover:text-[#ff6600]"
            aria-label="Back to Jobs"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div>
            <h1 className="text-base font-black text-gray-900 sm:text-lg">
              Post New Job
            </h1>
            <p className="text-xs text-gray-500">
              Fill in the details to publish a new position.
            </p>
          </div>

          <div className="ml-auto hidden sm:block">
            <span className="text-sm font-black text-[#ff6600]">ConsJob</span>
            <span className="ml-1 text-sm font-black text-gray-800">MarketPlace</span>
          </div>
        </div>
      </header>

      {/* ── MAIN FORM ─────────────────────────────────────────── */}
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <form onSubmit={handleSubmit} noValidate>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* ── SECTION: Basic Info ── */}
            <Section icon="💼" label="Basic Info">
              <div className="space-y-4">

                {/* Job Title */}
                <FieldWrapper label="Job Title" required>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Electrician"
                    required
                    className={inputClass}
                  />
                </FieldWrapper>

                {/* Company Dropdown */}
                <FieldWrapper label="Company" required>
                  {companiesLoading ? (
                    /* Loading skeleton */
                    <div className="flex h-[46px] w-full animate-pulse items-center rounded-xl border border-gray-200 bg-gray-100 px-3.5">
                      <span className="text-xs text-gray-400">Loading your companies...</span>
                    </div>
                  ) : companies.length === 0 ? (
                    /* No companies state */
                    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <span className="text-base">⚠️</span>
                      <div>
                        <p className="text-xs font-bold text-amber-700">No companies found</p>
                        <p className="text-xs text-amber-600">
                          You need to{' '}
                          <Link
                            href="/settings/company-profile"
                            className="underline hover:text-[#ff6600]"
                          >
                            create a company
                          </Link>{' '}
                          before posting a job.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Dropdown select */}
                      <div className="relative">
                        <select
                          name="companyId"
                          value={form.companyId}
                          onChange={handleChange}
                          required
                          className={`${inputClass} cursor-pointer appearance-none pr-10`}
                        >
                          <option value="" disabled>
                            — Select a company —
                          </option>
                          {companies.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}{c.address ? ` · ${c.address}` : ''}
                            </option>
                          ))}
                        </select>

                        {/* Chevron icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Selected company preview */}
                      {selectedCompany && (
                        <div className="mt-2 flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
                          {/* Logo / Initials */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-800 text-sm font-black text-white">
                            {selectedCompany.logo ? (
                              <img
                                src={selectedCompany.logo}
                                alt={selectedCompany.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              selectedCompany.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-gray-900">
                              {selectedCompany.name}
                            </p>
                            {selectedCompany.address && (
                              <p className="truncate text-xs text-gray-500">
                                {selectedCompany.address}
                              </p>
                            )}
                          </div>
                          <span className="ml-auto shrink-0 rounded-full bg-[#ff6600] px-2 py-0.5 text-[10px] font-bold text-white">
                            Selected
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </FieldWrapper>

              </div>
            </Section>

            {/* ── SECTION: Description ── */}
            <Section icon="📝" label="Description">
              <FieldWrapper label="Job Description" required>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={5}
                  required
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </FieldWrapper>
            </Section>

            {/* ── SECTION: Skills ── */}
            <Section icon="⚡" label="Required Skills">
              <FieldWrapper label="Add Skills">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  Press{' '}
                  <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[11px] text-gray-500">
                    Enter
                  </kbd>{' '}
                  after each skill to add it as a tag.
                </p>
              </FieldWrapper>

              {form.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#ff6600]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-orange-300 transition-colors hover:bg-orange-200 hover:text-[#ff6600]"
                      >
                        <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
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
            </Section>

            {/* ── SECTION: Location ── */}
            <Section icon="📍" label="Location">
              <div className="grid grid-cols-2 gap-4">
                <FieldWrapper label="Latitude">
                  <input
                    type="number"
                    name="lat"
                    value={form.lat}
                    onChange={handleChange}
                    placeholder="e.g. 53.4808"
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
                    placeholder="e.g. -2.2426"
                    step="any"
                    className={inputClass}
                  />
                </FieldWrapper>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Coordinates are used to pin this job on the live map.
              </p>
            </Section>

            {/* ── SECTION: Status ── */}
            <Section icon="🔆" label="Listing Status">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Active Listing</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {form.active
                      ? 'Visible to workers on the platform'
                      : 'Hidden — workers cannot see this job'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.active}
                  onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                  className={`relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2
                    ${form.active ? 'bg-[#ff6600]' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200
                      ${form.active ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </Section>

            {/* ── SUBMIT ── */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/jobs"
                  className="w-full rounded-xl border-2 border-gray-200 py-3 text-center text-sm font-bold text-gray-600 transition-colors hover:border-gray-300 hover:bg-white sm:w-auto sm:px-6"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading || companies.length === 0}
                  className={`
                    w-full rounded-xl px-6 py-3 text-sm font-bold text-white
                    transition-all duration-200 sm:w-auto sm:px-8
                    ${loading || companies.length === 0
                      ? 'cursor-not-allowed bg-orange-300'
                      : 'bg-[#ff6600] shadow-md hover:bg-[#e65c00] active:scale-[0.98]'
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    'Publish Job'
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

// ── REUSABLE SUB-COMPONENTS ────────────────────────────────────

function Section({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 px-5 py-6 last:border-b-0">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-base leading-none">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-[#ff6600]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  children,
}: {
  label:     string;
  required?: boolean;
  children:  React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-[#ff6600]">*</span>}
      </label>
      {children}
    </div>
  );
}