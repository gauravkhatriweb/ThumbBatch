"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

const noes = [
  "No subscription",
  "No trial",
  "No credit card",
  "No account",
  "No premium tier",
  "No hidden limits",
]

export function Pricing() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border rounded-3xl p-12 md:p-20 bg-card text-center"
      >
        <p className="text-8xl md:text-9xl font-black tracking-tighter text-foreground">$0</p>
        <p className="text-2xl font-semibold text-muted-foreground mt-2">Seriously.</p>
        <p className="text-lg text-muted-foreground mt-4 max-w-md mx-auto">
          ThumbBatch is completely free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto mt-12">
          {noes.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 text-base" asChild>
            <Link href="#install">Get ThumbBatch — Free →</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
