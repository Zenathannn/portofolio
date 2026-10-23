import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container-main" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Big 404 */}
        <div
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            fontWeight: 800,
            color: 'var(--blue)',
            opacity: 0.08,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            marginBottom: '-2rem',
          }}
        >
          404
        </div>

        <h1
          className="headline-md"
          style={{ margin: '0 0 1rem 0', position: 'relative', zIndex: 1 }}
        >
          PAGE NOT
          <br />
          <span style={{ color: 'var(--blue)' }}>FOUND.</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1rem',
            color: 'var(--muted)',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary" id="not-found-home">
            Back to Home
          </Link>
          <Link href="/projects" className="btn-outline" id="not-found-projects">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
