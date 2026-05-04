const SITE_URL = 'https://ontimemaritime.com'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ontime Maritime Resource',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
  },
  description:
    'Premier maritime services provider in Lagos, Nigeria specializing in ship management, clearing and forwarding, maritime insurance, and vessel agency.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    areaServed: 'NG',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'Ship Management',
    'Maritime Insurance',
    'Vessel Agency',
    'Clearing and Forwarding',
    'Freight Forwarding',
    'Cargo Tracking',
    'Digital Bill of Lading',
    'Maritime Arbitration',
  ],
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ontime Maritime Resource',
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  description:
    'Leading maritime services company in Lagos, Nigeria. Ship management, cargo tracking, vessel agency, maritime insurance, clearing and forwarding.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.5244,
    longitude: 3.3792,
  },
  areaServed: [
    { '@type': 'Country', name: 'Nigeria' },
    { '@type': 'City', name: 'Lagos' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'NGN',
  openingHours: 'Mo-Fr 08:00-17:00',
}

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ontime Maritime Resource',
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  description:
    'Comprehensive maritime professional services: ship management, clearing and forwarding, maritime insurance, vessel agency, digital bill of lading, and real-time cargo tracking in Nigeria.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.5244,
    longitude: 3.3792,
  },
  areaServed: 'Nigeria',
  serviceType: [
    'Ship Management',
    'Clearing and Forwarding',
    'Maritime Insurance',
    'Vessel Agency',
    'Cargo Tracking',
    'Digital Bill of Lading',
    'Maritime Arbitration',
    'Freight Forwarding',
    'Logistics',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Maritime Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Ship Management' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Vessel Tracking' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Maritime Insurance' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Clearing and Forwarding' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Digital Bill of Lading (eBOL)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Maritime Arbitration' },
      },
    ],
  },
}
