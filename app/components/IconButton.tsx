import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "plain" | "filled";
  children: ReactNode;
};

export function IconButton({ label, variant = "plain", children, className = "", ...props }: IconButtonProps) {
  return (
    <button
      className={["icon-button", `icon-button--${variant}`, className].filter(Boolean).join(" ")}
      type="button"
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}
