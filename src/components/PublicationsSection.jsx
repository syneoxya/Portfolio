import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, FileBadge2 } from "lucide-react";
import { publicationsData } from "@/data/publications";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

export const PublicationsSection = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [70, -70]
  );

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mx-auto max-w-3xl text-center"
        >
          <Motion.p
            variants={revealUp}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75"
          >
            Publications
          </Motion.p>
          <Motion.h2 variants={revealUp} className="mt-4 text-3xl font-bold md:text-5xl">
            Selected <span className="text-primary">Research</span> and
            Publications
          </Motion.h2>
          <Motion.p
            variants={revealUp}
            className="mt-5 text-base leading-7 text-muted-foreground md:text-lg"
          >
            A focused snapshot of work across medical AI, forecasting, and
            computer vision.
          </Motion.p>
        </Motion.div>

        <Motion.div
          style={{ y: panelY }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-12 overflow-hidden rounded-[2rem] border border-border/80 bg-card/80 shadow-[0_20px_80px_-45px_rgba(99,102,241,0.35)] backdrop-blur-sm sm:mt-14"
        >
          {publicationsData.map((publication, index) => (
            <Motion.article
              key={publication.id}
              variants={revealSoft}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className={
                "group relative px-6 py-7 md:px-8 md:py-8 " +
                (index < publicationsData.length - 1
                  ? "border-b border-border/70"
                  : "")
              }
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              <div className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
                <div className="flex flex-col items-center text-center lg:pt-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/8 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {publication.status}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {publication.period}
                  </p>
                  <p className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-sm font-medium text-primary">
                    <FileBadge2 className="h-4 w-4" />
                    {publication.role}
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <h3 className="max-w-3xl text-xl font-semibold leading-tight sm:text-2xl md:text-[2rem]">
                    {publication.url ? (
                      <a
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors duration-300 hover:text-primary group-hover:text-primary/90"
                      >
                        {publication.title}
                      </a>
                    ) : (
                      <span className="text-foreground transition-colors duration-300 group-hover:text-primary/90">
                        {publication.title}
                      </span>
                    )}
                  </h3>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                    {publication.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {publication.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/75 transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
          className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowRight className="h-4 w-4 text-primary" />
          Additional paper links and preprints can be added here as they become
          available.
        </Motion.div>
      </div>
    </section>
  );
};
