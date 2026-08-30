import React from "react";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { Modal } from "@/components/overlay/GlassPanel";
import { contact, social } from "@/data/site";
import { track, EVENTS } from "@/lib/analytics";

const ActionButton = ({ icon: Icon, label, sub, onClick, testId }) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className="group flex items-center gap-3 rounded-2xl border border-[color:var(--ui-border-2)] bg-white/60 p-4 text-left transition-transform hover:-translate-y-0.5 hover:shadow-[var(--ui-shadow-tight)]"
  >
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--accent-ocean)]/12 text-[color:var(--accent-ocean)]">
      <Icon size={20} />
    </span>
    <span>
      <span className="block font-display text-sm font-semibold">{label}</span>
      <span className="block font-mono-ui text-[11px] text-[color:var(--ui-text-muted)]">{sub}</span>
    </span>
  </button>
);

export const ContactPanel = ({ onClose }) => {
  return (
    <Modal onClose={onClose} testId="contact-panel" title="Contact" maxWidth="max-w-lg">
      <div className="p-6 sm:p-8">
        <div className="mb-1 font-mono-ui text-xs uppercase tracking-[0.18em] text-[color:var(--accent-ocean)]">
          Contact Cafe
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight">{contact.headline}</h2>
        <p className="font-display text-3xl font-bold tracking-tight text-[color:var(--accent-ocean)]">{contact.subhead}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ActionButton
            icon={Mail} label="Email Me" sub={contact.email} testId="contact-email-button"
            onClick={() => { track(EVENTS.CONTACT_CLICKED, { via: "email" }); window.location.href = `mailto:${contact.email}`; }}
          />
          <ActionButton
            icon={Linkedin} label="LinkedIn" sub="Let's connect" testId="contact-linkedin-button"
            onClick={() => { track(EVENTS.CONTACT_CLICKED, { via: "linkedin" }); window.open(social.linkedin, "_blank"); }}
          />
          <ActionButton
            icon={Github} label="GitHub" sub="See my code" testId="contact-github-button"
            onClick={() => { track(EVENTS.GITHUB_CLICKED, { via: "contact" }); window.open(social.github, "_blank"); }}
          />
          <ActionButton
            icon={FileText} label="Download Resume" sub="PDF" testId="contact-resume-button"
            onClick={() => { track(EVENTS.RESUME_CLICKED, { from: "contact" }); window.open(contact.resumeUrl, "_blank"); }}
          />
        </div>
      </div>
    </Modal>
  );
};
