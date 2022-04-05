import Prismic from '@prismicio/client';

export function getPrismic(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_ENTRY_POINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });

  return prismic;
}
