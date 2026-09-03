"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight">
          Bulk YouTube thumbnails.<br />
          <span className="text-muted-foreground">One click.</span>
        </h1>
      </motion.div>

      <motion.p 
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Stop screenshotting. Stop searching for sketchy downloaders. ThumbBatch gets the highest-quality YouTube thumbnails directly from your browser — individually or in bulk.
      </motion.p>

      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 text-base w-full sm:w-auto" asChild>
          <Link href="#install">Download for Chrome</Link>
        </Button>
        <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
          <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank">View on GitHub ↗</Link>
        </Button>
      </motion.div>

      <motion.div 
        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span>100% Free</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>Open Source</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>No Account</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>No Tracking</span>
      </motion.div>

      {/* Simulated Product Demo Area */}
      <motion.div 
        className="mt-20 w-full max-w-4xl relative rounded-xl border border-border/50 bg-card overflow-hidden shadow-2xl ring-1 ring-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="h-10 border-b border-border flex items-center px-4 bg-[#121212]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
            <div className="w-3 h-3 rounded-full bg-[#F4BF4F]" />
            <div className="w-3 h-3 rounded-full bg-[#61C554]" />
          </div>
          <div className="mx-auto bg-[#1A1A1A] text-[#737373] text-xs px-3 py-1 rounded-md border border-border">
            youtube.com/feed/subscriptions
          </div>
        </div>
        
        {/* Fake YouTube background */}
        <div className="aspect-video bg-[#0F0F0F] p-6 relative overflow-hidden flex flex-col">
          <div className="flex gap-4 mb-6">
             <div className="w-10 h-10 rounded-full bg-white/10" />
             <div className="flex-1 space-y-2">
               <div className="h-4 bg-white/10 rounded w-1/4" />
               <div className="h-4 bg-white/10 rounded w-1/3" />
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="aspect-video bg-white/5 rounded-lg border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
               </div>
             ))}
          </div>

          {/* Fake Extension Popup overlay */}
          <motion.div 
            className="absolute top-4 right-4 w-80 bg-[#121212] border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden z-10 origin-top-right"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4, type: "spring" }}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-accent flex items-center justify-center text-[8px] font-bold">TB</div>
                <span className="font-semibold text-sm">ThumbBatch</span>
              </div>
              <span className="text-xs text-muted-foreground">Found 30</span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2">
               {[1,2,3,4,5,6].map(i => (
                 <motion.div 
                   key={i} 
                   className="aspect-video bg-accent/20 border border-accent/50 rounded-sm relative"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1.2 + (i * 0.1) }}
                 >
                   <div className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-sm flex items-center justify-center">
                     <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                 </motion.div>
               ))}
            </div>
            <div className="p-4 border-t border-border bg-[#0A0A0A]">
               <Button className="w-full bg-white text-black h-9 text-xs">Download ZIP (30)</Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
