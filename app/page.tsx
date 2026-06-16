import { PromptComposer } from "./components/PromptComposer";

const Home = () => {
  return (
    <main className="flex min-h-screen justify-center px-6 py-2.5 max-[560px]:px-3.5" aria-labelledby="page-title">
      <section className="flex w-full max-w-[770px] flex-col items-center gap-[52px] max-[560px]:gap-9">
        <h1 id="page-title" className="m-0 text-center text-[clamp(1.35rem,2.8vw,1.5rem)] font-normal leading-tight tracking-[-0.02em]">
          Ready when you are.
        </h1>
        <PromptComposer />
      </section>
    </main>
  );
};

export default Home;
