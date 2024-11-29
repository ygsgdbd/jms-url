'use client'

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"
import { useContext } from "react"
import { LocaleContext } from "./intl-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { Logo } from "@/components/logo"

export function NavBar() {
  const { locale, setLocale } = useContext(LocaleContext)

  const localeNames = {
    'zh-CN': { name: '简体中文', emoji: '🇨🇳' },
    'zh-TW': { name: '繁體中文', emoji: '🇹🇼' },
    'en': { name: 'English', emoji: '🇺🇸' }
  }

  const currentLocale = localeNames[locale as keyof typeof localeNames]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="https://github.com/ygsgdbd/jms-url" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden" asChild>
            <Link href="https://github.com/ygsgdbd/jms-url" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <Globe className="h-4 w-4 mr-2" />
                <span>{currentLocale.emoji}</span>
                <span className="ml-2 hidden sm:inline-block">{currentLocale.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(localeNames).map(([key, { name, emoji }]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setLocale(key as keyof typeof localeNames)}
                >
                  <span className="mr-2">{emoji}</span>
                  <span>{name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
