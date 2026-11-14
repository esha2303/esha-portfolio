import { useEffect, useLayoutEffect, useState } from "react";

import {
  profile,
  about,
  projects,
  skillGroups,
  education,
  certifications,
  achievements,
} from "./data";

// Elements that fade in when they scroll into view
const REVEAL_SELECTORS = [
  ".section-heading",
  ".intro-text > p",
  ".quick-facts div",
  ".project-card",
  ".skill-group",
  ".timeline-item",
  ".extra-block",
  ".contact-inner > *",
].join(",");

function useScrollReveal() {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(REVEAL_SELECTORS).forEach((element) => {
      // Stagger siblings slightly so cards appear one after another
      const position = [...element.parentElement.children].indexOf(element);
      element.style.setProperty("--delay", `${Math.min(position, 4) * 80}ms`);
      element.classList.add("reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

// Simple social icons
function SocialIcon({ type }) {
  if (type === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-7 0C5.4 1.2 4.2 1.6 4.2 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 18.1V22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill="currentColor"
        />
        <path
          d="M7 10v7M7 7v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"
          fill="none"
          stroke="#24483d"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Project card with image navigation
function ProjectCard({ project, index }) {
  const [imageIndex, setImageIndex] = useState(-1);

  const hasImages = project.images.length > 0;
  const showingImages = imageIndex >= 0;

  function nextImage(event) {
    event.stopPropagation();

    setImageIndex((current) => {
      if (current === -1) return 0;

      if (current === project.images.length - 1) {
        return -1;
      }

      return current + 1;
    });
  }

  function previousImage(event) {
    event.stopPropagation();

    setImageIndex((current) => {
      if (current === 0) {
        return -1;
      }

      if (current === -1) {
        return project.images.length - 1;
      }

      return current - 1;
    });
  }

  return (
    <article className={`project-card project-${index + 1}`}>
      <div className="project-visual">
        {showingImages ? (
          <img
            src={project.images[imageIndex]}
            alt={`${project.title} screenshot`}
            className="project-image"
          />
        ) : (
          <span className="project-symbol">
            {project.symbol}
          </span>
        )}

        <span className="project-index">
          0{index + 1}
        </span>

        <span className="project-category">
          {project.category}
        </span>

        {hasImages && (
          <div className="image-arrows">
            {showingImages && (
              <button
                onClick={previousImage}
                aria-label="Previous project image"
              >
                ←
              </button>
            )}

            <button
              onClick={nextImage}
              aria-label="Next project image"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-title-row">
          <div>
            <p className="eyebrow">{project.subtitle}</p>
            <h3>{project.title}</h3>
          </div>

          {project.github && (
            <a
              className="round-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} GitHub`}
            >
              ↗
            </a>
          )}
        </div>

        <p className="project-description">
          {project.description}
        </p>

        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>

      <div className="heading-row">
        <h2>{title}</h2>
        {note && <p className="section-note">{note}</p>}
      </div>
    </div>
  );
}

// Solar system artwork
function SolarSystem() {
  return (
    <div className="solar-art">
      <div className="solar-label">A LITTLE UNIVERSE OF IDEAS</div>

      <div className="orbit orbit-one">
        <div className="orbit-planet small-planet" />
      </div>

      <div className="orbit orbit-two">
        <div className="orbit-planet orange-planet" />
      </div>

      <div className="orbit orbit-three">
        <div className="orbit-planet tiny-planet" />
      </div>

      <div className="main-planet">
        <div className="planet-ring" />
      </div>

      <div className="solar-star star-one">✦</div>
      <div className="solar-star star-two">✧</div>
      <div className="solar-star star-three">·</div>

      <div className="solar-caption">EXPLORE / EXPERIMENT / CREATE</div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useScrollReveal();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell">

      {/* Navigation */}
      <header className="site-header">
        <a className="wordmark" href="#home">
          ES<span>.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#contact" className="nav-contact" onClick={closeMenu}>
            Let's talk ↗
          </a>

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </nav>
      </header>

      <main>

        {/* Home */}
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </p>

            <h1>
              Hi, I'm Esha.
              <br />
              <em>I build</em> things
              <br />
              for the web<span className="hero-period">.</span>
            </h1>

            <p className="hero-intro">
              {profile.name} — {about.split(".")[0]}.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                Explore my work ↗
              </a>

              <a
                className="text-link"
                href={profile.resume}
                download
              >
                Download résumé ↗
              </a>
            </div>

            <div className="hero-meta">
              <span>BASED IN INDIA</span>
              <span className="meta-line" />
              <span>CS GRADUATE · MCA STUDENT</span>
            </div>
          </div>

          <SolarSystem />

          <a className="scroll-cue" href="#about">
            SCROLL TO EXPLORE ↓
          </a>
        </section>

        {/* About */}
        <section className="intro-band" id="about">
          <div className="section-wrap intro-grid">
            <div>
              <p className="eyebrow eyebrow-light">A LITTLE ABOUT ME</p>
              <h2>
                Curiosity first.
                <br />
                <em>Craft always.</em>
              </h2>
            </div>

            <div className="intro-text">
              <p>{about}</p>

              <div className="quick-facts">
                <div>
                  <strong>9.12</strong>
                  <span>MCA CGPA</span>
                </div>

                <div>
                  <strong>150+</strong>
                  <span>DSA PROBLEMS</span>
                </div>

                <div>
                  <strong>04</strong>
                  <span>PROJECTS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="projects-section section-wrap" id="projects">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title={<>Projects with<br /><em>a purpose.</em></>}
            note="A mix of AI experiments, full-stack products and data-driven explorations."
          />

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="skills-section" id="skills">
          <div className="section-wrap">
            <SectionHeading
              eyebrow="MY TOOLKIT"
              title={<>Tools I use to<br /><em>make things happen.</em></>}
              note="Technologies I have worked with across coursework, experiments and projects."
            />

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <div className="skill-group" key={group.name}>
                  <span className="skill-number">0{index + 1}</span>

                  <h3>{group.name}</h3>

                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education and certifications */}
        <section className="journey-section section-wrap" id="journey">
          <SectionHeading
            eyebrow="THE JOURNEY SO FAR"
            title={<>Learning by<br /><em>building.</em></>}
          />

          <div className="journey-grid">
            <div className="education-list">
              <h3 className="subsection-label">EDUCATION</h3>

              {education.map((item) => (
                <div className="timeline-item" key={item.degree}>
                  <span className="timeline-period">
                    {item.period}
                  </span>

                  <div>
                    <h4>{item.degree}</h4>
                    <p>{item.school}</p>
                    <span className="timeline-score">
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="extras-list">
              <h3 className="subsection-label">
                CERTIFICATIONS & COMMUNITY
              </h3>

              <div className="extra-block">
                <h4>Certifications</h4>

                {certifications.map((cert) => (
                  <a
                    className="certificate-link"
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    key={cert.name}
                  >
                    {cert.name} ↗
                  </a>
                ))}
              </div>

              <div className="extra-block">
                <h4>Beyond the screen</h4>

                {achievements.map((item) => (
                  <p className="extra-line" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <p className="eyebrow eyebrow-light">
              HAVE A PROJECT OR OPPORTUNITY?
            </p>

            <h2>
              Let's make
              <br />
              <em>something good.</em>
            </h2>

            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <SocialIcon type="Email" />
                Email
              </a>

              <a
                href={profile.links.LinkedIn.trim()}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon type="LinkedIn" />
                LinkedIn
              </a>

              <a
                href={profile.links.GitHub}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon type="GitHub" />
                GitHub
              </a>
            </div>

            <p className="contact-email">{profile.email}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#home">ES<span>.</span></a>

        <span>
          DESIGNED & BUILT WITH CURIOSITY · © {new Date().getFullYear()} ESHA SINGH
        </span>

        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}