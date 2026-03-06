export default function Hero() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center bg-cover bg-center px-4 sm:px-6 md:px-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 mx-auto w-full max-w-5xl py-16">
        <h1 className="mb-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Connecting the best tradespeople to the top projects.
        </h1>
        <p className="mb-8 text-base text-gray-300 sm:text-lg md:max-w-xl">
          Find skilled tradespeople or discover your next construction opportunity — all in one place.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-md sm:p-5 md:flex-row md:items-end">
          <div className="flex w-full flex-col">
            <label className="mb-1 text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
              Job Search
            </label>
            <input
              type="text"
              placeholder="Trade (e.g., Electrician, Carpenter)"
              className="rounded border-none p-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#ff6600] sm:text-base"
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="mb-1 text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
              Location
            </label>
            <input
              type="text"
              placeholder="City or Postcode"
              className="rounded border-none p-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#ff6600] sm:text-base"
            />
          </div>
          <button className="w-full rounded bg-[#ff6600] px-6 py-3 font-bold text-white transition-colors hover:bg-[#e65c00] md:w-auto md:whitespace-nowrap">
            Search Jobs
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1"><span className="text-[#ff6600]">✔</span> 10,000+ Active Jobs</span>
          <span className="flex items-center gap-1"><span className="text-[#ff6600]">✔</span> Verified Contractors</span>
          <span className="flex items-center gap-1"><span className="text-[#ff6600]">✔</span> Free to Register</span>
        </div>
      </div>
    </section>
  );
}