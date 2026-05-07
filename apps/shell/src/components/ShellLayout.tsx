import React, { Suspense } from 'react';

const Sidebar = React.lazy(() => import('sidebarMf/SidebarApp'));
const Chat = React.lazy(() => import('chatMf/ChatApp'));

function MicrofrontendFallback({ label }: { label: string }) {
  return <div className="text-sm text-neutral-500">Loading {label}…</div>;
}

export function ShellLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-neutral-950 [font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_86%,rgba(0,0,0,0.055),transparent_28rem)]">
      <div className="fixed right-[1.85rem] top-5 z-10" aria-label="Workspace controls">
        <Suspense fallback={<MicrofrontendFallback label="workspace" />}>
          <Sidebar />
        </Suspense>
      </div>

      <main className="relative min-h-screen" aria-label="Smart IDE chat workspace">
        <Suspense fallback={<MicrofrontendFallback label="chat" />}>
          <Chat />
        </Suspense>
      </main>
    </div>
  );
}
