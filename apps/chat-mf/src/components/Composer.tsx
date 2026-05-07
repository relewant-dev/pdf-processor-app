import { FormEvent, useId, useState } from 'react';

type ComposerProps = {
  onSend: (msg: string) => void;
};

const iconStroke = 'fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';
const iconButton = 'grid size-[34px] place-items-center rounded-full border-0 bg-transparent text-neutral-950 transition hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none';

function PlusIcon() {
  return (
    <svg className={`${iconStroke} size-[21px]`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg className={`${iconStroke} size-[19px]`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 1 0 6 0V7a3 3 0 0 0-3-3Z" />
      <path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3M9 21h6" />
    </svg>
  );
}

function VoiceWaveIcon() {
  return (
    <svg className={`${iconStroke} size-5`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 9v6M10 6v12M14 8v8M18 10v4" />
    </svg>
  );
}

export function Composer({ onSend }: ComposerProps) {
  const [value, setValue] = useState('');
  const inputId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <form
      onSubmit={submit}
      className="grid min-h-[58px] w-[min(100%,770px)] grid-cols-[30px_minmax(0,1fr)_36px_40px] items-center gap-2 rounded-full border border-neutral-200 bg-white/95 py-[0.44rem] pl-2 pr-2 shadow-[0_14px_42px_rgba(0,0,0,0.08),0_2px_7px_rgba(0,0,0,0.05)] sm:grid-cols-[34px_minmax(0,1fr)_auto_34px_42px] sm:pl-3"
      aria-label="Ask Smart IDE"
    >
      <button className={iconButton} type="button" aria-label="Attach context">
        <PlusIcon />
      </button>

      <label htmlFor={inputId} className="sr-only">
        Ask anything
      </label>
      <textarea
        id={inputId}
        className="max-h-[100px] min-h-6 w-full resize-none overflow-hidden border-0 bg-transparent px-1 py-1 leading-6 text-neutral-950 outline-none placeholder:text-neutral-400"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask anything"
        rows={1}
      />

      <label className="hidden items-center sm:inline-flex">
        <span className="sr-only">Response mode</span>
        <select className="cursor-pointer border-0 bg-transparent px-0.5 py-1 text-[#8b8190] outline-none" defaultValue="instant" aria-label="Response mode">
          <option value="instant">Instant</option>
          <option value="plan">Plan</option>
          <option value="agent">Agent</option>
        </select>
      </label>

      <button className={iconButton} type="button" aria-label="Use microphone">
        <MicIcon />
      </button>

      <button className="grid size-10 place-items-center rounded-full border-0 bg-neutral-950 text-white transition hover:bg-neutral-800 focus-visible:bg-neutral-800 focus-visible:outline-none" type="submit" aria-label="Send message">
        <VoiceWaveIcon />
      </button>
    </form>
  );
}
