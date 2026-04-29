import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding marketplace listings...');

  // Find the admin user (must already exist)
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@ontimemaritime.com' },
  });

  if (!admin) {
    throw new Error('Admin user not found. Run the full seed first or create the admin user.');
  }

  console.log('✅ Admin user found:', admin.email);

  // Clear existing listings and re-seed
  await prisma.listing.deleteMany();
  console.log('🗑️  Cleared existing listings');

  await prisma.listing.createMany({
    data: [
      {
        seller_id: admin.id,
        category: 'cargo' as any,
        marketplace_category: 'container',
        title: '40ft Refrigerated Container - Available for Lease',
        description: 'High-quality refrigerated container suitable for perishable goods. Maintained to ISO standards with remote temperature monitoring.',
        price_usd: 2500,
        price_type: 'per_month',
        currency: 'USD',
        origin_port: 'Lagos Port',
        destination_port: 'Available Nationwide',
        eta: new Date('2025-02-01'),
        images: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
          'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800',
        ],
        location: { country: 'Nigeria', city: 'Lagos', port: 'Apapa Port', coordinates: { lat: 6.4281, lng: 3.4050 } },
        specifications: { 'Length': '40 ft', 'Temp Range': '-25°C to +25°C', 'Capacity': '67.7 m³', 'Max Payload': '27,700 kg', 'Power': '380V/3-Phase' },
        condition: 'like_new',
        availability: 'available',
        bol_required: false,
        bol_verified: false,
        featured: true,
        views: 245,
        inquiries: 18,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-05T10:00:00Z'),
      },
      {
        seller_id: admin.id,
        category: 'ship' as any,
        marketplace_category: 'vessel',
        title: 'MV OCEAN PRIDE - Bulk Carrier for Charter',
        description: 'Handymax bulk carrier available for time or voyage charter. Ideal for dry bulk commodities including grain, coal, and fertilisers.',
        price_usd: 18500,
        price_type: 'per_day',
        currency: 'USD',
        origin_port: 'Lagos',
        destination_port: 'Worldwide',
        eta: new Date('2025-01-20'),
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
          'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=800',
        ],
        location: { country: 'Nigeria', city: 'Lagos', port: 'Lagos Port', coordinates: { lat: 6.4285, lng: 3.4219 } },
        specifications: { 'DWT': '52,000 MT', 'LOA': '189.9m', 'Beam': '32.2m', 'Draft': '12.0m', 'Year Built': '2018', 'Flag': 'Panama' },
        condition: 'good',
        availability: 'available',
        bol_required: true,
        bol_number: 'OTM-BOL-2025-001234',
        bol_verified: true,
        featured: true,
        views: 512,
        inquiries: 34,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-03T08:00:00Z'),
      },
      {
        seller_id: admin.id,
        category: 'spare_part' as any,
        marketplace_category: 'spare_parts',
        title: 'MAN B&W Main Engine Spare Parts Bundle',
        description: 'Genuine OEM spare parts for MAN B&W MC/ME series 2-stroke engines. Includes pistons, cylinder liners, exhaust valves, and fuel injectors.',
        price_usd: 45000,
        price_type: 'negotiable',
        currency: 'USD',
        origin_port: 'Port Harcourt',
        destination_port: 'Worldwide Shipping',
        eta: new Date('2025-01-25'),
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        ],
        location: { country: 'Nigeria', city: 'Port Harcourt', port: 'Rivers Port', coordinates: { lat: 4.8156, lng: 7.0498 } },
        specifications: { 'Engine Series': 'MAN B&W MC/ME', 'Condition': 'New OEM', 'Parts Count': '47 items', 'Certification': 'Class Approved' },
        condition: 'new',
        availability: 'available',
        bol_required: false,
        bol_verified: false,
        featured: false,
        views: 89,
        inquiries: 7,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-07T14:00:00Z'),
      },
      {
        seller_id: admin.id,
        category: 'cargo' as any,
        marketplace_category: 'equipment',
        title: 'Shore Crane - 100T Capacity Available',
        description: 'Mobile harbour crane with 100-tonne lifting capacity. GPS-enabled with anti-sway technology. Available for short and long-term hire.',
        price_usd: 8500,
        price_type: 'per_day',
        currency: 'USD',
        origin_port: 'Apapa',
        destination_port: 'Nigerian Ports',
        eta: new Date('2025-02-10'),
        images: [
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
        ],
        location: { country: 'Nigeria', city: 'Lagos', port: 'Apapa Terminal', coordinates: { lat: 6.4490, lng: 3.3691 } },
        specifications: { 'Capacity': '100 MT', 'Outreach': '50m', 'Hoist Speed': '120 m/min', 'Power': 'Diesel/Electric', 'Mobility': 'Rail-mounted' },
        condition: 'good',
        availability: 'available',
        bol_required: false,
        bol_verified: false,
        featured: false,
        views: 156,
        inquiries: 12,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-06T11:00:00Z'),
      },
      {
        seller_id: admin.id,
        category: 'service' as any,
        marketplace_category: 'repairs',
        title: 'Underwater Hull Inspection & Cleaning Service',
        description: 'Professional underwater hull inspection using ROV and certified divers. Includes fouling removal, anode replacement, and class survey preparation.',
        price_usd: 12000,
        price_type: 'fixed',
        currency: 'USD',
        origin_port: 'Lagos',
        destination_port: 'All Nigerian Ports',
        eta: new Date('2025-01-28'),
        images: [
          'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=800',
        ],
        location: { country: 'Nigeria', city: 'Lagos', port: 'Lagos Anchorage', coordinates: { lat: 6.3654, lng: 3.3941 } },
        specifications: { 'Service Type': 'Hull Cleaning + Inspection', 'Diving Cert': 'CMAS Grade III', 'ROV': 'VideoRay Pro 4', 'Report': 'Class Approved', 'Timeline': '24-48 hours' },
        condition: 'new',
        availability: 'available',
        bol_required: false,
        bol_verified: false,
        featured: false,
        views: 203,
        inquiries: 21,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-04T09:00:00Z'),
      },
      {
        seller_id: admin.id,
        category: 'cargo' as any,
        marketplace_category: 'warehouse',
        title: 'Bonded Warehouse Space - Tin Can Island',
        description: 'Class-A bonded warehouse facility available for lease. Customs-bonded for duty-free storage. 24/7 security, CCTV, fire suppression.',
        price_usd: 15000,
        price_type: 'per_month',
        currency: 'USD',
        origin_port: 'Tin Can Island',
        destination_port: 'N/A',
        eta: new Date('2025-02-01'),
        images: [
          'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
          'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800',
        ],
        location: { country: 'Nigeria', city: 'Lagos', port: 'Tin Can Island Port', coordinates: { lat: 6.4481, lng: 3.3247 } },
        specifications: { 'Floor Area': '5,000 m²', 'Clear Height': '12m', 'Loading Docks': '8 bays', 'Security': '24/7 Armed', 'Bonded': 'Yes - NCS Approved' },
        condition: 'good',
        availability: 'available',
        bol_required: false,
        bol_verified: false,
        featured: true,
        views: 378,
        inquiries: 29,
        seller_name: 'OnTime Maritime Admin',
        seller_rating: 4.8,
        status: 'active' as any,
        created_at: new Date('2025-01-02T07:00:00Z'),
      },
    ],
  });

  console.log('✅ Marketplace Listings seeded (6)');
  console.log('\n🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
