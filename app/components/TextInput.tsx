import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextInput = ({ label, className = "", ...props }: TextInputProps) => {
  return (
    <label className="min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <input
        className={[
          "w-full border-0 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-55",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </label>
  );
};
