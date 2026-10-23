'use client'

import { useState } from 'react'
import { ProjectCard } from '../../_components/project-card'
import type { Project, ProjectCategory } from '../../_data/projects'
import { ALL_CATEGORIES } from '../../_data/projects'

interface ProjectsClientProps {
  projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category filters */}
      <div
        role="group"
        aria-label="Filter projects by category"
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
        }}
      >
        {(['All', ...ALL_CATEGORIES] as (ProjectCategory | 'All')[]).map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              style={{
                padding: '0.5rem 1.25rem',
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1.5px solid',
                borderColor: isActive ? 'var(--blue)' : 'var(--border)',
                backgroundColor: isActive ? 'var(--blue)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                borderRadius: 'var(--radius-sm)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
                }
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Count */}
      <p
        className="section-label"
        style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}
      >
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.5px',
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div
          style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            border: '1px dashed var(--border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
            }}
          >
            No projects here yet.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            There are no projects in the &quot;{activeCategory}&quot; category yet.
          </p>
          <button
            onClick={() => setActiveCategory('All')}
            className="btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            View All Projects
          </button>
        </div>
      )}
    </>
  )
}
