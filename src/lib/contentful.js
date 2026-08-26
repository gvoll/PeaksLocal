import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space,
  accessToken,
});

// Preview mode (draft/unpublished content) is fetched through /api/preview-post
// instead of directly from Contentful. The preview token can read unpublished
// entries, so it must never reach the client bundle — Vite bakes every
// VITE_-prefixed env var into client JS, so it's kept as a server-only env
// var used exclusively by that serverless function.
async function fetchPreviewPost({ id, slug }) {
  const params = id ? `id=${encodeURIComponent(id)}` : `slug=${encodeURIComponent(slug)}`;
  const response = await fetch(`/api/preview-post?${params}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch preview content.');
  return response.json();
}

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

  if (preview) return fetchPreviewPost({ slug });

  const response = await client.getEntries({
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

  if (preview) return fetchPreviewPost({ id: entryId });

  const item = await client.getEntry(entryId);
  return normalizePost(item);
}
