// API: GET /users/me — returns current user profile
// API: PATCH /users/me — updates user profile
// Replace placeholder values with real data from apiFetch('/users/me')

export default function SettingsPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-black text-gray-900 sm:text-2xl">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT: Profile Form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Details Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Profile Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    First Name
                  </label>
                  {/* API: PATCH /users/me — field: firstName */}
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Smith"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Email Address
                </label>
                {/* API: PATCH /users/me — field: email */}
                <input
                  type="email"
                  defaultValue="john@consjob.com"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Phone Number
                </label>
                {/* API: PATCH /users/me — field: phone */}
                <input
                  type="tel"
                  defaultValue="+44 7700 000000"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>

              <button className="rounded-lg bg-[#ff6600] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65c00]">
                Save Changes
              </button>
            </div>
          </div>

          {/* Change Password Card */}
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
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  New Password
                </label>
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
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                />
              </div>
              <button className="rounded-lg bg-gray-800 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-black">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Account Meta ── */}
        <div className="space-y-6">

          {/* Avatar Card */}
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff6600] text-3xl font-black text-white ring-4 ring-orange-100">
              J
            </div>
            <div>
              <p className="font-bold text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500">john@consjob.com</p>
            </div>
            {/* API: POST /users/me/avatar — multipart/form-data */}
            <button className="w-full rounded-lg border border-gray-200 py-2 text-xs font-bold text-gray-600 transition-colors hover:border-[#ff6600] hover:text-[#ff6600]">
              Upload Photo
            </button>
          </div>

          {/* Notifications Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
              Notifications
            </h2>
            <div className="space-y-3">
              {[
                'Email me on new applications',
                'Email me on invite responses',
                'SMS alerts for urgent jobs',
              ].map((label) => (
                <label key={label} className="flex items-center justify-between gap-3 text-sm text-gray-700">
                  {label}
                  {/* API: PATCH /users/me/notifications */}
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#ff6600]"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Danger Zone Card */}
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