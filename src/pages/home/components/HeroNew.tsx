import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroNew.css';

gsap.registerPlugin(ScrollTrigger);

const PORTAL_IMAGE_DESKTOP =
  '/images/6fdffa8d93f2.webp';

const PORTAL_IMAGE_MOBILE =
  '/images/308e732d1a09.webp';

export default function HeroNew() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Normalize scroll on all devices — elimină micro-scroll-ul inițial pe mobil
    ScrollTrigger.normalizeScroll(true);

    const ctx = gsap.context(() => {
      // Track cue state — prevents fighting between scroll and initial animation
      const cueReady = { current: false };
      let cueHidden = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 2.5,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            if (!cueReady.current) return;
            // Fade OUT: at 26% progress (~70% of old 37% threshold)
            if (self.progress > 0.26 && !cueHidden) {
              cueHidden = true;
              gsap.to('.lh-scroll-cue', {
                opacity: 0,
                y: -8,
                duration: 0.7,
                ease: 'power2.in',
                overwrite: 'auto',
              });
            }
            // Fade IN back: when scrolling back below 18% (hysteresis gap prevents flicker)
            else if (self.progress < 0.18 && cueHidden) {
              cueHidden = false;
              gsap.to('.lh-scroll-cue', {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          },
        },
      });

      /* ── Portal zoom: animăm ambele imagini mereu.
         CSS decide care e vizibilă (desktop/mobile).
         Fiecare are transformOrigin propriu. ── */
      tl.to(
        '.lh-portal-img--desktop',
        {
          scale: 3,
          z: 350,
          transformOrigin: 'center center',
          ease: 'power2.inOut',
          duration: 6,
        },
        0,
      );

      tl.to(
        '.lh-portal-img--mobile',
        {
          scale: 2.4,
          z: 200,
          transformOrigin: 'center 32%',
          ease: 'power2.inOut',
          duration: 6,
        },
        0,
      );

      tl.to(
        '.lh-bg-img',
        {
          filter: 'blur(0px) brightness(1.15) saturate(1.05)',
          scale: 1,
          ease: 'power1.inOut',
          duration: 5.5,
        },
        0,
      );

      tl.to(
        '.lh-headline',
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'power3.out',
          duration: 1.8,
        },
        2.0,
      );

      tl.to(
        '.lh-subheadline',
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'power3.out',
          duration: 1.6,
        },
        3.75,
      );

      tl.to({}, { duration: 1.0 }, 6.6);

      // Cue is NO LONGER in the scrub timeline — managed by onUpdate above

      // Fade in scroll cue on mount — instant, very short delay
      gsap.fromTo(
        '.lh-scroll-cue',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          delay: 0.3,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            // Now onUpdate can safely control the cue
            cueReady.current = true;
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="lh-hero-container" ref={containerRef}>
      <section className="lh-hero">
        <div className="lh-bg-img" />
        <div className="lh-portal-wrap">
          <img
            className="lh-portal-img lh-portal-img--desktop"
            src={PORTAL_IMAGE_DESKTOP}
            alt="Intrare Lighthouse"
            draggable={false}
          />
          <img
            className="lh-portal-img lh-portal-img--mobile"
            src={PORTAL_IMAGE_MOBILE}
            alt="Intrare Lighthouse"
            draggable={false}
          />
        </div>
        <div className="lh-text-layer">
          <h1 className="lh-headline">
            Luminăm primii pași
            <br />
            ai copilului tău
          </h1>
          <p className="lh-subheadline">
            Un loc sigur, cald și atent construit
            <br />
            pentru începuturile care contează
          </p>
        </div>

        <button
          className="lh-scroll-cue"
          onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
          aria-label="Navighează spre conținut"
          type="button"
        >
          <span className="lh-scroll-cue__label">Navighează</span>
          <div className="lh-scroll-cue__track">
            <div className="lh-scroll-cue__pulse" />
          </div>
          <div className="lh-scroll-cue__tip" />
        </button>
      </section>
    </div>
  );
}
