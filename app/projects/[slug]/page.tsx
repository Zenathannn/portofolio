import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from '../../_data/projects'

export const instant = false

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<'/projects/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectDetailPage(
  props: PageProps<'/projects/[slug]'>
) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* ─── Project header ─── */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-soft)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background halftone */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '40%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle, var(--blue) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
            opacity: 0.05,
          }}
        />

        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          {/* Back link */}
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-ibm-mono), monospace',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              textDecoration: 'none',
              marginBottom: '2rem',
            }}
            className="hover-link-blue"
          >
            ← Back to Projects
          </Link>

          {/* Category + year */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
            <span className="tech-badge" style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}>
              {project.category}
            </span>
            <span className="section-label">{project.year}</span>
          </div>

          <h1 className="headline-lg" style={{ margin: '0 0 1.25rem 0' }}>
            {project.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.125rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '2rem',
            }}
          >
            {project.summary}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div>
              <p className="section-label" style={{ marginBottom: '0.375rem' }}>Role</p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--ink)', margin: 0, fontWeight: 500 }}>
                {project.role}
              </p>
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: '0.375rem' }}>Year</p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--ink)', margin: 0, fontWeight: 500 }}>
                {project.year}
              </p>
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: '0.375rem' }}>Technologies</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {project.technologies.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {(project.demoUrl || project.repositoryUrl) && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {project.demoUrl && (
                <a
                  id={`project-demo-${project.slug}`}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Live Demo →
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  id={`project-repo-${project.slug}`}
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Repository →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Cover image ─── */}
      <div
        style={{
          width: '100%',
          maxHeight: '520px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-soft)',
          position: 'relative',
        }}
        aria-hidden={!project.coverImage}
      >
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={`${project.title} cover`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
            aria-hidden="true"
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, var(--blue) 1px, transparent 1px)',
              backgroundSize: '14px 14px', opacity: 0.07,
            }} />
            <span style={{
              fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(5rem, 15vw, 12rem)',
              fontWeight: 800, color: 'var(--blue)', opacity: 0.06, letterSpacing: '-0.05em',
              userSelect: 'none',
            }}>
              {project.title.split(' ')[0]}
            </span>
          </div>
        )}
      </div>

      {/* ─── Case study body ─── */}
      <div className="container-main" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(640px, 100%)',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="case-study-grid"
        >
          {/* Sticky sidebar */}
          <nav
            aria-label="Case study sections"
            style={{ position: 'sticky', top: '90px' }}
            className="case-study-sidebar"
          >
            {[
              { href: '#overview', label: 'Overview' },
              { href: '#problem', label: 'Problem & Goals' },
              { href: '#role', label: 'Role & Contributions' },
              { href: '#implementation', label: 'Technical Implementation' },
              { href: '#challenges', label: 'Challenges & Solutions' },
              { href: '#results', label: 'Results' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-ibm-mono), monospace',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
                className="hover-link-blue"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Case study content */}
          <article>
            <CaseSection id="overview" label="Overview">
              <p>{project.caseStudy.overview}</p>
            </CaseSection>

            <CaseSection id="problem" label="Problem & Goals">
              <p>{project.caseStudy.problem}</p>
            </CaseSection>

            <CaseSection id="role" label="Role & Contributions">
              <p>{project.caseStudy.role}</p>
            </CaseSection>

            <CaseSection id="implementation" label="Technical Implementation">
              <p>{project.caseStudy.implementation}</p>
            </CaseSection>

            <CaseSection id="challenges" label="Challenges & Solutions">
              {project.caseStudy.challenges.map((ch, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1.5rem',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-soft)',
                  }}
                >
                  {[
                    { label: 'Challenge', value: ch.challenge },
                    { label: 'Approach', value: ch.approach },
                    { label: 'Solution', value: ch.solution },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ marginBottom: '0.875rem' }}>
                      <p className="section-label" style={{ marginBottom: '0.25rem', color: 'var(--blue)' }}>
                        {label}
                      </p>
                      <p style={{ margin: 0, fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </CaseSection>

            <CaseSection id="results" label="Results">
              <p>{project.caseStudy.results}</p>
            </CaseSection>
          </article>
        </div>

        {/* ─── Prev/Next navigation ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5px',
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
          }}
          className="project-nav"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              id={`project-nav-prev`}
              className="hover-border-blue"
              style={{
                display: 'block',
                padding: '1.5rem',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <p className="section-label" style={{ marginBottom: '0.5rem' }}>← Previous</p>
              <p className="font-display" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{prev.title}</p>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              id={`project-nav-next`}
              className="hover-border-blue"
              style={{
                display: 'block',
                padding: '1.5rem',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'right',
              }}
            >
              <p className="section-label" style={{ marginBottom: '0.5rem' }}>Next →</p>
              <p className="font-display" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{next.title}</p>
            </Link>
          ) : <div />}
        </div>
      </div>

      <style>{`
        .case-study-grid {
          grid-template-columns: 200px 1fr;
        }
        .case-study-sidebar {
          display: block;
        }
        .project-nav {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .case-study-grid {
            grid-template-columns: 1fr;
          }
          .case-study-sidebar {
            display: none;
          }
          .project-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

function CaseSection({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      style={{ marginBottom: '3rem', scrollMarginTop: '90px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ width: '24px', height: '1.5px', backgroundColor: 'var(--blue)', flexShrink: 0 }} />
        <h2
          id={`${id}-label`}
          className="section-label"
          style={{ color: 'var(--blue)', margin: 0 }}
        >
          {label}
        </h2>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.9375rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </section>
  )
}
