/* Root app */
const { useEffect: useEffectA } = React;

function App() {
  // global reveal observer (covers all .reveal across sections)
  useEffectA(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".reveal");
    if (reduce) { nodes.forEach((n) => n.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    // Synchronously reveal anything already on-screen (e.g. the hero); observe the rest.
    nodes.forEach((n) => {
      const top = n.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.92) n.classList.add("in");
      else io.observe(n);
    });
    // Failsafe: if a transition stalls or IO never fires (throttled/background tab,
    // slow load), force everything visible so content is never stuck hidden.
    const failsafe = setTimeout(() => nodes.forEach((n) => n.classList.add("in")), 2500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  return (
    <React.Fragment>
      <Background />
      <Cursor />
      <Progress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          <span className="copy">© 2026 {window.PORTFOLIO.name} — built from scratch.</span>
          <a href="#top" className="top">Back to top ↑</a>
        </div>
      </footer>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
