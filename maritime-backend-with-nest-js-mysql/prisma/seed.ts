import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
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

  console.log('Admin user created:');
  console.log({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    name: `${admin.first_name} ${admin.last_name}`,
  });

  console.log('\n✅ Seeding complete!');
  console.log('\nAdmin Login Credentials:');
  console.log('  Email: admin@ontimemaritime.com');
  console.log('  Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
