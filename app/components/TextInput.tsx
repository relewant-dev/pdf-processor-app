import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextInput({ label, className = "", ...props }: TextInputProps) {
  return (
    <label className="text-input-shell">
      <span className="sr-only">{label}</span>
      <input className={["text-input", className].filter(Boolean).join(" ")} {...props} />
    </label>
  );
}
