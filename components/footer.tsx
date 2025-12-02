import { BrainCircuitIcon, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://instagram.com/insighthub.ink",
      color: "hover:text-pink-500"
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://facebook.com/insighthub.ink",
      color: "hover:text-blue-500"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/insighthub",
      color: "hover:text-sky-500"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/company/insighthub",
      color: "hover:text-blue-600"
    },
    {
      icon: Youtube,
      name: "YouTube",
      href: "https://youtube.com/@insighthub",
      color: "hover:text-red-500"
    }
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8 m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuitIcon className="h-6 w-6 text-accent" />
              <span className="font-bold">InsightHub</span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
              Premium social media growth services and personal finance management. Buy SMM services or track your finances with FinTrack. Trusted by 500+ clients worldwide.
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/smm" className="text-sm text-muted-foreground hover:text-foreground">
                  SMM Services
                </Link>
              </li>
              <li>
                <Link href="/fintrack" className="text-sm text-muted-foreground hover:text-foreground">
                  FinTrack
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  SMM Services
                </Link>
              </li>
              <li>
                <Link href="https://fintrack.insighthub.ink" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  FinTrack - Finance Manager
                </Link>
              </li>
              <li>
                <Link href="/fintrack" className="text-sm text-muted-foreground hover:text-foreground">
                  Track Expenses
                </Link>
              </li>
              <li>
                <Link href="/fintrack" className="text-sm text-muted-foreground hover:text-foreground">
                  Plan Goals
                </Link>
              </li>
              <li>
                <Link href="/fintrack" className="text-sm text-muted-foreground hover:text-foreground">
                  AI Insights
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-sm text-muted-foreground hover:text-foreground">
                  DMCA Policy
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@insighthub.ink</li>
                <li>SMM.insighthub.ink</li>
                <li>fintrack.insighthub.ink</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InsightHub.ink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}