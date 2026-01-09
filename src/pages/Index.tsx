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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <CommandPalette />
      <div className={`min-h-screen text-foreground overflow-x-hidden relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
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
