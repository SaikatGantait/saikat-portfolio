import { useState } from "react";
import Scene3D from "@/components/Scene3D";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Feedback from "@/components/Feedback";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen text-white overflow-x-hidden relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Scene3D />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Testimonials />
          <Feedback />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
