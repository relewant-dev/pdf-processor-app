type IconProps = {
  className?: string;
};

export const DocumentIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7 3.75h6.25L17 7.5v12.75H7V3.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M13 3.75V7.5h4M9.5 11.25h5M9.5 14.25h5M9.5 17.25h3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
};

export const SendIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 12h12.25M12.25 6.75 17.5 12l-5.25 5.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
