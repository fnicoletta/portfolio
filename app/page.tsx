import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function Home() {
  return (
    <main className="min-h-screen lg:flex">
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
