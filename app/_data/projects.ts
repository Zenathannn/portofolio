export type ProjectCategory =
  | "Web Applications"
  | "Internship"
  | "Games"
  | "Experiments";

export interface CaseStudy {
  overview: string;
  problem: string;
  role: string;
  implementation: string;
  challenges: { challenge: string; approach: string; solution: string }[];
  results: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  year: number;
  role: string;
  technologies: string[];
  coverImage: string | null;
  gallery: string[];
  featured: boolean;
  demoUrl: string | null;
  repositoryUrl: string | null;
  caseStudy: CaseStudy;
}

// ─────────────────────────────────────────────
// PLACEHOLDER DATA — marked clearly as examples.
// Replace with real projects before publishing.
// ─────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "project-alpha-web",
    title: "PROJECT ALPHA",
    category: "Web Applications",
    summary:
      "[PLACEHOLDER] A full-stack web application demonstrating modern architecture patterns and responsive design.",
    description:
      "[PLACEHOLDER DESCRIPTION] This is an example project entry. Replace with a real project description, objectives, and context before publishing.",
    year: 2025,
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    coverImage: null,
    gallery: [],
    featured: true,
    demoUrl: null,
    repositoryUrl: null,
    caseStudy: {
      overview:
        "[PLACEHOLDER] Overview of what this project does and who it is for.",
      problem:
        "[PLACEHOLDER] The problem or need this project was built to address.",
      role: "[PLACEHOLDER] Personal responsibilities and team contributions.",
      implementation:
        "[PLACEHOLDER] Architecture, technology decisions, and key implementation details.",
      challenges: [
        {
          challenge: "[PLACEHOLDER] A specific technical or design challenge.",
          approach: "[PLACEHOLDER] How the challenge was approached.",
          solution: "[PLACEHOLDER] What was done to resolve it.",
        },
      ],
      results:
        "[PLACEHOLDER] Outcomes, learnings, and current status of the project.",
    },
  },
  {
    slug: "internship-project-beta",
    title: "INTERNSHIP — BETA",
    category: "Internship",
    summary:
      "[PLACEHOLDER] Contributions made during an internship program. Replace with actual organization, role, and work description.",
    description:
      "[PLACEHOLDER DESCRIPTION] This entry represents internship work. Include only what you personally contributed. Do not fabricate team outcomes or metrics.",
    year: 2024,
    role: "[PLACEHOLDER ROLE]",
    technologies: ["React", "Node.js", "REST API"],
    coverImage: null,
    gallery: [],
    featured: true,
    demoUrl: null,
    repositoryUrl: null,
    caseStudy: {
      overview:
        "[PLACEHOLDER] What the internship project involved and the context.",
      problem: "[PLACEHOLDER] What problem the team was solving.",
      role:
        "[PLACEHOLDER] Specific tasks and responsibilities assigned to you.",
      implementation:
        "[PLACEHOLDER] Technologies used and what you implemented.",
      challenges: [
        {
          challenge: "[PLACEHOLDER] Challenge encountered during internship.",
          approach: "[PLACEHOLDER] Your approach to addressing it.",
          solution: "[PLACEHOLDER] How it was resolved.",
        },
      ],
      results:
        "[PLACEHOLDER] What was delivered. Avoid unverified performance claims.",
    },
  },
  {
    slug: "game-experiment-gamma",
    title: "GAME EXPERIMENT",
    category: "Games",
    summary:
      "[PLACEHOLDER] An interactive game or simulation project. Replace with the actual game name, engine, and description.",
    description:
      "[PLACEHOLDER DESCRIPTION] This is a game project placeholder. Describe the genre, mechanics, and what makes this project interesting.",
    year: 2024,
    role: "Developer & Designer",
    technologies: ["Unity", "C#"],
    coverImage: null,
    gallery: [],
    featured: false,
    demoUrl: null,
    repositoryUrl: null,
    caseStudy: {
      overview: "[PLACEHOLDER] What kind of game this is and its premise.",
      problem:
        "[PLACEHOLDER] Design problem or creative goal the game explores.",
      role: "[PLACEHOLDER] What you built — mechanics, art, audio, etc.",
      implementation:
        "[PLACEHOLDER] Engine, tools, and key technical decisions.",
      challenges: [
        {
          challenge: "[PLACEHOLDER] A specific development challenge.",
          approach: "[PLACEHOLDER] How you tackled it.",
          solution: "[PLACEHOLDER] The result.",
        },
      ],
      results: "[PLACEHOLDER] Current state, playability, and learnings.",
    },
  },
  {
    slug: "digital-experiment-delta",
    title: "DIGITAL EXPERIMENT",
    category: "Experiments",
    summary:
      "[PLACEHOLDER] A creative code experiment or interactive experience. Replace with the actual experiment name and description.",
    description:
      "[PLACEHOLDER DESCRIPTION] This placeholder represents a digital experiment entry. Describe the concept, motivation, and what you explored.",
    year: 2025,
    role: "Developer",
    technologies: ["JavaScript", "Canvas API", "SVG"],
    coverImage: null,
    gallery: [],
    featured: false,
    demoUrl: null,
    repositoryUrl: null,
    caseStudy: {
      overview:
        "[PLACEHOLDER] The concept and motivation behind this experiment.",
      problem: "[PLACEHOLDER] The creative or technical question explored.",
      role: "[PLACEHOLDER] What you did to build this.",
      implementation: "[PLACEHOLDER] How it was built technically.",
      challenges: [
        {
          challenge: "[PLACEHOLDER] An interesting problem you encountered.",
          approach: "[PLACEHOLDER] Your thinking process.",
          solution: "[PLACEHOLDER] What you tried and what worked.",
        },
      ],
      results:
        "[PLACEHOLDER] What you learned and the current state of this experiment.",
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAdjacentProjects(
  slug: string
): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export const ALL_CATEGORIES: ProjectCategory[] = [
  "Web Applications",
  "Internship",
  "Games",
  "Experiments",
];
