import { About } from "./components/About";
import { Catalog } from "./components/Catalog";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Location } from "./components/Location";
import { QuoteForm } from "./components/QuoteForm";

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian font-sans text-slate-100 antialiased">
      <Header />
      <main>
        <Hero />
        <Catalog />
        <About />
        <Location />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
