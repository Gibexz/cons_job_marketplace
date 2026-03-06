export default function FooterCTA() {
  return (
    <section className="bg-[#ff6600] px-4 py-14 text-center text-white sm:px-6 sm:py-20 md:py-24">
      <h2 className="mx-auto mb-4 max-w-2xl text-2xl font-black uppercase leading-tight sm:text-3xl md:text-4xl">
        Start building your career or find top talent today!
      </h2>
      <p className="mb-8 text-sm text-orange-100 sm:text-base">
        Join thousands of tradespeople and contractors already on BuildMatch.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button className="w-full rounded bg-white px-8 py-3 font-bold text-[#ff6600] transition-colors hover:bg-gray-100 sm:w-auto">
          Browse Jobs
        </button>
        <button className="w-full rounded border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-white hover:text-[#ff6600] sm:w-auto">
          Post an Opening
        </button>
      </div>
    </section>
  );
}