"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckSquare, Square, Download } from "lucide-react"

const TOTAL_THUMBS = 18

export function BulkShowcase() {
  const [selectedCount, setSelectedCount] = useState(TOTAL_THUMBS)
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState<Set<number>>(new Set(Array.from({ length: TOTAL_THUMBS }, (_, i) => i)))

  const toggle = (i: number) => {
    if (downloading || done) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  useEffect(() => {
    setSelectedCount(selected.size)
  }, [selected])

  const handleDownload = () => {
    if (selectedCount === 0 || done) return
    setDownloading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setDownloading(false)
          setDone(true)
          return 100
        }
        return p + 4
      })
    }, 60)
  }

  const reset = () => {
    setDone(false)
    setProgress(0)
    setSelected(new Set(Array.from({ length: TOTAL_THUMBS }, (_, i) => i)))
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Bulk Mode</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Your whole thumbnail grid.<br />One ZIP.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">Stop downloading thumbnails one by one.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border rounded-2xl bg-card overflow-hidden"
      >
        {/* Popup header */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-accent flex items-center justify-center text-white font-bold text-xs">TB</div>
            <div>
              <span className="font-bold">ThumbBatch</span>
              <span className="text-muted-foreground text-sm ml-2">— Found {TOTAL_THUMBS}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (!downloading && !done) setSelected(new Set(Array.from({ length: TOTAL_THUMBS }, (_, i) => i))) }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <CheckSquare className="w-3 h-3" /> Select All
            </button>
            <button
              onClick={() => { if (!downloading && !done) setSelected(new Set()) }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <Square className="w-3 h-3" /> Deselect All
            </button>
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {Array.from({ length: TOTAL_THUMBS }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`relative aspect-video rounded-md overflow-hidden border cursor-pointer transition-all duration-200
                ${selected.has(i)
                  ? "border-accent/70 ring-1 ring-accent/30"
                  : "border-border opacity-50 grayscale"
                }
              `}
            >
              <div className={`absolute inset-0 ${[
                "bg-gradient-to-br from-blue-900/40 to-slate-900/60",
                "bg-gradient-to-br from-purple-900/40 to-slate-900/60",
                "bg-gradient-to-br from-rose-900/40 to-slate-900/60",
                "bg-gradient-to-br from-amber-900/40 to-slate-900/60",
                "bg-gradient-to-br from-teal-900/40 to-slate-900/60",
                "bg-gradient-to-br from-indigo-900/40 to-slate-900/60",
              ][i % 6]}`} />
              <AnimatePresence>
                {selected.has(i) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-sm flex items-center justify-center"
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-[#0A0A0A] space-y-3">
          {(downloading || done) && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{done ? `✓ ${selectedCount} thumbnails ready` : `Preparing thumbnails…`}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${done ? "bg-green-500" : "bg-accent"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Button
              onClick={done ? reset : handleDownload}
              disabled={selectedCount === 0 || downloading}
              className={`flex-1 h-9 text-sm font-semibold transition-all ${done ? "bg-green-500 hover:bg-green-600 text-white" : "bg-white text-black hover:bg-neutral-200"}`}
            >
              <Download className="w-4 h-4" />
              {done ? "Done! Click to reset" : downloading ? `Zipping...` : `Download ZIP (${selectedCount})`}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
