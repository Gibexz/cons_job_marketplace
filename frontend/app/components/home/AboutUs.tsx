export default function AboutUs() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Construction workers shaking hands"
            className="w-full rounded-lg shadow-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff6600]">
            About Us
          </p>
          <h2 className="mb-5 text-2xl font-bold sm:text-3xl md:text-4xl">Who We Are</h2>
          <p className="mb-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            We are more than a marketplace. We are a dedicated platform building
            futures in construction by matching skilled workers with
            forward-thinking contractors.
          </p>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            We focus on quality connections for safety, speed, and success on every site.
          </p>
          <a
            href="#"
            className="mt-6 inline-block rounded border-2 border-[#ff6600] px-6 py-2 text-sm font-bold text-[#ff6600] transition-colors hover:bg-[#ff6600] hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}