import { ContactLinks } from "@/components/ui/ContactLinks";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function LeftPanel() {
  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[380px] lg:border-r border-[var(--color-border)] bg-[var(--color-bg-panel)] p-8 lg:p-10 flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="w-28 h-28 rounded-full bg-[var(--color-border)] mb-6" />
        <h1 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl text-[var(--color-text)] leading-tight mb-2">
          Franky Khoury Nicoletta
        </h1>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
          CTO &amp; Founding Engineer
        </p>
        <p className="text-sm italic text-[var(--color-text-tertiary)] mb-6">
          Building products from zero to one.
        </p>
        <ContactLinks />
      </div>
      <div className="border-t border-[var(--color-border)] pt-4 mt-6">
        <ChatWidget />
      </div>
    </aside>
  );
}
