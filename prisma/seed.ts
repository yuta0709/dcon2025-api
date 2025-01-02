import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: 'テスト ユーザー',
    },
  });

  await prisma.careReceiver.create({ data: { name: 'テスト 被介護者' } });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
