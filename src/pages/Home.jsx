import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { EducationTimeline } from "../components/EducationTimeline";
import { ExperienceSection } from "../components/ExperienceSection";
import { PublicationsSection } from "../components/PublicationsSection";
import { CurrentFocusSection } from "../components/CurrentFocusSection";

export const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent text-foreground">
      <ThemeToggle />
      <StarBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CurrentFocusSection />
        <EducationTimeline />
        <ExperienceSection />
        <PublicationsSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
