import { useRef } from "react";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experienceData } from "@/data/experience";
import { revealSoft, revealUp, staggerContainer, viewportSettings } from "@/lib/scrollMotion";

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const railY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [80, -60]
  );

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Motion.div variants={revealUp} className="max-w-2xl text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
              Experience
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Labs, Teams, and <span className="text-primary">Systems</span>
            </h2>
          </Motion.div>
          <p className="max-w-2xl text-left text-muted-foreground md:text-right"></p>
        </Motion.div>

        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="relative mt-14 space-y-8"
        >
          <Motion.div
            style={{ y: railY }}
            className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent md:block"
          />

          {experienceData.map((experience) => (
            <Motion.article
              key={experience.id}
              variants={revealSoft}
              className="relative md:pl-16"
            >
              <div className="hidden md:flex absolute left-0 top-8 h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-sm">
                <Briefcase className="h-4 w-4" />
              </div>

              <Motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                className="rounded-[2rem] border border-border bg-card/90 p-6 text-left shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">
                      {experience.role}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold">
                      {experience.organization}
                    </h3>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm font-medium text-primary">
                      {experience.period}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {experience.summary}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {experience.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-[1.5rem] border border-border bg-background/70 p-4"
                    >
                      <p className="text-sm leading-6 text-muted-foreground">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Motion.div>
            </Motion.article>
          ))}
        </Motion.div>
      </div>
    </section>
  );
};
