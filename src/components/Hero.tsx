'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const children = el.querySelectorAll('.hero-badge, .hero-title, .hero-desc, .hero-actions, .hero-stats');
    gsap.fromTo(
      children,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <section id="hero">
      <div className="hero-photo-wrapper">
        <Image
          src="/slike/web/1-traktor-forwarder-bliznji-pogled.jpg"
          alt="Gozdarstvo Kurnik pri delu"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
      </div>
      <div className="hero-bg" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">Profesionalne gozdarske storitve</div>
        <h1 className="hero-title">
          Vaš zaupanja vreden<br />
          <em>gozdarski partner</em>
        </h1>
        <p className="hero-desc">
          Sečnja, spravilo lesa in vzdrževanje gozdnih površin z izkušnjo, natančnostjo in spoštovanjem do narave. Pokrivamo območje celotne vzhodne Štajerske.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
            </svg>
            Pokličite nas
          </a>
          <a href="#services" className="btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Naše storitve
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">5+</div>
            <div className="stat-label">Let izkušenj</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">100%</div>
            <div className="stat-label">Zadovoljstvo strank</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">Po<br />dogovoru</div>
            <div className="stat-label">Delovni čas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
