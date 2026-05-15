'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.gsap-fade');
    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-grid">
        <div className="gsap-fade">
          <span className="section-tag">Kontakt</span>
          <h2 className="section-title">Stopite v stik z nami</h2>
          <p className="section-desc">Za ponudbe, vprašanja ali sestanek nas kontaktirajte po telefonu ali e-pošti.</p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-info-text">
                <div className="label">Naslov</div>
                <div className="value">
                  <a
                    href="https://maps.google.com/?q=Zgornja+Voličina+2,+2232+Voličina,+Slovenija"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Zgornja Voličina 2<br />2232 Voličina
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
              <div className="contact-info-text">
                <div className="label">Telefon</div>
                <div className="value"><a href="tel:+38631316311">+386 31 316 311</a></div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-info-text">
                <div className="label">E-pošta</div>
                <div className="value"><a href="mailto:blazkurnik14@gmail.com">blazkurnik14@gmail.com</a></div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="contact-info-text">
                <div className="label">Delovni čas</div>
                <div className="value">Po dogovoru</div>
              </div>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.5!2d15.982!3d46.423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477193b0a4b6b6b5%3A0x0!2sZgornja+Voli%C4%8Dina+2%2C+2232+Voli%C4%8Dina!5e0!3m2!1ssl!2ssi!4v1"
            width="100%"
            height="220"
            style={{ border: 'none', marginTop: '24px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contact-map"
          />
        </div>

        <div className="contact-form gsap-fade">
          <h3>Pošljite povpraševanje</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">Ime</label>
                <input type="text" id="fname" name="fname" placeholder="Janez" required />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Priimek</label>
                <input type="text" id="lname" name="lname" placeholder="Novak" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">E-pošta</label>
              <input type="email" id="email" name="email" placeholder="janez@primer.si" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input type="tel" id="phone" name="phone" placeholder="+386 ..." />
            </div>
            <div className="form-group">
              <label htmlFor="service">Storitev</label>
              <select id="service" name="service">
                <option value="">-- Izberite storitev --</option>
                <option>Sečnja in podiranje dreves</option>
                <option>Spravilo in transport lesa</option>
                <option>Nega in čiščenje gozda</option>
                <option>Vzdrževanje gozdnih poti</option>
                <option>Razrez hlodovine</option>
                <option>Prodaja drv in lesa</option>
                <option>Drugo</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Sporočilo</label>
              <textarea id="message" name="message" placeholder="Opišite vaše potrebe ali vprašanje..." required />
            </div>
            <button
              type="submit"
              className="form-submit"
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'sending' ? 'Pošiljanje...' : 'Pošlji povpraševanje →'}
            </button>
            {status === 'sent' && (
              <p className="form-msg form-msg-success">
                Sporočilo poslano! Odzvali se bomo v najkrajšem možnem času.
              </p>
            )}
            {status === 'error' && (
              <p className="form-msg form-msg-error">
                Napaka pri pošiljanju. Poskusite znova.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
