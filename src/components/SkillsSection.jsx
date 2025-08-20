import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  // Programming Languages
  { name: "Python", level: 95, category: "programming" },
  { name: "R", level: 80, category: "programming" },
  { name: "C", level: 80, category: "programming" },
  { name: "C++", level: 85, category: "programming" },
  { name: "Java", level: 80, category: "programming" },
  { name: "HTML", level: 90, category: "programming" },
  { name: "JavaScript", level: 90, category: "programming" },
  { name: "PHP", level: 70, category: "programming" },

  // Frameworks & Libraries
  { name: "TensorFlow", level: 85, category: "frameworks" },
  { name: "PyTorch", level: 80, category: "frameworks" },
  { name: "React", level: 85, category: "frameworks" },
  { name: "Unity", level: 70, category: "frameworks" },
  { name: "MATLAB", level: 75, category: "frameworks" },
  { name: "Solidity", level: 80, category: "frameworks" },
  { name: "Tailwind CSS", level: 85, category: "frameworks" },

  // AI/ML Domains
  { name: "Deep Learning", level: 90, category: "ai/ml" },
  { name: "Natural Language Processing", level: 85, category: "ai/ml" },
  { name: "Computer Vision", level: 80, category: "ai/ml" },
  { name: "Data Analytics", level: 85, category: "ai/ml" },
  { name: "Performance Modeling", level: 75, category: "ai/ml" },
  { name: "Optimization", level: 80, category: "ai/ml" },

  // Tools & Platforms
  { name: "Git", level: 90, category: "tools" },
  { name: "Microsoft Azure", level: 80, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },

  // Databases
  { name: "MySQL", level: 80, category: "databases" },
  { name: "Oracle", level: 75, category: "databases" },
  { name: "MongoDB", level: 75, category: "databases" },
];

const categories = [
  "all",
  "programming",
  "frameworks",
  "ai/ml",
  "databases",
  "tools",
];

// Animation variants for sliding
const gridVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "static",
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
    width: "100%",
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  }),
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [prevIdx, setPrevIdx] = useState(0);

  const currentIdx = categories.indexOf(activeCategory);
  const direction = currentIdx > prevIdx ? 1 : -1;

  // Shows skills by category, or all if "all" is selected
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const handleCategory = (category) => {
    setPrevIdx(categories.indexOf(activeCategory));
    setActiveCategory(category);
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => handleCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category === "ai/ml" ? "AI/ML" : category}
            </button>
          ))}
        </div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              custom={direction}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSkills.map((skill, key) => (
                <div
                  key={key}
                  className="bg-card p-6 rounded-lg shadow-xs card-hover"
                >
                  <div className="text-left mb-4">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                      style={{ width: skill.level + "%" }}
                    />
                  </div>

                  <div className="text-right mt-1">
                    <span className="text-sm text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
