import type { ButtonHTMLAttributes } from "react";

type ModeSelectorProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function ModeSelector({ value, className = "", ...props }: ModeSelectorProps) {
  return (
    <button className={["mode-selector", className].filter(Boolean).join(" ")} type="button" {...props}>
      <span>{value}</span>
      <svg aria-hidden="true" viewBox="0 0 12 12" className="mode-selector__chevron">
        <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
