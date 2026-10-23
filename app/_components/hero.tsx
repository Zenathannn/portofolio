import Link from 'next/link'
import { PosterCollage } from './poster-collage'
import { HeroBackground } from './hero-background'

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Animated risograph fluid contour background */}
      <HeroBackground />

      <div className="container-main" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
            paddingTop: '4rem',
            paddingBottom: '4rem',
          }}
          className="hero-grid"
        >
          {/* ── Left column: Text ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '24px',
                  height: '1.5px',
                  backgroundColor: 'var(--blue)',
                  flexShrink: 0,
                }}
              />
              <span className="section-label">
                Full-Stack Developer / Portfolio
              </span>
            </div>

            {/* Oversized headline */}
            <div>
              <h1 className="headline-xl" style={{ margin: 0 }}>
                DIGITAL
                <br />
                <span style={{ color: 'var(--blue)' }}>THINGS.</span>
                <br />
                BUILT
                <br />
                DIFFERENT.
              </h1>
            </div>

            {/* Introduction */}
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.75,
                maxWidth: '420px',
                margin: 0,
              }}
            >
              I&apos;m a full-stack developer exploring the intersection of
              software, design, and interactive experiences.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn-primary" id="hero-cta-works">
                Explore My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/about" className="btn-outline" id="hero-cta-about">
                About Me
              </Link>
            </div>

            {/* Editorial metadata */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              {[
                'INDEPENDENT DEVELOPER',
                'SELECTED WORKS / 2026',
              ].map((label) => (
                <span
                  key={label}
                  className="section-label"
                  style={{ color: 'var(--muted)' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column: Poster collage ── */}
          <div
            className="hero-collage"
            style={{
              position: 'relative',
              height: '560px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PosterCollage />
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        .hero-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-collage {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
