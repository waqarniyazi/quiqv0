'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Zap, Sun, Activity, Shield, Heart, Droplets,
  ArrowRight, Mail, Check,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════
   SELF-CONTAINED DATA — no external component/context imports
   ═══════════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  { src: '/hero-test-images/vitamin d.webp', label: 'Vitamin D' },
  { src: '/hero-test-images/tsh.webp', label: 'TSH' },
  { src: '/hero-test-images/anemia.webp', label: 'Ferritin' },
  { src: '/hero-test-images/crp.webp', label: 'CRP' },
  { src: '/hero-test-images/vitamin b12.webp', label: 'Vitamin B12' },
]

const CATEGORIES = [
  { Icon: Sun, label: 'Vitamins', color: '#fdd89b' },
  { Icon: Zap, label: 'Hormones', color: '#c4b5fd' },
  { Icon: Activity, label: 'Metabolic', color: '#a7dfba' },
  { Icon: Shield, label: 'Immunity', color: '#a5c8fe' },
  { Icon: Heart, label: 'Heart', color: '#fda4af' },
]

/* ═══════════════════════════════════════════════════════════════════
   CONFETTI BURST — particle explosion on email submit
   ═══════════════════════════════════════════════════════════════════ */

function ConfettiBurst({ active }: { active: boolean }) {
  const [particles] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 / 22) * i + (Math.random() - 0.5) * 0.4,
      distance: 35 + Math.random() * 55,
      color: CATEGORIES[i % CATEGORIES.length].color,
      size: 3 + Math.random() * 3,
      delay: Math.random() * 0.12,
    }))
  )

  if (!active) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-50" style={{ overflow: 'visible' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0.15,
          }}
          transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES — subtle ambient depth on the background
   ═══════════════════════════════════════════════════════════════════ */

