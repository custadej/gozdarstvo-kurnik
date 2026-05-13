import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <a href="#hero" className="footer-logo">
            <Image
              src="/slike/web/0-logotip.png"
              alt="Gozdarstvo Kurnik"
              width={40}
              height={40}
              style={{ width: 'auto', height: '38px' }}
            />
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
          <div className="footer-copy">
            &copy; 2025 Gozdarstvo Kurnik &mdash; Blaž Kurnik, dopolnilna dejavnost. Vse pravice pridržane.
          </div>
          <div className="footer-legal">
            Zgornja Voličina 2, 2232 Voličina &bull; blazkurnik14@gmail.com
          </div>
        </div>
      </div>
    </footer>
  );
}
