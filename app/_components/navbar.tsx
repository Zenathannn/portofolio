'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'

const NAV_LINKS = [
  { href: '/projects', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      id="site-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div
        className="container-main"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          gap: '2rem',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="IZAS BISMA ARYA CETTA — Home"
          style={{
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            flexShrink: 0,
            lineHeight: 1.2,
          }}
        >
          IZAS BISMA<br />
          <span style={{ color: 'var(--blue)' }}>ARYA CETTA</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive(link.href) ? 'var(--blue)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                borderBottom: isActive(link.href)
                  ? '1px solid var(--blue)'
                  : '1px solid transparent',
                paddingBottom: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.href)) {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                }
              }}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle id="desktop-theme-toggle" />
        </nav>

        {/* Mobile: toggle + theme */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          className="mobile-controls"
        >
          <ThemeToggle id="mobile-theme-toggle" />
          <button
            id="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink)',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                transition: 'opacity 0.2s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: isActive(link.href) ? 'var(--blue)' : 'var(--ink)',
                textDecoration: 'none',
                padding: '0.875rem 0',
                borderBottom: '1px solid var(--border)',
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-controls { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
