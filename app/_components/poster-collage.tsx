/**
 * PosterCollage — Abstract graphic composition for the Hero section.
 * Built entirely from CSS/SVG primitives. No external image dependencies.
 * Theme-aware via CSS custom properties.
 */
export function PosterCollage() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '460px',
        overflow: 'hidden',
      }}
    >
      {/* ── Layer 1: Large circle ring ── */}
      <svg
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-8%',
          width: '72%',
          maxWidth: '520px',
          opacity: 0.12,
        }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="190" stroke="var(--blue)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="140" stroke="var(--blue)" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="90" stroke="var(--blue)" strokeWidth="0.5" />
      </svg>

      {/* ── Layer 2: Halftone grid block ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-4%',
          width: '45%',
          height: '55%',
          backgroundImage: 'radial-gradient(circle, var(--blue) 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          opacity: 0.1,
          borderRadius: '2px',
        }}
      />

      {/* ── Layer 3: Solid blue rectangle ── */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '18%',
          width: '120px',
          height: '4px',
          backgroundColor: 'var(--blue)',
          opacity: 0.7,
        }}
      />

      {/* ── Layer 4: Oversized diagonal text ── */}
      <svg
        style={{
          position: 'absolute',
          top: '18%',
          right: '2%',
          opacity: 0.05,
          overflow: 'visible',
        }}
        viewBox="0 0 300 120"
        width="300"
        height="120"
      >
        <text
          x="0"
          y="100"
          fontFamily="var(--font-space-grotesk), sans-serif"
          fontWeight="800"
          fontSize="96"
          fill="var(--blue)"
          letterSpacing="-4"
        >
          DEV
        </text>
      </svg>

      {/* ── Layer 5: Small geometric cross ── */}
      <svg
        style={{
          position: 'absolute',
          top: '28%',
          left: '28%',
          opacity: 0.5,
        }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <line x1="12" y1="0" x2="12" y2="24" stroke="var(--blue)" strokeWidth="1.5" />
        <line x1="0" y1="12" x2="24" y2="12" stroke="var(--blue)" strokeWidth="1.5" />
      </svg>

      {/* ── Layer 6: Thin rule lines (editorial grid) ── */}
      <svg
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          opacity: 0.15,
        }}
        width="160"
        height="80"
        viewBox="0 0 160 80"
        fill="none"
      >
        {[0, 16, 32, 48, 64, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="var(--blue)" strokeWidth="0.75" />
        ))}
      </svg>

      {/* ── Layer 7: Corner bracket frame ── */}
      <svg
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          opacity: 0.2,
        }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path d="M20 0 L0 0 L0 20" stroke="var(--blue)" strokeWidth="1.5" />
        <path d="M40 60 L60 60 L60 40" stroke="var(--blue)" strokeWidth="1.5" />
      </svg>

      {/* ── Layer 8: Solid square block ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '5%',
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--blue)',
          opacity: 0.15,
          transform: 'rotate(12deg)',
        }}
      />

      {/* ── Layer 9: Blue label strip ── */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '10%',
          padding: '4px 12px',
          border: '1px solid var(--blue)',
          opacity: 0.3,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: '0.55rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
          }}
        >
          DESIGN · DEVELOP · EXPERIMENT
        </span>
      </div>
    </div>
  )
}
