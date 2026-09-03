"use client"

import { motion } from "framer-motion"
import { GitBranch } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function OpenSource() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border rounded-3xl p-12 md:p-20 bg-card text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Don&apos;t trust us.<br />Read the code.
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          ThumbBatch is open source. See exactly what the extension does.
        </p>

        {/* GitHub repo mockup */}
        <div className="max-w-lg mx-auto border border-border rounded-xl bg-[#0A0A0A] overflow-hidden text-left mb-8">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <GitBranch className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">
              <span className="text-foreground font-semibold">gauravkhatriweb</span>
              {" / "}
              <span className="text-foreground font-semibold">ThumbBatch</span>
            </span>
          </div>
          <div className="p-4 space-y-2">
            {["src/", "docs/", "manifest.json", "popup.js", "extractor.js", "background.js"].map((file) => (
              <div key={file} className="flex items-center gap-3 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-default">
                <span className="w-3 h-3 opacity-50">
                  {file.endsWith("/") ? "📁" : "📄"}
                </span>
                {file}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-white/[0.02]">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>MIT License · Open Source</span>
            </div>
          </div>
        </div>

        <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
          <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank">
            <GitBranch className="w-5 h-5" />
            View on GitHub ↗
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
