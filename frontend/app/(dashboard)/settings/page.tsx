// // API: GET /users/me — returns current user profile
// // API: PATCH /users/me — updates user profile
// // Replace placeholder values with real data from apiFetch('/users/me')

// export default function SettingsPage() {
//   return (
//     <>
//       <div>
//         <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Settings</h1>
//         <p className="text-sm text-gray-500">Manage your account preferences.</p>
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

//         {/* ── LEFT: Profile Form ── */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* Profile Details Card */}
//           <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
//               Profile Details
//             </h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-600">
//                     First Name
//                   </label>
//                   {/* API: PATCH /users/me — field: firstName */}
//                   <input
//                     type="text"
//                     defaultValue="John"
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-xs font-semibold text-gray-600">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     defaultValue="Smith"
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-gray-600">
//                   Email Address
//                 </label>
//                 {/* API: PATCH /users/me — field: email */}
//                 <input
//                   type="email"
//                   defaultValue="john@consjob.com"
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-gray-600">
//                   Phone Number
//                 </label>
//                 {/* API: PATCH /users/me — field: phone */}
//                 <input
//                   type="tel"
//                   defaultValue="+44 7700 000000"
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                 />
//               </div>

//               <button className="rounded-lg bg-[#ff6600] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65c00]">
//                 Save Changes
//               </button>
//             </div>
//           </div>

//           {/* Change Password Card */}
//           <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
//               Change Password
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-gray-600">
//                   Current Password
//                 </label>
//                 {/* API: POST /auth/change-password — field: currentPassword */}
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-gray-600">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-semibold text-gray-600">
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
//                 />
//               </div>
//               <button className="rounded-lg bg-gray-800 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-black">
//                 Update Password
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Account Meta ── */}
//         <div className="space-y-6">

//           {/* Avatar Card */}
//           <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
//             <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff6600] text-3xl font-black text-white ring-4 ring-orange-100">
//               J
//             </div>
//             <div>
//               <p className="font-bold text-gray-900">John Smith</p>
//               <p className="text-xs text-gray-500">john@consjob.com</p>
//             </div>
//             {/* API: POST /users/me/avatar — multipart/form-data */}
//             <button className="w-full rounded-lg border border-gray-200 py-2 text-xs font-bold text-gray-600 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]">
//               Upload Photo
//             </button>
//           </div>

//           {/* Notifications Card */}
//           <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
//               Notifications
//             </h2>
//             <div className="space-y-3">
//               {[
//                 'Email me on new applications',
//                 'Email me on invite responses',
//                 'SMS alerts for urgent jobs',
//               ].map((label) => (
//                 <label key={label} className="flex items-center justify-between gap-3 text-sm text-gray-700">
//                   {label}
//                   {/* API: PATCH /users/me/notifications */}
//                   <input
//                     type="checkbox"
//                     defaultChecked
//                     className="h-4 w-4 accent-[#ff6600]"
//                   />
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Danger Zone Card */}
//           <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
//             <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-red-600">
//               Danger Zone
//             </h2>
//             <p className="mb-4 text-xs text-red-500">
//               Deleting your account is permanent and cannot be undone.
//             </p>
//             {/* API: DELETE /users/me */}
//             <button className="w-full rounded-lg border-2 border-red-400 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white">
//               Delete Account
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Profile Navigation Cards ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Profile Settings
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Worker Profile Link */}
              <Link
                href="/settings/worker-profile"
                className="group flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5 transition-all hover:border-[#ff6600] hover:bg-orange-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-sm">
                    {/* Hard hat icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#ff6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-[#ff6600]">Worker Profile</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Update your personal details, skills, and availability.
                  </p>
                </div>
                <span className="inline-block w-fit rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-[#ff6600]">
                  Edit Profile →
                </span>
              </Link>

              {/* Company Profile Link */}
              <Link
                href="/settings/company-profile"
                className="group flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5 transition-all hover:border-gray-900 hover:bg-gray-100 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow-sm">
                    {/* Building icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Company Profile</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Manage your company info, logo, and contact details.
                  </p>
                </div>
                <span className="inline-block w-fit rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                  Edit Company →
                </span>
              </Link>

            </div>
          </div>

          {/* ── Change Password Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Current Password
                </label>
                {/* API: POST /auth/change-password — field: currentPassword */}
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    New Password
                  </label>
                  {/* API: POST /auth/change-password — field: newPassword */}
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Confirm New Password
                  </label>
                  {/* API: POST /auth/change-password — field: confirmPassword */}
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>
              <button className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black sm:w-auto">
                Update Password
              </button>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-6">

          {/* ── Avatar Card ── */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff6600] text-3xl font-black text-white ring-4 ring-orange-100">
              J
            </div>
            <div>
              {/* API: GET /users/me — fields: firstName, lastName, email */}
              <p className="font-bold text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500">john@consjob.com</p>
            </div>
            {/* API: POST /users/me/avatar — multipart/form-data */}
            <button className="w-full rounded-lg border border-gray-200 py-2 text-xs font-bold text-gray-600 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]">
              Upload Photo
            </button>

            {/* Quick nav links */}
            <div className="w-full border-t border-gray-100 pt-4 space-y-2">
              <Link
                href="/settings/worker-profile"
                className="flex w-full items-center justify-between rounded-lg bg-orange-50 px-4 py-2.5 text-xs font-bold text-[#ff6600] transition-colors hover:bg-orange-100"
              >
                <span>Worker Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/settings/company-profile"
                className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200"
              >
                <span>Company Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Notifications Card ── */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Notifications
            </h2>
            <div className="space-y-3">
              {[
                { label: "Email me on new applications", key: "emailApplications" },
                { label: "Email me on invite responses", key: "emailInvites" },
                { label: "SMS alerts for urgent jobs",   key: "smsUrgent" },
              ].map(({ label, key }) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 text-sm text-gray-700"
                >
                  <span>{label}</span>
                  {/* API: PATCH /users/me/notifications — field: key */}
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#ff6600]"
                  />
                </label>
              ))}
            </div>
            <button className="mt-5 w-full rounded-lg bg-[#ff6600] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#e65c00]">
              Save Preferences
            </button>
          </div>

          {/* ── Danger Zone Card ── */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-red-600">
              Danger Zone
            </h2>
            <p className="mb-4 text-xs text-red-500">
              Deleting your account is permanent and cannot be undone.
            </p>
            {/* API: DELETE /users/me */}
            <button className="w-full rounded-lg border-2 border-red-400 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white">
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </>
  );
}