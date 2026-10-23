import Link from 'next/link'

export function AboutPreview() {
  return (
    <section
      id="about-preview"
      aria-labelledby="about-preview-heading"
      style={{
        backgroundColor: 'var(--bg)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="about-preview-grid"
        >
          {/* Text */}
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              A Little About Me
            </p>
            <h2
              id="about-preview-heading"
              className="headline-md"
              style={{ margin: '0 0 2rem 0' }}
            >
              BUILDER. EXPLORER.
              <br />
              <span style={{ color: 'var(--blue)' }}>DEVELOPER.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.8,
                maxWidth: '480px',
                marginBottom: '1.5rem',
              }}
            >
              [PLACEHOLDER] I&apos;m a full-stack developer with a curiosity for
              combining engineering precision with creative expression. I build
              web applications, explore interactive experiences, and develop games
              — always looking for intersections between technology and design.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.8,
                maxWidth: '480px',
                marginBottom: '2rem',
              }}
            >
              [PLACEHOLDER] Replace this paragraph with a genuine professional
              introduction before publishing.
            </p>
            <Link href="/about" className="btn-outline" id="about-preview-link">
              Read More →
            </Link>
          </div>

          {/* Decorative editorial element */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            {/* Large interest tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                maxWidth: '360px',
              }}
            >
              {[
                'Full-Stack Dev',
                'Web Applications',
                'Game Development',
                'UI Engineering',
                'Creative Code',
                'Open Source',
                'Design Systems',
                'Digital Experiments',
              ].map((interest) => (
                <span
                  key={interest}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--muted)',
                    backgroundColor: 'var(--bg-soft)',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Decorative corner line */}
            <div
              style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1rem',
                width: '64px',
                height: '64px',
                borderTop: '1.5px solid var(--blue)',
                borderRight: '1.5px solid var(--blue)',
                opacity: 0.3,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-preview-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .about-preview-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
