"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BrainCircuitIcon } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center m-auto">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BrainCircuitIcon className="h-6 w-6 text-accent" />
            <span className="font-bold">InsightHub</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/blog" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/smm"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/smm" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              SMM Services
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/shop" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button>Subscribe</Button>
        </div>
      </div>
    </header>
  )
}