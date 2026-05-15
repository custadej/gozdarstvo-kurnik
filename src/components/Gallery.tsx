'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { galleryImages } from '@/data/gallery'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState(0)
  const isOpen = lightboxIndex !== null
  const overlayRef = useRef<HTMLDivElement>(null)

  const open = useCallback((index: number) => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    setLightboxIndex(index)
  }, [])

  const close = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    setLightboxIndex(null)
  }, [])

  const next = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i + 1) % galleryImages.length : 0)
  }, [])

  const prev = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, close, next, prev])

  // Swipe down to close
  useEffect(() => {
    if (!isOpen) return
    let startY = 0
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = Math.abs(e.changedTouches[0].clientY - startY)
      if (diff > 60) close()
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isOpen, close])

  // Non-passive touchmove on overlay to prevent scroll-under on iOS Safari
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || !isOpen) return
    const prevent = (e: TouchEvent) => e.preventDefault()
    overlay.addEventListener('touchmove', prevent, { passive: false })
    return () => overlay.removeEventListener('touchmove', prevent)
  }, [isOpen])

  // Navbar logo dispatches this event
  useEffect(() => {
    window.addEventListener('closeLightbox', close)
    return () => window.removeEventListener('closeLightbox', close)
  }, [close])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  const displayed = galleryImages.slice(0, 4)

  return (
    <section id="gallery" style={{ background: 'var(--green-dark)', padding: '48px 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ color: 'var(--green-light)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          — Galerija
        </span>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '8px 0' }}>
          Naše delo v slikah
        </h2>
      </div>

      {/* 2x2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {displayed.map((img, i) => (
          <div
            key={i}
            onClick={() => open(i)}
            style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer', position: 'relative' }}
          >
            <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="45vw" />
          </div>
        ))}
      </div>

      {/* Lightbox — portal to body so position:fixed is always relative to viewport */}
      {isOpen && lightboxIndex !== null && createPortal(
        <div
          ref={overlayRef}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          onClick={close}
        >
          {/* X */}
          <button onClick={close} style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer', zIndex: 10000, touchAction: 'manipulation' }}>✕</button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 22, cursor: 'pointer', zIndex: 10000, touchAction: 'manipulation' }}>‹</button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const diff = touchStartX - e.changedTouches[0].clientX
              if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
            }}
            style={{ position: 'relative', width: '90vw', height: '65vh' }}
          >
            <Image src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} fill style={{ objectFit: 'contain' }} sizes="90vw" priority />
          </div>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 22, cursor: 'pointer', zIndex: 10000, touchAction: 'manipulation' }}>›</button>

          {/* Dots */}
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'row', gap: 6, padding: '16px 0', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {galleryImages.map((_, i) => (
              <span
                key={i}
                onClick={() => setLightboxIndex(i)}
                style={{
                  display: 'inline-block',
                  width: i === lightboxIndex ? '18px' : '6px',
                  height: '6px',
                  minWidth: i === lightboxIndex ? '18px' : '6px',
                  borderRadius: '999px',
                  background: i === lightboxIndex ? '#6aab3a' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
