"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Home, Menu, Activity, Globe, ShoppingBag, MessageSquare, User, Settings, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserButton } from "@/components/user-button"
import { ModeToggle } from "@/components/mode-toggle"

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview of your health and wellness",
  },
  {
    title: "Pulse Sync",
    href: "/pulse-sync",
    icon: Activity,
    description: "Monitor your vital health metrics",
  },
  {
    title: "Biosphere 3D",
    href: "/biosphere",
    icon: Globe,
    description: "Explore your dosha balance in 3D",
  },
  {
    title: "Vital Market",
    href: "/vital-market",
    icon: ShoppingBag,
    description: "Shop for personalized health products",
  },
  {
    title: "Dhara AI",
    href: "/dhara-ai",
    icon: MessageSquare,
    description: "Chat with your AI health assistant",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarProvider>
              <Sidebar collapsible="none">
                <SidebarHeader className="p-4 flex justify-between items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-lg">Veda Core</span>
                  </Link>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {mainNavItems.map((item) => (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname === item.href} onClick={() => setOpen(false)}>
                              <Link href={item.href}>
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/profile">
                              <User className="h-5 w-5" />
                              <span>Profile</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/settings">
                              <Settings className="h-5 w-5" />
                              <span>Settings</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/help">
                              <HelpCircle className="h-5 w-5" />
                              <span>Help & Support</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="p-4">
                  <div className="flex justify-between items-center">
                    <ModeToggle />
                    <UserButton />
                  </div>
                </SidebarFooter>
              </Sidebar>
            </SidebarProvider>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <nav className="flex items-center gap-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

