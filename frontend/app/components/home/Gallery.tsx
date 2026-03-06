const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Welding',
    label: 'Welding on Skyscraper',
    hasPlay: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1541888086225-f674ce88ec1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Excavation',
    label: 'Excavation in Bury',
    hasPlay: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1590496794008-383c8070b257?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'High Rise',
    label: 'Completed Residential',
    hasPlay: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    alt: 'Heavy Machinery',
    label: 'Operating Heavy Machinery',
    hasPlay: true,
  },
];

export default function Gallery() {
  return (
    <section className="bg-gray-50 px-4 py-16 text-center sm:px-6 sm:py-20 md:px-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff6600]">
        Our Work
      </p>
      <h2 className="mb-10 text-2xl font-bold sm:text-3xl md:text-4xl">What We Do</h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <div
            key={item.label}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-black shadow-lg"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            />
            {item.hasPlay && (
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-[#ff6600] shadow-md transition-transform hover:scale-110">
                <i className="fa-solid fa-play" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-[#ff6600] px-3 py-1.5 text-xs font-bold text-white sm:px-4 sm:py-2 sm:text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}