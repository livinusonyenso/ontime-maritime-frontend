import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language

  return (
    <div className="flex items-center rounded-md  overflow-hidden text-xs font-semibold">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-2.5 py-1.5 transition-colors ${
          current === "en"
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:bg-muted"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <div className="w-px h-4 " />
      <button
        onClick={() => i18n.changeLanguage("cn")}
        className={`px-2.5 py-1.5 transition-colors ${
          current === "cn"
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:bg-muted"
        }`}
        aria-label="Switch to Chinese"
      >
        中文
      </button>
    </div>
  )
}
