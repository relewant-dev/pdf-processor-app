function WorkspaceStatusIcon() {
  return (
    <svg className="size-[19px] fill-none stroke-current [stroke-linecap:round] [stroke-width:1.9]" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.5 4.7A8 8 0 0 1 19.3 8.5" />
      <path d="M19.3 15.5A8 8 0 0 1 15.5 19.3" />
      <path d="M8.5 19.3A8 8 0 0 1 4.7 15.5" />
      <path d="M4.7 8.5A8 8 0 0 1 8.5 4.7" />
    </svg>
  );
}

export default function SidebarApp() {
  return (
    <button className="grid size-[22px] cursor-pointer place-items-center rounded-full border-0 bg-transparent text-neutral-950 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none" type="button" aria-label="Open workspace status">
      <WorkspaceStatusIcon />
    </button>
  );
}
