import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    num: '01', icon: 'ri-user-heart-line', accent: '#C97B4B', bg: 'rgba(201,123,75,0.14)', border: 'rgba(201,123,75,0.28)',
    title: 'Copilul în centrul actului educațional',
    text:  'Fiecare decizie pedagogică pleacă de la copil — nevoile, ritmul, curiozitățile și personalitatea sa unică.',
    emoji: '🧒',
  },
  {
    num: '02', icon: 'ri-graduation-cap-line', accent: '#2E7A8F', bg: 'rgba(46,122,143,0.13)', border: 'rgba(46,122,143,0.28)',
    title: 'Profesori dedicați și în formare profesională continuă',
    text:  'Echipa noastră participă activ la programe de formare pentru a aduce mereu cele mai bune practici educaționale.',
    emoji: '📚',
  },
  {
    num: '03', icon: 'ri-parent-line', accent: '#C97B4B', bg: 'rgba(201,123,75,0.14)', border: 'rgba(201,123,75,0.28)',
    title: 'Parteneriat real cu părinții',
    text:  'Comunicăm deschis, constant și sincer cu familiile, pentru că educația de calitate se construiește împreună.',
    emoji: '🤝',
  },
  {
    num: '04', icon: 'ri-shield-check-line', accent: '#2E7A8F', bg: 'rgba(46,122,143,0.13)', border: 'rgba(46,122,143,0.28)',
    title: 'Mediu sigur, cald și echilibrat',
    text:  'Spațiul fizic și emoțional sunt gândite pentru a oferi copilului confort, siguranță și predictibilitate zilnică.',
    emoji: '🏡',
  },
];

const playfulTags = [
  { label: 'Joacă', color: 'bg-brand-amber/15 text-brand-amber-dark border-brand-amber/25' },
  { label: 'Explorare', color: 'bg-brand-sage-light/40 text-brand-sage-dark border-brand-sage-dark/20' },
  { label: 'Creștere', color: 'bg-[#C4623A]/12 text-[#C4623A] border-[#C4623A]/25' },
  { label: 'Căldură', color: 'bg-marine-pale/20 text-marine-mid border-marine-pale/30' },
  { label: 'Curiozitate', color: 'bg-brand-amber-dark/10 text-brand-amber-dark border-brand-amber-dark/20' },
];

