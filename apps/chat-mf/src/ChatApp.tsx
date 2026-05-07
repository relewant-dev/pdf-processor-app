import { useState } from 'react';
import { Composer } from './components/Composer';

type Msg = { role: 'user' | 'assistant'; text: string };

const messageClasses: Record<Msg['role'], string> = {
  user: 'justify-self-end bg-neutral-950 text-white',
  assistant: 'justify-self-start border border-neutral-200 bg-neutral-100 text-neutral-950'
};

function WelcomePrompt() {
  return <h1 className="m-0 text-[clamp(1.35rem,1.6vw,1.58rem)] font-normal leading-tight tracking-[0.005em] text-neutral-950">Ready when you are.</h1>;
}

function ConversationThread({ messages }: { messages: Msg[] }) {
  if (messages.length === 0) return null;

  return (
    <div className="grid max-h-[30vh] w-[min(100%,700px)] gap-3 overflow-auto" aria-live="polite">
      {messages.map((message, index) => (
        <article key={`${message.role}-${index}`} className={`max-w-[82%] rounded-2xl px-3.5 py-3 text-[0.95rem] leading-relaxed ${messageClasses[message.role]}`}>
          {message.text}
        </article>
      ))}
    </div>
  );
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Msg[]>([]);

  const onSend = (text: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text },
      { role: 'assistant', text: `I'm ready to help with: ${text.slice(0, 80)}` }
    ]);
  };

  return (
    <section className="grid min-h-screen items-start justify-items-center px-5 pb-8 pt-[clamp(9rem,31vh,20rem)] text-neutral-950" aria-label="Smart IDE assistant">
      <div className="grid w-[min(100%,770px)] justify-items-center gap-12 sm:gap-[3.25rem]">
        <WelcomePrompt />
        <ConversationThread messages={messages} />
        <Composer onSend={onSend} />
      </div>
    </section>
  );
}
