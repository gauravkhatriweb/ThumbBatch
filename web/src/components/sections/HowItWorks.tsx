"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Open YouTube",
    description: "Find the video, channel, or search results you need.",
  },
  {
    number: "02",
    title: "Open ThumbBatch",
    description: "The extension automatically understands what is on the page.",
  },
  {
    number: "03",
    title: "Download",
    description: "Save a thumbnail or package an entire selection into a ZIP.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="border border-border rounded-3xl p-12 md:p-20 bg-card relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Three seconds. Three steps.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center mb-6">
                <span className="font-mono text-sm font-bold text-muted-foreground">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
