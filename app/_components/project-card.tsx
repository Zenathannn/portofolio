import Link from 'next/link'
import type { Project } from '../_data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const numStr = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/projects/${project.slug}`}
      id={`project-card-${project.slug}`}
      className="project-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        padding: featured ? '2rem' : '1.5rem',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Cover / artwork area */}
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          aspectRatio: featured ? '16/9' : '3/2',
          backgroundColor: 'var(--bg-soft)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          /* Placeholder artwork — halftone + project number */
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(circle, var(--blue) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
                opacity: 0.08,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: featured ? '6rem' : '4rem',
                  fontWeight: 800,
                  color: 'var(--blue)',
                  opacity: 0.08,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {numStr}
              </span>
            </div>
            {/* Corner accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40px',
                height: '40px',
                borderLeft: '1.5px solid var(--blue)',
                borderBottom: '1.5px solid var(--blue)',
                opacity: 0.25,
              }}
            />
          </>
        )}
      </div>

      {/* Card body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        {/* Number + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="section-label"
            style={{ color: 'var(--blue)', fontWeight: 600 }}
          >
            {numStr}
          </span>
          <span
            style={{
              width: '1px',
              height: '10px',
              backgroundColor: 'var(--border)',
              flexShrink: 0,
            }}
          />
          <span className="section-label">{project.category}</span>
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            margin: 0,
            fontSize: featured ? '1.5rem' : '1.125rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Summary */}
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.875rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {project.summary}
        </p>

        {/* Tech labels */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-badge">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Arrow link hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginTop: '0.25rem',
          }}
        >
          View Case Study
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
