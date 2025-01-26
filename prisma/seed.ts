import { hashPassword } from '../src/lib';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const START_YEAR = 1940;
const YEAR_RANGE = 40;
const MAX_MONTHS = 12;
const MAX_DAYS = 28;

async function main() {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'example@gmail.com',
      password: await hashPassword('password'),
    },
  });

  await prisma.user.create({
    data: {
      name: 'Demian Parkhomenko',
      email: 'admin@gmail.com',
      password: await hashPassword('qwerty'),
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'example2@gmail.com',
      password: await hashPassword('password'),
    },
  });

  const author1 = await prisma.author.create({
    data: {
      name: 'George Orwell',
      bio: 'English novelist and essayist.',
      birthDate: new Date('1903-06-25'),
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      bio: 'British author, best known for the Harry Potter series.',
      birthDate: new Date('1965-07-31'),
    },
  });

  const bookTitles = [
    'The Great Adventure',
    'Journey Through Time',
    'The Silent Whisper',
    'The Last Horizon',
    'Echoes of the Past',
    'Shadows in the Moonlight',
    'The Hidden Realm',
    'Beneath the Stars',
    'The Forgotten Island',
    'Into the Wild',
    'Rising Dawn',
    'Waves of Eternity',
    'Whispers of Hope',
    'The Path Untraveled',
    'Dreams in the Dark',
    'Winds of Change',
    'A Light in the Mist',
    'Voices of the Void',
    'The Lost City',
    'The Seeker’s Journey',
  ];

  for (let i = 0; i < 100; i++) {
    const randomAuthorId = i % 2 === 0 ? author1.id : author2.id;
    const randomTitle = bookTitles[i % bookTitles.length];
    const randomPublicationDate = new Date(
      START_YEAR + Math.floor(Math.random() * YEAR_RANGE),
      Math.floor(Math.random() * MAX_MONTHS),
      Math.floor(Math.random() * MAX_DAYS) + 1,
    );

    await prisma.book.create({
      data: {
        title: randomTitle,
        publicationDate: randomPublicationDate,
        authorId: randomAuthorId,
      },
    });
  }

  console.log('Database has been seeded with 100 books.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
