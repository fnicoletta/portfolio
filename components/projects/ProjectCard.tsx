"use client";

import { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const typeColors = {
    web: "text-cyan border-cyan/30 hover:border-cyan",
    game: "text-magenta border-magenta/30 hover:border-magenta",
    tool: "text-yellow border-yellow/30 hover:border-yellow",
  };

  const typeBadgeColors = {
    web: "border-cyan/50 text-cyan",
    game: "border-magenta/50 text-magenta",
    tool: "border-yellow/50 text-yellow",
  };

  const typeLabel = {
    web: "WEB",
    game: "GAME",
    tool: "TOOL",
  };

  const linkColors = {
    web: "text-cyan/70 hover:text-cyan",
    game: "text-magenta/70 hover:text-magenta",
    tool: "text-yellow/70 hover:text-yellow",
  };

  return (
    <article
      className={`group relative border bg-coal p-4 transition-all duration-300 ${typeColors[project.type]}`}
    >
      {/* Index number */}
      <div className="absolute -left-px -top-px bg-void px-2 py-1 font-pixel text-[10px] text-smoke">
        [{String(index + 1).padStart(2, "0")}]
      </div>

      {/* Type badge */}
      <div
        className={`absolute -right-px -top-px border bg-void px-2 py-1 font-terminal text-[10px] ${typeBadgeColors[project.type]}`}
      >
        {typeLabel[project.type]}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="mb-2 font-terminal text-sm text-white">
          {project.title}
        </h3>

        <p className="mb-4 font-terminal text-xs leading-relaxed text-silver">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-ash bg-shadow px-2 py-0.5 font-terminal text-[10px] text-smoke"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-terminal text-xs transition-colors ${linkColors[project.type]}`}
            >
              [VIEW]
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-terminal text-xs transition-colors ${linkColors[project.type]}`}
            >
              [CODE]
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
