"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/lib/constants";

type FilterType = "all" | "web" | "game" | "tool";

export function ProjectGrid() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter);

  const filterButtons: { type: FilterType; label: string; color: string; activeColor: string }[] = [
    { type: "all", label: "ALL", color: "text-smoke hover:text-white", activeColor: "text-terminal" },
    { type: "web", label: "WEB", color: "text-smoke hover:text-cyan", activeColor: "text-cyan" },
    { type: "game", label: "GAMES", color: "text-smoke hover:text-magenta", activeColor: "text-magenta" },
    { type: "tool", label: "TOOLS", color: "text-smoke hover:text-yellow", activeColor: "text-yellow" },
  ];

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        <span className="font-pixel text-[10px] text-cyan">FILTER:</span>
        {filterButtons.map(({ type, label, color, activeColor }) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`font-terminal text-xs transition-all ${
              filter === type
                ? `${activeColor} text-glow-sm`
                : color
            }`}
          >
            [{label}]
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center font-terminal text-smoke">
          No projects found for this filter.
        </div>
      )}
    </div>
  );
}
