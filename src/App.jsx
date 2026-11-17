import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  profile,
  about,
  projects,
  designProjects,
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

// Swipe left/right on touch screens
function useSwipe(onNext, onPrev) {
  const startX = useRef(null);

  return {
    onTouchStart: (event) => {
      startX.current = event.touches[0].clientX;
    },
    onTouchEnd: (event) => {
      if (startX.current === null) return;

      const distance = event.changedTouches[0].clientX - startX.current;
      startX.current = null;

      if (Math.abs(distance) > 40) {
        if (distance < 0) onNext();
        else onPrev();
      }
    },
  };
}

// Full-screen gallery
function Lightbox({ project, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const total = project.images.length;

  const next = () => setCurrent((value) => (value + 1) % total);
  const previous = () => setCurrent((value) => (value - 1 + total) % total);
  const swipe = useSwipe(next, previous);

  // Keyboard: Esc closes, arrows move. Page scroll is locked while open.
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setCurrent((value) => (value + 1) % total);
      if (event.key === "ArrowLeft") setCurrent((value) => (value - 1 + total) % total);
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [total, onClose]);

  const stop = (event) => event.stopPropagation();

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshots`}
      onClick={onClose}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close gallery">
        ✕
      </button>

      <div className="lightbox-stage" onClick={stop} {...swipe}>
        <img
          key={current}
          className="lightbox-image"
          src={project.images[current]}
          alt={`${project.title} screenshot ${current + 1} of ${total}`}
        />

        {total > 1 && (
          <>
            <button
              className="lightbox-arrow lightbox-prev"
              onClick={previous}
              aria-label="Previous screenshot"
            >
              ←
            </button>
            <button
              className="lightbox-arrow lightbox-next"
              onClick={next}
              aria-label="Next screenshot"
            >
              →
            </button>
          </>
        )}
      </div>

      <p className="lightbox-caption" onClick={stop}>
        {project.title} · {current + 1} / {total}
      </p>

      {total > 1 && (
        <div className="lightbox-thumbs" onClick={stop}>
          {project.images.map((src, i) => (
            <button
              key={src}
              className={i === current ? "thumb is-active" : "thumb"}
              onClick={() => setCurrent(i)}
              aria-label={`Show screenshot ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

// Project card: show the symbol as the cover; open screenshots from the cover or arrow.
function ProjectCard({ project, index, design = false }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const total = project.images.length;
  const hasImages = total > 0;
  const hasMany = total > 1;

  const next = () => setImageIndex((value) => (value + 1) % total);
  const previous = () => setImageIndex((value) => (value - 1 + total) % total);
  const swipe = useSwipe(next, previous);

  return (
    <article
      className={
        design
          ? "project-card design-project-card"
          : `project-card project-${index + 1}`
      }
    >
      <div className="project-visual" {...(hasMany ? swipe : {})}>
        <button
          type="button"
          className="project-cover"
          onClick={() => hasImages && setGalleryOpen(true)}
          disabled={!hasImages}
          aria-label={
            hasImages
              ? `Open ${project.title} screenshots`
              : `${project.title} project cover`
          }
        >
          {project.coverImage ? (
            <img
              className="project-cover-image"
              src={project.coverImage}
              alt={`${project.title} design cover`}
            />
          ) : (
            <span className="project-symbol" aria-hidden="true">
              {project.symbol}
            </span>
          )}
        </button>

        <span className="project-category">{project.category}</span>

        {hasImages && (
          <button
            type="button"
            className="gallery-trigger"
            onClick={() => setGalleryOpen(true)}
            aria-label={`View ${project.title} screenshots`}
            title="View project screenshots"
          >
            →
          </button>
        )}
      </div>

      <div className="project-content">
        <div className="project-title-row">
          <div>
            <p className="eyebrow">{project.subtitle}</p>
            <h3>{project.title}</h3>
          </div>

          {(project.github || project.figma) && (
            <a
              className="round-link"
              href={project.github || project.figma}
              target="_blank"
              rel="noreferrer"
              aria-label={
                project.figma
                  ? `Open ${project.title} Figma design`
                  : `Open ${project.title} GitHub`
              }
              title={project.figma ? "View in Figma" : "View on GitHub"}
            >
              ↗
            </a>
          )}
        </div>

        <p className="project-description">{project.description}</p>

        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      {galleryOpen && (
        <Lightbox
          project={project}
          startIndex={imageIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
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

          <div className="design-projects-block">
            <div className="design-projects-heading">
              <div>
                <p className="eyebrow">UI / UX DESIGN</p>
                <h3>Design projects<span>.</span></h3>
              </div>
              <p className="design-projects-note">
                Website and e-commerce concepts designed in Figma, with a focus
                on thoughtful layouts and visual storytelling.
              </p>
            </div>

            <div className="projects-grid design-projects-grid">
              {designProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  design
                />
              ))}
            </div>
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