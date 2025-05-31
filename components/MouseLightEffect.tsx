'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const MouseLightEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  // 🔥 Ajuste para um efeito maior e mais integrado
  const lightColor =
    resolvedTheme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)' // Opacidade ainda mais baixa no modo escuro
      : 'rgba(0, 0, 0, 0.04)' // Mais sutil no modo claro

  return (
    <div
      className="pointer-events-none fixed z-[9999] h-[1000px] w-[1000px] rounded-full transition-transform duration-150 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${lightColor} 35%, transparent 95%)`, // 🔥 Suaviza ainda mais o efeito
        mixBlendMode: 'screen',
      }}
    />
  )
}
