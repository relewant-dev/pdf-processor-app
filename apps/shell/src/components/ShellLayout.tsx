import React, { Suspense } from 'react';

const Sidebar = React.lazy(() => import('sidebarMf/SidebarApp'));
const Chat = React.lazy(() => import('chatMf/ChatApp'));

export function ShellLayout() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <Suspense fallback={<div className="loading">Loading workspace…</div>}>
          <Sidebar />
        </Suspense>
      </aside>
      <main className="chatPanel">
        <Suspense fallback={<div className="loading">Loading chat…</div>}>
          <Chat />
        </Suspense>
      </main>
    </div>
  );
}
