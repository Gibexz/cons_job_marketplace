import Navbar     from '@/app/components/home/Navbar';
import Hero       from '@/app/components/home/Hero';
import StatsBar   from '@/app/components/home/StatsBar';
import AboutUs    from '@/app/components/home/AboutUs';
import Gallery    from '@/app/components/home/Gallery';
import FooterCTA  from '@/app/components/home/FooterCTA';
import Footer     from '@/app/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutUs />
      <Gallery />
      <FooterCTA />
      <Footer />
    </div>
  );
}