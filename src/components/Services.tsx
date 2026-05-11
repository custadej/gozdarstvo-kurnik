'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
  iconModal: React.ReactNode;
}

const services: ServiceData[] = [
  {
    title: 'Sečnja in podiranje dreves',
    desc: 'Varno in strokovno podiranje dreves – tako v gozdu kot v bližini hiš, zgradb, ograj in vodotokov. Delamo z lastno opremo in izkušenimi izvajalci.',
    bullets: ['Sečnja in spravilo v gozdu', 'Varno podiranje ob objektih in infrastrukturi', 'Možna sečnja v zahtevnih in strmih legah', 'Čiščenje parcele po opravljenem delu'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 8h8v4h-8V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 9v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 10H4a2 2 0 00-2 2v4a2 2 0 002 2h10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="8" x2="16" y2="12" stroke="white" strokeWidth="1.5" />
        <line x1="18" y1="8" x2="18" y2="12" stroke="white" strokeWidth="1.5" />
        <line x1="20" y1="8" x2="20" y2="12" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 8h8v4h-8V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 9v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 10H4a2 2 0 00-2 2v4a2 2 0 002 2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="8" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="8" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Spravilo in transport lesa',
    desc: 'Spravilo posekanih sortimentov iz gozda do prevozne ceste ali skladišča. Imamo mehanizacijo primerno za vsak teren – od ravnega do strmega.',
    bullets: ['Spravilo z gozdarskim traktorjem in prikolico', 'Transport hlodovine in drv na vaš naslov', 'Primerno za strme in zahtevne terene', 'Sezonsko prilagodljivi termini'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Nega in čiščenje gozda',
    desc: 'Skrbimo za zdravje vašega gozda z redčenjem, čiščenjem podrasti in nego mladih sestojev. Zdrav gozd je naložba za prihodnost.',
    bullets: ['Redčenje in nega mladih sestojev', 'Čiščenje podrasti in invazivnih rastlin', 'Odstranjevanje suhih in nevarnih dreves', 'Svetovanje o negi in gozdnem načrtu'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 4" /><path d="M12 12c0-5 4-8 9-8" /><path d="M3 4c0 5 3 9 9 9" /><path d="M21 4c0 5-3 9-9 9" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 4" /><path d="M12 12c0-5 4-8 9-8" /><path d="M3 4c0 5 3 9 9 9" /><path d="M21 4c0 5-3 9-9 9" />
      </svg>
    ),
  },
  {
    title: 'Vzdrževanje gozdnih poti',
    desc: 'Vzdržujemo in obnavljamo gozdne prometnice, da ostanejo prevozne skozi vse letne čase. Od čiščenja jarkov do profiliranja vozišča.',
    bullets: ['Čiščenje in poglabljanje odvodnih jarkov', 'Čiščenje in menjava propustov', 'Nasipavanje in profiliranje vozišča', 'Odstranjevanje podrtih dreves s poti'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18" /><path d="M3 6l9-3 9 3" /><path d="M3 18l9 3 9-3" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18" /><path d="M3 6l9-3 9 3" /><path d="M3 18l9 3 9-3" />
      </svg>
    ),
  },
  {
    title: 'Razrez hlodovine',
    desc: 'Razrežemo les po vaših željah in dimenzijah – primerno za gradnjo, ograde, kurjavo ali prodajo. Možen prihod na vašo lokacijo.',
    bullets: ['Razrez po naročnikovih merah', 'Prihod na lokacijo stranke', 'Hlodovina, deske, tramovi, letve', 'Primerno za gradnjo in domačo uporabo'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-6h6v6" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Prodaja drv in lesa',
    desc: 'Prodajamo kakovostna suha drva za kurjavo ter hlodovino različnih drevesnih vrst. Dostava na dom v dogovorjenem terminu.',
    bullets: ['Suha bukova in hrastova drva', 'Hlodovina po naročilu', 'Dostava na vaš naslov', 'Možen prevzem na mestu'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
    iconModal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
);

export default function Services() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
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
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, []);

  const closeModal = () => setActiveIdx(null);
  const openModal = (idx: number) => setActiveIdx(idx);

  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? 'hidden' : '';
  }, [activeIdx]);

  const active = activeIdx !== null ? services[activeIdx] : null;

  return (
    <section id="services" ref={sectionRef}>
      <div className="services-header gsap-fade">
        <span className="section-tag">Naše storitve</span>
        <h2 className="section-title">Kaj ponujamo?</h2>
        <p className="section-desc">Obsežen nabor gozdarskih storitev za zasebne lastnike gozdov, kmetije in podjetja.</p>
      </div>

      <div className="services-grid">
        {services.map((svc, i) => (
          <div key={i} className="service-card gsap-fade" onClick={() => openModal(i)}>
            <div className="service-icon">{svc.icon}</div>
            <h3 className="service-title">{svc.title}</h3>
            <p className="service-desc">{svc.desc}</p>
            <span className="service-btn">Izvedi več <ArrowIcon /></span>
          </div>
        ))}
      </div>

      <div className={`svc-modal${activeIdx !== null ? ' open' : ''}`}>
        <div className="svc-modal-backdrop" onClick={closeModal} />
        <div className="svc-modal-box">
          <button className="svc-modal-close" onClick={closeModal} aria-label="Zapri">&#x2715;</button>
          {active && (
            <>
              <div className="svc-modal-icon">{active.iconModal}</div>
              <h2 className="svc-modal-title">{active.title}</h2>
              <p className="svc-modal-desc">{active.desc}</p>
              <ul className="svc-modal-list">
                {active.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <a href="tel:+38631316311" className="svc-modal-cta" onClick={closeModal}>
                <PhoneIcon />
                Pokličite nas: 031 316 311
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
