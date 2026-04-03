import { motion as Motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TimelineItem = ({
  align = "left",
  icon,
  title,
  institution,
  specialization,
  period,
  summary,
  highlights = [],
  experiences = [],
}) => (
  <Motion.article
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
      },
    }}
    className="relative w-full"
  >
    <div className="absolute left-5 top-10 z-20 -translate-x-1/2 md:left-1/2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-card text-primary shadow-lg shadow-primary/10">
        {icon}
      </div>
    </div>

    <div
      className={cn(
        "ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]",
        align === "right" ? "md:ml-auto" : ""
      )}
    >
      <div className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
              Education
            </p>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-base font-medium text-foreground/85">
              {institution}
            </p>
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
            {period}
          </span>
        </div>

        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Specialization: {specialization}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {summary}
        </p>

        <div className="mt-5 space-y-2">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-2 w-2 rounded-full bg-primary/70" />
              <p className="leading-6">{highlight}</p>
            </div>
          ))}
        </div>

        {experiences.length > 0 && (
          <div className="mt-6 space-y-3 border-t border-border pt-5">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="rounded-xl border border-primary/15 bg-background/70 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {experience.icon}
                    </div>
                    <div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                        {experience.label}
                      </span>
                      <h4 className="mt-2 text-sm font-semibold text-foreground">
                        {experience.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {experience.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Motion.article>
);
