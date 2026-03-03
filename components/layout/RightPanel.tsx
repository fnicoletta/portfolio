import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export function RightPanel() {
  return (
    <div className="lg:ml-[380px] flex-1">
      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16 lg:px-12">
        <AboutSection />
        <WorkSection />
        <SkillsSection />
      </div>
    </div>
  );
}
