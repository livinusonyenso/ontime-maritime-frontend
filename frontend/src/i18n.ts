import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import enTranslation from "./locales/en/translation.json"
import zhTranslation from "./locales/cn/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      // BCP 47 tag for Chinese is "zh", not "cn"
      // "cn" is a country code — browsers never report it as a language
      zh: { translation: zhTranslation },
    },
    fallbackLng: "en",
    // "zh" covers zh-CN, zh-TW, zh-Hans, zh-Hant, etc. via nonExplicitSupportedLngs
    supportedLngs: ["en", "zh"],
    // Allow "zh-CN" / "zh-TW" / "zh-Hans" to resolve to the "zh" resource
    nonExplicitSupportedLngs: true,
    detection: {
      // navigator first — reads browser language before any cached value
      order: ["navigator", "localStorage", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "ontime_language",
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
