import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-2xl font-semibold">
              Researcher Building Applied AI Systems
            </h3>

            <p className="text-muted-foreground">
              I&apos;m pursuing my MSE in Computer Science at Johns Hopkins
              University, after completing my B.Tech in Computer Science with a
              specialization in AI and ML at VIT.
            </p>

            <p className="text-muted-foreground">
              My current work spans inverse reinforcement learning for trading,
              diffusion-based policy learning for surgical camera pose
              estimation, generative modeling for biology, and production ML
              systems for real-world deployment.
            </p>

            <p className="text-muted-foreground">
              I enjoy work that sits between research depth and engineering
              execution: building models, validating them carefully, and turning
              them into systems that other people can actually use.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=17dmgEM8aiDCS1A_CHvFaP86qAaMpyobG"
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
                    Deep learning, LLMs, RAG, NLP, and computer vision applied
                    to finance, medical imaging, and generative biology.
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
                    First-author and co-first-author research across
                    forecasting, deepfake detection, and diffusion-based medical
                    AI.
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
                    End-to-end engineering with Python, FastAPI, React, cloud
                    tooling, and production-oriented ML pipelines.
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
