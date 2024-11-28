'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

// 定义语言配置
const LANGUAGES = {
  'zh-CN': {
    label: '简体中文',
    shortLabel: '简体',
    flag: '🇨🇳'
  },
  'zh-TW': {
    label: '繁體中文',
    shortLabel: '繁體',
    flag: '🇹🇼'
  },
  'en': {
    label: 'English',
    shortLabel: 'English',
    flag: '🇺🇸'
  }
} as const;

type LocaleKey = keyof typeof LANGUAGES;

interface Props {
  onLocaleChange: (locale: LocaleKey) => void;
  currentLocale: LocaleKey;
}

export function LanguageSwitch({ onLocaleChange, currentLocale }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
          <Languages className="h-4 w-4" />
          {`${LANGUAGES[currentLocale].flag} ${LANGUAGES[currentLocale].shortLabel}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(LANGUAGES) as [LocaleKey, typeof LANGUAGES[LocaleKey]][]).map(([key, lang]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onLocaleChange(key)}
            className={currentLocale === key ? 'bg-accent' : ''}
          >
            {`${lang.flag} ${lang.label}`}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 