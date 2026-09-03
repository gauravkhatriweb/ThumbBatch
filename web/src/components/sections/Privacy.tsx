"use client"

import { motion } from "framer-motion"
import { ShieldCheck, UserX, BarChart2, ServerOff, Ban } from "lucide-react"
import Link from "next/link"

const trustItems = [
  {
    icon: UserX,
    title: "No account",
    description: "Install it and use it.",
  },
  {
    icon: BarChart2,
    title: "No tracking",
    description: "No analytics or browsing history collection.",
  },
  {
    icon: ServerOff,
    title: "No backend",
    description: "Processing happens locally in your browser.",
  },
  {
    icon: Ban,
    title: "Free forever",
    description: "No subscriptions or artificial limits.",
  },
]

export function Privacy() {
  return (
    <section id="privacy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="border border-border rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-12 md:p-16 bg-gradient-to-br from-card to-background border-b border-border text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-6">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Private by default.
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              ThumbBatch doesn't need your data to do its job.
            </p>
          </motion.div>
        </div>

        {/* Trust items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 flex flex-col gap-3"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Open source */}
        <div className="p-10 border-t border-border text-center bg-card/50">
          <p className="text-muted-foreground mb-4 text-lg">
            Open Source — <span className="text-foreground font-medium">MIT License</span>
          </p>
          <Link
            href="https://github.com/gauravkhatriweb/ThumbBatch"
            target="_blank"
            className="text-sm font-semibold underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            Inspect the source on GitHub ↗
          </Link>
        </div>
      </div>
    </section>
  )
}
