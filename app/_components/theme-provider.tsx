'use client'

import { createContext, useContext, useEffect, useSyncExternalStore, useCallback } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
})

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('theme-change', callback)
  window.addEventListener('storage', callback)
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', callback)
  return () => {
    window.removeEventListener('theme-change', callback)
    window.removeEventListener('storage', callback)
    media.removeEventListener('change', callback)
  }
}

function getSnapshot(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('portfolio-theme') as Theme | null
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getServerSnapshot(): Theme {
  return 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('portfolio-theme', next)
    document.documentElement.setAttribute('data-theme', next)
    window.dispatchEvent(new Event('theme-change'))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
