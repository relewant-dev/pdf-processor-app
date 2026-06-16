import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "plain" | "filled";
  children: ReactNode;
};

const iconButtonVariants = {
  plain: "h-8 w-8 bg-transparent text-neutral-950 hover:bg-neutral-100",
  filled: "h-10 w-10 bg-black text-white hover:bg-neutral-800",
};

export const IconButton = ({ label, variant = "plain", children, className = "", ...props }: IconButtonProps) => {
  return (
    <button
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full border-0 transition duration-150 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-55",
        iconButtonVariants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type="button"
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
};
