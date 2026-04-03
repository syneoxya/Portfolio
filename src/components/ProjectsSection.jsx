import { useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

const projectAccents = [
  "from-cyan-400/28 via-sky-500/12 to-transparent",
  "from-sky-400/24 via-cyan-500/12 to-transparent",
  "from-blue-400/24 via-cyan-500/12 to-transparent",
  "from-cyan-300/26 via-blue-500/12 to-transparent",
];

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [50, -50]
  );

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 hidden opacity-35 [background-image:linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] [background-size:88px_88px] dark:block" />
      <div className="container mx-auto max-w-6xl">
        <Motion.div
          style={{ y: headingY }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Motion.div variants={revealUp} className="max-w-2xl text-left">
            <p
              className="text-sm font-semibold uppercase tracking-[0.35em]"
              style={{ color: isDarkMode ? "rgba(103,232,249,0.8)" : "rgba(8,145,178,0.9)" }}
            >
              Project Showcase
            </p>
            <h2
              className="mt-4 text-3xl font-bold uppercase tracking-[0.08em] md:text-4xl"
              style={{ color: isDarkMode ? "#f8fafc" : "#0f172a" }}
            >
              Selected{" "}
              <span
                style={{
                  color: isDarkMode ? "#67e8f9" : "#06b6d4",
                  textShadow: isDarkMode ? "0 0 18px rgba(103,232,249,0.45)" : "none",
                }}
              >
                Builds
              </span>
            </h2>
          </Motion.div>
          <Motion.p
            variants={revealUp}
            className="max-w-2xl text-left text-sm leading-7 md:text-right md:text-base"
            style={{ color: isDarkMode ? "rgba(203,213,225,0.78)" : "rgba(51,65,85,0.9)" }}
          >
            A few representative systems that show how I approach multi-agent
            workflows, generative modeling, retrieval, and applied computer
            vision.
          </Motion.p>
        </Motion.div>

        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-2"
        >
          {projects.map((project, index) => (
            <Motion.article
              key={project.id}
              variants={revealSoft}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -12,
                      scale: 1.01,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className="group relative overflow-hidden rounded-[2rem] text-left backdrop-blur-xl"
              style={{
                border: isDarkMode ? "1px solid rgba(34,211,238,0.2)" : "1px solid rgba(6,182,212,0.14)",
                background: isDarkMode ? "rgba(2,6,23,0.7)" : "rgba(255,255,255,0.95)",
                boxShadow: isDarkMode ? "0 0 65px rgba(8,145,178,0.08)" : "0 18px 40px rgba(15,23,42,0.06)",
              }}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${projectAccents[index % projectAccents.length]}`}
                style={{ opacity: isDarkMode ? 1 : 0 }}
              />
              <div className="pointer-events-none absolute inset-[1px] rounded-[1.9rem] border border-cyan-500/8 dark:border-white/6" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent opacity-75 dark:via-cyan-200/80" />
              <div className="relative p-7">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]"
                    style={{
                      border: isDarkMode ? "1px solid rgba(103,232,249,0.25)" : "1px solid rgba(6,182,212,0.18)",
                      background: isDarkMode ? "rgba(34,211,238,0.08)" : "rgba(6,182,212,0.08)",
                      color: isDarkMode ? "#a5f3fc" : "#0e7490",
                    }}
                  >
                    Featured Project
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all"
                    style={{
                      border: isDarkMode ? "1px solid rgba(103,232,249,0.2)" : "1px solid rgba(6,182,212,0.18)",
                      background: isDarkMode ? "rgba(15,23,42,0.85)" : "rgba(240,249,255,0.95)",
                      color: isDarkMode ? "rgba(226,232,240,0.85)" : "rgba(15,23,42,0.82)",
                    }}
                    title="Project Link"
                  >
                    <Github size={18} />
                  </a>
                </div>

                <div
                  className="mt-8 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] p-4 sm:aspect-[3/2] sm:p-6"
                  style={{
                    border: isDarkMode ? "1px solid rgba(103,232,249,0.18)" : "1px solid rgba(6,182,212,0.12)",
                    background: isDarkMode
                      ? "linear-gradient(180deg,rgba(2,6,23,0.92),rgba(15,23,42,0.86))"
                      : "linear-gradient(180deg,rgba(255,255,255,0.99),rgba(248,250,252,0.96))",
                    boxShadow: isDarkMode
                      ? "inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 28px rgba(6,182,212,0.08)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.65), 0 12px 24px rgba(148,163,184,0.08)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-x-16 top-[7.2rem] h-px bg-gradient-to-r from-transparent via-cyan-500/18 to-transparent dark:via-cyan-200/35" />
                  <Motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <h3
                  className="mt-7 text-xl font-semibold uppercase tracking-[0.08em] sm:text-2xl"
                  style={{ color: isDarkMode ? "#f8fafc" : "#0f172a" }}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7"
                  style={{ color: isDarkMode ? "rgba(203,213,225,0.78)" : "rgba(51,65,85,0.92)" }}
                >
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]"
                      style={{
                        border: isDarkMode ? "1px solid rgba(103,232,249,0.15)" : "1px solid rgba(6,182,212,0.14)",
                        background: isDarkMode ? "rgba(15,23,42,0.8)" : "rgba(248,250,252,0.95)",
                        color: isDarkMode ? "rgba(226,232,240,0.8)" : "rgba(51,65,85,0.9)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>

        <Motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-12 text-center"
        >
          <a
            className="cosmic-button inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/syneoxya"
          >
            Explore More on GitHub <ArrowRight size={16} />
          </a>
        </Motion.div>
      </div>
    </section>
  );
};
