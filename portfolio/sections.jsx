/* Page sections */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ---------- typed rotating role ---------- */
function useTyped(words, opts = {}) {
  const { type = 70, erase = 38, hold = 1500 } = opts;
  const [txt, setTxt] = useStateS("");
  const i = useRefS(0), ch = useRefS(0), del = useRefS(false);
  useEffectS(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setTxt(words[0]); return; }
    let to;
    const step = () => {
      const w = words[i.current % words.length];
      if (!del.current) {
        ch.current++;
        setTxt(w.slice(0, ch.current));
        if (ch.current === w.length) { del.current = true; to = setTimeout(step, hold); return; }
        to = setTimeout(step, type);
      } else {
        ch.current--;
        setTxt(w.slice(0, ch.current));
        if (ch.current === 0) { del.current = false; i.current++; to = setTimeout(step, 280); return; }
        to = setTimeout(step, erase);
      }
    };
    to = setTimeout(step, 600);
    return () => clearTimeout(to);
  }, []);
  return txt;
}

function Hero() {
  const D = window.PORTFOLIO;
  const role = useTyped(D.roles);
  const ref = useRef(null);
  // subtle parallax on the headline
  useEffect(() => {
    const el = ref.current;
    const on = () => { const y = scrollY; if (el) el.style.transform = `translateY(${y * 0.12}px)`; el.style.opacity = String(Math.max(0, 1 - y / 700)); };
    on(); // initialize immediately so any restored scroll position is reflected
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className="hero" id="top">
      <div className="wrap hero-inner" ref={ref}>
        <span className="status reveal"><span className="live" /> Available for new projects — 2026</span>
        <h1 className="reveal" style={{ transitionDelay: ".05s" }}>
          {D.name.split(" ")[0]}<br />
          <span className="grad">{D.name.split(" ").slice(1).join(" ")}.</span>
        </h1>
        <div className="role reveal" style={{ transitionDelay: ".12s" }}>
          <span className="arrow">→</span> I build <span className="rot">{role}</span><span className="caret" />
        </div>
        <p className="lede reveal" style={{ transitionDelay: ".18s" }}>{D.lede}</p>
        <div className="hero-cta reveal" style={{ transitionDelay: ".24s" }}>
          <Magnetic><a href="#work" className="btn btn-primary">View my work <IArrow /></a></Magnetic>
          <Magnetic><a href="#contact" className="btn btn-ghost">Let's talk <IUpRight /></a></Magnetic>
        </div>
        <div className="hero-stats reveal" style={{ transitionDelay: ".3s" }}>
          {D.stats.map((s, k) => (
            <div className="stat" key={k}>
              <CountUp to={s.n} suffix={s.suffix} />
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-hint"><span>Scroll</span><span className="line" /></div>
    </header>
  );
}

function SecHead({ num, eyebrow, title }) {
  return (
    <div className="sec-head reveal">
      <span className="sec-num">{num}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function About() {
  const D = window.PORTFOLIO;
  return (
    <section id="about" className="wrap">
      <SecHead num="( 01 )" eyebrow="About" title="Full stack engineer. Startup-built." />
      <div className="about-grid">
        <div className="about-copy reveal">
          {D.about.map((p, k) => (
            <p key={k} className={p.type === "muted" ? "muted" : ""} dangerouslySetInnerHTML={{ __html: p.text.replace(/<em>/g, '<span class="em">').replace(/<\/em>/g, "</span>") }} />
          ))}
        </div>
        <div className="about-side reveal" style={{ transitionDelay: ".12s" }}>
          <div className="about-photo glass">
            <image-slot id="about-photo" shape="rounded" radius="18" placeholder="Drop your photo" src="../akif_selfie.png"></image-slot>
          </div>
          <div className="about-facts glass">
            {D.facts.map((f, k) => (
              <div className="row" key={k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.accent ? <span className="av">{f.v}</span> : f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const D = window.PORTFOLIO;
  const loop = [...D.marquee, ...D.marquee];
  return (
    <section id="skills" className="wrap">
      <SecHead num="( 02 )" eyebrow="Toolkit" title="The stack I reach for." />
      <div className="marquee reveal">
        <div className="track">
          {loop.map((m, k) => <span className="item" key={k}>{m}</span>)}
        </div>
      </div>
      <div className="skills-grid">
        {D.skills.map((s, k) => (
          <div className="skill-cat glass reveal" key={k} style={{ transitionDelay: (k * 0.07) + "s" }}>
            <span className="ci">{s.cat}</span>
            <h3>{s.title}</h3>
            <ul>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, idx }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (matchMedia("(max-width:820px)").matches) return;
    const el = ref.current, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * 3}deg) rotateY(${px * 3}deg) translateY(-4px)`;
  };
  const onLeave = () => { ref.current.style.transform = ""; };
  return (
    <article className="project glass reveal" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transitionDelay: (idx * 0.05) + "s" }}>
      <div className="project-media">
        <span className="badge">{p.badge}</span>
        <image-slot id={p.slot} shape="rounded" radius="12" placeholder={"Drop a shot of " + p.title} src={p.img || ""}></image-slot>
      </div>
      <div className="project-body">
        <span className="pnum">PROJECT {p.num}</span>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="project-tags">{p.tags.map((t, k) => <span key={k}>{t}</span>)}</div>
        <a href={p.link} className="project-link">View on GitHub <IUpRight /></a>
      </div>
    </article>
  );
}

function Projects() {
  const D = window.PORTFOLIO;
  return (
    <section id="work" className="wrap">
      <SecHead num="( 03 )" eyebrow="Selected Work" title="Things I've built recently." />
      <div className="projects-list">
        {D.projects.map((p, k) => <ProjectCard p={p} idx={k} key={k} />)}
      </div>
    </section>
  );
}

function Experience() {
  const D = window.PORTFOLIO;
  return (
    <section id="experience" className="wrap">
      <SecHead num="( 04 )" eyebrow="Journey" title="Where I've worked." />
      <div className="timeline">
        {D.experience.map((e, k) => (
          <div className="tl-item reveal" key={k} style={{ transitionDelay: (k * 0.06) + "s" }}>
            <span className="node" />
            <span className="when">{e.when}</span>
            <h3>{e.role}</h3>
            <div className="org" dangerouslySetInnerHTML={{ __html: e.org }} />
            <p>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const D = window.PORTFOLIO;
  return (
    <section id="contact" className="wrap contact">
      <span className="eyebrow reveal" style={{ justifyContent: "center" }}>Contact</span>
      <h2 className="big reveal" style={{ transitionDelay: ".05s" }}>Let's build<br /><span className="grad">something great.</span></h2>
      <p className="sub reveal" style={{ transitionDelay: ".1s" }}>Have a project in mind, or just want to say hi? My inbox is always open.</p>
      <Magnetic className="mail-btn reveal" strength={0.25}>
        <a href={"mailto:" + D.email} className="btn btn-primary"><IMail /> {D.email}</a>
      </Magnetic>
      <div className="socials reveal" style={{ transitionDelay: ".15s" }}>
        {D.socials.map((s, k) => <a href={s.href} key={k} target="_blank" rel="noopener" {...(s.download ? { download: s.download } : {})}>{s.label} <IUpRight width="13" height="13" /></a>)}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, About, Skills, Projects, Experience, Contact });
