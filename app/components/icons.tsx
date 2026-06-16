type IconProps = {
  className?: string;
};

export const PlusIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
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

export const MicrophoneIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 14.5a3.5 3.5 0 0 0 3.5-3.5V6a3.5 3.5 0 0 0-7 0v5a3.5 3.5 0 0 0 3.5 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.55" />
      <path d="M5.75 11.25a6.25 6.25 0 0 0 12.5 0M12 17.5V21M9 21h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  );
};

export const VoiceWaveIcon = ({ className = "" }: IconProps) => {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.5 10v4M10.2 7.75v8.5M13.8 9.25v5.5M17.5 11v2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
};
