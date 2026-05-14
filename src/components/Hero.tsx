'use client';

import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const titleLine1 = ['Urejanje', 'gozda,'];
const titleLine2 = ['naša', 'strast.'];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set('.hero-badge, .hero-title .word, .hero-desc, .hero-actions, .hero-stats',
        { opacity: 1, y: 0 });
      return;
    }

    const mobile = window.innerWidth < 768;
    const d = (v: number) => mobile ? v * 0.5 : v;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-badge',        { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: d(0.55) }, 0.25)
      .fromTo('.hero-title .word',  { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: d(0.65), stagger: d(0.09) }, 0.45)
      .fromTo('.hero-desc',         { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: d(0.55) }, 0.82)
      .fromTo('.hero-actions',      { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: d(0.55) }, 1.0)
      .fromTo('.hero-stats',        { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: d(0.55) }, 1.15);

    // Animate numeric counters only
    const counterEls = contentRef.current.querySelectorAll<HTMLElement>('[data-count]');
    counterEls.forEach(el => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: mobile ? 1 : 2,
        delay: 1.3,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(counter.val) + suffix; },
      });
    });
  }, { scope: contentRef });

  return (
    <section id="hero">
      <div className="hero-photo-wrapper" style={{
        backgroundImage: 'url("/slike/web/11-traktor-zerjav-dviga-les.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: '60% 70%',
        backgroundRepeat: 'no-repeat',
      }} />
      <div className="hero-bg" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Profesionalne gozdarske storitve
        </div>

        <h1 className="hero-title">
          {titleLine1.map((w, i) => <Fragment key={i}><span className="word">{w}</span>{' '}</Fragment>)}
          <br />
          {titleLine2.map((w, i) => (
            <Fragment key={i}><span className={`word${i === 0 ? ' word-accent' : ''}`}>{w}</span>{i < titleLine2.length - 1 ? ' ' : ''}</Fragment>
          ))}
        </h1>

        <p className="hero-desc">
          Sečnja, spravilo lesa in vzdrževanje gozdnih površin z izkušnjo, natančnostjo in spoštovanjem do narave. Pokrivamo območje celotne vzhodne Štajerske.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" width={17} height={17}>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
            Stopite v stik
          </a>
          <a href="#services" className="btn-outline">
            Naše storitve
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" width={16} height={16}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num" data-count="7" data-suffix="+">7+</div>
            <div className="stat-label">Let izkušenj</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-num" data-count="100" data-suffix="%">100%</div>
            <div className="stat-label">Zadovoljstvo strank</div>
          </div>
          <div className="stat-divider stat-hide-mobile" />
          <div className="stat-item stat-hide-mobile">
            <div className="stat-num">Po dogovoru</div>
            <div className="stat-label">Delovni čas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
