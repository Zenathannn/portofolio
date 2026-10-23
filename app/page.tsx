import type { Metadata } from 'next'
import { Hero } from './_components/hero'
import { SelectedWorks } from './_components/selected-works'
import { AboutPreview } from './_components/about-preview'
import { Experience } from './_components/experience'
import { TechStack } from './_components/tech-stack'
import { ContactCTA } from './_components/contact-cta'

export const metadata: Metadata = {
  title: 'Izas Bisma Arya Cetta — Full-Stack Developer',
  description:
    "Portfolio of Izas Bisma Arya Cetta, a full-stack developer exploring the intersection of software, design, and interactive experiences.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <AboutPreview />
      <Experience />
      <TechStack />
      <ContactCTA />
    </>
  )
}
