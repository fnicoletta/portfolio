import { skillCategories } from "@/lib/data";

export function SkillsMarquee() {
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ skill, category: cat.label }))
  );

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

      <div className="flex gap-3 animate-marquee">
        {/* Duplicate for seamless loop */}
        {[...allSkills, ...allSkills].map((item, i) => (
          <span
            key={`${item.skill}-${i}`}
            className="flex-none text-sm px-3.5 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] hover:shadow-[0_0_8px_rgba(0,255,136,0.15)] transition-all duration-200"
          >
            {item.skill}
          </span>
        ))}
      </div>
    </div>
  );
}
