import Link from 'next/link'
import { getFeaturedProjects } from '../_data/projects'
import { ProjectCard } from './project-card'

export function SelectedWorks() {
  const featured = getFeaturedProjects()

  return (
    <section
      id="selected-works"
      aria-labelledby="selected-works-heading"
      style={{
        backgroundColor: 'var(--bg-soft)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      <div className="container-main">
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              Selected Works
            </p>
            <h2
              id="selected-works-heading"
              className="headline-md"
              style={{ margin: 0 }}
            >
              THINGS I&apos;VE
              <br />
              <span style={{ color: 'var(--blue)' }}>BUILT.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-outline"
            id="selected-works-view-all"
            style={{ whiteSpace: 'nowrap' }}
          >
            All Projects →
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5px',
          }}
        >
          {featured.slice(0, 3).map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>

        {featured.length === 0 && (
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              textAlign: 'center',
              padding: '4rem 0',
            }}
          >
            [PLACEHOLDER] Featured projects will appear here.
          </p>
        )}
      </div>
    </section>
  )
}
