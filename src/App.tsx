import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Conditions from './sections/Conditions';
import Families from './sections/Families';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />

      <main id="topo">
        <Hero />
        <About />
        <Services />
        <Conditions />
        <Families />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
