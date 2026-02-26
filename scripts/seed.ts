import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { links } from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

const seedData = [
  { slug: 'gh-profile',  originalUrl: 'https://github.com/aliaksandr-yurouski',       userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'yt-channel',  originalUrl: 'https://www.youtube.com/@fireship',             userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'next-docs',   originalUrl: 'https://nextjs.org/docs',                       userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'tw-home',     originalUrl: 'https://tailwindcss.com',                       userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'clerk-auth',  originalUrl: 'https://clerk.com/docs',                        userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'drizzle-orm', originalUrl: 'https://orm.drizzle.team/docs/overview',        userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'neon-db',     originalUrl: 'https://neon.tech/docs/introduction',           userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'shadcn-ui',   originalUrl: 'https://ui.shadcn.com/docs',                    userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'ts-handbook', originalUrl: 'https://www.typescriptlang.org/docs/handbook',  userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
  { slug: 'mdn-web',     originalUrl: 'https://developer.mozilla.org/en-US/',          userId: 'user_3A7omJd0zbJha3OswXSlvCyErqD' },
];

async function seed() {
  console.log('Inserting seed data...');
  const result = await db.insert(links).values(seedData).returning({ id: links.id, slug: links.slug });
  console.log(`Inserted ${result.length} rows:`);
  result.forEach(({ id, slug }) => console.log(`  #${id} ${slug}`));
}

seed().catch(console.error);
