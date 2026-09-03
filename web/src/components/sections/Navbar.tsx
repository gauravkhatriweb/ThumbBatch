import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(255,0,0,0.3)]">
            TB
          </div>
          <span className="font-semibold text-lg tracking-tight">ThumbBatch</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="#privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button size="sm" asChild className="hidden sm:inline-flex bg-white text-black hover:bg-neutral-200">
            <Link href="#install">Get ThumbBatch &rarr;</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
