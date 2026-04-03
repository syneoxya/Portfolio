import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { revealSoft, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

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
  const sectionRef = useRef(null);
  const [text] = useTypewriter({
    words: [
      "AI/ML Researcher",
      "Machine Learning Engineer",
      "Johns Hopkins MSE Student",
      "Builder of Intelligent Systems",
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 35,
    delaySpeed: 1600,
  });

  const darkMode = useDarkMode();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -110]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.94]
  );
  const haloY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 140]
  );
  const haloOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.3]
  );

  return (
    <Motion.section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-14 sm:pt-28 sm:pb-16"
    >
      <Motion.div
        style={{ y: haloY, opacity: haloOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)]"
      />
      <Motion.div
        style={{ y: haloY }}
        className="pointer-events-none absolute -left-24 top-20 z-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <Motion.div
        style={{ y: contentY }}
        className="pointer-events-none absolute right-[-6rem] top-1/3 z-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-x-[10%] top-24 z-0 h-px rotate-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <Motion.div
        style={{ y: contentY, scale: contentScale }}
        className="container relative z-10 max-w-6xl"
      >
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mx-auto max-w-3xl text-center"
        >
          <Motion.p
            variants={revealSoft}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary"
          >
            Researcher-engineer focused on intelligent systems
          </Motion.p>
          <Motion.h1
            variants={revealSoft}
            className={
              "mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl " +
              (darkMode ? "text-white" : "text-gray-950")
            }
          >
            Akshat Chauhan
          </Motion.h1>
          <Motion.h2
            variants={revealSoft}
            className={
              "mt-4 text-xl font-semibold sm:text-2xl md:text-3xl " +
              (darkMode ? "text-cyan-200" : "text-cyan-700")
            }
          >
            <span>{text}</span>
            <Cursor cursorColor="#38bdf8" />
          </Motion.h2>
          <Motion.p
            variants={revealSoft}
            className={
              "mx-auto mt-6 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 md:text-xl " +
              (darkMode ? "text-blue-100" : "text-slate-700")
            }
          >
            I build research-driven ML systems across finance, medical
            imaging, and generative modeling, with a bias toward ideas that
            can survive contact with real data, real constraints, and real
            users.
          </Motion.p>

          <Motion.div
            variants={revealSoft}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <a href="#projects" className="cosmic-button inline-flex items-center justify-center gap-2">
              View My Work
              <ArrowRight size={16} />
            </a>
            <a
              href="https://drive.google.com/file/d/1N9ymFQYv7I4aS_p8393ZAJz8hLGaikyb/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-2 text-primary transition-colors duration-300 hover:bg-primary/10"
            >
              <FileText size={16} />
              Resume
            </a>
          </Motion.div>

          <Motion.div
            variants={revealSoft}
            className="mt-8 flex flex-wrap justify-center gap-5 text-sm"
          >
            <a
              href="https://github.com/syneoxya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshat--chauhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </Motion.div>
        </Motion.div>
      </Motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center animate-bounce sm:flex">
        <span className={darkMode ? "text-blue-200" : "text-sky-700"}>
          Scroll
        </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </Motion.section>
  );
};
