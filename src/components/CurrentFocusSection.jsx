import { useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

const focusAreas = [
  {
    title: "Inverse RL for Trading",
    description:
      "Modeling high-frequency trading behavior from large-scale limit order book trajectories and recovering latent reward signals.",
    accent: "from-cyan-400/35 via-sky-400/12 to-transparent",
    glow: "shadow-[0_0_45px_rgba(34,211,238,0.18)]",
    line: "from-cyan-300 via-sky-400 to-cyan-200",
  },
  {
    title: "Medical Diffusion Policies",
    description:
      "Exploring diffusion-based policy learning for endoscopic camera pose estimation in low-texture surgical environments.",
    accent: "from-sky-400/28 via-cyan-400/10 to-transparent",
    glow: "shadow-[0_0_45px_rgba(56,189,248,0.15)]",
    line: "from-sky-200 via-cyan-300 to-sky-400",
  },
  {
    title: "Generative Biology",
    description:
      "Designing biologically grounded promoter generation pipelines with validation models for synthetic regulatory sequences.",
    accent: "from-cyan-500/28 via-blue-400/10 to-transparent",
    glow: "shadow-[0_0_45px_rgba(14,165,233,0.16)]",
    line: "from-cyan-200 via-blue-300 to-sky-400",
  },
];

export const CurrentFocusSection = () => {
  const sectionRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [90, -90]
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
    <section id="focus" ref={sectionRef} className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent dark:block" />
      <div className="pointer-events-none absolute inset-0 hidden opacity-40 [background-image:linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] [background-size:72px_72px] dark:block" />
      <Motion.div style={{ y: sectionY }} className="container mx-auto max-w-6xl">
        <Motion.div
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
              Current Focus
            </p>
            <h2
              className="mt-4 text-3xl font-bold uppercase tracking-[0.08em] md:text-4xl"
              style={{ color: isDarkMode ? "#f8fafc" : "#0f172a" }}
            >
              What I&apos;m{" "}
              <span
                style={{
                  color: isDarkMode ? "#67e8f9" : "#06b6d4",
                  textShadow: isDarkMode ? "0 0 18px rgba(103,232,249,0.45)" : "none",
                }}
              >
                Working On Now
              </span>
            </h2>
            <p
              className="mt-4 max-w-xl text-sm leading-7 sm:text-base"
              style={{ color: isDarkMode ? "rgba(203,213,225,0.8)" : "rgba(51,65,85,0.92)" }}
            >
              Current research threads rendered like active system channels: signal extraction, control under uncertainty, and generative design grounded in real-world constraints.
            </p>
          </Motion.div>
        </Motion.div>

        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {focusAreas.map((area) => (
            <Motion.article
              key={area.title}
              variants={revealSoft}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -10,
                      scale: 1.01,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className={`group relative overflow-hidden rounded-[1.75rem] p-7 text-left backdrop-blur-xl ${area.glow}`}
              style={{
                border: isDarkMode ? "1px solid rgba(34,211,238,0.2)" : "1px solid rgba(6,182,212,0.14)",
                background: isDarkMode ? "rgba(2,6,23,0.7)" : "rgba(255,255,255,0.94)",
                boxShadow: isDarkMode ? undefined : "0 14px 34px rgba(15,23,42,0.06)",
              }}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.accent}`}
                style={{ opacity: isDarkMode ? 1 : 0.22 }}
              />
              <div className="pointer-events-none absolute inset-[1px] rounded-[1.65rem] border border-cyan-500/8 dark:border-white/6" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent opacity-70 dark:via-cyan-200/80" />
              <div className="pointer-events-none absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/18 to-transparent opacity-70 dark:via-cyan-300/35" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl backdrop-blur-sm"
                    style={{
                      border: isDarkMode ? "1px solid rgba(103,232,249,0.3)" : "1px solid rgba(6,182,212,0.2)",
                      background: isDarkMode ? "rgba(15,23,42,0.8)" : "rgba(236,254,255,0.84)",
                    }}
                  >
                    <div
                      className="absolute inset-2 rounded-xl"
                      style={{
                        border: isDarkMode ? "1px solid rgba(165,243,252,0.15)" : "1px solid rgba(6,182,212,0.1)",
                      }}
                    />
                    <div className={`h-px w-7 bg-gradient-to-r ${area.line} shadow-[0_0_14px_rgba(6,182,212,0.35)] dark:shadow-[0_0_18px_rgba(103,232,249,0.75)]`} />
                  </div>
                  <span
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
                    style={{ color: isDarkMode ? "rgba(165,243,252,0.7)" : "rgba(14,116,144,0.8)" }}
                  >
                    Live Channel
                  </span>
                </div>
                <h3
                  className="text-xl font-semibold uppercase tracking-[0.08em]"
                  style={{ color: isDarkMode ? "#f8fafc" : "#0f172a" }}
                >
                  {area.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-7"
                  style={{ color: isDarkMode ? "rgba(203,213,225,0.78)" : "rgba(51,65,85,0.92)" }}
                >
                  {area.description}
                </p>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </Motion.div>
    </section>
  );
};
