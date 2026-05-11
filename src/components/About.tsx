'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.gsap-fade');
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="about-grid">
        <div className="about-visual gsap-fade">
          <div className="about-photo-wrapper">
            <Image
              src="/slike/web/2-portret-blaz-kurnik.jpg"
              alt="Blaž Kurnik – Gozdarstvo Kurnik"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div className="about-badge-box">
            <div className="num">7+</div>
            <div className="lbl">Let izkušenj</div>
          </div>
        </div>

        <div className="about-text gsap-fade">
          <span className="section-tag">O podjetju</span>
          <h2 className="section-title">Gozdarska storitev, ki ji lahko zaupate</h2>
          <p className="section-desc">
            Gozdarstvo Kurnik vodi <strong>Blaž Kurnik</strong> kot dopolnilno dejavnost na kmetiji. Z izkušnjami v gozdarstvu ponujamo profesionalne storitve sečnje, spravila lesa in nege gozdov na območju vzhodne Štajerske.
          </p>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Naš pristop temelji na varnosti, natančnosti in ekološki odgovornosti. Vsako delo opravimo pravočasno, v dogovorjenem obsegu in po konkurenčnih cenah.
          </p>
          <div className="about-features">
            <div className="feature-chip"><span className="dot" />Sečnja dreves</div>
            <div className="feature-chip"><span className="dot" />Spravilo lesa</div>
            <div className="feature-chip"><span className="dot" />Nega gozda</div>
            <div className="feature-chip"><span className="dot" />Vzdrž. gozdnih poti</div>
            <div className="feature-chip"><span className="dot" />Razrez hlodovine</div>
            <div className="feature-chip"><span className="dot" />Prodaja drv</div>
          </div>
        </div>
      </div>
    </section>
  );
}
