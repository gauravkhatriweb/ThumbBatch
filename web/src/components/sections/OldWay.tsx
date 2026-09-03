"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const oldSteps = [
  "YouTube",
  "Copy URL",
  "Open Google",
  "Find a downloader",
  "Fight ads",
  "Paste URL",
  "Wait",
  "Download",
  "Back to YouTube",
]

export function OldWay() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          The old way is ridiculous.
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
        {/* Old way */}
        <div className="flex-1 flex flex-col items-center gap-0">
          {oldSteps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center gap-0 w-full max-w-xs"
            >
              <div
                className={`w-full py-2 px-4 rounded-md text-center text-sm font-medium border
                  ${i === 0 ? "border-border bg-secondary text-foreground" : "border-border/50 bg-card text-muted-foreground"}
                `}
              >
                {step}
              </div>
              {i < oldSteps.length - 1 && (
                <ArrowDown className="w-4 h-4 text-muted-foreground my-1" />
              )}
            </motion.div>
          ))}
          <p className="mt-4 text-sm text-muted-foreground">9 painful steps</p>
        </div>

        {/* Vs divider */}
        <div className="flex items-center justify-center lg:pt-12">
          <span className="text-muted-foreground font-bold text-xl border border-border/50 px-4 py-2 rounded-full">vs</span>
        </div>

        {/* New way */}
        <div className="flex-1 flex flex-col items-center gap-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-0 w-full max-w-xs"
          >
            {["YouTube", "Click ThumbBatch", "Done."].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-0 w-full">
                <div className={`w-full py-2 px-4 rounded-md text-center text-sm font-medium border
                  ${i === 2
                    ? "border-accent/50 bg-accent/10 text-accent font-bold"
                    : "border-border bg-secondary text-foreground"}
                `}>
                  {step}
                </div>
                {i < 2 && <ArrowDown className="w-4 h-4 text-accent/60 my-1" />}
              </div>
            ))}
          </motion.div>
          <p className="mt-4 text-sm text-accent font-medium">3 steps. That's it.</p>
        </div>
      </div>
    </section>
  )
}
