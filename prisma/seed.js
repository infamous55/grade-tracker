const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

const data = {
  disciplines: [
    { name: 'English' },
    { name: 'Mathematics' },
    { name: 'Science' },
    { name: 'History' },
    { name: 'Physical Education' },
  ],
  years: [
    {
      startDate: new Date('09/13/2020'),
      endDate: new Date('06/26/2021'),
    },
    {
      startDate: new Date('09/03/2021'),
      endDate: new Date('05/28/2022'),
    },
  ],
  semesters: [
    {
      yearId: 1,
      number: 1,
    },
    {
      yearId: 1,
      number: 2,
    },
    {
      yearId: 2,
      number: 1,
    },
    {
      yearId: 2,
      number: 2,
    },
  ],
  classes: [
    {
      number: 12,
      letter: 'A',
      yearId: 2,
    },
    {
      number: 12,
      letter: 'B',
      yearId: 2,
    },
    {
      number: 12,
      letter: 'C',
      yearId: 2,
    },
    {
      number: 12,
      letter: 'D',
      yearId: 2,
    },
  ],
};

async function main() {
  const hashedPassword = await bcrypt.hash('password', 8);
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  for (const discipline of data.disciplines) {
    await prisma.discipline.upsert({
      where: { name: discipline.name },
      update: {},
      create: { ...discipline },
    });
  }

  for (const year of data.years) {
    await prisma.year.upsert({
      where: {
        startDate_endDate: {
          startDate: year.startDate,
          endDate: year.endDate,
        },
      },
      update: {},
      create: { ...year },
    });
  }

  for (const semester of data.semesters) {
    await prisma.semester.upsert({
      where: {
        number_yearId: {
          number: semester.number,
          yearId: semester.yearId,
        },
      },
      update: {},
      create: { ...semester },
    });
  }

  for (const group of data.classes) {
    await prisma.class.upsert({
      where: {
        number_letter_yearId: {
          number: group.number,
          letter: group.letter,
          yearId: group.yearId,
        },
      },
      update: {},
      create: { ...group },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
