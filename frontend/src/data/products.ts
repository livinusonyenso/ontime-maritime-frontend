export interface Product {
  id: string
  name: string
  category: 'recent' | 'popular' | 'equipment' | 'parts'
  shortDescription: string
  fullDescription: string
  price?: string
  images: string[] // Array of image URLs - first image is the primary
  features: string[]
  specifications: Record<string, string>
  applications: string[]
  relatedProducts: string[] // Array of product IDs
}

export const products: Product[] = [
  {
  id: 'polymer-repair-mortar',
  name: 'Polymer-Modified Concrete Repair Mortar',
  category: 'recent',
  shortDescription: 'High-strength polymer-modified repair mortar for concrete patching and structural repairs',
  fullDescription:
    'Premium polymer-modified cementitious repair mortar designed for restoring damaged concrete surfaces. Suitable for vertical, horizontal, and overhead repairs, offering excellent bonding strength, low shrinkage, and long-term durability in harsh environments.',
  price: 'Contact for Quote',

  // Cement image
images: ['/polymer-repair-mortar.jpeg',],

  features: [
    'Polymer-modified for superior adhesion',
    'High compressive and flexural strength',
    'Low shrinkage and crack resistance',
    'Excellent workability',
    'Fast setting and early strength gain',
    'Suitable for vertical and overhead repairs',
    'Water and weather resistant',
    'Compatible with reinforced concrete'
  ],

  specifications: {
    'Material Type': 'Polymer-modified cementitious mortar',
    'Bag Weight': '25 kg',
    'Compressive Strength': '≥ 40 MPa (28 days)',
    'Bond Strength': '≥ 1.5 MPa',
    'Application Thickness': '5 – 50 mm per layer',
    'Setting Time': 'Initial: 30–60 minutes',
    'Curing Time': '24–48 hours (depending on conditions)',
    'Color': 'Grey',
    'Standards': 'EN 1504-3, ASTM C928'
  },

  applications: [
    'Concrete surface repair',
    'Bridge and highway maintenance',
    'Industrial floor patching',
    'Structural edge and corner repairs',
    'Precast concrete repair',
    'Marine and coastal structures'
  ],

  relatedProducts: [
    'cement-bonding-agent',
    'concrete-curing-compound',
    'reinforcement-corrosion-inhibitor'
  ]
},

 {
  id: 'self-leveling-epoxy-quartz-flooring',
  name: 'Self-Leveling Epoxy Color Quartz Flooring',
  category: 'recent',
  shortDescription: 'High-performance epoxy quartz flooring with excellent wear and chemical resistance',
  fullDescription: 'Self-leveling epoxy color quartz flooring is a high-performance flooring system composed of epoxy resin, curing agents, and selected natural colored quartz sand. It provides excellent wear resistance, strong chemical resistance, and a decorative stone-like finish. Once applied, the surface delivers both aesthetic appeal and long-term practical durability, making it suitable for demanding industrial and commercial environments.',
  price: 'Contact for Quote',
  images: ['/self-leveling-epoxy-quartz-flooring.jpeg',"https://centraltexas.globalgarageflooring.com/wp-content/uploads/2023/04/IMG_7202_13_11zon-scaled-e1685536365717.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Mw613to50ErlDqrNmRQdkD_pKug4y7AtDQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3-lwlYW3Zu1c4Uz4pWf4-IpQ1sk7VlCXNJg&s","https://s.alicdn.com/@sc04/kf/H5bb8a393fe544720ac97a5bce7c96370b/One-Stop-Service-E8308-Epoxy-Terrazzo-Colored-Sand-Self-Leveling-Floor-Paint-System-Color-Quartz-Sand-Epoxy-Floor-Coating.png_300x300.jpg"],
  features: [
    'Self-leveling smooth finish',
    'High wear and abrasion resistance',
    'Excellent chemical resistance',
    'Decorative stone-like quartz texture',
    'Strong adhesion to concrete substrates',
    'Dust-free and seamless surface',
    'Easy to clean and maintain',
    'Suitable for heavy foot traffic'
  ],
  specifications: {
    'Material Composition': 'Epoxy resin, curing agents, colored quartz sand',
    'Moisture Requirement': 'Substrate moisture content < 8%',
    'Application Method': 'Rolling or brushing',
    'Coating Thickness': 'Depends on application design',
    'Drying Time': 'At least 8 hours between coats',
    'Initial Curing': 'Light foot traffic after 24 hours',
    'Full Mechanical Strength': 'After 7 days at 25°C',
    'Finish': 'Seamless, stone-like textured surface'
  },
  applications: [
    'Industrial workshops',
    'Commercial spaces',
    'Exhibition halls',
    'Parking garages',
    'Electronics factories',
    'Food processing areas'
  ],
  relatedProducts: [
    'epoxy-floor-primer',
    'industrial-epoxy-floor-coating',
    'polyurethane-floor-topcoat'
  ]
}
,

  // Other Products
  {
  id: 'rock-tama-natural-spring-water',
  name: 'Rock Tama Natural Spring Water',
  category: 'popular',
  shortDescription: 'Pure and refreshing natural spring water available in sachet and bottled formats',
  fullDescription: 'Rock Tama Natural Spring Water is sourced from protected natural springs and processed under strict hygienic conditions to preserve its natural purity and mineral balance. It delivers a clean, refreshing taste suitable for everyday hydration and large-scale distribution. Available in both sachet and bottled water formats to meet retail, wholesale, and event supply needs.',
  price: 'Contact for Wholesale & Retail Pricing',
  images: ['/rock-tama-natural-spring-water.jpeg'],
  features: [
    'Sourced from natural springs',
    'Safe, clean, and hygienically processed',
    'Refreshing natural taste',
    'Available in sachet and bottled water',
    'NAFDAC compliant production',
    'Ideal for bulk and retail distribution',
    'Suitable for all age groups',
    'Long shelf life'
  ],
  specifications: {
    'Water Source': 'Natural spring',
    'Processing': 'Multi-stage filtration and purification',
    'Packaging Types': 'Sachet water, PET bottled water',
    'Bottle Sizes': '50cl, 75cl, 1.5L (configurable)',
    'Sachet Size': '50cl',
    'Shelf Life': '12 months',
    'Storage Condition': 'Store in a cool, dry place away from sunlight',
    'Regulatory Compliance': 'NAFDAC approved'
  },
  applications: [
    'Daily drinking water',
    'Homes and offices',
    'Retail shops and supermarkets',
    'Events and outdoor activities',
    'Schools and institutions',
    'Wholesale distribution'
  ],
  relatedProducts: [
    'packaged-table-water',
    'bottled-drinking-water',
    'water-dispenser-units'
  ]
}
,
  {
    id: 'marine-air-compressor',
    name: 'Marine Air Compressor',
    category: 'equipment',
    shortDescription: 'Heavy-duty screw air compressor for shipboard pneumatic systems',
    fullDescription: 'Marine-certified rotary screw air compressor designed to provide reliable compressed air for ship operations, including starting main engines, pneumatic tools, and control systems. Built to withstand vibration, moisture, and salt corrosion.',
    price: 'Contact for Quote',
    images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'],
    features: [
      'Oil-injected rotary screw technology',
      'Automatic start/stop control',
      'Built-in aftercooler and moisture separator',
      'Sound-attenuated enclosure',
      'Marine-grade components',
      'Electronic control panel',
      'Air receiver tank included',
      'Easy maintenance access'
    ],
    specifications: {
      'Flow Rate': '50 - 500 CFM (1.4 - 14.2 m³/min)',
      'Working Pressure': '7 - 13 bar',
      'Motor Power': '7.5 - 250 HP',
      'Drive Type': 'Direct drive or belt drive',
      'Cooling': 'Air-cooled or water-cooled',
      'Noise Level': '68-75 dB(A)',
      'Voltage': '220V/380V/440V 3-phase',
      'Certification': 'CCS, DNV, ABS, Lloyd\'s'
    },
    applications: [
      'Main engine starting air',
      'Control air for automation',
      'Pneumatic tools operation',
      'Deck machinery air supply',
      'Cargo tank purging',
      'Workshop compressed air'
    ],
    relatedProducts: ['marine-diesel-generator', 'air-dryer-unit', 'pressure-safety-valve']
  },
  {
    id: 'marine-gps-chartplotter',
    name: 'Marine GPS Chartplotter',
    category: 'equipment',
    shortDescription: 'Multi-function navigation display with GPS, charts, and sonar integration',
    fullDescription: 'Professional-grade marine chartplotter featuring high-resolution touchscreen, preloaded charts, GPS/GLONASS positioning, and support for radar, AIS, and fishfinder integration. Perfect for safe and efficient navigation.',
    price: 'Contact for Quote',
    images: ['/marine-gps-chartplotter.gif'],
    features: [
      'High-resolution touchscreen display',
      'Preloaded worldwide charts',
      'Dual GPS/GLONASS receiver',
      'Autopilot integration ready',
      'Route planning and waypoints',
      'Split-screen multi-function display',
      'NMEA 2000 connectivity',
      'Weatherproof construction (IPX7)'
    ],
    specifications: {
      'Screen Size': '7" to 24" diagonal',
      'Resolution': '800x480 to 1920x1080',
      'Chart Coverage': 'Worldwide basemap + regional charts',
      'GPS Accuracy': '<2.5m with WAAS/EGNOS',
      'Update Rate': '10 Hz',
      'Power': '12/24V DC',
      'Mounting': 'Flush or bracket mount',
      'Certification': 'IEC 61162, NMEA 0183/2000'
    },
    applications: [
      'Fishing vessels navigation',
      'Recreational boating',
      'Commercial shipping',
      'Offshore workboats',
      'Sailing yachts',
      'Coast guard and rescue'
    ],
    relatedProducts: ['ship-navigation-radar', 'marine-vhf-radio', 'marine-autopilot']
  },
  {
    id: 'marine-vhf-radio',
    name: 'Marine VHF Radio System',
    category: 'equipment',
    shortDescription: 'DSC-equipped VHF marine radio with GPS and emergency features',
    fullDescription: 'Professional marine VHF radio with Digital Selective Calling (DSC) for distress alerts, GPS integration, and all international marine channels. Essential safety equipment for vessel communication and emergency situations.',
    price: 'Contact for Quote',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGn2RoGlmvi_sIoNtC5H4ZpETa5Y6lG3J2g&s'],
    features: [
      'DSC (Digital Selective Calling) Class D',
      'Built-in GPS receiver',
      'Distress button with position transmission',
      'All international and USA channels',
      'Noise-cancelling microphone',
      'Waterproof (IPX8)',
      'LCD display with backlighting',
      '25W transmit power'
    ],
    specifications: {
      'Frequency Range': '156.025 - 163.275 MHz',
      'Channels': 'All international + USA channels',
      'Transmit Power': '1W / 25W selectable',
      'DSC': 'Class D compliant',
      'GPS': 'Integrated 12-channel',
      'Power Supply': '12V DC',
      'Dimensions': 'Compact flush-mount design',
      'Certification': 'FCC, CE, IMO GMDSS'
    },
    applications: [
      'Ship-to-ship communication',
      'Ship-to-shore communication',
      'Emergency distress calls',
      'Port and harbor operations',
      'Fishing fleet coordination',
      'Maritime safety compliance'
    ],
    relatedProducts: ['marine-gps-chartplotter', 'emergency-epirb', 'ship-navigation-radar']
  },
  {
    id: 'wire-rope-slings',
    name: 'Wire Rope Slings & Rigging',
    category: 'parts',
    shortDescription: 'Heavy-duty galvanized wire rope slings for cargo and lifting operations',
    fullDescription: 'High-strength wire rope slings manufactured from galvanized steel for superior corrosion resistance. Available in various configurations including single-leg, multi-leg, and endless slings for safe cargo handling and lifting.',
    price: 'Contact for Quote',
    images: ['https://images.unsplash.com/photo-1565731333791-0c685879d4b1?w=800&q=80'],
    features: [
      'Galvanized steel construction',
      'Various configurations available',
      'Forged steel fittings',
      'Color-coded for capacity',
      'Proof-tested and certified',
      'Inspection tags included',
      'Custom lengths available',
      'UV and corrosion resistant'
    ],
    specifications: {
      'Material': 'Galvanized 6x19 or 6x36 IWRC',
      'Diameter': '6mm to 64mm',
      'Working Load': '0.5 to 150 tons',
      'Safety Factor': '5:1 or 6:1',
      'Types': 'Single-leg, 2-leg, 4-leg, endless',
      'Fittings': 'Eye, hook, shackle, master link',
      'Standards': 'ASME B30.9, EN 13414',
      'Certification': 'Test certificate included'
    },
    applications: [
      'Container lifting',
      'Cargo handling',
      'Heavy machinery lifting',
      'Offshore crane operations',
      'Shipyard construction',
      'Port terminal operations'
    ],
    relatedProducts: ['marine-hydraulic-winch', 'shackles-hooks', 'lifting-chains']
  },
  {
    id: 'hydraulic-power-unit',
    name: 'Hydraulic Power Unit',
    category: 'equipment',
    shortDescription: 'Compact marine hydraulic power pack for deck machinery and winches',
    fullDescription: 'Self-contained hydraulic power unit designed for marine applications. Features electric or diesel-driven pump, reservoir, filtration system, and control valves in a compact skid-mounted package.',
    price: 'Contact for Quote',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2FlWPoD5xy3eMSGew0oXDRN27XtlYS9nleg&s'],
    features: [
      'Electric or diesel-driven options',
      'Variable displacement pump',
      'High-efficiency filtration',
      'Oil cooler with temperature control',
      'Pressure and flow control valves',
      'Emergency stop circuit',
      'Corrosion-resistant components',
      'Compact skid-mounted design'
    ],
    specifications: {
      'Flow Rate': '10 - 500 LPM',
      'Working Pressure': '100 - 350 bar',
      'Tank Capacity': '50 - 1000 liters',
      'Motor Power': '5.5 - 200 HP',
      'Drive': 'Electric motor or diesel engine',
      'Filtration': '10 micron absolute',
      'Fluid': 'ISO VG 46 hydraulic oil',
      'Certification': 'DNV, ABS, Lloyd\'s Register'
    },
    applications: [
      'Hydraulic winch operation',
      'Crane power supply',
      'Hatch cover systems',
      'Steering gear backup',
      'Offshore equipment',
      'Deck machinery power'
    ],
    relatedProducts: ['marine-hydraulic-winch', 'hydraulic-hoses', 'pressure-gauges']
  },
  {
    id: 'marine-autopilot',
    name: 'Marine Autopilot System',
    category: 'equipment',
    shortDescription: 'Advanced autopilot system for automatic steering and course keeping',
    fullDescription: 'Professional marine autopilot with GPS and compass integration for precise automatic steering. Features adaptive algorithms, wind compensation, and integration with chartplotters for waypoint navigation.',
    price: 'Contact for Quote',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbe5DUVj8nkusLbnee4qfvbz0TZ5Jdg8fvg&s'],
    features: [
      'GPS and compass integration',
      'Adaptive steering algorithms',
      'Wind and current compensation',
      'Waypoint navigation',
      'Track mode and pattern steering',
      'Shadow drive mode',
      'NMEA 2000 connectivity',
      'Wireless remote control'
    ],
    specifications: {
      'Control Unit': 'Microprocessor-based',
      'Compass': 'Fluxgate or satellite',
      'Drive Type': 'Hydraulic, electric, or mechanical',
      'Rudder Feedback': 'Analog or digital',
      'Power': '12/24V DC',
      'Interface': 'NMEA 0183/2000, Ethernet',
      'Display': 'Multifunction or dedicated',
      'Certification': 'IEC 60945, ISO 11674'
    },
    applications: [
      'Long-distance cruising',
      'Fishing vessel operations',
      'Commercial shipping',
      'Offshore support vessels',
      'Recreational sailing',
      'Survey and research vessels'
    ],
    relatedProducts: ['marine-gps-chartplotter', 'ship-navigation-radar', 'rudder-angle-indicator']
  },
  {
    id: 'emergency-epirb',
    name: 'Emergency EPIRB Beacon',
    category: 'equipment',
    shortDescription: '406 MHz EPIRB for maritime distress alerting and search & rescue',
    fullDescription: 'Satellite-linked Emergency Position Indicating Radio Beacon (EPIRB) that transmits distress signals to search and rescue authorities via the Cospas-Sarsat satellite system. Essential SOLAS safety equipment.',
    price: 'Contact for Quote',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SAgTDDEvhGMmQZFtqunTdrY1X7pdBuu87A&s'],
    features: [
      '406 MHz satellite transmission',
      '121.5 MHz homing signal',
      'Integrated GPS for precise location',
      'Automatic float-free activation',
      'Manual activation option',
      'Built-in strobe light',
      '48+ hour battery life',
      'Waterproof (depth rated)'
    ],
    specifications: {
      'Frequency': '406.025 MHz (distress), 121.5 MHz (homing)',
      'GPS': 'Integrated 12-channel',
      'Battery Life': '48+ hours continuous',
      'Activation': 'Automatic or manual',
      'Operating Temp': '-20°C to +55°C',
      'Buoyancy': 'Float-free design',
      'Certification': 'COSPAS-SARSAT, FCC, SOLAS',
      'Registration': 'Required with national authority'
    },
    applications: [
      'SOLAS vessel compliance',
      'Commercial shipping',
      'Offshore oil & gas',
      'Fishing vessels',
      'Recreational boating',
      'Yacht and sailboat safety'
    ],
    relatedProducts: ['marine-vhf-radio', 'life-raft', 'marine-flares']
  }
]

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

// Helper function to get related products
export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId)
  if (!product) return []

  return product.relatedProducts
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined)
}

// Helper function to get products by category
export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category)
}
