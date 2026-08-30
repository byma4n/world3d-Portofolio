import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, ExternalLink, Github, FileText, Mail, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { owner, contact, social } from "@/data/site";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { track, EVENTS } from "@/lib/analytics";

const Section = ({ id, label, title, children, testId }) => (
  <section id={id} className="mx-auto max-w-5xl px-6 py-16 sm:py-20" data-testid={testId}>
    <div className="mb-8">
      <div className="mb-2 font-mono-ui text-xs uppercase tracking-[0.22em] text-[color:var(--accent-ocean)]">{label}</div>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
    {children}
  </section>
);

export default function Portfolio2D() {
  const [openId, setOpenId] = useState(null);
  const openProject = projects.find((p) => p.id === openId);

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#0b0f14]" data-testid="portfolio-page">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f6f2]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="font-display text-lg font-bold tracking-tight">WALKFOLIO</div>
          <nav className="hidden items-center gap-6 font-body text-sm sm:flex">
            <a href="#about" className="hover:text-[color:var(--accent-ocean)]">About</a>
            <a href="#projects" className="hover:text-[color:var(--accent-ocean)]">Projects</a>
            <a href="#experience" className="hover:text-[color:var(--accent-ocean)]">Experience</a>
            <a href="#skills" className="hover:text-[color:var(--accent-ocean)]">Skills</a>
            <a href="#contact" className="hover:text-[color:var(--accent-ocean)]">Contact</a>
          </nav>
          <Link to="/" data-testid="enter-3d-world-button">
            <Button size="sm" className="gap-2"><Gamepad2 size={16} /> Enter 3D World</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" data-testid="portfolio-hero">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 460px at 18% 8%, rgba(43,179,177,0.16), transparent 60%), radial-gradient(760px 420px at 90% 0%, rgba(240,138,107,0.13), transparent 55%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 font-mono-ui text-xs uppercase tracking-[0.22em] text-[color:var(--accent-ocean)]">{owner.role}</div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {owner.name}
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-[color:var(--ui-text-muted)]">{owner.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects"><Button className="gap-2">View Projects <ArrowRight size={16} /></Button></a>
              <Button variant="outline" className="gap-2" data-testid="hero-resume-button"
                onClick={() => { track(EVENTS.RESUME_CLICKED, { from: "2d-hero" }); window.open(contact.resumeUrl, "_blank"); }}>
                <FileText size={16} /> Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <Section id="about" label="About" title="A bit about me">
        <div className="grid gap-8 sm:grid-cols-[1fr_260px]">
          <p className="font-body text-base leading-relaxed text-[color:var(--ui-text)]">{owner.bio}</p>
          <div className="space-y-4">
            <div>
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">Location</div>
              <div className="font-body text-sm">{owner.location}</div>
            </div>
            <div>
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">Education</div>
              <div className="font-body text-sm">{owner.education}</div>
            </div>
            <div>
              <div className="mb-1 font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">Interests</div>
              <div className="flex flex-wrap gap-1.5">{owner.interests.map((i) => <Badge key={i} variant="secondary">{i}</Badge>)}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" label="Work" title="Selected projects" testId="portfolio-projects">
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <button key={p.id} onClick={() => { setOpenId(p.id); track(EVENTS.PROJECT_OPENED, { project: p.id, from: "2d" }); }}
              data-testid={`portfolio-project-${p.id}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-40" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }}>
                <span className="absolute bottom-3 right-4 font-display text-6xl font-bold text-white/25">{p.number}</span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <span className="font-mono-ui text-xs text-[color:var(--ui-text-muted)]">{p.year}</span>
                </div>
                <p className="mt-2 line-clamp-2 font-body text-sm text-[color:var(--ui-text-muted)]">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{p.technologies.slice(0, 4).map((t) => <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>)}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" label="Journey" title="Experience">
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 h-full w-px bg-black/10" />
          {experience.map((e) => (
            <div key={e.id} className="relative mb-8 last:mb-0">
              <div className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[color:var(--accent-ocean)]" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-xl font-semibold">{e.role}</span>
                <span className="font-mono-ui text-xs text-[color:var(--ui-text-muted)]">{e.year} · {e.company}</span>
              </div>
              <p className="mt-1 max-w-2xl font-body text-sm leading-relaxed text-[color:var(--ui-text-muted)]">{e.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{e.technologies.map((t) => <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" label="Toolkit" title="Skills & tools">
        <div className="flex flex-wrap gap-2.5">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="font-display text-sm font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-20" data-testid="portfolio-contact">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0f14] p-10 text-white sm:p-16">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(600px 300px at 80% 20%, rgba(43,179,177,0.25), transparent 60%)" }} />
          <div className="relative">
            <div className="mb-2 font-mono-ui text-xs uppercase tracking-[0.22em] text-[color:var(--accent-ocean)]">Contact</div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{contact.headline}</h2>
            <p className="font-display text-4xl font-bold tracking-tight text-[color:var(--accent-ocean)] sm:text-5xl">{contact.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="gap-2" data-testid="portfolio-contact-email"
                onClick={() => { track(EVENTS.CONTACT_CLICKED, { via: "email", from: "2d" }); window.location.href = `mailto:${contact.email}`; }}>
                <Mail size={16} /> {contact.email}
              </Button>
              <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => window.open(social.linkedin, "_blank")}><Linkedin size={16} /> LinkedIn</Button>
              <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => window.open(social.github, "_blank")}><Github size={16} /> GitHub</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center font-mono-ui text-xs text-[color:var(--ui-text-muted)]">
          Prefer the fun way? <Link to="/" className="text-[color:var(--accent-ocean)] underline">Walk through my portfolio →</Link>
        </div>
      </section>

      {/* Simple project modal for 2D */}
      {openProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpenId(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="h-36" style={{ background: `linear-gradient(135deg, ${openProject.color}, ${openProject.color}99)` }} />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold">{openProject.title}</h3>
              <div className="font-mono-ui text-xs text-[color:var(--ui-text-muted)]">{openProject.year} · {openProject.role}</div>
              <p className="mt-3 font-body text-sm leading-relaxed">{openProject.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">{openProject.technologies.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button className="gap-2" onClick={() => window.open(openProject.demoUrl, "_blank")}><ExternalLink size={16} /> Live Demo</Button>
                <Button variant="ghost" className="gap-2" onClick={() => window.open(openProject.githubUrl, "_blank")}><Github size={16} /> GitHub</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
