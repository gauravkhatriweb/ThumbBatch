import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded bg-accent flex items-center justify-center font-bold text-white text-xs shadow-[0_0_10px_rgba(255,0,0,0.2)]">
              TB
            </div>
            <span className="font-semibold text-base">ThumbBatch</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bulk YouTube thumbnails. One click.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Found a problem?{" "}
            <Link href="mailto:gauravkhatriweb@gmail.com" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Email me. I&apos;ll fix it.
            </Link>
          </p>
        </div>

        {/* Product links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Product</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
            <li><Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link></li>
            <li><Link href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link href="#install" className="text-muted-foreground hover:text-foreground transition-colors">Install</Link></li>
            <li><Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Developer */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Developer</h3>
          <ul className="space-y-3 text-sm">
            <li className="text-muted-foreground">Built by <span className="text-foreground font-medium">Gaurav Khatri</span></li>
            <li>
              <Link href="mailto:gauravkhatriweb@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                gauravkhatriweb@gmail.com
              </Link>
            </li>
            <li>
              <Link href="https://github.com/gauravkhatriweb/ThumbBatch" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                github.com/gauravkhatriweb/ThumbBatch ↗
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 ThumbBatch · Hack Club Stardance — Frictionless Mission</p>
        <p className="text-xs text-muted-foreground">MIT License · Open Source</p>
      </div>
    </footer>
  )
}