function FloatingParticles() {
  /* Only generate on the client to avoid SSR hydration mismatch */
  const [particles, setParticles] = useState<
    { id: number; left: number; top: number; size: number; dur: number; delay: number }[]
  >([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 1.5,
        dur: 18 + Math.random() * 22,
        delay: -(Math.random() * 20),
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/[0.04]"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -18, 0, 14, 0],
            x: [0, 10, -6, 4, 0],
            opacity: [0.04, 0.07, 0.03, 0.06, 0.04],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   3D ORBITAL CAROUSEL — products orbiting in a ring with depth
   ═══════════════════════════════════════════════════════════════════ */

function OrbitalCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [rx, setRx] = useState(200)
  const N = PRODUCTS.length

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 640) setRx(80)
      else if (w < 1024) setRx(140)
      else setRx(200)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handlePrev = () => setActiveIdx(prev => (prev - 1 + N) % N)
  const handleNext = () => setActiveIdx(prev => (prev + 1) % N)

  return (
    <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[500px] flex flex-col items-center justify-center">
      {/* Stage glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '80%',
          height: '65%',
          left: '10%',
          top: '18%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)',
        }}
      />
      {/* Ground reflection */}
      <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-[50%] h-10 bg-white/[0.015] rounded-full blur-2xl pointer-events-none" />

      {/* Orbiting products */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        {PRODUCTS.map((product, i) => {
          const offset = ((i - activeIdx) % N + N) % N
          const angle = (offset / N) * Math.PI * 2
          const x = Math.sin(angle) * rx
          const zNorm = (Math.cos(angle) + 1) / 2 // 0 = back, 1 = front
          const scale = 0.28 + 0.72 * zNorm
          const blur = (1 - zNorm) * 12
          const opacity = 0.08 + 0.92 * zNorm
          const y = (1 - zNorm) * 35 - 15
          const zIndex = Math.round(zNorm * 10)
          const isFront = offset === 0

          return (
            <motion.div
              key={product.label}
              className="absolute flex flex-col items-center"
              animate={{ x, y, scale, opacity, filter: `blur(${blur}px)` }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ zIndex }}
            >
              {/* Ambient glow behind the front item */}
              {isFront && (
                <motion.div
                  className="absolute -inset-10 rounded-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.045) 0%, transparent 70%)',
                    filter: 'blur(28px)',
                  }}
                />
              )}

              <div className="relative w-[130px] h-[185px] sm:w-[190px] sm:h-[270px] lg:w-[250px] lg:h-[350px]">
                <Image
                  src={product.src}
                  alt={product.label}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 130px, (max-width: 1024px) 190px, 250px"
                />
              </div>

              {/* Label — only the front product */}
              <AnimatePresence mode="wait">
                {isFront && (
                  <motion.span
                    key={`lbl-${product.label}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="mt-3 text-sm sm:text-lg lg:text-xl font-semibold text-white tracking-wide"
                  >
                    {product.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Orbit step indicators */}
      <div className="flex justify-center gap-1.5 mt-1 z-20">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Show product ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIdx ? 'w-6 bg-white/80' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
          />
        ))}
      </div>

      {/* Manual controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 z-20 p-2 sm:p-2.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 z-20 p-2 sm:p-2.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300"
        aria-label="Next product"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)

  /* ── Mouse-following ambient glow (desktop only) ──────────── */
  useEffect(() => {
    const el = gradientRef.current
    const handleMouse = (e: MouseEvent) => {
      if (!el) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      el.style.background = `radial-gradient(circle 600px at ${x}% ${y}%, rgba(255,255,255,0.018) 0%, transparent 100%)`
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  /* ── Email form handler ───────────────────────────────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: Wire to backend (Netlify Forms / API route / Resend / Mailchimp)
    setSubmitted(true)
    setShowConfetti(true)
    setEmail('')
    setTimeout(() => setShowConfetti(false), 1000)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* ── Self-contained keyframes ─────────────────────────── */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.03); }
          50%       { box-shadow: 0 0 32px rgba(255,255,255,0.16), 0 0 80px rgba(255,255,255,0.06); }
        }
      `}</style>

      {/* ── Background layers ────────────────────────────────── */}
      <FloatingParticles />
      <div ref={gradientRef} className="absolute inset-0 pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 62% 38%, rgba(255,255,255,0.012) 0%, transparent 100%)' }}
      />

      {/* ══════════════════════════════════════════════════════════
          HEADER — minimal logo + "Coming Soon" label
          ══════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]">
          <Image
            src="/quiq-logo.png"
            alt="QUIQ"
            width={32}
            height={32}
            className="h-7 w-auto"
            priority
          />
          <div className="w-px h-4 bg-white/[0.08]" />
          <span className="text-[11px] text-white/60 tracking-[0.15em] uppercase font-medium">
            Coming Soon
          </span>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT — split layout desktop, stacked mobile
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full flex flex-col">
        {/* HERO SECTION */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[44%_56%] items-center pt-24 lg:pt-28 pb-4 lg:pb-12 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1600px] mx-auto w-full">

          {/* ──────── TOP LEFT: Text & Headings & CTA ──────── */}
          <div className="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left mb-2 lg:mb-0 lg:pr-8 order-1 lg:col-start-1 lg:row-start-1 lg:self-center">

            {/* "Launching Soon" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 mb-6 lg:mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-sm text-emerald-400 font-bold tracking-widest uppercase">
                Launching Soon
              </span>
            </motion.div>

            {/* Hero heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold tracking-tight leading-[1.08] mb-5"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.45) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBlock: '0.1em',
              }}
            >
              Affordable Diagnostics.
              <br />
              For Every Indian.
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg text-white/45 font-light max-w-md leading-relaxed lg:mb-3"
            >
              Clinically validated self-tests, designed for home use.
              <br className="hidden sm:block" />
              Results in minutes. <span className="text-white font-medium">Starting ₹99.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 lg:mt-10"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-400 hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <span className="text-white/90 tracking-wide group-hover:text-white transition-colors duration-300">
                  Request Early Access
                </span>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            </motion.div>
          </div>

          {/* ──────── CAROUSEL: Middle on Mobile, Right Column on Desktop ──────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full flex items-center justify-center order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 pt-10 pb-6 lg:py-0"
          >
            <OrbitalCarousel />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            ABOUT & MISSION
            ══════════════════════════════════════════════════════════ */}
        <section className="max-w-3xl mx-auto px-6 py-12 sm:py-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs text-white/30 tracking-[0.2em] uppercase mb-4 font-medium"
          >
            Our Mission
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-snug"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.45) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              paddingBlock: '0.1em',
            }}
          >
            We aim to provide affordable and high quality self testing diagnostics to everyone in India.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg leading-relaxed font-light mt-2 max-w-2xl mx-auto"
          >
            At QUIQ, we enable proactive health decisions through clinically reliable, at-home diagnostics, for a variety of categories starting ₹99.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mt-8 sm:mt-10 max-w-2xl mx-auto"
          >
            {CATEGORIES.map(({ Icon, label, color }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BRANDS MARQUEE
            ══════════════════════════════════════════════════════════ */}
        <section className="w-full relative py-8 sm:py-12 mb-8 overflow-hidden flex flex-col items-center">
          <p className="text-[10px] sm:text-xs text-white/30 tracking-[0.2em] uppercase mb-8 font-medium">
            Launching Across
          </p>
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex gap-16 sm:gap-24 items-center whitespace-nowrap min-w-max"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
            >
              <div className="flex gap-16 sm:gap-24 items-center">
                {['Amazon.png', 'Flipkart.svg', 'PharmEasy.png', 'Tata_1mg.svg', 'blinkit.png', 'zepto.png'].map((brand) => (
                  <Image key={brand} src={`/brands/${brand}`} alt={brand.split('.')[0]} width={140} height={50} className="w-auto h-6 sm:h-9 object-contain brightness-0 invert opacity-40 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300" unoptimized />
                ))}
              </div>
              <div className="flex gap-16 sm:gap-24 items-center">
                {['Amazon.png', 'Flipkart.svg', 'PharmEasy.png', 'Tata_1mg.svg', 'blinkit.png', 'zepto.png'].map((brand) => (
                  <Image key={`dup-${brand}`} src={`/brands/${brand}`} alt={brand.split('.')[0]} width={140} height={50} className="w-auto h-6 sm:h-9 object-contain brightness-0 invert opacity-40 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300" unoptimized />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FOOTER & CONTACT
            ══════════════════════════════════════════════════════════ */}
        <footer className="w-full border-t border-white/10 mt-2 py-5 lg:py-8 px-6 bg-[#040404]">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/quiq-logo.png"
                alt="QUIQ Logo"
                width={120}
                height={120}
                className="w-40 sm:w-40 lg:w-60 h-auto brightness-0 invert opacity-70 mb-4"
                unoptimized
              />
              <p className="text-white/40 text-[11px] font-medium tracking-[0.1em] uppercase mb-4 mt-2">
                A venture by Santa Clara Wellness Pvt. Ltd.
              </p>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                6C3, Gundecha Enclave, Kherani Road,<br />
                Saki Naka, Andheri (E),<br />
                Mumbai, Maharashtra 400072, INDIA
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 text-sm">
              <h3 className="text-white/70 font-semibold mb-2 uppercase tracking-wider text-xs">Reach Out</h3>
              <a href="mailto:info@quiq.health" className="text-white/40 hover:text-white transition-colors">
                info@quiq.health
              </a>
              <a href="tel:+912267258000" className="text-white/40 hover:text-white transition-colors">
                +91 22 6725 8000
              </a>

            </div>
          </div>
          <div className="w-full max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
            <p className="text-white/80 text-[11px]">
              © 2026 Santa Clara Wellness Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL DIALOG
          ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2"
              >
                ✕
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">Request Early Access</h2>
              <p className="text-white/60 mb-8 text-sm leading-relaxed">
                QUIQ is bringing lab-grade self-testing to every Indian home.
                Join our waitlist to be notified the exact moment we launch our testing kits.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="coming-soon-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitted}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div className="relative" style={{ overflow: 'visible' }}>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-80 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>You&apos;re on the list!</span>
                      </>
                    ) : (
                      <>
                        <span>Get Notified on Launch</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <ConfettiBurst active={showConfetti} />
                </div>
              </form>
              <p className="text-[11px] text-white/40 mt-5 text-center">
                We&apos;ll only email you at launch. No spam.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edge gradients ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════
          SEO CONTENT — visually hidden, crawlable by search engines
          Rich semantic HTML for Google to index
          ══════════════════════════════════════════════════════════ */}
      <article
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        <h2>QUIQ — Affordable At-Home Self-Test Kits in India</h2>
        <p>
          QUIQ is an at-home self-testing diagnostics brand launching in India.
          We believe that knowledge is power — especially when it comes to your health.
          Our mission is to empower individuals to take control of their own healthcare
          through proactive and preventative testing.
        </p>
        <p>
          India has over 1.4 billion people, yet 70% lack access to basic diagnostic facilities.
          Lab tests are expensive (₹500–₹2000+), inconvenient, and often require prescriptions.
          QUIQ solves this by offering 20+ at-home self-test kits — starting at just ₹99 —
          that deliver lab-grade results in just 5 minutes from a single drop of blood.
        </p>

        <h3>Self-Test Categories</h3>
        <ul>
          <li>Vitamins — Vitamin D test at home, Vitamin B12 test at home</li>
          <li>Hormones — TSH thyroid self-test kit</li>
          <li>Metabolic — HbA1c diabetes self-test kit</li>
          <li>Immunity &amp; Infections — CRP inflammation test, H. pylori test</li>
          <li>Heart Health — Triglycerides test, Cholesterol test at home</li>
          <li>Blood Work — Ferritin iron deficiency test, Anemia test kit</li>
        </ul>

        <h3>How QUIQ Self-Tests Work</h3>
        <ol>
          <li>Prick — A tiny finger prick to collect one drop of blood</li>
          <li>Apply — Place the drop on the test cassette</li>
          <li>Wait — Results develop in approximately 5 minutes</li>
          <li>Read — Read results directly on the device, similar to a pregnancy test</li>
        </ol>

        <h3>Why Choose QUIQ Over Traditional Lab Tests?</h3>
        <ul>
          <li>Affordable: Starting at just ₹99 vs ₹500–₹2000+ at labs</li>
          <li>Convenient: Test at home, no lab visit needed, no prescription required</li>
          <li>Fast: Results in 5 minutes vs 1–7 days at a lab</li>
          <li>Private: Completely self-administered, no sharing reports with strangers</li>
        </ul>

        <p>
          QUIQ combines cutting-edge lateral flow diagnostic technology with thoughtful design
          to create self-test kits that anyone can use at home — no training required.
          We firmly believe that everyone should have the ability to manage their health on
          their own terms. QUIQ is an initiative by Santa Clara Wellness Pvt. Ltd., committed to
          democratising healthcare across India.
        </p>

        <p>
          Visit quiq.health to join the waitlist and be the first to know when QUIQ launches.
          Previously available at quiqtest.com, QUIQ is now launching its new platform at
          quiq.health with a complete range of affordable at-home diagnostic self-test kits.
        </p>
      </article>
    </div>
  )
}
