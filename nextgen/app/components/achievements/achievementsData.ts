export interface MemberInput {
  id: string;
  label: string;
  categories: string[]; // which output categories this input feeds
}

export interface MemberOutput {
  id: string;
  label: string;
  icon: string; // lucide icon key
  categories: string[]; // categories this output belongs to
}

export interface MemberAchievement {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  inputs: MemberInput[];
  outputs: MemberOutput[];
}

export const achievementsData: MemberAchievement[] = [
  {
    id: "prateek-rai",
    name: "PRATEEK RAI",
    role: "Technical Head",
    description:
      "Full-stack engineer and open-source contributor driving innovation at the intersection of AI systems and high-performance computing. Building production-grade infrastructure for the next generation of researchers.",
    skills: ["React", "TypeScript", "Python", "CUDA", "PyTorch", "Next.js", "Docker", "Linux"],
    socials: {
      github: "https://github.com/Prat260104",
      linkedin: "https://www.linkedin.com/in/prateek-rai-969136342/",
      email: "mailto:prateekrai@nextgen.dev",
    },
    inputs: [
      { id: "opensource", label: "Open Source", categories: ["opensource", "development"] },
      { id: "research", label: "Research", categories: ["research", "publication"] },
      { id: "hackathons", label: "Hackathons", categories: ["hackathon", "competition"] },
      { id: "leadership", label: "Leadership", categories: ["leadership", "mentorship"] },
      { id: "workshops", label: "Workshops", categories: ["education", "mentorship"] },
      { id: "ai-projects", label: "AI Projects", categories: ["research", "development"] },
    ],
    outputs: [
      { id: "gsoc", label: "Google Summer of Code", icon: "Code2", categories: ["opensource", "development"] },
      { id: "research-pub", label: "Research Publication", icon: "BookOpen", categories: ["research", "publication"] },
      { id: "oss-contrib", label: "Open Source Contributor", icon: "GitBranch", categories: ["opensource"] },
      { id: "ieee-paper", label: "IEEE Paper", icon: "FileText", categories: ["research", "publication"] },
      { id: "mentor", label: "Mentor", icon: "Users", categories: ["mentorship", "education", "leadership"] },
      { id: "speaker", label: "Speaker", icon: "Mic", categories: ["education", "leadership"] },
    ],
  },
  {
    id: "vinayak-rastogi",
    name: "VINAYAK RASTOGI",
    role: "Technical Head",
    description:
      "AI/ML architect specializing in deep learning and neural network research. Passionate about building intelligent systems that solve real-world challenges at scale.",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "C++", "CUDA"],
    socials: {
      github: "https://github.com/VinVorteX",
      linkedin: "https://www.linkedin.com/in/vinayakrastogi3010",
      email: "mailto:vinayak@nextgen.dev",
    },
    inputs: [
      { id: "research", label: "Research", categories: ["research", "publication"] },
      { id: "ai-projects", label: "AI Projects", categories: ["research", "development"] },
      { id: "hackathons", label: "Hackathons", categories: ["hackathon", "competition"] },
      { id: "workshops", label: "Workshops", categories: ["education"] },
      { id: "hpc", label: "HPC Systems", categories: ["hpc", "development"] },
    ],
    outputs: [
      { id: "nvidia-dgx", label: "NVIDIA DGX Research", icon: "Cpu", categories: ["hpc", "research"] },
      { id: "research-pub", label: "Research Publication", icon: "BookOpen", categories: ["research", "publication"] },
      { id: "hackathon-win", label: "Hackathon Winner", icon: "Trophy", categories: ["hackathon", "competition"] },
      { id: "ieee-member", label: "IEEE Member", icon: "Award", categories: ["research", "publication"] },
      { id: "gdsc", label: "Google DSC Lead", icon: "Users", categories: ["education", "development"] },
    ],
  },
  {
    id: "ronak-goel",
    name: "RONAK GOEL",
    role: "Technical Head",
    description:
      "Systems engineer with deep expertise in distributed computing and cloud infrastructure. Architecting the backbone of NextGen's research computing platform.",
    skills: ["Go", "Kubernetes", "AWS", "Terraform", "Python", "Rust", "gRPC"],
    socials: {
      github: "https://github.com/Ronak-Goel-2005",
      linkedin: "https://www.linkedin.com/in/ronak-goel",
      email: "mailto:ronak@nextgen.dev",
    },
    inputs: [
      { id: "opensource", label: "Open Source", categories: ["opensource", "development"] },
      { id: "cloud", label: "Cloud Infra", categories: ["cloud", "development"] },
      { id: "hackathons", label: "Hackathons", categories: ["hackathon", "competition"] },
      { id: "leadership", label: "Leadership", categories: ["leadership"] },
      { id: "devops", label: "DevOps", categories: ["cloud", "development"] },
      { id: "ai-projects", label: "AI Projects", categories: ["research", "development"] },
    ],
    outputs: [
      { id: "oss-contrib", label: "Open Source Contributor", icon: "GitBranch", categories: ["opensource"] },
      { id: "cloud-arch", label: "Cloud Architect", icon: "Cloud", categories: ["cloud", "development"] },
      { id: "hackathon-win", label: "Hackathon Winner", icon: "Trophy", categories: ["hackathon", "competition"] },
      { id: "tech-lead", label: "Tech Lead", icon: "Star", categories: ["leadership", "development"] },
    ],
  },
  {
    id: "shreya-jain",
    name: "SHREYA JAIN",
    role: "President",
    description:
      "Visionary leader steering NextGen Supercomputing's mission. Bridging the gap between academic research and real-world impact through strategic partnerships and community building.",
    skills: ["Project Management", "Public Speaking", "Python", "Data Science", "Strategy"],
    socials: {
      github: "https://github.com/Shreya7078",
      linkedin: "https://www.linkedin.com/in/shreya-jain-25564a334/",
      email: "mailto:shreya@nextgen.dev",
    },
    inputs: [
      { id: "leadership", label: "Leadership", categories: ["leadership", "management"] },
      { id: "community", label: "Community", categories: ["community", "outreach"] },
      { id: "research", label: "Research", categories: ["research"] },
      { id: "workshops", label: "Workshops", categories: ["education", "outreach"] },
      { id: "partnerships", label: "Partnerships", categories: ["management", "outreach"] },
    ],
    outputs: [
      { id: "president", label: "Club President", icon: "Crown", categories: ["leadership", "management"] },
      { id: "event-org", label: "Event Organizer", icon: "Calendar", categories: ["community", "outreach"] },
      { id: "speaker", label: "Speaker", icon: "Mic", categories: ["education", "outreach"] },
      { id: "mentor", label: "Mentor", icon: "Users", categories: ["education", "leadership"] },
      { id: "partnership-lead", label: "Partnership Lead", icon: "Handshake", categories: ["management", "outreach"] },
    ],
  },
];
