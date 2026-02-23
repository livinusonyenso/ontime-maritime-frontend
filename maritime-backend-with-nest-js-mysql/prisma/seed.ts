import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Admin user ─────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ontimemaritime.com' },
    update: {},
    create: {
      email: 'admin@ontimemaritime.com',
      phone: '+2348000000001',
      password_hash: adminPassword,
      role: UserRole.admin,
      first_name: 'Admin',
      last_name: 'User',
      is_email_verified: true,
      is_phone_verified: true,
      subscription_status: 'enterprise',
    },
  });
  console.log('✅ Admin user:', admin.email);

  // ── Vessels ────────────────────────────────────────────────────────────────
  await prisma.vessel.deleteMany();
  await prisma.vessel.createMany({
    data: [
      {
        imo: '9876543', mmsi: '123456789', name: 'MSC GENEVA', type: 'container',
        flag: 'Panama', destination: 'SINGAPORE', eta: new Date('2025-01-15T14:00:00Z'),
        status: 'underway', lat: 1.2655, lng: 103.8192, speed: 18.5, heading: 45,
        course: 47, last_update: new Date('2025-01-10T08:30:00Z'),
      },
      {
        imo: '9754321', mmsi: '987654321', name: 'EVER GIVEN', type: 'container',
        flag: 'Panama', destination: 'ROTTERDAM', eta: new Date('2025-01-18T09:00:00Z'),
        status: 'underway', lat: 31.2857, lng: 32.3019, speed: 13.2, heading: 330,
        course: 332, last_update: new Date('2025-01-10T07:45:00Z'),
      },
      {
        imo: '9632145', mmsi: '456789123', name: 'MAERSK EDINBURGH', type: 'container',
        flag: 'Denmark', destination: 'LAGOS', eta: new Date('2025-01-12T16:00:00Z'),
        status: 'anchored', lat: 6.4285, lng: 3.4219, speed: 0, heading: 180,
        course: 0, last_update: new Date('2025-01-10T08:00:00Z'),
      },
      {
        imo: '9521436', mmsi: '741852963', name: 'CMA CGM MARCO POLO', type: 'container',
        flag: 'France', destination: 'SHANGHAI', eta: new Date('2025-01-20T22:00:00Z'),
        status: 'underway', lat: 22.3193, lng: 114.1694, speed: 21.3, heading: 60,
        course: 58, last_update: new Date('2025-01-10T08:15:00Z'),
      },
      {
        imo: '9412587', mmsi: '369258147', name: 'ARCTIC VOYAGER', type: 'tanker',
        flag: 'Norway', destination: 'HOUSTON', eta: new Date('2025-01-25T08:00:00Z'),
        status: 'underway', lat: 29.7604, lng: -95.3698, speed: 14.8, heading: 270,
        course: 268, last_update: new Date('2025-01-10T08:20:00Z'),
      },
    ],
  });
  console.log('✅ Vessels seeded (5)');

  // ── Bills of Lading ────────────────────────────────────────────────────────
  await prisma.billOfLading.deleteMany();
  await prisma.billOfLading.createMany({
    data: [
      {
        bol_number: 'OTM-BOL-2025-001234',
        shipper: { name: 'Pacific Trade Co. Ltd', address: '123 Harbor Road, Hong Kong', email: 'exports@pacifictrade.hk', phone: '+852-2345-6789' },
        consignee: { name: 'Atlantic Imports LLC', address: '456 Dock Street, New York, NY 10001', email: 'imports@atlanticimports.com', phone: '+1-212-555-0123' },
        notify_party: { name: 'Global Logistics Inc', address: '789 Freight Ave, Newark, NJ 07102', email: 'notify@globallogistics.com', phone: '+1-973-555-0456' },
        vessel_name: 'MSC GENEVA', voyage_number: 'VOY-2025-001',
        port_of_loading: 'HONG KONG', port_of_discharge: 'NEW YORK',
        place_of_delivery: 'Newark, NJ', date_of_shipment: '2025-01-05',
        cargo_description: 'Electronic Components - Circuit Boards and Semiconductors',
        gross_weight: 25000, weight_unit: 'kg', number_of_packages: 500, package_type: 'Cartons',
        container_number: 'MSKU1234567', seal_number: 'SL789012',
        freight_charges: 8500, freight_payable_at: 'origin', declared_value: 250000,
        blockchain_hash: '0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b',
        status: 'issued', validation_status: 'valid',
        validation_notes: ['Blockchain verified', 'Weight matches manifest', 'Seal number confirmed'],
        fee: 50, created_at: new Date('2025-01-04T10:00:00Z'),
      },
      {
        bol_number: 'OTM-BOL-2025-001235',
        shipper: { name: 'Lagos Export Hub', address: '15 Marina Road, Lagos Island, Nigeria', email: 'shipping@lagosexport.ng', phone: '+234-1-234-5678' },
        consignee: { name: 'European Foods GmbH', address: 'Hafenstrasse 45, Hamburg 20457, Germany', email: 'import@eurofoods.de', phone: '+49-40-123-4567' },
        notify_party: { name: 'European Foods GmbH', address: 'Hafenstrasse 45, Hamburg 20457, Germany', email: 'import@eurofoods.de', phone: '+49-40-123-4567' },
        vessel_name: 'MAERSK EDINBURGH', voyage_number: 'VOY-2025-042',
        port_of_loading: 'LAGOS', port_of_discharge: 'HAMBURG',
        place_of_delivery: 'Hamburg, Germany', date_of_shipment: '2025-01-08',
        cargo_description: 'Cocoa Beans - Premium Grade A',
        gross_weight: 50000, weight_unit: 'kg', number_of_packages: 1000, package_type: 'Bags',
        container_number: 'MSKU7654321', seal_number: 'SL456789',
        freight_charges: 12000, freight_payable_at: 'destination', declared_value: 180000,
        blockchain_hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        status: 'verified', validation_status: 'valid',
        validation_notes: ['Phytosanitary certificate attached', 'Origin verified'],
        fee: 50, created_at: new Date('2025-01-07T08:00:00Z'),
      },
      {
        bol_number: 'OTM-BOL-2025-001236',
        shipper: { name: 'Shanghai Manufacturing Co', address: '888 Industrial Park, Pudong, Shanghai', email: 'export@shanghaimfg.cn', phone: '+86-21-5555-8888' },
        consignee: { name: 'West Coast Distributors', address: '1200 Port Blvd, Long Beach, CA 90802', email: 'receiving@westcoastdist.com', phone: '+1-562-555-1200' },
        notify_party: { name: 'Customs Broker Services', address: '500 Trade Center, Los Angeles, CA 90012', email: 'clearance@cbsbroker.com', phone: '+1-323-555-0500' },
        vessel_name: 'CMA CGM MARCO POLO', voyage_number: 'VOY-2025-088',
        port_of_loading: 'SHANGHAI', port_of_discharge: 'LONG BEACH',
        place_of_delivery: 'Los Angeles, CA', date_of_shipment: '2025-01-02',
        cargo_description: 'Furniture - Wooden Chairs and Tables',
        gross_weight: 35000, weight_unit: 'kg', number_of_packages: 750, package_type: 'Crates',
        container_number: 'CMAU8765432', seal_number: 'SL123456',
        freight_charges: 9800, freight_payable_at: 'origin', declared_value: 145000,
        blockchain_hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
        status: 'draft', validation_status: 'pending', validation_notes: [],
        fee: 50, created_at: new Date('2025-01-01T15:00:00Z'),
      },
    ],
  });
  console.log('✅ Bills of Lading seeded (3)');

  // ── Disputes ───────────────────────────────────────────────────────────────
  await prisma.dispute.deleteMany();
  await prisma.dispute.createMany({
    data: [
      {
        case_number: 'ARB-2025-00123', type: 'cargo_damage',
        complainant_name: 'Atlantic Imports LLC', respondent_name: 'Pacific Trade Co. Ltd',
        bol_number: 'OTM-BOL-2025-001234',
        description: 'Electronic components received with water damage. Approximately 30% of shipment affected. Seeking compensation for damaged goods valued at $75,000.',
        claim_amount: 75000,
        evidence: [
          { id: 'e1', name: 'damage-photos.zip', type: 'image', url: '/evidence/damage-photos.zip' },
          { id: 'e2', name: 'survey-report.pdf', type: 'document', url: '/evidence/survey-report.pdf' },
          { id: 'e3', name: 'original-bol.pdf', type: 'document', url: '/evidence/original-bol.pdf' },
        ],
        status: 'ai_analysis',
        ai_analysis: {
          breachEvaluation: "Based on the evidence provided, there appears to be a clear breach of the carrier's duty.",
          liabilityScore: 78, riskScore: 65,
          settlementRecommendation: 'Recommend settlement at 80% of claimed amount ($60,000).',
          deviationReport: 'Vessel deviated from standard route during transit.',
          confidenceLevel: 85, analyzedAt: '2025-01-09T15:30:00Z',
        },
        created_at: new Date('2025-01-09T10:00:00Z'),
      },
      {
        case_number: 'ARB-2025-00124', type: 'shipment_delay',
        complainant_name: 'European Foods GmbH', respondent_name: 'Lagos Export Hub',
        bol_number: 'OTM-BOL-2025-001235',
        description: 'Cocoa shipment arrived 15 days late causing contract penalties with end buyer.',
        claim_amount: 25000,
        evidence: [
          { id: 'e4', name: 'contract-terms.pdf', type: 'document', url: '/evidence/contract-terms.pdf' },
          { id: 'e5', name: 'delay-correspondence.pdf', type: 'document', url: '/evidence/delay-correspondence.pdf' },
        ],
        status: 'under_review',
        ai_analysis: {
          breachEvaluation: 'Delay of 15 days exceeds reasonable tolerance. Port congestion was a contributing factor.',
          liabilityScore: 55, riskScore: 40,
          settlementRecommendation: 'Recommend settlement at 50% of claimed amount ($12,500).',
          deviationReport: 'No route deviation detected.',
          confidenceLevel: 72, analyzedAt: '2025-01-08T11:00:00Z',
        },
        created_at: new Date('2025-01-07T09:00:00Z'),
      },
    ],
  });
  console.log('✅ Disputes seeded (2)');

  // ── Security Contacts ──────────────────────────────────────────────────────
  await prisma.securityContact.deleteMany();
  await prisma.securityContact.createMany({
    data: [
      { agency: 'Nigerian Maritime Police', name: 'Maritime Command Center', phone: '+234-1-790-1234', email: 'emergency@maritimepolice.ng', region: 'Nigeria', available24x7: true },
      { agency: 'EFCC Maritime Fraud Unit', name: 'Economic Crime Division', phone: '+234-1-844-5555', email: 'maritime.fraud@efcc.gov.ng', region: 'Nigeria', available24x7: false },
      { agency: 'Nigerian Navy Coast Guard', name: 'Western Naval Command', phone: '+234-1-263-0001', email: 'coastguard@navy.mil.ng', region: 'Nigeria - Western Region', available24x7: true },
      { agency: 'NIMASA Security', name: 'Maritime Security Center', phone: '+234-1-460-2000', email: 'security@nimasa.gov.ng', region: 'Nigeria - National', available24x7: true },
    ],
  });
  console.log('✅ Security Contacts seeded (4)');

  // ── Security Reports ───────────────────────────────────────────────────────
  await prisma.securityReport.deleteMany();
  await prisma.securityReport.create({
    data: {
      type: 'fraud', urgency: 'high', agency: 'efcc',
      title: 'Suspected Fraudulent Bill of Lading',
      description: 'Received a bill of lading that appears to have been altered. Container seal numbers do not match shipping records.',
      location: 'Lagos Port Complex',
      coordinates: { lat: 6.4285, lng: 3.4219 },
      evidence: ['bol-scan.pdf', 'original-manifest.pdf'],
      reporter_contact: { name: 'John Okafor', email: 'j.okafor@importco.ng', phone: '+234-803-555-1234', anonymous: false },
      status: 'investigating', case_number: 'EFCC-MAR-2025-0042',
      created_at: new Date('2025-01-08T14:30:00Z'),
    },
  });
  console.log('✅ Security Reports seeded (1)');

  // ── Legal Consultants ──────────────────────────────────────────────────────
  await prisma.legalConsultant.deleteMany();
  await prisma.legalConsultant.createMany({
    data: [
      {
        name: 'Dr. James Adewale', title: 'Senior Maritime Lawyer',
        specialization: ['Charterparty', 'Cargo Claims', 'Marine Insurance'],
        jurisdiction: ['Nigeria', 'UK', 'International'],
        rating: 4.9, review_count: 127, hourly_rate: 350, available: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        bio: 'Over 25 years of experience in maritime law with expertise in international shipping disputes.',
        experience: 25, email: 'j.adewale@maritimelaw.ng', phone: '+234-803-555-0001',
      },
      {
        name: 'Sarah Chen, LLM', title: 'Maritime Legal Consultant',
        specialization: ['Bill of Lading', 'NVOCC Regulations', 'Trade Compliance'],
        jurisdiction: ['Singapore', 'China', 'Hong Kong'],
        rating: 4.8, review_count: 89, hourly_rate: 400, available: true,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        bio: 'Specialized in Asian maritime trade law with focus on cross-border documentation.',
        experience: 15, email: 's.chen@maritimeconsult.sg', phone: '+65-9123-4567',
      },
      {
        name: 'Marcus Van Der Berg', title: 'Partner, Maritime Practice',
        specialization: ['Dispute Resolution', 'Arbitration', 'Ship Finance'],
        jurisdiction: ['Netherlands', 'EU', 'International'],
        rating: 4.7, review_count: 156, hourly_rate: 500, available: false,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        bio: 'Leading expert in maritime arbitration with experience in London Maritime Arbitrators Association.',
        experience: 30, email: 'm.vanderberg@dutchlaw.nl', phone: '+31-20-555-0123',
      },
    ],
  });
  console.log('✅ Legal Consultants seeded (3)');

  // ── Legal Templates ────────────────────────────────────────────────────────
  await prisma.legalTemplate.deleteMany();
  await prisma.legalTemplate.createMany({
    data: [
      { name: 'Standard Charterparty Agreement', category: 'charterparty', description: 'BIMCO approved voyage charterparty template with comprehensive terms.', download_url: '/templates/charterparty-standard.docx', premium: false, downloads: 1250 },
      { name: 'NVOCC Service Contract', category: 'nvocc', description: 'FMC compliant non-vessel operating common carrier service agreement.', download_url: '/templates/nvocc-service-contract.docx', premium: true, downloads: 456 },
      { name: 'Bill of Lading Template', category: 'bol', description: 'Standard bill of lading form compliant with Hague-Visby Rules.', download_url: '/templates/bol-template.docx', premium: false, downloads: 2340 },
      { name: 'Marine Insurance Claim Form', category: 'contract', description: 'Comprehensive claim form for cargo damage and loss claims.', download_url: '/templates/marine-claim-form.docx', premium: false, downloads: 890 },
      { name: 'ISM Compliance Checklist', category: 'compliance', description: 'International Safety Management Code compliance audit checklist.', download_url: '/templates/ism-checklist.xlsx', premium: true, downloads: 234 },
    ],
  });
  console.log('✅ Legal Templates seeded (5)');

  // ── Legal Services ─────────────────────────────────────────────────────────
  await prisma.legalService.deleteMany();
  await prisma.legalService.createMany({
    data: [
      { type: 'contract_review', title: 'Charterparty Review', description: 'Expert review of charterparty agreements with detailed risk assessment.', price: 750, duration: '2-3 business days' },
      { type: 'compliance_consulting', title: 'IMO Compliance Audit', description: 'Full compliance audit against IMO regulations and recommendations.', price: 2500, duration: '5-7 business days' },
      { type: 'advisory', title: 'Multi-Jurisdiction Advisory', description: 'Legal guidance for operations spanning multiple maritime jurisdictions.', price: 1500, duration: 'Ongoing' },
      { type: 'dispute_resolution', title: 'Pre-Arbitration Assessment', description: 'Evaluation of dispute merits and recommended resolution strategy.', price: 1000, duration: '3-5 business days' },
    ],
  });
  console.log('✅ Legal Services seeded (4)');

  // ── Legal Resources ────────────────────────────────────────────────────────
  await prisma.legalResource.deleteMany();
  await prisma.legalResource.createMany({
    data: [
      { title: 'Understanding Maritime Liens', type: 'article', category: 'Ship Finance', summary: 'Comprehensive guide to maritime liens and their enforcement across jurisdictions.', url: '/resources/maritime-liens-guide.pdf', premium: false, publish_date: '2024-12-15' },
      { title: 'SOLAS Compliance Checklist 2025', type: 'checklist', category: 'Safety Compliance', summary: 'Updated checklist for Safety of Life at Sea convention requirements.', url: '/resources/solas-checklist-2025.pdf', premium: false, publish_date: '2025-01-01' },
      { title: 'Maritime Cyber Security Framework', type: 'framework', category: 'Cyber Security', summary: 'IMO recommended framework for vessel cyber risk management.', url: '/resources/cyber-security-framework.pdf', premium: true, publish_date: '2024-11-20' },
    ],
  });
  console.log('✅ Legal Resources seeded (3)');

  // ── Knowledge Resources ────────────────────────────────────────────────────
  await prisma.knowledgeResource.deleteMany();
  await prisma.knowledgeResource.createMany({
    data: [
      { title: 'IMO Guidelines for Maritime Operations', type: 'pdf', category: 'imo', description: 'Official IMO guidelines covering safety, environmental, and operational standards.', url: '/knowledge/imo-guidelines-2025.pdf', file_size: '4.5 MB', pages: 156 },
      { title: 'Customs Clearance Procedures Manual', type: 'guide', category: 'customs', description: 'Step-by-step guide for customs clearance in major Nigerian ports.', url: '/knowledge/customs-manual.pdf', file_size: '2.8 MB', pages: 84 },
      { title: 'AIS Data Standards & Protocols', type: 'training', category: 'ais', description: 'Technical documentation on Automatic Identification System standards.', url: '/knowledge/ais-standards.pdf', file_size: '1.2 MB', pages: 45 },
      { title: 'Maritime Safety Training Module', type: 'training', category: 'safety', description: 'Comprehensive safety training material for maritime personnel.', url: '/knowledge/safety-training.pdf', file_size: '8.5 MB', pages: 220 },
      { title: 'IMO Official Website', type: 'external_link', category: 'imo', description: 'International Maritime Organization official resources and updates.', url: 'https://www.imo.org', external_source: 'IMO' },
      { title: 'Nigeria Customs Service Portal', type: 'external_link', category: 'customs', description: 'Official Nigeria Customs Service for tariffs and regulations.', url: 'https://www.customs.gov.ng', external_source: 'NCS' },
      { title: 'ISPS Code Compliance Guide', type: 'guide', category: 'compliance', description: 'International Ship and Port Facility Security Code implementation guide.', url: '/knowledge/isps-compliance.pdf', file_size: '3.2 MB', pages: 98 },
      { title: 'Port Operations Best Practices', type: 'policy', category: 'operations', description: 'Industry best practices for efficient port operations and cargo handling.', url: '/knowledge/port-operations.pdf', file_size: '2.1 MB', pages: 67 },
    ],
  });
  console.log('✅ Knowledge Resources seeded (8)');

  console.log('\n🎉 All seed data inserted successfully!');
  console.log('\nAdmin Login Credentials:');
  console.log('  Email: admin@ontimemaritime.com');
  console.log('  Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
