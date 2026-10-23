import type { Metadata } from 'next'
import { getAllProjects } from '../_data/projects'
import { ProjectsClient } from './_components/projects-client'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore all projects by Izas Bisma Arya Cetta — web applications, internship work, games, and digital experiments.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        minHeight: '100vh',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      <div className="container-main">
        {/* Page header */}
        <div
          style={{
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border)',
            marginBottom: '3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'end',
          }}
          className="projects-header"
        >
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              All Projects
            </p>
            <h1 className="headline-lg" style={{ margin: 0 }}>
              WORKS &amp;
              <br />
              <span style={{ color: 'var(--blue)' }}>EXPERIMENTS.</span>
            </h1>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1rem',
              color: 'var(--muted)',
              lineHeight: 1.75,
              alignSelf: 'end',
            }}
          >
            Web applications, internship contributions, game projects, and
            digital experiments. Filter by category to explore.
          </p>
        </div>

        {/* Filter + grid (client-side) */}
        <ProjectsClient projects={projects} />
      </div>

      <style>{`
        .projects-header {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .projects-header {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
