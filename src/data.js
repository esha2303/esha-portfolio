
export const profile = {
  name: "Esha Singh",
  email: "eshaofficial003@gmail.com",
  resume: "/EshaResume.pdf",

  links: {
    GitHub: "https://github.com/esha2303",
    LinkedIn: "https://www.linkedin.com/in/esha2003/",
  },
};

export const about =
  "I'm a Computer Science graduate and MCA student at IGDTUW. I enjoy building web apps, mostly the full-stack kind, and I've been trying out machine learning and data dashboards too. When I'm not coding, I'm usually sketching, watching anime or reading a novel.";

export const projects = [
  {
    title: "UI Sense AI",
    subtitle: "AI-powered UI/UX feedback platform",
    category: "AI / WEB APP",
    symbol: "✳",
    description:
      "An AI-powered platform that reviews website screenshots and provides actionable UI/UX feedback. Includes authentication, protected routes and analysis history.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    github: "https://github.com/esha2303/ui-sense-ai",
    images: [
      "/projects/ui-sense-ai/home.png",
      "/projects/ui-sense-ai/login.png",
      "/projects/ui-sense-ai/history.png",
      "/projects/ui-sense-ai/result-top.png",
      "/projects/ui-sense-ai/result-bottom.png",
    ],
  },

  {
    title: "SavePoint",
    subtitle: "AI-powered journaling platform",
    category: "AI / WELLNESS",
    symbol: "◒",
    description:
      "A smart journaling application using NLP models to analyse emotions, mood patterns and productivity, with results presented through an interactive dashboard.",
    tags: ["React", "FastAPI", "Python", "Scikit-learn", "PostgreSQL"],
    github: "https://github.com/esha2303/savepoint-ai-journal",
    images: [
      "/projects/savepoint/login.png",
      "/projects/savepoint/home.png",
      "/projects/savepoint/result.png",
    ],
  },

  {
    title: "E-commerce Sales Dashboard",
    subtitle: "Data analytics and visualisation",
    category: "DATA ANALYTICS",
    symbol: "▥",
    description:
      "An interactive Power BI dashboard presenting e-commerce sales insights through charts, trends and key performance metrics.",
    tags: ["Power BI", "Data Analysis", "Visualisation"],
    github:
      "https://github.com/esha2303/E-Commerce-Sales-Analysis-Dashboard",
    images: [
      "/projects/ecommerce/dashboard.png",
    ],
  },

  {
    title: "Small Business Success Prediction",
    subtitle: "Machine learning · Predictive modelling",
    category: "MACHINE LEARNING",
    symbol: "⌁",
    description:
      "A machine-learning project that uses a classification pipeline and Random Forest to predict small-business success.",
    tags: ["Python", "Pandas", "Scikit-learn", "Random Forest"],
    github: "https://github.com/esha2303/Small-Business-Success-Prediction",
    images: [],
  },
];

export const designProjects = [
  {
    title: "Köhi – Coffee Website",
    subtitle: "Coffee e-commerce website concept",
    category: "UI / UX DESIGN",
    description:
      "A coffee website concept designed in Figma, featuring a welcoming homepage, drink categories, product menus and promotional sections.",
    tags: ["Figma", "UI Design", "Website Design", "E-commerce"],
    figma:
      "https://www.figma.com/design/1QknNVqGT3LLaWTIJtwbKJ/kohi?t=WMQ0WqWJRlX1iIEp-1",
    coverImage: "/projects/kohi/Home.png",
    images: [
      "/projects/kohi/Home.png",
      "/projects/kohi/kohi.png",
    ],
  },

  {
    title: "Yuki – Home Decor & Objects",
    subtitle: "Home decor e-commerce website concept",
    category: "UI / UX DESIGN",
    description:
      "A home decor and lifestyle e-commerce website concept designed in Figma, showcasing curated objects through a clean layout and cohesive visual identity.",
    tags: ["Figma", "UI Design", "Website Design", "E-commerce"],
    figma:
      "https://www.figma.com/design/QjUxWlb8lr9S85uVdlErDJ/Yuki?node-id=0-1&t=WMQ0WqWJRlX1iIEp-1",
    coverImage: "/projects/yuki/Yuki.png",
    images: [
      "/projects/yuki/Yuki.png",
    ],
  },
];

export const skillGroups = [
  {
    name: "Languages",
    items: ["Python", "C++", "JavaScript", "Java", "SQL"],
  },
  {
    name: "Frontend",
    items: ["HTML", "CSS", "React.js", "Tailwind CSS", "Figma"],
  },
  {
    name: "Backend & Databases",
    items: ["Node.js", "Express.js", "FastAPI", "MySQL", "MongoDB"],
  },
  {
    name: "AI, Analytics & Tools",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Power BI",
      "Excel",
      "Git & GitHub",
    ],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "Indira Gandhi Delhi Technical University for Women",
    period: "2025 — 2027",
    score: "9.12 CGPA",
  },
  {
    degree: "B.Sc. (Honours), Computer Science",
    school: "Ramanujan College, University of Delhi",
    period: "",
    score: "8.67 CGPA",
  },
];

export const certifications = [
  {
    name: "HackerRank SQL (Intermediate)",
    url: "https://www.hackerrank.com/certificates/b3825fe43f06",
  },
  {
    name: "Introduction to Azure Services — Simplilearn",
    url: "https://simpli-web.app.link/e/afWD4mqex0b",
  },
  {
    name: "Responsive Web Design — freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/esha_web/responsive-web-design-v9",
  },
];

export const achievements = [
  "Core team member at Quiksort Society, where I helped organise hackathons, coding contests and technical workshops.",
  "Solved 150+ Data Structures and Algorithms problems.",
];
