import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

const projectAccents = [
  "from-cyan-500/25 via-sky-500/10 to-transparent",
  "from-emerald-500/25 via-teal-500/10 to-transparent",
  "from-fuchsia-500/25 via-violet-500/10 to-transparent",
  "from-amber-500/25 via-orange-500/10 to-transparent",
];

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
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

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
              Project Showcase
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Selected <span className="text-primary">Builds</span>
            </h2>
          </Motion.div>
          <Motion.p
            variants={revealUp}
            className="max-w-2xl text-left text-muted-foreground md:text-right"
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
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-card text-left shadow-sm"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${projectAccents[index % projectAccents.length]}`}
              />
              <div className="relative p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Featured Project
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 transition-colors hover:text-primary"
                    title="Project Link"
                  >
                    <Github size={18} />
                  </a>
                </div>

                <div className="mt-8 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] border border-border bg-background/75 p-4 sm:aspect-[3/2] sm:p-6">
                  <Motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="mt-7 text-xl font-semibold sm:text-2xl">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/15 bg-background/70 px-3 py-1 text-xs font-medium text-foreground/80"
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
