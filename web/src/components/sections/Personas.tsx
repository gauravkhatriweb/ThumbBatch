"use client"

import { motion } from "framer-motion"

const personas = [
  {
    emoji: "🎬",
    title: "Creators",
    description: "Save competitor thumbnails for inspiration and research.",
  },
  {
    emoji: "🎨",
    title: "Designers",
    description: "Grab clean visual references for moodboards, Figma projects, and presentations.",
  },
  {
    emoji: "🔬",
    title: "Researchers",
    description: "Archive and compare how channels package ideas visually.",
  },
]

export function Personas() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Built for people who collect ideas.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl border border-border bg-card hover:border-white/20 transition-all duration-300"
          >
            <span className="text-4xl">{p.emoji}</span>
            <h3 className="text-xl font-bold mt-4 mb-2">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
