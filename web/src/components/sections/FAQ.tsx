"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is ThumbBatch free?",
    a: "Yes. ThumbBatch is designed to be 100% free.",
  },
  {
    q: "Do I need an account?",
    a: "No. Install it and use it immediately.",
  },
  {
    q: "Does ThumbBatch upload my thumbnails?",
    a: "No. The product is designed around local browser processing. Your data never leaves your browser.",
  },
  {
    q: "Does it download YouTube videos?",
    a: "No. ThumbBatch focuses exclusively on thumbnail images, not video files.",
  },
  {
    q: "Does it work with Shorts?",
    a: "Yes, where the thumbnail is available.",
  },
  {
    q: "Can I download multiple thumbnails at once?",
    a: "Yes. Bulk mode lets you select thumbnails detected on supported YouTube pages and package them into a single ZIP file.",
  },
  {
    q: "Does it work on every YouTube page?",
    a: "The extension is designed for common YouTube video, channel, search, and feed experiences. Because YouTube's interface changes over time, DOM-based bulk detection may occasionally require updates.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">FAQ</h2>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`item-${i}`} className="border-border/70">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
