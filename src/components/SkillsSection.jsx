import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  categoryLabels,
  categoryOrder,
  coreStrengths,
  skills,
} from "@/data/skills";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...categoryOrder];
  const groupedSkills = {};

  for (const category of categoryOrder) {
    groupedSkills[category] = skills
      .filter((skill) => skill.category === category)
      .sort((a, b) => b.level - a.level);
  }

  const visibleCategories = categories.filter((category) =>
    activeCategory === "all" ? category !== "all" : category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/75">
              Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Tools I Reach For <span className="text-primary">Often</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Instead of pretending every skill can be quantified perfectly, I
              prefer showing the domains I work in repeatedly and the toolsets I
              trust when moving from research to implementation.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-primary/12 bg-card/88 p-6 shadow-[0_20px_50px_-40px_rgba(99,102,241,0.45)] backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/75">
                Core Strengths
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {coreStrengths.map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-3 justify-start mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "border-primary/70 bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_rgba(99,102,241,0.8)]"
                      : "border-border/80 bg-card/80 text-foreground/75 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {category === "all"
                    ? "All Domains"
                    : categoryLabels[category] || category}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-[1.9rem] border border-primary/12 bg-card/88 shadow-[0_24px_60px_-44px_rgba(99,102,241,0.5)] backdrop-blur-sm">
              {visibleCategories.map((category, index) => (
                <article
                  key={category}
                  className={
                    "relative px-6 py-6 md:px-8 md:py-7 " +
                    (index < visibleCategories.length - 1
                      ? "border-b border-white/8"
                      : "")
                  }
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_24%)] opacity-70" />
                  <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
                    <div className="lg:flex lg:w-40 lg:shrink-0 lg:justify-center lg:self-stretch lg:text-center">
                      <div className="flex items-center justify-between gap-3 lg:flex lg:h-full lg:flex-col lg:justify-center">
                        <h3 className="text-lg font-semibold tracking-tight text-primary">
                          {categoryLabels[category] || category}
                        </h3>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground/85 lg:mt-2">
                          {groupedSkills[category].length} skills
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 lg:pt-0.5">
                      {groupedSkills[category].map((skill) => (
                        <span
                          key={skill.name}
                          className="rounded-full border border-white/10 bg-background/55 px-3.5 py-1.5 text-sm text-foreground/80 transition-all duration-300 hover:border-primary/25 hover:bg-primary/8 hover:text-primary"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
