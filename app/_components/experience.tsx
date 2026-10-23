// PLACEHOLDER experience data — clearly marked.
// Replace with real organizations and roles before publishing.
const EXPERIENCES = [
  {
    id: 'exp-1',
    organization: '[PLACEHOLDER ORGANIZATION]',
    role: '[PLACEHOLDER ROLE]',
    duration: '[START DATE] – [END DATE]',
    type: 'Internship',
    highlights: [
      '[PLACEHOLDER] Describe a specific contribution or responsibility.',
      '[PLACEHOLDER] Describe another contribution.',
      '[PLACEHOLDER] Describe a third contribution.',
    ],
  },
  {
    id: 'exp-2',
    organization: '[PLACEHOLDER ORGANIZATION]',
    role: '[PLACEHOLDER ROLE]',
    duration: '[START DATE] – Present',
    type: 'Project',
    highlights: [
      '[PLACEHOLDER] Describe this role or project.',
      '[PLACEHOLDER] Describe a specific technical achievement.',
    ],
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      style={{
        backgroundColor: 'var(--bg-soft)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="experience-grid"
        >
          {/* Label column */}
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              Experience
            </p>
            <h2
              id="experience-heading"
              className="headline-md"
              style={{ margin: 0 }}
            >
              WHERE I&apos;VE
              <br />
              <span style={{ color: 'var(--blue)' }}>WORKED.</span>
            </h2>
          </div>

          {/* Timeline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '2rem',
                  padding: '2rem 0',
                  borderBottom: i < EXPERIENCES.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'start',
                }}
                className="experience-row"
              >
                {/* Duration */}
                <div>
                  <span className="section-label">{exp.duration}</span>
                  <br />
                  <span
                    className="tech-badge"
                    style={{ marginTop: '0.5rem', display: 'inline-flex' }}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Details */}
                <div>
                  <h3
                    className="font-display"
                    style={{
                      margin: '0 0 0.25rem 0',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      margin: '0 0 1rem 0',
                      fontFamily: 'var(--font-ibm-mono), monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--blue)',
                    }}
                  >
                    {exp.organization}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      padding: '0 0 0 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '0.875rem',
                          color: 'var(--muted)',
                          lineHeight: 1.65,
                        }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .experience-grid {
          grid-template-columns: 280px 1fr;
        }
        .experience-row {
          grid-template-columns: 160px 1fr;
        }
        @media (max-width: 900px) {
          .experience-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .experience-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
