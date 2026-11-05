// Blog post categories. The Contentful `category` field on blogPost is an
// optional dropdown with exactly these names. A post with no category (every
// post written before the field existed) is treated as the default, so
// nothing needs backfilling.
export const CATEGORIES = [
  {
    name: 'Peaks Wire',
    slug: 'wire',
    description: 'Confirmed news: platform changes and announcements, each tied to a named source.',
  },
  {
    name: 'Peaks Buzz',
    slug: 'buzz',
    description: "What owners and practitioners are reporting, kept separate from what's confirmed.",
  },
  {
    name: 'Peaks Pointers',
    slug: 'pointers',
    description: 'Step-by-step guides and how-tos.',
  },
];

export const DEFAULT_CATEGORY = CATEGORIES[0];

export function getCategory(name) {
  return CATEGORIES.find((c) => c.name === name) || DEFAULT_CATEGORY;
}

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
