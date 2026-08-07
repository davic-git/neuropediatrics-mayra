import About from '../sections/About';
import Conditions from '../sections/Conditions';
import Contact from '../sections/Contact';
import Families from '../sections/Families';
import FAQ from '../sections/FAQ';
import Hero from '../sections/Hero';
import Services from '../sections/Services';

export default function HomePage() {
  return (
    <main id="topo">
      <Hero />
      <About />
      <Services />
      <Conditions />
      <Families />
      <FAQ />
      <Contact />
    </main>
  );
}
