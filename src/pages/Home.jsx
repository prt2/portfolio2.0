// src/pages/Home.jsx
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import StickyCard from "../components/StickyCard";
import "../notebook.css";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [contact, setContact] = useState([]);

  const [loadingExp, setLoadingExp] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingContact, setLoadingContact] = useState(true);

  // FETCH EXPERIENCE
  async function loadExperience() {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) console.error(error);

    setExperience(data.filter((x) => !x.isVolunteering));
    setVolunteering(data.filter((x) => x.isVolunteering));
    setLoadingExp(false);
  }

  // FETCH PROJECTS
  async function loadProjects() {
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: true });

    if (error) console.error(error);

    setProjects(data || []);
    setLoadingProjects(false);
  }

  // FETCH CONTACT
  async function loadContact() {
    const { data, error } = await supabase.from("contact").select("*").order("id", { ascending: true });

    if (error) console.error(error);

    setContact(data || []);
    setLoadingContact(false);
  }

  useEffect(() => {
    loadExperience();
    loadProjects();
    loadContact();
  }, []);

  return (
    <>
      {/* LEFT NOTEBOOK LINE */}
      <div className="notebook-line" />

      <main className="notebook-page">
          <div className="notebook-content">
        {/* ============ ABOUT ME ============ */}
        <section id="about" className="section-block">
          <h2 className="section-title text-center">ABOUT ME</h2>

          <div className="about-layout">
            <div className="about-text">
              <p className="about-greeting">Hi! I'm Pal 🌸</p>
              <p className="about-subtitle">
                I’m a third-year Computer Science student at Simon Fraser University,
                passionate about full-stack development and building projects that make an impact.
                Lately, I’ve been exploring AI-powered apps and modern web tools.
                I love learning new things, meeting people, and working on projects where I can grow and help others too.
              </p>
            </div>

            <div className="about-avatar">
              <img
                src="https://iswdrrohdvfxiyadmdga.supabase.co/storage/v1/object/public/images/pal-doodle.png"
                alt="Pal doodle"
                className="about-doodle"
              />
            </div>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="section-block">
          <h2 className="section-title text-center">EXPERIENCE</h2>

          {loadingExp ? (
            <p className="loading-text">Loading experience…</p>
          ) : (
            <div className="sticky-wrap">
              {experience.map((job, index) => (
                <StickyCard
                  key={job.id}
                  rotation={index % 2 ? "3deg" : "-3deg"}
                  color={["#ffd7d7", "#fff5b8", "#d8ffd9", "#dff6ff", "#ffe7cc"][index % 5]}
                >
                  <strong>{job.org}</strong>
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.org}
                      className="sticky-logo"
                    />
                  )}
                  <br />
                  {job.role}
                  <br />
                  <small>
                    {job.end_date ? `${job.start_date} — ${job.end_date}` : job.start_date}
                  </small>
                </StickyCard>
              ))}
            </div>
          )}
        </section>

        {/* ============ VOLUNTEERING ============ */}
        <section id="volunteering" className="section-block">
          <h2 className="section-title text-center">VOLUNTEERING</h2>

          {loadingExp ? (
            <p className="loading-text">Loading volunteering…</p>
          ) : (
            <div className="sticky-wrap">
              {volunteering.map((v, index) => (
                <StickyCard
                  key={v.id}
                  rotation={index % 2 ? "2deg" : "-4deg"}
                  color={["#ffe7cc", "#ffd7d7", "#dff6ff", "#fff5b8"][index % 4]}
                >
                  <strong>{v.org}</strong>
                  {v.logo && (
                    <img
                      src={v.logo}
                      alt={v.org}
                      className="sticky-logo"
                    />
                  )}
                  <br />
                  {v.role}
                  <br />
                  <small>
                    {v.end_date ? `${v.start_date} — ${v.end_date}` : v.start_date}
                  </small>
                </StickyCard>
              ))}
            </div>
          )}
        </section>

        {/* ============ PROJECTS ============ */}
        <section id="projects" className="section-block">
          <h2 className="section-title">PROJECTS</h2>

          {loadingProjects ? (
            <p className="loading-text">Loading projects…</p>
          ) : (
            <div className="projects-list">
              {projects.map((p) => (
                <div key={p.id} className="project-row">
                  <div className="project-thumb">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="project-thumb-img"
                      />
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{p.title || "Project name"}</h3>
                    <p className="project-description">
                      {p.description || "short description"}
                    </p>

                    {p.tech_stack && (
                      <p className="project-tech">{p.tech_stack}</p>
                    )}

                    <div className="project-links">
                      {p.github_link && (
                        <a href={p.github_link} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.live_demo && (
                        <a href={p.live_demo} target="_blank" rel="noreferrer">
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="section-block">
          <h2 className="section-title">CONTACT</h2>

          {loadingContact ? (
            <p className="loading-text">Loading contact…</p>
          ) : (
            <div className="contact-list">
              {contact.map((c) => {
  const isEmail = c.platform.toLowerCase() === "email";
  const email = isEmail ? c.url.replace("mailto:", "") : null;

  // Use a direct LinkedIn URL if wrapped (e.g. pal-tilva.vercel.app/...)
  let hrefUrl = c.url;
  if (!isEmail) {
    const rawUrl = c.url;
    const linkedinIndex = rawUrl.indexOf("linkedin.com");
    if (linkedinIndex !== -1) {
      hrefUrl = `https://${rawUrl.slice(linkedinIndex)}`;
    }
  }

  // Clean display text for non-email links
  let displayUrl = hrefUrl.replace(/^https?:\/\//, "");

  return (
    <div key={c.id} className="contact-row">
      <img
        src={c.logo}
        alt={c.platform}
        className="contact-logo"
      />

      <div className="contact-info">
        <h3 className="contact-title">{c.platform}</h3>

        {isEmail ? (
          <a
            href={`mailto:${email}`}
            className="contact-link"
          >
            {email}
          </a>
        ) : (
          <a
            href={hrefUrl}
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            {displayUrl}
          </a>
        )}
      </div>
    </div>
  );
})}

            </div>
          )}
        </section>
      </div>
      </main>
    </>
  );
}
