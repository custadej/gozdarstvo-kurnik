const LogoSvg = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,8 30,38 40,38 25,62 38,62 22,85 78,85 62,62 75,62 60,38 70,38" fill="#6aab3a" />
    <rect x="44" y="85" width="12" height="8" rx="2" fill="#8b5e3c" />
    <rect x="54" y="48" width="34" height="8" rx="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    <rect x="84" y="46" width="8" height="12" rx="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="60" y1="48" x2="60" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="66" y1="48" x2="66" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="72" y1="48" x2="72" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="78" y1="48" x2="78" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <a href="#hero" className="footer-logo">
            <LogoSvg />
            <div className="footer-logo-text">
              <div className="name">Gozdarstvo Kurnik</div>
              <div className="sub">Blaž Kurnik, dop. dej.</div>
            </div>
          </a>
          <ul className="footer-nav">
            <li><a href="#about">O nas</a></li>
            <li><a href="#services">Storitve</a></li>
            <li><a href="#gallery">Galerija</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">&copy; 2025 Gozdarstvo Kurnik &mdash; Blaž Kurnik, dopolnilna dejavnost. Vse pravice pridržane.</div>
          <div className="footer-legal">Zgornja Voličina 2, 2232 Voličina &bull; blazkurnik14@gmail.com</div>
        </div>
      </div>
    </footer>
  );
}
