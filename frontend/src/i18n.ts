import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import enTranslation from "./locales/en/translation.json"
import cnTranslation from "./locales/cn/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      cn: { translation: cnTranslation },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "cn"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "ontime_language",
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
