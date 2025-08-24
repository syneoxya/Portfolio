import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { GraduationCap, School, UserCheck, FlaskConical } from "lucide-react";

const educationData = [
  {
    school: "Johns Hopkins University",
    degree: "MSE in Computer Science",
    specialization:
      "Specialization: Artificial Intelligence & Machine Learning",
    period: "Aug 2024 - Present",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    subCards: [
      {
        role: "Lead TA: AI for Business Course",
        period: "May 2025 - July 2025",
        description: "",
        icon: <UserCheck className="h-5 w-5 text-blue-500" />,
      },
    ],
  },
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech in Computer Science",
    specialization: "Specialization: AI and ML",
    period: "Sept 2020 - Aug 2024",
    icon: <School className="h-6 w-6 text-primary" />,
    subCards: [
      {
        role: "Research Assistant",
        period: "June 2022 - Ongoing",
        description: "AI/ML project collaboration with professor.",
        icon: <FlaskConical className="h-5 w-5 text-purple-500" />,
      },
    ],
  },
];

// Animation variants tuned for smoothness
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const subCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 * i, duration: 0.38, ease: "easeOut" }, // stagger for each sub-card
  }),
};

export const EducationTimeline = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id="education" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Education
        </h2>

        <div className="relative w-full flex flex-col items-center">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-primary/30 -translate-x-1/2 z-0" />

          {educationData.map((item, idx) => (
            <motion.div
              ref={ref}
              key={idx}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              className="relative mb-14 flex flex-col items-center w-full z-10"
            >
              {/* Centered icon */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg border-4 border-primary w-16 h-16 rounded-full flex items-center justify-center z-10">
                {item.icon}
              </div>
              <div className="mt-10 w-full max-w-lg mx-auto bg-background rounded-xl p-5 shadow-md border border-primary/10 text-center">
                <h3 className="text-xl font-semibold text-primary">
                  {item.degree}
                </h3>
                <p className="text-lg text-foreground font-medium">
                  {item.school}
                </p>
                <p className="text-sm mt-1 text-muted-foreground">
                  {item.specialization}
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  {item.period}
                </p>
              </div>

              {/* Sub-cards, also centered. Animate with stagger and `custom` prop */}
              {item.subCards && (
                <div className="w-full flex flex-col items-center mt-4 space-y-3">
                  {item.subCards.map((sub, subIdx) => (
                    <motion.div
                      key={subIdx}
                      variants={subCardVariants}
                      initial="hidden"
                      animate={controls}
                      custom={subIdx + 1} // for stagger
                      className="flex items-center gap-3 bg-background/70 border border-primary/20 rounded-lg px-4 py-2 shadow-sm max-w-md mx-auto"
                    >
                      <span>{sub.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-base text-foreground">
                          {sub.role}
                        </div>
                        {sub.description && (
                          <div className="text-xs text-muted-foreground">
                            {sub.description}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {sub.period}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
