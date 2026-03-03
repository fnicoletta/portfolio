import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export function RightPanel() {
  return (
    <div className="min-w-0">
      <div className="max-w-3xl mx-auto px-6 py-8 lg:py-10 lg:px-10">
        <AboutSection />
        <WorkSection />
        <SkillsSection />
      </div>
    </div>
  );
}
