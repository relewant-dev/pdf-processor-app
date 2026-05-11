import { PromptComposer } from "./components/PromptComposer";

export default function Home() {
  return (
    <main className="home-shell" aria-labelledby="page-title">
      <section className="hero-panel">
        <h1 id="page-title">Ready when you are.</h1>
        <PromptComposer />
      </section>
    </main>
  );
}
