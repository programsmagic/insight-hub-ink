"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  BrainCircuitIcon, 
  Menu, 
  X,
  Wrench,
  BookOpen,
  TrendingUp,
  Wallet,
  Info,
  Mail,
  Sparkles
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/tools", label: "Tools", icon: Wrench },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/smm", label: "SMM Services", icon: TrendingUp },
    { href: "/fintrack", label: "FinTrack", icon: Wallet },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
    
    return (
      <Link
        href={href}
        className={cn(
          "group relative text-sm font-semibold transition-all duration-200",
          "hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-md px-2 py-1",
          isActive 
            ? "text-accent" 
            : "text-foreground/70 hover:text-foreground"
        )}
        onClick={() => setIsOpen(false)}
      >
        <span className="relative z-10">{label}</span>
        {/* Active underline */}
        {isActive && (
          <span 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
            aria-hidden="true"
          />
        )}
        {/* Hover underline animation */}
        <span 
          className={cn(
            "absolute inset-x-0 -bottom-1 h-0.5 bg-accent rounded-full transition-transform duration-200 origin-left",
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )}
          aria-hidden="true"
        />
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-md px-2 py-1 -ml-2"
        >
          <div className="relative">
            <BrainCircuitIcon className="h-7 w-7 sm:h-8 sm:w-8 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent/60 animate-pulse" />
          </div>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-all duration-300">
            InsightHub
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Open menu"
                className="h-10 w-10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[400px] p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-2.5">
                    <BrainCircuitIcon className="h-7 w-7 text-accent" />
                    <span className="font-bold text-lg">InsightHub</span>
                  </div>
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    
                    return (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                            "hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                            isActive
                              ? "text-accent bg-accent/10 border-l-2 border-accent"
                              : "text-foreground/70 hover:text-foreground"
                          )}
                        >
                          <Icon className={cn(
                            "h-5 w-5 transition-colors",
                            isActive ? "text-accent" : "text-foreground/50"
                          )} />
                          <span>{link.label}</span>
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-accent" />
                          )}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t mt-auto">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
