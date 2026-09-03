"use client"

import { motion } from "framer-motion"
import { Zap, Layers, Sparkles, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Get the thumbnail. Not the hassle.",
    description:
      "Open a YouTube video, click ThumbBatch, and get the highest-quality thumbnail available. No URL copying. No new tabs. No third-party websites.",
    label: "Instant extraction",
  },
  {
    icon: Layers,
    title: "One page. Dozens of thumbnails.",
    description:
      "Browsing a channel or search results? ThumbBatch finds the videos on the page and lets you select and package their thumbnails into one ZIP.",
    label: "Bulk mode",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Always reach for the best available quality.",
    description:
      "ThumbBatch checks YouTube's available thumbnail variants and gracefully falls back when the highest-resolution asset isn't available.",
    label: "Smart quality",
  },
  {
    icon: ShieldCheck,
    title: "Your thumbnails stay yours.",
    description:
      "ThumbBatch runs locally in your browser. There is no account, backend, analytics pipeline, or tracking system quietly collecting what you download.",
    label: "Private by design",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Features</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          One tiny extension.<br />A lot less friction.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:border-white/20
              ${f.highlight
                ? "border-accent/30 bg-gradient-to-br from-accent/5 to-card"
                : "border-border bg-card"
              }
            `}
          >
            {f.highlight && (
              <div className="absolute top-4 right-4 text-xs text-accent border border-accent/30 px-2 py-0.5 rounded-full font-semibold">
                Key differentiator
              </div>
            )}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5
              ${f.highlight ? "bg-accent/20 text-accent" : "bg-white/5 text-muted-foreground"}
            `}>
              <f.icon className="w-5 h-5" />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">{f.label}</p>
            <h3 className="text-xl font-bold mb-3 leading-snug">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
