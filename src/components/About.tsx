'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current || !imgRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([textRef.current, imgRef.current], { opacity: 1, x: 0, y: 0 });
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
              <div className="num">7+</div>
              <div className="lbl">Let izkušenj</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
