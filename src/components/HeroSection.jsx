import { useTypewriter, Cursor } from "react-simple-typewriter";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

// Utility to determine if dark mode is active (works for client-side only)
function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return dark;
}

export const HeroSection = () => {
  const [text] = useTypewriter({
    words: [
      "CS Graduate Student",
      "AI/ML Researcher",
      "Deep Learning Enthusiast",
      "Full Stack Developer",
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 35,
    delaySpeed: 1600,
  });

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Detect theme and adjust particle background and text colors
  const darkMode = useDarkMode();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* ------ PARTICLES BACKGROUND ------- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: darkMode ? "#0f172a" : "#f9fafb" } }, // light = zinc-50, dark = blue
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 70, duration: 0.4 } },
          },
          particles: {
            color: { value: "#38bdf8" },
            links: {
              enable: true,
              color: "#38bdf8",
              distance: 150,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: { value: 40 },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />
      {/* ------ HERO CONTENT ------- */}
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1
            className={
              `text-4xl md:text-6xl font-bold tracking-tight` +
              (darkMode ? " text-white" : " text-gray-900")
            }
          >
            Hi, I'm <span className="text-primary">Akshat Chauhan</span>
          </h1>
          <h2
            className={
              `text-2xl md:text-3xl font-semibold` +
              (darkMode ? " text-cyan-200" : " text-cyan-700")
            }
          >
            <span>{text}</span>
            <Cursor cursorColor="#38bdf8" />
          </h2>
          <p
            className={
              "text-lg md:text-xl max-w-2xl mx-auto" +
              (darkMode ? " text-blue-100" : " text-gray-700")
            }
          >
            Student at Johns Hopkins University, passionate about building
            intelligent AI systems that make a difference.
          </p>
          <div className="pt-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className={darkMode ? "text-blue-200" : "text-sky-700"}>
          Scroll
        </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
