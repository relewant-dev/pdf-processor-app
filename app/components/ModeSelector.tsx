import type { ButtonHTMLAttributes } from "react";

type ModeSelectorProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export const ModeSelector = ({ value, className = "", ...props }: ModeSelectorProps) => {
  return (
    <button
      className={[
        "inline-flex items-center gap-1.5 rounded-[10px] border-0 bg-transparent px-2 py-2 text-sm text-neutral-400 transition duration-150 ease-out hover:bg-neutral-100 hover:text-neutral-600 max-[560px]:hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type="button"
      {...props}
    >
      <span>{value}</span>
      <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3">
        <path
          d="M3 4.5 6 7.5 9 4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};
