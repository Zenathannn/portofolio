// Only list technologies you genuinely use or have experience with.
// Remove or adjust entries before publishing.
const TECH_GROUPS = [
  {
    id: 'tg-frontend',
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 'tg-backend',
    label: 'Backend',
    items: ['Node.js', 'REST API', '[PLACEHOLDER]'],
  },
  {
    id: 'tg-database',
    label: 'Database',
    items: ['PostgreSQL', '[PLACEHOLDER]'],
  },
  {
    id: 'tg-tools',
    label: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'VS Code', '[PLACEHOLDER]'],
  },
  {
    id: 'tg-games',
    label: 'Game Development',
    items: ['Unity', 'C#', '[PLACEHOLDER]'],
  },
]

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      style={{
        backgroundColor: 'var(--bg)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container-main">
        <div style={{ marginBottom: '3rem' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>
            Technical Skills
          </p>
          <h2
            id="tech-stack-heading"
            className="headline-md"
            style={{ margin: 0 }}
          >
            TOOLS OF
            <br />
            <span style={{ color: 'var(--blue)' }}>THE TRADE.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {TECH_GROUPS.map((group) => (
            <div key={group.id}>
              <p
                className="section-label"
                style={{ marginBottom: '1rem', color: 'var(--blue)' }}
              >
                {group.label}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {group.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: item.startsWith('[PLACEHOLDER')
                          ? 'var(--border)'
                          : 'var(--blue)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '0.875rem',
                        color: item.startsWith('[PLACEHOLDER')
                          ? 'var(--border)'
                          : 'var(--ink)',
                        fontStyle: item.startsWith('[PLACEHOLDER') ? 'italic' : 'normal',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: '3rem',
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          ↑ Items marked [PLACEHOLDER] should be replaced with real technologies before publishing.
        </p>
      </div>
    </section>
  )
}
