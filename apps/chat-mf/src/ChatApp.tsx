import { useState } from 'react';
import { Composer } from './components/Composer';

type Msg = { role: 'user' | 'assistant'; text: string };
const seed: Msg[] = [{ role: 'assistant', text: 'Hi! I am your coding copilot. Ask me to scaffold, debug, or explain architecture.' }];

export default function ChatApp() {
  const [messages, setMessages] = useState(seed);
  const onSend = (text: string) => {
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: `Got it — next step: ${text.slice(0, 60)}` }]);
  };
  return (
    <section className="chatRoot">
      <header className="top">Smart IDE Assistant</header>
      <div className="thread">
        {messages.map((m, i) => <article key={i} className={`msg ${m.role}`}>{m.text}</article>)}
      </div>
      <Composer onSend={onSend} />
    </section>
  );
}
