export const experienceData = [
  {
    id: "jhu-carey",
    organization: "Johns Hopkins University - Carey Business School",
    role: "Research Assistant",
    location: "Baltimore, MD",
    period: "Feb 2026 - Present",
    summary:
      "Building machine learning systems for high-frequency trading research using large-scale sequential market data.",
    highlights: [
      "Building an inverse reinforcement learning pipeline for limit order book data with 50M+ samples.",
      "Formulating trading as a partially observable Markov decision process and recovering latent reward functions from trajectories.",
      "Developed GPU-accelerated simulation and backtesting workflows in PyTorch for large-scale experiments.",
    ],
    tags: ["Inverse RL", "PyTorch", "Market Microstructure"],
  },
  {
    id: "jhu-arcade",
    organization: "Johns Hopkins University - ARCADE Lab",
    role: "Research Assistant",
    location: "Baltimore, MD",
    period: "Aug 2025 - Present",
    summary:
      "Working on medical AI research at the intersection of diffusion models, policy learning, and surgical scene understanding.",
    highlights: [
      "Co-first author on a MICCAI 2026 submission proposing diffusion-based policy learning for endoscopic camera pose estimation.",
      "Implemented a conditional diffusion model over SE(3) trajectories for sequential camera motion recovery.",
      "Benchmarked against SfM and SLAM baselines on a 12-specimen dataset with the lowest mean translation RPE.",
    ],
    tags: ["Medical AI", "Diffusion Models", "Computer Vision"],
  },
  {
    id: "vit-ra",
    organization: "Vellore Institute of Technology",
    role: "Research Assistant",
    location: "Chennai, India",
    period: "Apr 2022 - Aug 2024",
    summary:
      "Led project-driven research in time-series forecasting and deepfake detection with a strong emphasis on experimental rigor.",
    highlights: [
      "Led research on PSO-based LSTM optimization that resulted in a peer-reviewed publication.",
      "Improved model accuracy by 7% while reducing compute by 9% through better hyperparameter search.",
      "Developed a ViT-LSTM architecture to capture temporal patterns for deepfake detection.",
    ],
    tags: ["Forecasting", "Vision Transformers", "Optimization"],
  },
  {
    id: "dhi-ai",
    organization: "DHI AI",
    role: "Machine Learning Intern",
    location: "New Delhi, India",
    period: "May 2023 - Jul 2023",
    summary:
      "Built and deployed fault-detection models for banking devices in a production setting.",
    highlights: [
      "Created a fault-detection system that reduced downtime by 18% in production.",
      "Trained tree-based models on telemetry data to detect anomalies and operational patterns.",
      "Integrated model inference into Azure-based workflows with scheduled jobs, monitoring, and alerts.",
    ],
    tags: ["Production ML", "Azure", "Anomaly Detection"],
  },
];
