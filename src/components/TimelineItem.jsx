import { motion } from "framer-motion";

export const TimelineItem = ({
  icon,
  title,
  subtitle,
  period,
  description,
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, type: "spring", bounce: 0.4 },
      },
    }}
    className="mb-14 flex items-start group"
    whileHover={{ scale: 1.03 }}
  >
    <div className="absolute -left-7 flex items-center justify-center rounded-full bg-primary/90 shadow-lg w-12 h-12 border-4 border-white">
      {icon}
    </div>
    <div className="ml-8 w-full">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      {subtitle && (
        <p className="text-muted-foreground font-medium">{subtitle}</p>
      )}
      <p className="text-sm mt-1">{description}</p>
      <p className="text-xs mt-2 text-muted-foreground">{period}</p>
    </div>
  </motion.div>
);
