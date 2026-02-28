export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Header / Navigation */}
      <header className="flex items-center justify-between bg-[#1a1a1a] p-5 px-6 md:px-12 text-white">
        <div className="text-2xl font-black text-[#ff6600]">BuildMatch</div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-bold">
            <li><a href="#" className="transition-colors hover:text-[#ff6600]">Find Jobs</a></li>
            <li><a href="#" className="transition-colors hover:text-[#ff6600]">Post a Job</a></li>
            <li><a href="#" className="transition-colors hover:text-[#ff6600]">About Us</a></li>
            <li><a href="#" className="transition-colors hover:text-[#ff6600]">Contact</a></li>
            <li>
              <a href="#" className="rounded border-2 border-[#ff6600] px-4 py-2 text-[#ff6600] transition-colors hover:bg-[#ff6600] hover:text-white">
                Log In / Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative flex h-[70vh] min-h-[500px] items-center bg-cover bg-center px-6 md:px-12"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 w-full max-w-4xl">
          <h1 className="mb-8 text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            Connecting the best tradespeople to the top projects.
          </h1>
          
          <div className="flex flex-col gap-4 rounded-lg bg-white/10 p-5 backdrop-blur-md md:flex-row md:items-end">
            <div className="flex w-full flex-col">
              <label className="mb-1 text-sm font-bold text-white">Job Search</label>
              <input 
                type="text" 
                placeholder="Trade (e.g., Electrician, Carpenter)" 
                className="rounded border-none p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#ff6600]"
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="mb-1 text-sm font-bold text-white">Location</label>
              <input 
                type="text" 
                placeholder="Location (City or Postcode)" 
                className="rounded border-none p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#ff6600]"
              />
            </div>
            <button className="h-[48px] w-full whitespace-nowrap rounded bg-[#ff6600] px-6 py-2 font-bold text-white transition-colors hover:bg-[#e65c00] md:w-auto">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Construction Handshake Concept" 
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="mb-5 text-3xl font-bold md:text-4xl">Who We Are</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              We are more than a marketplace. We are a dedicated platform building futures in construction by matching skilled workers with forward-thinking contractors. We focus on quality connections for safety, speed, and success on every site.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 px-6 py-20 text-center md:px-12">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">What We Do</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Gallery Item 1 */}
          <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-lg">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Welding" className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-[#ff6600] shadow-md transition-transform hover:scale-110">
              <i className="fa-solid fa-play"></i>
            </div>
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-[#ff6600] px-4 py-2 text-sm font-bold text-white">Welding on Skyscraper</div>
          </div>

          {/* Gallery Item 2 */}
          <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-lg">
            <img src="https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Excavation" className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-[#ff6600] px-4 py-2 text-sm font-bold text-white">Excavation in Bury</div>
          </div>

          {/* Gallery Item 3 */}
          <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-lg">
            <img src="https://images.unsplash.com/photo-1590496794008-383c8070b257?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="High Rise" className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-[#ff6600] px-4 py-2 text-sm font-bold text-white">Completed Residential</div>
          </div>

          {/* Gallery Item 4 */}
          <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-lg">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Heavy Machinery" className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-[#ff6600] shadow-md transition-transform hover:scale-110">
              <i className="fa-solid fa-play"></i>
            </div>
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-[#ff6600] px-4 py-2 text-sm font-bold text-white">Operating Heavy Machinery</div>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#ff6600] px-6 py-16 text-center text-white md:py-24">
        <h2 className="mb-8 text-3xl font-black uppercase md:text-4xl">Start building your career or find top talent today!</h2>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded bg-white px-8 py-3 font-bold text-[#ff6600] transition-colors hover:bg-gray-100">
            Browse Jobs
          </button>
          <button className="rounded border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-white hover:text-[#ff6600]">
            Post an Opening
          </button>
        </div>
      </section>
      
    </div>
  );
}