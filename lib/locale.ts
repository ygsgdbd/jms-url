import en from "@/i18n/en";
import zhCN from "@/i18n/zh-CN";
import zhTW from "@/i18n/zh-TW";

export const localeConfig = {
  "zh-CN": {
    name: "简体中文",
    emoji: "🇨🇳",
    messages: zhCN,
  },
  "zh-TW": {
    name: "繁體中文",
    emoji: "🇹🇼",
    messages: zhTW,
  },
  en: {
    name: "English",
    emoji: "🇺🇸",
    messages: en,
  },
} as const;

export type Locale = keyof typeof localeConfig;

export const defaultLocale: Locale = "zh-CN";

function matchLocale(input: string): Locale | null {
  if (
    input.startsWith("zh-tw") ||
    input.startsWith("zh-hk") ||
    input.startsWith("zh-mo") ||
    input.includes("hant")
  ) {
    return "zh-TW";
  }

  if (input.startsWith("zh")) {
    return "zh-CN";
  }

  if (input.startsWith("en")) {
    return "en";
  }

  return null;
}

export function resolveLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const candidates = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const locale = matchLocale(candidate);

    if (locale) {
      return locale;
    }
  }

  return defaultLocale;
}
