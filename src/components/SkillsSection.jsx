import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Prioritized categories for ML-focused job search
const categoryOrder = [
  "ai/ml",
  "programming",
  "frameworks",
  "databases",
  "tools",
];

const categoryLabels = {
  "ai/ml": "AI/ML",
  programming: "Programming",
  frameworks: "Frameworks",
  databases: "Databases",
  tools: "Tools",
};

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

export const SkillsSection = () => {
  // Category selection state: "all" or actual category
  const [activeCategory, setActiveCategory] = useState("all");

  // Make the categories list—puts them in the priority order, and includes "all"
  const categories = ["all", ...categoryOrder];

  // Group skills by category in an object (with descending order for each cat.)
  const groupedSkills = {};
  for (const cat of categoryOrder) {
    groupedSkills[cat] = skills
      .filter((s) => s.category === cat)
      .sort((a, b) => b.level - a.level);
  }

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category === "all"
                ? "All"
                : categoryLabels[category] || category}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          {/* When "all" show all categories (in priority order) */}
          {categories
            .filter((category) =>
              activeCategory === "all"
                ? category !== "all"
                : category === activeCategory
            )
            .map((category) =>
              groupedSkills[category].length ? (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-5 text-primary">
                    {categoryLabels[category] || category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedSkills[category].map((skill, idx) => (
                      <div
                        key={skill.name}
                        className="bg-card p-6 rounded-lg shadow-xs card-hover"
                      >
                        <div className="text-left mb-4">
                          <h4 className="font-semibold text-lg">
                            {skill.name}
                          </h4>
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
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </section>
  );
};
