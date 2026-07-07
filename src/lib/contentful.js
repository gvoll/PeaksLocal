import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;

const client = createClient({
  space,
  accessToken,
});

const previewClient = createClient({
  space,
  accessToken: previewToken,
  host: 'preview.contentful.com',
});

const BLOG_CONTENT_TYPE = 'blogPost';

function normalizePost(item) {
  return {
    id: item.sys.id,
    title: item.fields?.title ?? '',
    slug: item.fields?.slug ?? '',
    excerpt: item.fields?.excerpt ?? '',
    publishedDate: item.fields?.publishedDate ?? null,
    body: item.fields?.body ?? null,
    externalLink: item.fields?.externalLink ?? '',
    commentary: item.fields?.commentary ?? '',
    coverImage: item.fields?.coverImage?.fields?.file
      ? {
          url: item.fields.coverImage.fields.file.url?.startsWith('//')
            ? `https:${item.fields.coverImage.fields.file.url}`
            : item.fields.coverImage.fields.file.url,
          title: item.fields.coverImage.fields.title ?? item.fields?.title ?? '',
          description: item.fields.coverImage.fields.description ?? '',
        }
      : null,
  };
}

export async function getAllPosts() {
  const response = await client.getEntries({
    content_type: BLOG_CONTENT_TYPE,
    order: ['-fields.publishedDate'],
  });

  return response.items.map(normalizePost);
}

export async function getPostBySlug(slug, { preview = false } = {}) {
  if (!slug) return null;

  const activeClient = preview ? previewClient : client;
  const response = await activeClient.getEntries({
    content_type: BLOG_CONTENT_TYPE,
    'fields.slug': slug,
    limit: 1,
  });

  if (!response.items.length) return null;
  return normalizePost(response.items[0]);
}

// Search-by-slug on the Preview API is backed by a search index that lags
// behind CMA writes by a few minutes. Fetching by entry ID goes straight to
// the entry and is always current, so preview links use this instead.
export async function getPostByEntryId(entryId, { preview = false } = {}) {
  if (!entryId) return null;

  const activeClient = preview ? previewClient : client;
  const item = await activeClient.getEntry(entryId);
  return normalizePost(item);
}
