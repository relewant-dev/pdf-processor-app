import { useState } from 'react';
import { Composer } from './components/Composer';

type Msg = { role: 'user' | 'assistant'; text: string };

function WelcomePrompt() {
  return <h1 className="chat-welcome-title">Ready when you are.</h1>;
}

function ConversationThread({ messages }: { messages: Msg[] }) {
  if (messages.length === 0) return null;

  return (
    <div className="conversation-thread" aria-live="polite">
      {messages.map((message, index) => (
        <article key={`${message.role}-${index}`} className={`message-bubble message-bubble--${message.role}`}>
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
    <section className="chat-app" aria-label="Smart IDE assistant">
      <div className="chat-app__content">
        <WelcomePrompt />
        <ConversationThread messages={messages} />
        <Composer onSend={onSend} />
      </div>
    </section>
  );
}