/* ─────────────────────────────────────────────
   MOBILE PINNED SECTION
───────────────────────────────────────────── */
function MobilePinnedSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const STEPS = points.length;

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: `+=${STEPS * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onEnter: () => setEntered(true),
        onUpdate: (self) => {
          const raw = self.progress * STEPS;
          const idx = Math.min(Math.floor(raw), STEPS - 1);
          setActiveIdx(idx);
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const active = points[activeIdx];

  return (
    /* Wrapper — ScrollTrigger va pina acest element */
    <div ref={wrapperRef} className="lg:hidden bg-brand-sand" style={{ height: '100vh' }}>

      {/* Fundal decorativ fix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,123,75,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Conținut centrat */}
      <div className="relative h-full flex flex-col justify-between px-6 pt-16 pb-10 overflow-hidden">

        {/* Header secțiune */}
        <div
          className="text-center"
          style={{ opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-px bg-brand-amber" />
            <span className="font-body text-brand-amber text-[10px] font-bold uppercase tracking-widest">Viziunea Lighthouse</span>
            <div className="w-6 h-px bg-brand-amber" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-brand-charcoal leading-tight">
            Punem accent pe lucruri importante
          </h2>
        </div>

        {/* Card punct activ */}
        <div className="flex-1 flex items-center justify-center py-4">
          {points.map((p, i) => (
            <div
              key={p.num}
              className="absolute w-full px-6"
              style={{
                opacity:   i === activeIdx ? 1 : 0,
                transform: i === activeIdx ? 'translateY(0) scale(1)' : activeIdx > i ? 'translateY(-18px) scale(0.97)' : 'translateY(18px) scale(0.97)',
                transition: 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: i === activeIdx ? 'auto' : 'none',
              }}
            >
              {/* Card interior */}
              <div
                className="rounded-2xl p-7 border"
                style={{ background: p.bg, borderColor: p.border }}
              >
                {/* Top row: watermark nr + emoji */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-display font-bold leading-none text-brand-charcoal/[0.08]"
                    style={{ fontSize: '5rem', lineHeight: 1 }}
                  >
                    {p.num}
                  </span>
                  <span className="text-4xl" role="img" aria-hidden="true">{p.emoji}</span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl border mb-4"
                  style={{ background: 'rgba(255,255,255,0.6)', borderColor: p.border }}
                >
                  <i className={`${p.icon} text-xl`} style={{ color: p.accent }} />
                </div>

                {/* Titlu */}
                <h3 className="font-display text-xl font-semibold text-brand-charcoal leading-tight mb-3">
                  {p.title}
                </h3>

                {/* Text */}
                <p className="font-body text-sm text-brand-text-mid leading-relaxed">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: progress dots + hint scroll */}
        <div className="flex flex-col items-center gap-3">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {points.map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full transition-all duration-400"
                style={{
                  width:      i === activeIdx ? '28px' : '8px',
                  background: i === activeIdx ? active.accent : '#D5CFC8',
                }}
              />
            ))}
          </div>
          {/* Hint */}
          {activeIdx < points.length - 1 && (
            <p
              className="font-body text-xs text-brand-text-light flex items-center gap-1"
              style={{ opacity: 0.65 }}
            >
              Scroll pentru mai mult
              <i className="ri-arrow-down-line text-xs" />
            </p>
          )}
          {activeIdx === points.length - 1 && (
            <p
              className="font-body text-xs text-brand-text-light flex items-center gap-1"
              style={{ opacity: 0.65 }}
            >
              Continuă spre activitățile noastre
              <i className="ri-arrow-down-line text-xs" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([]);

  /* header reveal (desktop) */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  /* which right-panel item is active (desktop) */
  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.45, rootMargin: '-22% 0px -22% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const active = points[activeIndex];

  return (
    <section className="bg-brand-sand">

      {/* ══════════════════════
          MOBILE PINNED SECTION
         ══════════════════════ */}
      <MobilePinnedSection />

      {/* ══════════════════════
          DESKTOP LAYOUT
         ══════════════════════ */}
      <div className="hidden lg:block">
        {/* Section header */}
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-16 lg:pb-20">
          <div className={`grid lg:grid-cols-2 gap-8 items-end transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-brand-amber" />
                <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Viziunea Lighthouse of Childhood</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-6">
                Punem accent pe lucruri importante
              </h2>
              <div className="flex flex-wrap gap-2">
                {playfulTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`font-body text-xs font-semibold px-3.5 py-1.5 rounded-full border ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-body text-brand-text-mid text-base leading-relaxed">
              Fiecare alegere educațională este gândită astfel încât copilul să fie văzut, înțeles și susținut
              într-un ritm potrivit vârstei sale.
            </p>
          </div>
        </div>

        {/* Split: sticky left + scrollable right */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24">

            {/* LEFT sticky panel */}
            <div>
              <div className="sticky top-28 self-start">
                <div className="relative" style={{ minHeight: '340px' }}>
                  {points.map((p, i) => (
                    <div
                      key={p.num}
                      className="absolute inset-0 flex flex-col justify-start"
                      style={{ opacity: i === activeIndex ? 1 : 0, transform: i === activeIndex ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.55s ease, transform 0.55s ease', pointerEvents: i === activeIndex ? 'auto' : 'none' }}
                    >
                      <div className="font-display font-bold leading-none text-brand-charcoal/[0.06]" style={{ fontSize: '9rem' }}>
                        {p.num}
                      </div>
                      <div className="flex items-center gap-3 -mt-8 mb-5">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl border" style={{ background: p.bg, borderColor: p.border }}>
                          <i className={`${p.icon} text-2xl`} style={{ color: p.accent }} />
                        </div>
                        <span className="text-3xl leading-none" role="img" aria-hidden="true">{p.emoji}</span>
                      </div>
                      <h3 className="font-display text-3xl font-semibold text-brand-charcoal leading-tight mb-4">
                        {p.title}
                      </h3>
                      <p className="font-body text-brand-text-mid leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-10">
                  {points.map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] rounded-full"
                      style={{ width: i === activeIndex ? '28px' : '8px', background: i === activeIndex ? active.accent : '#D5CFC8', transition: 'all 0.45s ease' }}
                    />
                  ))}
                </div>

                <div className="mt-10 relative">
                  <div className="flex gap-1 mb-3">
                    {['★','★','★','★','★'].map((s, i) => (
                      <span key={i} className="text-brand-amber text-xs">{s}</span>
                    ))}
                    <span className="font-body text-xs text-brand-text-light ml-2">Părinți fericiți</span>
                  </div>
                  <p className="font-display text-xl italic font-light text-brand-charcoal/50 leading-relaxed max-w-xs">
                    &ldquo;Luminăm calea cu atenție și căldură.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT scrollable items */}
            <div>
              {points.map((p, i) => (
                <div
                  key={p.num}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="flex flex-col justify-center py-10 lg:py-14"
                  style={{ minHeight: '65vh', borderBottom: i < points.length - 1 ? '1px solid rgba(213,207,200,0.6)' : 'none' }}
                >
                  <div
                    className="flex items-center gap-6 p-7 rounded-2xl border transition-all duration-500"
                    style={{
                      background: i === activeIndex ? p.bg : 'rgba(255,255,255,0.4)',
                      borderColor: i === activeIndex ? p.border : 'rgba(213,207,200,0.3)',
                      transform: i === activeIndex ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl border flex-shrink-0" style={{ background: p.bg, borderColor: p.border }}>
                        <i className={`${p.icon} text-xl`} style={{ color: p.accent }} />
                      </div>
                      <span className="text-xl leading-none" role="img" aria-hidden="true">{p.emoji}</span>
                    </div>
                    <div>
                      <div className="font-body text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
                        {p.num}
                      </div>
                      <p className="font-display text-lg font-semibold text-brand-charcoal leading-snug">{p.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
