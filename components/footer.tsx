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
      <div className="container py-12 m-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <BrainCircuitIcon className="h-6 w-6 text-accent" />
              <span className="font-bold">InsightHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional social media management services and business insights to help your brand grow and succeed in the digital world.
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
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
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
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/smm" className="text-sm text-muted-foreground hover:text-foreground">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/smm" className="text-sm text-muted-foreground hover:text-foreground">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="/smm" className="text-sm text-muted-foreground hover:text-foreground">
                  Community Management
                </Link>
              </li>
              <li>
                <Link href="/smm" className="text-sm text-muted-foreground hover:text-foreground">
                  Analytics & Reporting
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
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@insighthub.ink</li>
                <li>SMM.insighthub.ink</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InsightHub.ink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}