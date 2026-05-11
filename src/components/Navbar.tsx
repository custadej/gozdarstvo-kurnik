'use client';

import { useEffect, useRef, useState } from 'react';

const LogoSvg = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,8 30,38 40,38 25,62 38,62 22,85 78,85 62,62 75,62 60,38 70,38" fill="#6aab3a" />
    <rect x="44" y="85" width="12" height="8" rx="2" fill="#8b5e3c" />
    <rect x="54" y="48" width="34" height="8" rx="4" fill="none" stroke="#fff" strokeWidth="2.5" />
    <rect x="84" y="46" width="8" height="12" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
    <line x1="60" y1="48" x2="60" y2="56" stroke="#fff" strokeWidth="1.5" />
    <line x1="66" y1="48" x2="66" y2="56" stroke="#fff" strokeWidth="1.5" />
    <line x1="72" y1="48" x2="72" y2="56" stroke="#fff" strokeWidth="1.5" />
    <line x1="78" y1="48" x2="78" y2="56" stroke="#fff" strokeWidth="1.5" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollBtn = document.getElementById('scrollTop');
    const onScroll = () => {
      if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <a href="#hero" className="nav-logo">
        <LogoSvg />
        <div className="nav-logo-text">
          <div className="name">Gozdarstvo Kurnik</div>
          <div className="sub">Blaž Kurnik, dop. dej.</div>
        </div>
      </a>

      <ul ref={navLinksRef} className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
        <li><a href="#about" onClick={closeMenu}>O nas</a></li>
        <li><a href="#services" onClick={closeMenu}>Storitve</a></li>
        <li><a href="#gallery" onClick={closeMenu}>Galerija</a></li>
        <li><a href="#contact" className="nav-cta" onClick={closeMenu}>Kontakt</a></li>
      </ul>

      <button
        className="hamburger"
        aria-label="Meni"
        onClick={() => setMenuOpen(v => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <button
        id="scrollTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Na vrh"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </nav>
  );
}
