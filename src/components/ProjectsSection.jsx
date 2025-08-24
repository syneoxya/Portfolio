import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Conversational-Medical-VQA",
    description:
      "A medical Q&A system using Vision Transformers and Language Models. Lets users ask medical questions about visual data.",
    image: "/projects/project1.png",
    tags: ["Vision Transformers", "NLP", "PyTorch"],
    demoUrl: "https://github.com/syneoxya/Conversational-Medical-VQA",
    githubUrl: "https://github.com/syneoxya/Conversational-Medical-VQA",
  },
  {
    id: 2,
    title: "SnippetSense: Neural Code Retriever",
    description:
      "A neural code search engine for Python. Uses dual-encoder (CodeBERT) with semantic matching, contrastive training, LoRA adapters, and FAISS for fast search. Includes an interactive UI for querying code by natural language.",
    image: "/projects/project2.png",
    tags: ["Python", "CodeBERT", "FAISS", "LoRA", "Gradio"],
    demoUrl: "https://github.com/syneoxya/SnippetSense---Neural-Code-Retriever",
    githubUrl:
      "https://github.com/syneoxya/SnippetSense---Neural-Code-Retriever",
  },
  {
    id: 3,
    title: "DeepFake-Detection",
    description:
      "Custom deepfake detection pipeline with Vision Transformer architectures. Designed to classify authentic vs. manipulated video frames/images, integrating multiple transformer-based models for best accuracy.",
    image: "/projects/project3.png",
    tags: ["Deep Learning", "Vision Transformer", "Computer Vision"],
    demoUrl: "https://github.com/syneoxya/DeepFake-Detection",
    githubUrl: "https://github.com/syneoxya/DeepFake-Detection",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects in AI, deep learning, and
          developer tools. <br />
          Each project leverages state-of-the-art models and research, with
          performance, scalability, and real-world applicability in mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full"
            >
              {/* Image */}
              <div className="h-48 bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-11/12 h-44 object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Title below the image */}
              <div className="py-3 px-4">
                <h3 className="text-xl font-bold text-center">
                  {project.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 text-center">
                  {project.description}
                </p>

                <div className="flex justify-center items-center mt-auto space-x-3">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    title="Project Page / Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    title="Source Code"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/syneoxya"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
