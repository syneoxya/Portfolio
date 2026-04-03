import { useEffect } from "react";
import { motion as Motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FlaskConical,
  GraduationCap,
  School,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { educationData } from "@/data/education";
import { TimelineItem } from "@/components/TimelineItem";

const iconMap = {
  "graduation-cap": GraduationCap,
  school: School,
  "user-check": UserCheck,
  flask: FlaskConical,
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const EducationTimeline = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const timelineItems = educationData.map((item, index) => {
    const ItemIcon = iconMap[item.icon] ?? Sparkles;

    return {
      ...item,
      align: index % 2 === 0 ? "left" : "right",
      icon: <ItemIcon className="h-6 w-6" />,
      experiences: item.experiences.map((experience) => {
        const ExperienceIcon = iconMap[experience.icon] ?? Sparkles;

        return {
          ...experience,
          icon: <ExperienceIcon className="h-5 w-5" />,
        };
      }),
    };
  });

  return (
    <section id="education" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
            Academic Journey
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Education <span className="text-primary">Timeline</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A quick view of the academic experiences, teaching work, and
            research roles that shaped my AI/ML foundation.
          </p>
        </div>

        <Motion.div
          ref={ref}
          variants={listVariants}
          initial="hidden"
          animate={controls}
          className="relative mt-16 space-y-10"
        >
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary/20 via-primary/45 to-primary/20 md:left-1/2 md:-translate-x-1/2" />

          {timelineItems.map((item) => (
            <TimelineItem
              key={item.id}
              align={item.align}
              icon={item.icon}
              title={item.degree}
              institution={item.institution}
              specialization={item.specialization}
              period={item.period}
              summary={item.summary}
              highlights={item.highlights}
              experiences={item.experiences}
            />
          ))}
        </Motion.div>
      </div>
    </section>
  );
};
