import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              CS Graduate Student & AI Enthusiast
            </h3>

            <p className="text-muted-foreground">
              I’m pursuing my MSE in Computer Science at Johns Hopkins
              University with a focus on AI and Machine Learning. I hold a
              B.Tech from VIT, with experience in deep learning, NLP, and data
              analytics.
            </p>

            <p className="text-muted-foreground">
              My work spans stock forecasting, deepfake detection, and scalable
              AI solutions for industry and research, blending theory,
              experimentation, and engineering.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="https://drive.google.com/file/d/1N9ymFQYv7I4aS_p8393ZAJz8hLGaikyb/view?usp=drive_link"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    AI & Machine Learning
                  </h4>
                  <p className="text-muted-foreground">
                    Deep learning, NLP, and vision for real-world challenges
                    from finance to media authenticity.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Research & Innovation
                  </h4>
                  <p className="text-muted-foreground">
                    Experience in neural optimization, autonomous systems, and
                    advanced medical AI.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Development & Engineering
                  </h4>
                  <p className="text-muted-foreground">
                    Full-stack, cloud, and decentralized applications with
                    expertise in Python, React, and Azure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
