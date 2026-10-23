import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn more about Izas Bisma Arya Cetta — full-stack developer, his background, philosophy, education, and skills.",
}

// PLACEHOLDER data — replace all bracketed content before publishing.
const EDUCATION = [
  {
    id: 'edu-1',
    institution: '[PLACEHOLDER INSTITUTION]',
    degree: '[PLACEHOLDER DEGREE / MAJOR]',
    period: '[START YEAR] – [END YEAR / Present]',
    notes: '[PLACEHOLDER] Brief note about coursework or focus area.',
  },
]

const LEARNING_INTERESTS = [
  'Systems programming',
  'Interactive data visualization',
  'Game engine architecture',
  'Design systems',
  'Creative coding',
  '[PLACEHOLDER — Add your genuine interests]',
]

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* ─── Page header ─── */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          backgroundColor: 'var(--bg-soft)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background graphic */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-5%',
            top: '-20%',
            width: '50%',
            height: '140%',
            backgroundImage: 'radial-gradient(circle, var(--blue) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            opacity: 0.05,
          }}
        />

        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>About</p>
          <h1 className="headline-lg" style={{ margin: '0 0 1.5rem 0' }}>
            IZAS BISMA
            <br />
            <span style={{ color: 'var(--blue)' }}>ARYA CETTA.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.125rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: 0,
            }}
          >
            [PLACEHOLDER] Full-stack developer. Replace this with a genuine
            professional introduction before publishing.
          </p>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="container-main" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="about-content-grid"
        >
          {/* Main content */}
          <div>
            {/* Introduction */}
            <section
              id="about-intro"
              aria-labelledby="about-intro-label"
              style={{ marginBottom: '4rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '24px', height: '1.5px', backgroundColor: 'var(--blue)', flexShrink: 0 }} />
                <h2 id="about-intro-label" className="section-label" style={{ margin: 0, color: 'var(--blue)' }}>
                  Introduction
                </h2>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '600px', margin: '0 0 1rem 0' }}>
                [PLACEHOLDER] Write a genuine professional introduction here.
                Describe your background, what kind of work you do, and what
                motivates you as a developer.
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '600px', margin: 0 }}>
                [PLACEHOLDER] Add a second paragraph about your creative
                interests, technical focus areas, or development philosophy.
              </p>
            </section>

            {/* Philosophy */}
            <section
              id="about-philosophy"
              aria-labelledby="about-philosophy-label"
              style={{ marginBottom: '4rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '24px', height: '1.5px', backgroundColor: 'var(--blue)', flexShrink: 0 }} />
                <h2 id="about-philosophy-label" className="section-label" style={{ margin: 0, color: 'var(--blue)' }}>
                  Development Philosophy
                </h2>
              </div>
              <blockquote
                style={{
                  margin: 0,
                  padding: '1.5rem 2rem',
                  borderLeft: '3px solid var(--blue)',
                  backgroundColor: 'var(--bg-soft)',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                }}
              >
                &quot;[PLACEHOLDER] Replace with a genuine statement about how you
                approach software development.&quot;
              </blockquote>
            </section>

            {/* Education */}
            <section
              id="about-education"
              aria-labelledby="about-education-label"
              style={{ marginBottom: '4rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '24px', height: '1.5px', backgroundColor: 'var(--blue)', flexShrink: 0 }} />
                <h2 id="about-education-label" className="section-label" style={{ margin: 0, color: 'var(--blue)' }}>
                  Education
                </h2>
              </div>
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid var(--border)',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <p className="font-display" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {edu.degree}
                    </p>
                    <span className="section-label">{edu.period}</span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-ibm-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--blue)' }}>
                    {edu.institution}
                  </p>
                  <p style={{ margin: 0, fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    {edu.notes}
                  </p>
                </div>
              ))}
            </section>

            {/* Learning interests */}
            <section
              id="about-learning"
              aria-labelledby="about-learning-label"
              style={{ marginBottom: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '24px', height: '1.5px', backgroundColor: 'var(--blue)', flexShrink: 0 }} />
                <h2 id="about-learning-label" className="section-label" style={{ margin: 0, color: 'var(--blue)' }}>
                  Learning Interests
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {LEARNING_INTERESTS.map((interest) => (
                  <span key={interest} className="tech-badge" style={{ fontSize: '0.7rem' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <Link href="/projects" className="btn-primary" id="about-view-works">
                View My Work →
              </Link>
              <Link href="/#contact" className="btn-outline" id="about-contact">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Portrait placeholder */}
            <div
              aria-label="Portrait placeholder — replace with actual photo before publishing"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, var(--blue) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.06,
                }}
              />
              <svg
                aria-hidden="true"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span
                className="section-label"
                style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1rem' }}
              >
                [Portrait placeholder]
                <br />Replace before publishing
              </span>
            </div>

            {/* Quick info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Specialty', value: 'Full-Stack Development' },
                { label: 'Location', value: '[PLACEHOLDER]' },
                { label: 'Available For', value: '[PLACEHOLDER]' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--border)',
                    gap: '1rem',
                  }}
                >
                  <span className="section-label">{label}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--ink)', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .about-content-grid {
          grid-template-columns: 1fr 360px;
        }
        @media (max-width: 1024px) {
          .about-content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
