export type Language = "en" | "fr" | "cn"

interface Translations {
  [key: string]: {
    [lang in Language]: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", fr: "Accueil", cn: "首页" },
  "nav.about": { en: "About", fr: "À propos", cn: "关于" },
  "nav.services": { en: "Services", fr: "Services", cn: "服务" },
  "nav.tracking": { en: "Tracking", fr: "Suivi", cn: "追踪" },
  "nav.auctions": { en: "Auctions", fr: "Enchères", cn: "拍卖" },
  "nav.insurance": { en: "Insurance", fr: "Assurance", cn: "保险" },
  "nav.login": { en: "Login", fr: "Connexion", cn: "登录" },
  "nav.register": { en: "Register", fr: "S'inscrire", cn: "注册" },

  // Hero
  "hero.title": { en: "Tech Meet Cargo", fr: "Tech Meet Cargo", cn: "科技遇见货运" },
  "hero.subtitle": {
    en: "Revolutionary maritime cargo platform connecting shippers, carriers, and logistics providers worldwide",
    fr: "Plateforme de fret maritime révolutionnaire reliant expéditeurs, transporteurs et prestataires logistiques dans le monde entier",
    cn: "连接全球托运人、承运人和物流供应商的革命性海运货物平台",
  },

  // Common
  "common.learnMore": { en: "Learn More", fr: "En savoir plus", cn: "了解更多" },
  "common.getStarted": { en: "Get Started", fr: "Commencer", cn: "开始使用" },
  "common.contact": { en: "Contact Us", fr: "Nous contacter", cn: "联系我们" },
}

export function translate(key: string, lang: Language): string {
  return translations[key]?.[lang] || key
}
