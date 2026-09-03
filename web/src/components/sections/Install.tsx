"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "Download ThumbBatch from GitHub.",
    action: (
      <Link
        href="https://github.com/gauravkhatriweb/ThumbBatch"
        target="_blank"
        className="text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        Open GitHub ↗
      </Link>
    ),
  },
  {
    number: "02",
    title: "Open Chrome extensions.",
    code: "chrome://extensions/",
  },
  {
    number: "03",
    title: "Enable Developer mode.",
    description: "Toggle it in the top right corner of the page.",
  },
  {
    number: "04",
    title: "Click “Load unpacked”.",
  },
  {
    number: "05",
    title: "Select the ThumbBatch src folder.",
    description: "Choose the /src directory from the downloaded repository.",
  },
  {
    number: "06",
    title: "Pin ThumbBatch to your toolbar.",
    description: "Click the puzzle icon → pin ThumbBatch.",
  },
]

export function Install() {
  return (
    <section id="install" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Installation</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Get started in under a minute.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-5 p-5 rounded-xl border border-border bg-card hover:border-white/20 transition-all duration-200"
            >
              <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0 w-6">{step.number}</span>
              <div className="space-y-1.5">
                <p className="font-semibold text-sm">{step.title}</p>
                {step.code && (
                  <code className="text-xs bg-white/5 border border-border px-2 py-0.5 rounded font-mono text-muted-foreground">
                    {step.code}
                  </code>
                )}
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
                {step.action && step.action}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 text-base w-full" asChild>
              <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank">
                Download from GitHub ↗
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Chrome Web Store availability may come later. For now, you can install the open-source build directly.
            </p>
          </motion.div>
        </div>

        {/* Visual browser mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-[#121212] overflow-hidden shadow-2xl"
        >
          <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-[#0A0A0A]">
            <div className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
            <div className="w-3 h-3 rounded-full bg-[#F4BF4F]" />
            <div className="w-3 h-3 rounded-full bg-[#61C554]" />
            <div className="ml-4 flex-1 bg-[#1E1E1E] rounded text-[10px] text-center text-muted-foreground px-2 py-1 font-mono">
              chrome://extensions/
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Extensions</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Developer mode</span>
                <div className="w-8 h-4 bg-accent rounded-full flex items-center justify-end pr-0.5">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <div className="border border-accent/30 rounded-xl p-4 bg-accent/5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-xs">TB</div>
              <div className="flex-1">
                <p className="font-semibold text-sm">ThumbBatch</p>
                <p className="text-xs text-muted-foreground mt-0.5">Bulk YouTube thumbnails. One click.</p>
                <div className="flex gap-2 mt-3">
                  <div className="px-2 py-0.5 bg-white/10 rounded text-xs text-muted-foreground">Details</div>
                  <div className="px-2 py-0.5 bg-white/10 rounded text-xs text-muted-foreground">Remove</div>
                </div>
              </div>
              <div className="w-8 h-4 bg-accent rounded-full flex items-center justify-end pr-0.5 mt-0.5">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="rounded-lg bg-[#1A1A1A] border border-border p-3 text-center">
              <p className="text-xs text-green-400">✓ You&apos;re ready.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
