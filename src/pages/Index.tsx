import { useState, useEffect } from "react";
import LazyScene3D from "@/components/LazyScene3D";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubActivity from "@/components/GitHubActivity";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import CommandPalette from "@/components/CommandPalette";
import ErrorBoundary from "@/components/ErrorBoundary";
import CursorSpotlight from "@/components/CursorSpotlight";
import NoiseOverlay from "@/components/NoiseOverlay";
import GradientOrbs from "@/components/GradientOrbs";
import ParticleField from "@/components/ParticleField";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    const root = document.documentElement;

    const tone =
      hour >= 5 && hour < 11
        ? "morning"
        : hour >= 11 && hour < 17
        ? "day"
        : hour >= 17 && hour < 21
        ? "evening"
        : "night";

    const palette: Record<string, { primary: string; secondary: string; accent: string }> = {
      morning: { primary: "215 22% 72%", secondary: "215 14% 62%", accent: "215 10% 54%" },
      day: { primary: "215 20% 72%", secondary: "215 14% 62%", accent: "215 10% 54%" },
      evening: { primary: "215 18% 68%", secondary: "215 12% 58%", accent: "215 10% 50%" },
      night: { primary: "215 16% 64%", secondary: "215 12% 56%", accent: "215 10% 48%" },
    };

    const selected = palette[tone];
    root.style.setProperty("--primary", selected.primary);
    root.style.setProperty("--secondary", selected.secondary);
    root.style.setProperty("--accent", selected.accent);
    root.setAttribute("data-tone", tone);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <CommandPalette />
      <CursorSpotlight />
      <NoiseOverlay />
      <div className={`min-h-screen text-foreground overflow-x-hidden relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <GradientOrbs />
        <ParticleField />
        <LazyScene3D />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Stats />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <GitHubActivity />
            </ErrorBoundary>
            <ErrorBoundary>
              <Blog />
            </ErrorBoundary>
            <ErrorBoundary>
              <Testimonials />
            </ErrorBoundary>
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
