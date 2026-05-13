'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '15+ let izkušenj',
    desc: 'Dolgoletne izkušnje v gozdarstvu zagotavljajo strokovno in varno izvedbo vsakega dela.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Moderna oprema',
    desc: 'Harvesteri, forwarderji in gozdarski traktorji zagotavljajo učinkovitost na vsakem terenu.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
        <path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 4" /><path d="M12 12c0-5 4-8 9-8" /><path d="M3 4c0 5 3 9 9 9" /><path d="M21 4c0 5-3 9-9 9" />
      </svg>
    ),
    title: 'Ekološki pristop',
    desc: 'Delo opravljamo z minimalnim vplivom na okolje in spoštovanjem do narave in gozda.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current || !imgRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([textRef.current, imgRef.current, '.about-feature-card'], { opacity: 1, x: 0, y: 0 });
      return;
    }

    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%', once: true },
      },
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: imgRef.current, start: 'top 85%', once: true },
      },
    );

    gsap.fromTo(
      '.about-feature-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-cards', start: 'top 88%', once: true },
      },
    );
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text" ref={textRef}>
            <span className="section-tag">O podjetju</span>
            <h2 className="section-title">Gozdarska storitev,<br />ki ji lahko zaupate</h2>
            <p className="section-desc">
              Gozdarstvo Kurnik vodi <strong>Blaž Kurnik</strong> kot dopolnilno dejavnost na kmetiji. Z dolgoletnimi izkušnjami v gozdarstvu ponujamo profesionalne storitve na območju vzhodne Štajerske.
            </p>
            <p className="section-desc" style={{ marginTop: '1rem' }}>
              Naš pristop temelji na varnosti, natančnosti in ekološki odgovornosti. Vsako delo opravimo pravočasno in po konkurenčnih cenah.
            </p>
            <div className="about-chips">
              {['Sečnja dreves', 'Spravilo lesa', 'Nega gozda', 'Vzdrževanje poti', 'Razrez hlodovine', 'Prodaja drv'].map(chip => (
                <span key={chip} className="feature-chip"><span className="dot" />{chip}</span>
              ))}
            </div>
            <a href="#contact" className="btn-primary about-cta">
              Stopite v stik →
            </a>
          </div>

          <div className="about-visual" ref={imgRef}>
            <div className="about-photo-wrapper">
              <Image
                src="/slike/web/2-portret-blaz-kurnik.png"
                alt="Blaž Kurnik – Gozdarstvo Kurnik"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div className="about-badge-box">
              <div className="num">15+</div>
              <div className="lbl">Let izkušenj</div>
            </div>
          </div>
        </div>

        <div className="about-cards">
          {featureCards.map((card, i) => (
            <div key={i} className="about-feature-card">
              <div className="about-feature-icon">{card.icon}</div>
              <h3 className="about-feature-title">{card.title}</h3>
              <p className="about-feature-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
