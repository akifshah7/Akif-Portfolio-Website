/* Helpers, animated background, cursor, nav */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- icons ---------- */
const IArrow = (p) => (
  <svg className="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IUpRight = (p) => (
  <svg className="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
const IMail = (p) => (
  <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);

/* ---------- reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(el.contains(n) ? n : n));
    if (el.classList.contains("reveal")) io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- count up ---------- */
function CountUp({ to, suffix = "", dur = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reduce) { setVal(to); return; }
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="n">{val}<span className="unit">{suffix}</span></span>;
}

/* ---------- magnetic button ---------- */
function Magnetic({ children, strength = 0.35, className = "", ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { ref.current.style.transform = "translate(0,0)"; };
  return (
    <span ref={ref} className={"magnetic " + className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-flex", transition: "transform .35s cubic-bezier(.22,1,.36,1)" }} {...rest}>
      {children}
    </span>
  );
}

/* ---------- animated background ---------- */
function Background() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="mesh m1" />
      <div className="mesh m2" />
      <div className="mesh m3" />
      <div className="grid-overlay" />
      <div className="noise" />
    </div>
  );
}

/* ---------- cursor ---------- */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (matchMedia("(max-width: 820px)").matches) return;
    let rx = innerWidth / 2, ry = innerHeight / 2, dx = rx, dy = ry;
    const move = (e) => { dx = e.clientX; dy = e.clientY; if (dot.current) dot.current.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; };
    const loop = () => { rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    const over = (e) => { if (e.target.closest("a,button,.magnetic,image-slot,[data-hot]")) ring.current?.classList.add("hot"); };
    const out = (e) => { if (e.target.closest("a,button,.magnetic,image-slot,[data-hot]")) ring.current?.classList.remove("hot"); };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    const id = requestAnimationFrame(loop);
    return () => { removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); cancelAnimationFrame(id); };
  }, []);
  return (<>
    <div ref={dot} className="cursor-dot" />
    <div ref={ring} className="cursor-ring" />
  </>);
}

/* ---------- scroll progress ---------- */
function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.width = (p * 100) + "%";
    };
    addEventListener("scroll", on, { passive: true });
    on();
    return () => removeEventListener("scroll", on);
  }, []);
  return <div ref={ref} className="progress" />;
}

/* ---------- nav ---------- */
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
];
function Nav() {
  const D = window.PORTFOLIO;
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    const contact = document.getElementById("contact"); if (contact) io.observe(contact);
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > lastY.current && y > 400);
      lastY.current = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <nav className={"nav" + (hidden ? " hidden" : "")}>
      <a href="#top" className="nav-logo"><span className="dot" />{D.initials}<span style={{ color: "var(--faint)", fontWeight: 400 }}>/dev</span></a>
      <div className="nav-links">
        {SECTIONS.map((s) => (
          <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>{s.label}</a>
        ))}
      </div>
      <a href="#contact" className="nav-cta">Get in touch</a>
    </nav>
  );
}

Object.assign(window, { IArrow, IUpRight, IMail, useReveal, CountUp, Magnetic, Background, Cursor, Progress, Nav });
