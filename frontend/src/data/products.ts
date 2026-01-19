export interface Product {
  id: string
  name: string
  category: 'recent' | 'popular' | 'equipment' | 'parts'
  shortDescription: string
  fullDescription: string
  price?: string
  image: string
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
image: '/polymer-repair-mortar.jpeg',

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
    id: 'ship-navigation-radar',
    name: 'Ship Navigation Radar System',
    category: 'recent',
    shortDescription: 'Advanced X-band/S-band radar for maritime navigation and collision avoidance',
    fullDescription: 'State-of-the-art marine radar system featuring dual-band operation, ARPA (Automatic Radar Plotting Aid), and AIS integration for enhanced situational awareness and safe navigation in all weather conditions.',
    price: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=800&q=80',
    features: [
      'Dual X-band/S-band operation',
      'ARPA with target tracking (up to 100 targets)',
      'Integrated AIS display',
      'Electronic Bearing Line (EBL) and Variable Range Marker (VRM)',
      'Guard zones and collision alarms',
      'High-resolution color display',
      'Rain/sea clutter suppression',
      'Chart overlay capability',
      'IMO and SOLAS compliant'
    ],
    specifications: {
      'Frequency': 'X-band (9.4 GHz) / S-band (3 GHz)',
      'Range': '0.125 NM to 96 NM',
      'Display': '19" to 26" high-brightness LCD',
      'Antenna': '4ft - 12ft open array or radome',
      'Power Supply': '24V DC or 110/220V AC',
      'Target Capacity': '100 ARPA targets, 1000 AIS targets',
      'Interface': 'NMEA 0183/2000, Ethernet',
      'Certification': 'IEC 62388, IMO MSC.192(79)'
    },
    applications: [
      'Commercial merchant vessels',
      'Tankers and bulk carriers',
      'Offshore supply vessels',
      'Naval and coast guard ships',
      'Tugboats and pilot vessels',
      'Fishing and research vessels'
    ],
    relatedProducts: ['marine-diesel-generator', 'marine-gps-chartplotter', 'marine-vhf-radio']
  },

  // Other Products
  {
    id: 'marine-hydraulic-winch',
    name: 'Marine Hydraulic Winch',
    category: 'popular',
    shortDescription: 'Heavy-duty hydraulic winch for anchor handling and cargo operations',
    fullDescription: 'Industrial-grade marine hydraulic winch engineered for demanding offshore and shipboard operations. Features robust construction, precise load control, and safety mechanisms for reliable performance in harsh marine environments.',
    price: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
    features: [
      'High pulling capacity (5 - 100 tons)',
      'Variable speed control',
      'Emergency brake system',
      'Corrosion-resistant coating',
      'Load monitoring display',
      'Remote control operation',
      'Overload protection',
      'Low maintenance design'
    ],
    specifications: {
      'Pulling Capacity': '5 to 100 tons',
      'Line Speed': '0-30 m/min',
      'Drum Capacity': '200m to 1000m wire rope',
      'Working Pressure': '160-210 bar',
      'Power Unit': 'Hydraulic motor with pump station',
      'Brake Type': 'Multi-disc hydraulic brake',
      'Material': 'Marine-grade steel with epoxy coating',
      'Certification': 'DNV, ABS, Lloyd\'s Register'
    },
    applications: [
      'Anchor handling operations',
      'Mooring and towing',
      'Cargo loading/unloading',
      'Offshore construction',
      'Subsea equipment deployment',
      'Salvage operations'
    ],
    relatedProducts: ['marine-diesel-generator', 'wire-rope-slings', 'hydraulic-power-unit']
  },
  {
    id: 'marine-air-compressor',
    name: 'Marine Air Compressor',
    category: 'equipment',
    shortDescription: 'Heavy-duty screw air compressor for shipboard pneumatic systems',
    fullDescription: 'Marine-certified rotary screw air compressor designed to provide reliable compressed air for ship operations, including starting main engines, pneumatic tools, and control systems. Built to withstand vibration, moisture, and salt corrosion.',
    price: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1589519160142-358e79f83be6?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1598134493019-ff9e3e4f1b3e?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1565731333791-0c685879d4b1?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1581092583537-20d51876f3c3?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1580428180098-24b353830e9d?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784f5b?w=800&q=80',
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
