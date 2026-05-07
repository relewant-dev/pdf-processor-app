function WorkspaceStatusIcon() {
  return (
    <svg className="workspace-status-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.5 4.7A8 8 0 0 1 19.3 8.5" />
      <path d="M19.3 15.5A8 8 0 0 1 15.5 19.3" />
      <path d="M8.5 19.3A8 8 0 0 1 4.7 15.5" />
      <path d="M4.7 8.5A8 8 0 0 1 8.5 4.7" />
    </svg>
  );
}

export default function SidebarApp() {
  return (
    <button className="workspace-status-button" type="button" aria-label="Open workspace status">
      <WorkspaceStatusIcon />
    </button>
  );
}
