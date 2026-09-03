"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight">
          Stop hunting for thumbnails.
        </h2>
        <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
          Install ThumbBatch and get back to the thing you actually wanted to do.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="#install">Get ThumbBatch — It&apos;s Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank">View on GitHub ↗</Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
          <span>100% Free</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Open Source</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>No Account</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>No Tracking</span>
        </div>
      </motion.div>
    </section>
  )
}
