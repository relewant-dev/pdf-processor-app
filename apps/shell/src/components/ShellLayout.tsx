import React, { Suspense } from 'react';

const Sidebar = React.lazy(() => import('sidebarMf/SidebarApp'));
const Chat = React.lazy(() => import('chatMf/ChatApp'));

function MicrofrontendFallback({ label }: { label: string }) {
  return <div className="microfrontend-fallback">Loading {label}…</div>;
}

export function ShellLayout() {
  return (
    <div className="shell-layout">
      <div className="shell-layout__workspace-controls" aria-label="Workspace controls">
        <Suspense fallback={<MicrofrontendFallback label="workspace" />}>
          <Sidebar />
        </Suspense>
      </div>

      <main className="shell-layout__main" aria-label="Smart IDE chat workspace">
        <Suspense fallback={<MicrofrontendFallback label="chat" />}>
          <Chat />
        </Suspense>
      </main>
    </div>
  );
}
