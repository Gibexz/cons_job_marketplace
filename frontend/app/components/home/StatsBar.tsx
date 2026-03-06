const stats = [
  { value: '10K+', label: 'Jobs Posted' },
  { value: '5K+',  label: 'Skilled Workers' },
  { value: '800+', label: 'Contractors' },
  { value: '98%',  label: 'Satisfaction Rate' },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1a1a1a] px-4 py-8 sm:px-6 md:px-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-black text-[#ff6600] sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-gray-400 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}