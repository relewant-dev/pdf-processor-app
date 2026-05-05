import { FormEvent, useState } from 'react';

export function Composer({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  };
  return (
    <form onSubmit={submit} className="composer">
      <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Message Smart IDE assistant..." rows={2} />
      <button type="submit">Send</button>
    </form>
  );
}
