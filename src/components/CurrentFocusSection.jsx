import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

const focusAreas = [
  {
    title: "Inverse RL for Trading",
    description:
      "Modeling high-frequency trading behavior from large-scale limit order book trajectories and recovering latent reward signals.",
    accent: "from-cyan-500/30 to-sky-500/10",
  },
  {
    title: "Medical Diffusion Policies",
    description:
      "Exploring diffusion-based policy learning for endoscopic camera pose estimation in low-texture surgical environments.",
    accent: "from-fuchsia-500/30 to-violet-500/10",
  },
  {
    title: "Generative Biology",
    description:
      "Designing biologically grounded promoter generation pipelines with validation models for synthetic regulatory sequences.",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

export const CurrentFocusSection = () => {
  const sectionRef = useRef(null);
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

  return (
    <section id="focus" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <Motion.div style={{ y: sectionY }} className="container mx-auto max-w-6xl">
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Motion.div variants={revealUp} className="max-w-2xl text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
              Current Focus
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What I&apos;m <span className="text-primary">Working On Now</span>
            </h2>
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
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card/85 p-7 text-left shadow-sm"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.accent}`}
              />
              <div className="relative">
                <div className="mb-5 h-14 w-14 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-sm" />
                <h3 className="text-xl font-semibold">{area.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
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
