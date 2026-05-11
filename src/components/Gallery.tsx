'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/slike/web/3-traktor-prikolica-gozd-listje.jpg', alt: 'Traktor s prikolico v gozdu', cls: 'gi-1' },
  { src: '/slike/web/4-slika-na-drevi.jpg', alt: 'Arboristika – delavec na drevesu', cls: 'gi-2' },
  { src: '/slike/web/5-delavec-forwarder-gozd-jesen.jpg', alt: 'Delavec z forwarderjem v jesenskem gozdu', cls: 'gi-3' },
  { src: '/slike/web/6-traktor-posek-veje-nebo.jpg', alt: 'Traktor pri poseku', cls: 'gi-4' },
  { src: '/slike/web/7-traktor-prikolica-teren-gozd.jpg', alt: 'Traktor s prikolico na terenu', cls: 'gi-5' },
  { src: '/slike/web/8-traktor-prikolica-posek-gozd.jpg', alt: 'Spravilo lesa v gozdu', cls: 'gi-6' },
  { src: '/slike/web/9-delavec-forwarder-les.jpg', alt: 'Delavec pri nalaganju lesa', cls: 'gi-7' },
];

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export default function Gallery() {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [fadeImg, setFadeImg] = useState(true);
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
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  const closeLb = () => setLbIdx(null);

  const moveLb = (dir: number) => {
    setFadeImg(false);
    setTimeout(() => {
      setLbIdx(prev => prev === null ? 0 : (prev + dir + galleryImages.length) % galleryImages.length);
      setFadeImg(true);
    }, 120);
  };

  const openLb = (idx: number) => {
    setLbIdx(idx);
    setFadeImg(true);
  };

  useEffect(() => {
    document.body.style.overflow = lbIdx !== null ? 'hidden' : '';
  }, [lbIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lbIdx === null) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') moveLb(-1);
      if (e.key === 'ArrowRight') moveLb(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="gallery-header gsap-fade">
        <span className="section-tag">Galerija</span>
        <h2 className="section-title">Naše delo v slikah</h2>
        <p className="section-desc">Fotografije iz naših projektov v gozdu in na terenu.</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`gallery-item ${img.cls} gsap-fade`}
            onClick={() => openLb(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span className="gallery-zoom-icon"><ZoomIcon /></span>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div className={`lightbox${lbIdx !== null ? ' open' : ''}`}>
        <div className="lb-backdrop" onClick={closeLb} />
        <button className="lb-close" onClick={closeLb} aria-label="Zapri">&#x2715;</button>
        <button className="lb-nav lb-prev" onClick={() => moveLb(-1)} aria-label="Prejšnja">&#x2039;</button>
        <div className="lb-img-wrap">
          {lbIdx !== null && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={galleryImages[lbIdx].src}
              alt={galleryImages[lbIdx].alt}
              style={{ opacity: fadeImg ? 1 : 0, transition: 'opacity 0.15s ease' }}
            />
          )}
        </div>
        <button className="lb-nav lb-next" onClick={() => moveLb(1)} aria-label="Naslednja">&#x203A;</button>
        <div className="lb-counter">
          {galleryImages.map((_, i) => (
            <span
              key={i}
              className={`lb-dot${i === lbIdx ? ' active' : ''}`}
              onClick={() => { setFadeImg(false); setTimeout(() => { setLbIdx(i); setFadeImg(true); }, 120); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
