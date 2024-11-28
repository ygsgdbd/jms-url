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
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              <path d="M12 6l0 12" />
              <path d="M8 12l8 0" />
            </svg>
            <span className="font-bold">JMS URL</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/ygsgdbd/jmsurl" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-auto px-2">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="mr-1">{currentLocale.emoji}</span>
                  <span className="hidden sm:inline-block">{currentLocale.name}</span>
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
      </div>
    </header>
  )
}
