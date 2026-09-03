"use client"

import { motion } from "framer-motion"
import { Code2, Cpu, Package, ShieldCheck, ServerOff } from "lucide-react"
import Link from "next/link"

const techPoints = [
  {
    icon: Code2,
    title: "Manifest V3",
    description: "Modern Chrome extension architecture for security and performance.",
  },
  {
    icon: Cpu,
    title: "Smart resolution fallback",
    description: "The extension doesn't blindly assume the largest thumbnail exists.",
  },
  {
    icon: Package,
    title: "Local ZIP generation",
    description: "Bulk archives are created locally in the browser using fflate.",
  },
  {
    icon: ShieldCheck,
    title: "Minimal permissions",
    description: "ThumbBatch requests only what it needs, nothing more.",
  },
  {
    icon: ServerOff,
    title: "No backend",
    description: "There is no server processing user requests.",
  },
]

export function TechSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Under the hood</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Small interface. Serious engineering.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {techPoints.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl border border-border bg-card hover:border-white/20 transition-all duration-200 flex gap-4"
          >
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-dashed border-border flex items-center justify-center"
        >
          <Link
            href="https://github.com/gauravkhatriweb/ThumbBatch"
            target="_blank"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Read the source →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
