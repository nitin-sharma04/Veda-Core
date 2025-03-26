import Link from "next/link"
import { UserButton } from "@/components/user-button"
import { ModeToggle } from "@/components/mode-toggle"
import { FeatureNavigation } from "@/components/feature-navigation"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
            <svg
              width="20"
              height="20"
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
          <span className="font-bold text-lg hidden sm:inline-block">Veda</span>
        </Link>

        <FeatureNavigation className="flex-1" />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}

