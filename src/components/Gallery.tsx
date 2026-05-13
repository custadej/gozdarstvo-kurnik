'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { galleryImages } from '@/data/gallery';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 6;

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width={14} height={14}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export default function Gallery() {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [fadeImg, setFadeImg] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateItems = (items: NodeListOf<Element>) => {
      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      });
    };

    const header = sectionRef.current.querySelectorAll('.gallery-header, .gallery-show-all');
    const items = sectionRef.current.querySelectorAll('.gallery-item');
    animateItems(header);
    animateItems(items);
  }, { scope: sectionRef, dependencies: [showAll] });

  const closeLb = () => setLbIdx(null);

  const moveLb = (dir: number) => {
    setFadeImg(false);
    setTimeout(() => {
      setLbIdx(prev => prev === null ? 0 : (prev + dir + galleryImages.length) % galleryImages.length);
      setFadeImg(true);
    }, 120);
  };

  const openLb = (idx: number) => { setLbIdx(idx); setFadeImg(true); };

  const handleShowAll = () => {
    setShowAll(true);
  };

  useEffect(() => {
    document.body.style.overflow = lbIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) moveLb(delta > 0 ? 1 : -1);
  };

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="gallery-header">
        <span className="section-tag">Galerija</span>
        <h2 className="section-title">Naše delo v slikah</h2>
        <p className="section-desc">Fotografije iz naših projektov v gozdu in na terenu.</p>
      </div>

      <div className="gallery-masonry">
        {visibleImages.map((img, i) => (
          <div
            key={img.src}
            className="gallery-item"
            onClick={() => openLb(galleryImages.indexOf(img))}
            role="button"
            tabIndex={0}
            aria-label={`Odpri sliko: ${img.alt}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openLb(galleryImages.indexOf(img)); }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 400px"
              loading={i < 4 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="gallery-overlay">
              <span className="gallery-zoom-icon"><ZoomIcon /></span>
            </div>
          </div>
        ))}
      </div>

      {!showAll && galleryImages.length > INITIAL_COUNT && (
        <div className="gallery-show-all">
          <button className="btn-show-all" onClick={handleShowAll}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            Oglejte si vso galerijo — še {galleryImages.length - INITIAL_COUNT} fotografij
          </button>
        </div>
      )}

      {/* Lightbox */}
      <div
        className={`lightbox${lbIdx !== null ? ' open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Galerija slik"
      >
        <div className="lb-backdrop" onClick={closeLb} />
        <button className="lb-close" onClick={closeLb} aria-label="Zapri">&#x2715;</button>
        <button className="lb-nav lb-prev" onClick={() => moveLb(-1)} aria-label="Prejšnja">&#x2039;</button>
        <div className="lb-img-wrap">
          {lbIdx !== null && (
            <Image
              src={galleryImages[lbIdx].src}
              alt={galleryImages[lbIdx].alt}
              width={1200}
              height={800}
              sizes="90vw"
              priority
              style={{
                maxWidth: 'min(90vw, 900px)',
                maxHeight: '80vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                display: 'block',
                opacity: fadeImg ? 1 : 0,
                transition: 'opacity 0.15s ease',
              }}
            />
          )}
          {lbIdx !== null && (
            <p className="lb-caption">{galleryImages[lbIdx].alt}</p>
          )}
        </div>
        <button className="lb-nav lb-next" onClick={() => moveLb(1)} aria-label="Naslednja">&#x203A;</button>
        <div className="lb-counter">
          {galleryImages.map((_, i) => (
            <span
              key={i}
              className={`lb-dot${i === lbIdx ? ' active' : ''}`}
              onClick={() => { setFadeImg(false); setTimeout(() => { setLbIdx(i); setFadeImg(true); }, 120); }}
              role="button"
              aria-label={`Slika ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
