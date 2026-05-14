'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const touchHandled = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const btn = document.getElementById('scrollTop');
      if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('nav')) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  // Body scroll lock + Lenis control
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const lenis = window.lenis;
    if (lenis) menuOpen ? lenis.stop() : lenis.start();
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    touchHandled.current = true;
    setMenuOpen(v => !v);
  };

  const handleClick = () => {
    if (touchHandled.current) {
      touchHandled.current = false;
      return;
    }
    setMenuOpen(v => !v);
  };

  const close = () => setMenuOpen(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      {/* Logo — always left */}
      <a href="#hero" className="nav-logo">
        <Image
          src="/slike/web/0-logotip.png"
          alt="Gozdarstvo Kurnik"
          width={52}
          height={52}
          className="nav-logo-img"
          priority
          style={{ width: 'auto', height: '52px' }}
        />
        <div className="nav-logo-text">
          <div className="name">Gozdarstvo Kurnik</div>
          <div className="sub">Blaž Kurnik, dop. dej.</div>
        </div>
      </a>

      {/* Desktop nav — right side */}
      <ul className="nav-links">
        <li><a href="#about">O nas</a></li>
        <li><a href="#services">Storitve</a></li>
        <li><a href="#gallery">Galerija</a></li>
        <li><a href="#contact" className="nav-cta">Kontakt</a></li>
      </ul>

      {/* Mobile controls — right side */}
      <div className="nav-mobile-ctrl">
        <button
          className={`hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Zapri meni' : 'Odpri meni'}
          aria-expanded={menuOpen}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          style={{
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 101,
          }}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          className="nav-mobile-menu"
          onClick={close}
          style={{ touchAction: 'auto', pointerEvents: 'auto' }}
        >
          <li><a href="#about">O nas</a></li>
          <li><a href="#services">Storitve</a></li>
          <li><a href="#gallery">Galerija</a></li>
          <li><a href="#contact">Kontakt</a></li>
          <li>
            <a href="tel:+38631316311" className="nav-mobile-cta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" width={17} height={17}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              Pokličite nas: 031 316 311
            </a>
          </li>
        </ul>
      )}

      <button
        id="scrollTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Na vrh"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
          strokeLinecap="round" width={20} height={20}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </nav>
  );
}
