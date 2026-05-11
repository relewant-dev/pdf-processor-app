const links = [
  { href: "/login", label: "Login" },
  { href: "/registration", label: "Registration" },
];

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero-card">
        <p className="eyebrow">Smart IDE App</p>
        <h1>Project structure is ready for product development.</h1>
        <p className="summary">
          The app directory now contains API, component, hook, model, type,
          login, and registration areas for a clean feature foundation.
        </p>
        <nav aria-label="Primary pages" className="link-row">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
