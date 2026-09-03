import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { OldWay } from "@/components/sections/OldWay"
import { Features } from "@/components/sections/Features"
import { Personas } from "@/components/sections/Personas"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { BulkShowcase } from "@/components/sections/BulkShowcase"
import { Privacy } from "@/components/sections/Privacy"
import { Pricing } from "@/components/sections/Pricing"
import { Install } from "@/components/sections/Install"
import { TechSection } from "@/components/sections/TechSection"
import { OpenSource } from "@/components/sections/OpenSource"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Subtle section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <OldWay />
      <Features />
      <Personas />
      <HowItWorks />
      <BulkShowcase />
      <Privacy />
      <Pricing />
      <Install />
      <TechSection />
      <OpenSource />

      <div id="faq">
        <FAQ />
      </div>

      <FinalCTA />
      <Footer />
    </main>
  )
}
