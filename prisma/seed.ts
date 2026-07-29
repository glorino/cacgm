import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  const branches = await Promise.all([
    prisma.branch.upsert({
      where: { id: 'branch-1' },
      update: {},
      create: {
        id: 'branch-1',
        name: 'CACGM Headquarters',
        address: '12 Allen Avenue, Ikeja, Lagos',
        latitude: 6.6003,
        longitude: 3.3515,
        pastorName: 'Pastor John Adeyemi',
        contactPhone: '+234 801 234 5678',
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-2' },
      update: {},
      create: {
        id: 'branch-2',
        name: 'CACGM Surulere',
        address: '45 Bode Thomas Street, Surulere, Lagos',
        latitude: 6.5269,
        longitude: 3.3634,
        pastorName: 'Pastor David Okafor',
        contactPhone: '+234 802 345 6789',
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-3' },
      update: {},
      create: {
        id: 'branch-3',
        name: 'CACGM Yaba',
        address: '78 Herbert Macaulay Way, Yaba, Lagos',
        latitude: 6.5162,
        longitude: 3.3893,
        pastorName: 'Pastor Emmanuel Balogun',
        contactPhone: '+234 803 456 7890',
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-4' },
      update: {},
      create: {
        id: 'branch-4',
        name: 'CACGM Ikeja GRA',
        address: '23 Oba Akran Avenue, Ikeja GRA, Lagos',
        latitude: 6.5889,
        longitude: 3.3472,
        pastorName: 'Pastor Michael Ajayi',
        contactPhone: '+234 804 567 8901',
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-5' },
      update: {},
      create: {
        id: 'branch-5',
        name: 'CACGM Lekki',
        address: '15 Admiralty Way, Lekki Phase 1, Lagos',
        latitude: 6.4478,
        longitude: 3.4613,
        pastorName: 'Pastor Samuel Ogundimu',
        contactPhone: '+234 805 678 9012',
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-6' },
      update: {},
      create: {
        id: 'branch-6',
        name: 'CACGM Ikorodu',
        address: '33 Benson Street, Ikorodu, Lagos',
        latitude: 6.6195,
        longitude: 3.5115,
        pastorName: 'Pastor Joseph Adeleke',
        contactPhone: '+234 806 789 0123',
      },
    }),
  ]);

  console.log(`Created ${branches.length} branches`);

  const deptNames = [
    "Men's Fellowship",
    "Women's Ministry",
    "Youth Department",
    'Choir',
    'Ushering',
    'Protocol',
    'Media & Technical',
    "Children's Ministry",
  ];

  for (const branch of branches) {
    for (const name of deptNames) {
      await prisma.department.upsert({
        where: { id: `${branch.id}-${name.replace(/\s+/g, '-').toLowerCase()}` },
        update: {},
        create: {
          id: `${branch.id}-${name.replace(/\s+/g, '-').toLowerCase()}`,
          name,
          leaderName: `Leader - ${name}`,
          branchId: branch.id,
          budget: Math.floor(Math.random() * 400000) + 100000,
        },
      });
    }
  }

  console.log('Created departments for all branches');

  const password = await bcrypt.hash('password123', 12);

  const adminUsers = [
    { name: 'Pastor Adebayo Johnson', email: 'overseer@cacgm.org', role: 'GENERAL_OVERSEER' as const, branchId: 'branch-1' },
    { name: 'Pastor John Adeyemi', email: 'pastor.hq@cacgm.org', role: 'BRANCH_PASTOR' as const, branchId: 'branch-1' },
    { name: 'Pastor David Okafor', email: 'pastor.surulere@cacgm.org', role: 'BRANCH_PASTOR' as const, branchId: 'branch-2' },
    { name: 'Sister Funke Akindele', email: 'accountant@cacgm.org', role: 'ACCOUNTANT' as const, branchId: 'branch-1' },
    { name: 'Bro. Tunde Bakare', email: 'usher@cacgm.org', role: 'HEAD_USHER' as const, branchId: 'branch-1' },
    { name: 'Chief Emmanuel Okonkwo', email: 'mens@cacgm.org', role: 'MEN_PRESIDENT' as const, branchId: 'branch-1' },
    { name: 'Mrs. Grace Adeleke', email: 'womens@cacgm.org', role: 'WOMEN_PRESIDENT' as const, branchId: 'branch-1' },
    { name: 'Bro. David Nwachukwu', email: 'youth@cacgm.org', role: 'YOUTH_PRESIDENT' as const, branchId: 'branch-1' },
  ];

  for (const user of adminUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { password },
      create: { ...user, password },
    });
  }

  console.log('Created admin users with bcrypt passwords');

  const serviceTypes = ['First Service', 'Second Service', 'Youth Service', 'Midweek Service'];
  const today = new Date();

  for (const branch of branches) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - d);

      for (const serviceType of serviceTypes) {
        const maleCount = Math.floor(Math.random() * 300) + 100;
        const femaleCount = Math.floor(Math.random() * 350) + 120;
        const childrenCount = Math.floor(Math.random() * 80) + 20;

        await prisma.attendance.upsert({
          where: {
            branchId_date_serviceType: {
              branchId: branch.id,
              date,
              serviceType,
            },
          },
          update: {},
          create: {
            branchId: branch.id,
            date,
            serviceType,
            maleCount,
            femaleCount,
            childrenCount,
            totalCount: maleCount + femaleCount + childrenCount,
          },
        });
      }
    }
  }

  console.log('Seeded attendance data');

  const txTypes = ['TITHE', 'OFFERING', 'SEED', 'DONATION'] as const;
  const allUsers = await prisma.user.findMany();

  for (const branch of branches) {
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      const user = allUsers[Math.floor(Math.random() * allUsers.length)];

      await prisma.transaction.create({
        data: {
          userId: user.id,
          branchId: branch.id,
          amount: Math.floor(Math.random() * 200000) + 5000,
          currency: 'NGN',
          txRef: `CACGM-SEED-${branch.id}-${Date.now()}-${i}`,
          status: 'SUCCESSFUL',
          type: txTypes[Math.floor(Math.random() * txTypes.length)],
          createdAt: date,
        },
      });
    }
  }

  console.log('Seeded transaction data');
  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
