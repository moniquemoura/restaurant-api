import * as argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pass = await argon2.hash('admin', { type: argon2.argon2id });
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: pass,
      role: {
        create: {
          name: 'master',
          description: 'Can everything',
        },
      },
    },
  });
  const roles = await prisma.role.createMany({
    data: [
      {
        name: 'client',
        description: 'Can only view data',
      },
      {
        name: 'employee',
        description: 'Can view and edit data',
      },
      {
        name: 'deliveryman',
        description: 'Can view delivery data',
      },
    ],
  });

  console.log({ admin, roles });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
