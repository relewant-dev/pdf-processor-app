import { FormEvent, useId, useState } from 'react';

type ComposerProps = {
  onSend: (msg: string) => void;
};

function PlusIcon() {
  return (
    <svg className="icon icon--plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg className="icon icon--mic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 1 0 6 0V7a3 3 0 0 0-3-3Z" />
      <path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3M9 21h6" />
    </svg>
  );
}

function VoiceWaveIcon() {
  return (
    <svg className="icon icon--voice-wave" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
    <form onSubmit={submit} className="composer" aria-label="Ask Smart IDE">
      <button className="composer__icon-button" type="button" aria-label="Attach context">
        <PlusIcon />
      </button>

      <label htmlFor={inputId} className="sr-only">
        Ask anything
      </label>
      <textarea
        id={inputId}
        className="composer__input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask anything"
        rows={1}
      />

      <label className="composer__mode-label">
        <span className="sr-only">Response mode</span>
        <select className="composer__mode-select" defaultValue="instant" aria-label="Response mode">
          <option value="instant">Instant</option>
          <option value="plan">Plan</option>
          <option value="agent">Agent</option>
        </select>
      </label>

      <button className="composer__icon-button" type="button" aria-label="Use microphone">
        <MicIcon />
      </button>

      <button className="composer__send-button" type="submit" aria-label="Send message">
        <VoiceWaveIcon />
      </button>
    </form>
  );
}
