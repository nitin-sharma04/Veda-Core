"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Globe, ShoppingBag, Bot, Menu, X, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface FeatureLink {
  name: string
  href: string
  icon: React.ReactNode
  description: string
  color: string
}

export function FeatureNavigation({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const features: FeatureLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      description: "Your personal health dashboard",
      color: "from-slate-600 to-slate-800",
    },
    {
      name: "Pulse Sync",
      href: "/pulse-sync",
      icon: <Activity className="h-5 w-5" />,
      description: "Monitor your vital health metrics",
      color: "from-purple-600 to-indigo-800",
    },
    {
      name: "Biosphere 3D",
      href: "/biosphere",
      icon: <Globe className="h-5 w-5" />,
      description: "Explore your dosha balance in 3D",
      color: "from-amber-500 to-orange-700",
    },
    {
      name: "Vital Market",
      href: "/vital-market",
      icon: <ShoppingBag className="h-5 w-5" />,
      description: "Personalized health products",
      color: "from-emerald-600 to-teal-800",
    },
    {
      name: "Dhara AI",
      href: "/dhara-ai",
      icon: <Bot className="h-5 w-5" />,
      description: "Your AI health assistant",
      color: "from-blue-600 to-cyan-800",
    },
  ]

  return (
    <div className={cn("flex items-center", className)}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {features.map((feature) => (
          <Link key={feature.name} href={feature.href} className="relative group">
            <Button
              variant={pathname === feature.href ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex items-center gap-2 rounded-full px-3 transition-all",
                pathname === feature.href && `bg-gradient-to-r ${feature.color} text-white`,
              )}
            >
              {feature.icon}
              <span>{feature.name}</span>
            </Button>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-48 p-2 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {feature.description}
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Features</h2>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto py-2">
                {features.map((feature) => (
                  <Link key={feature.name} href={feature.href} onClick={() => setOpen(false)}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors",
                        pathname === feature.href && "bg-muted",
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r",
                          feature.color,
                        )}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

