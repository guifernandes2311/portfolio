'use client'

import ThemeSwitch from '@/components/ThemeSwitch'
import { useState, useEffect, useRef } from 'react'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import styled from 'styled-components'
import Link from '@/components/Link'
import { FaReact, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import Lenis from '@studio-freight/lenis'

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .projects-button {
    background: #2d3748;
    color: white;
    font-family: inherit;
    padding: 0.6em 1.2em;
    font-size: 16px;
    font-weight: 500;
    border-radius: 0.5em;
    border: none;
    letter-spacing: 0.03em;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    box-shadow: inset 0 0 0.8em -0.4em rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: relative;
    height: 2.6em;
    padding-right: 2.8em;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
  }

  .projects-button .text,
  .projects-button .tech-icon {
    transition:
      opacity 0.3s,
      transform 0.3s;
    display: inline-block;
  }

  .projects-button .tech-icon {
    font-size: 1.2em;
  }

  .projects-button .icon {
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    width: 2em;
    border-radius: 0.4em;
    right: 0.3em;
    transition: all 0.3s;
  }

  .projects-button:hover .text,
  .projects-button:hover .tech-icon {
    opacity: 0;
    transform: translateX(-10px);
  }

  .projects-button:hover .icon {
    width: 100%;
    right: 0;
    border-radius: 0.5em;
    background: rgba(255, 255, 255, 0.3);
  }

  .projects-button .icon svg {
    width: 1em;
    transition: transform 0.3s;
  }

  .projects-button:hover .icon svg {
    transform: translateX(0);
  }

  .projects-button:active .icon {
    transform: scale(0.95);
  }
`

const NavigationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const LogoButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  padding: 0.75rem 1.25rem;
  font-weight: 700;
  font-size: 1.125rem;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`

// Hook personalizado para Lenis com referência
function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      duration: 1.2, // Duração do scroll suave
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

export default function Home() {
  const lenisRef = useLenisScroll()
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  // Função de scroll que usa o Lenis
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element && lenisRef.current) {
      // Calcular a posição exata considerando o header
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const elementTop = rect.top + scrollTop
      const headerHeight = 80 // Altura aproximada do header fixo
      const targetPosition = elementTop - headerHeight

      // Use o scrollTo do Lenis para scroll suave
      lenisRef.current.scrollTo(targetPosition, {
        duration: 1.5, // Duração personalizada
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // Easing cubic
      })
    }
  }

  // Efeito de scroll apenas no cliente
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const vignette = document.getElementById('scroll-vignette')

      if (vignette) {
        const opacity = Math.min(scrolled / 1000, 0.3)
        const scale = 1 + scrolled * 0.0005
        vignette.style.opacity = opacity.toString()
        vignette.style.transform = `scale(${scale})`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-smooth">
      {/* Efeito de zoom nas bordas no scroll */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-0 transition-opacity duration-500"
          id="scroll-vignette"
        ></div>
      </div>

      {/* Header fixo com navegação */}
      <nav className="fixed top-0 right-0 left-0 z-50 p-4">
        <div className="flex items-center justify-between">
          {/* Logo/Home button */}
          <LogoButton onClick={() => scrollToSection('hero')}>&lt;Gui /&gt;</LogoButton>

          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <NavigationButton onClick={() => scrollToSection('sobre')}>Sobre</NavigationButton>
            <NavigationButton onClick={() => scrollToSection('projects')}>
              Projetos
            </NavigationButton>
            <ThemeSwitch />
          </div>
        </div>
      </nav>

      {/* PRIMEIRA TELA - HERO */}
      <section id="hero" className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="px-4 text-center">
          <h1 className="mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Futuro desenvolvedor Fullstack ;)
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
            Sou Guilherme, dev em formação e caçador de bugs profissionais. No momento, tô dominando
            React e Node entre uma xícara de café e outra. Curioso?{' '}
            <span className="font-semibold text-purple-500">Saiba mais sobre mim!</span>
          </p>

          <div className="mt-12 flex flex-col items-center">
            <div className="mb-8 flex items-center gap-4">
              <NavigationButton
                onClick={() => scrollToSection('sobre')}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Conhecer mais
              </NavigationButton>

              {/* Social Links com ícones corretos */}
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/guifernandes_0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-3 text-white transition-all duration-300 hover:scale-110 hover:from-pink-600 hover:to-purple-700 hover:shadow-lg"
                  title="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/guilherme-fernandes-ba7bb8344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                  title="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Setas apontando para baixo */}
            <div className="animate-bounce">
              <div className="flex flex-col items-center gap-1">
                <svg
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <svg
                  className="h-4 w-4 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGUNDA TELA - SOBRE MIM */}
      <section
        id="sobre"
        className="relative z-10 flex min-h-screen items-center justify-center py-20"
      >
        <AuthorLayout content={mainContent}>
          <div className="text-center">
            <div className="mb-12">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">Sobre Mim</h2>
              <div className="mx-auto mb-8 h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-500"></div>
            </div>

            <MDXLayoutRenderer code={author.body.code} />

            <div className="mt-12">
              <StyledButtonWrapper>
                <button className="projects-button" onClick={() => scrollToSection('projects')}>
                  <span className="text">Ver Projetos Reais</span>
                  <FaReact className="tech-icon" />
                  <SiTypescript className="tech-icon" />
                  <div className="icon">↓</div>
                </button>
              </StyledButtonWrapper>
            </div>
          </div>
        </AuthorLayout>
      </section>

      {/* TERCEIRA TELA - PROJETOS */}
      <section id="projects" className="relative z-10 min-h-screen bg-black py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header simples */}
          <div className="mb-20 text-center">
            <h1 className="mb-6 text-6xl font-bold md:text-8xl">Projetos</h1>
            <div className="mx-auto h-1 w-32 bg-white"></div>
          </div>

          {/* Grid de projetos limpo */}
          <div className="space-y-20">
            {projectsData.map((project, index) => (
              <div key={project.title} className="group">
                <div
                  className={`flex flex-col items-center gap-12 lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Imagem do projeto */}
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-lg bg-gray-800">
                      {project.imgSrc ? (
                        <img
                          src={project.imgSrc}
                          alt={project.title}
                          className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      {/* Placeholder caso não tenha imagem */}
                      <div
                        className="flex h-80 w-full items-center justify-center bg-gray-800"
                        style={{ display: project.imgSrc ? 'none' : 'flex' }}
                      >
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-700">
                            <svg
                              className="h-8 w-8 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-500">{project.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações do projeto */}
                  <div className="space-y-6 lg:w-1/2">
                    <h2 className="text-4xl font-bold">{project.title}</h2>

                    <p className="text-xl leading-relaxed text-gray-300">{project.description}</p>

                    <div className="flex gap-4">
                      <a
                        href="https://pierogi.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors duration-300 hover:bg-gray-200"
                      >
                        Ver Projeto
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
