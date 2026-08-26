import { createClient } from 'contentful';

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

// Serves draft/unpublished Contentful entries for the internal /blog-preview
// review tool. The preview token can read unpublished content, so unlike the
// regular published-only content, it must never be shipped to the client
// bundle (Vite bakes every VITE_-prefixed env var into client JS, so this
// deliberately reads a non-VITE_-prefixed, server-only env var instead).
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, slug } = req.query;
  if (!id && !slug) {
    return res.status(400).json({ error: 'Provide either an id or slug query param.' });
  }

  const space = process.env.CONTENTFUL_SPACE_ID;
  const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
  if (!space || !previewToken) {
    return res.status(500).json({ error: 'Preview mode is not configured on the server.' });
  }

  const client = createClient({ space, accessToken: previewToken, host: 'preview.contentful.com' });

  try {
    if (id) {
      const item = await client.getEntry(id);
      return res.status(200).json(normalizePost(item));
    }

    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      'fields.slug': slug,
      limit: 1,
    });
    if (!response.items.length) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(normalizePost(response.items[0]));
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch preview content.' });
  }
}
