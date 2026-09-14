import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { getPostBySlug, getPostByEntryId } from '../lib/contentful.js';
import { getPreload } from '../lib/preload.js';
import SEO from '../components/SEO.jsx';
import { jsonLdProps } from '../lib/jsonLd.js';

function formatDate(dateString) {
  if (!dateString) return '';
  // Fixed locale — see the matching note in Blog.jsx: an ambient locale
  // differs between the Node prerender and the visitor's browser.
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function textFromNode(node) {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  if (node.content) return node.content.map(textFromNode).join('');
  return '';
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Pillar posts (long, multi-section explainers) get a jump nav; short
// reactive posts don't need one. Heading-4 count is a cheap, reliable proxy
// for "long enough to need in-page navigation" without a separate word-count
// pass over the rendered output.
const JUMP_NAV_MIN_HEADINGS = 4;

function extractHeadings(bodyDocument) {
  if (!bodyDocument?.content) return [];
  return bodyDocument.content
    .filter((node) => node.nodeType === BLOCKS.HEADING_4)
    .map((node) => {
      const text = textFromNode(node);
      return { text, slug: slugifyHeading(text) };
    })
    .filter((h) => h.text);
}

// Some Contentful entries link internally via the bare apex domain, which
// 308-redirects to the canonical www host (see vercel.json) — rewrite those
// so blog links don't send crawlers or visitors through a redirect hop.
function resolveHref(uri) {
  try {
    const url = new URL(uri);
    if (url.hostname === 'peakslocal.com') {
      url.hostname = 'www.peakslocal.com';
      return url.toString();
    }
  } catch {
    // relative or malformed URI — leave untouched
  }
  return uri;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="blog-post-paragraph">{children}</p>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="blog-post-h2">{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="blog-post-h3">{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="blog-post-h4" id={slugifyHeading(textFromNode(node))}>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => <h5 className="blog-post-h5">{children}</h5>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="blog-post-list">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="blog-post-list">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li className="blog-post-list-item">{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className="blog-post-quote">{children}</blockquote>,
    [BLOCKS.HR]: () => <hr className="blog-post-hr" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={resolveHref(node.data.uri)} target="_blank" rel="noreferrer" className="blog-post-link">
        {children}
      </a>
    ),
  },
};

export default function BlogPost() {
  const { slug, id } = useParams();
  const [searchParams] = useSearchParams();
  const preview = id ? true : searchParams.get('preview') === 'true';
  const preloaded = !id && !preview ? getPreload(`post:${slug}`) : undefined;
  const [post, setPost] = React.useState(preloaded || null);
  const [loading, setLoading] = React.useState(!preloaded);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (preloaded) return;
    let isMounted = true;

    async function fetchPost() {
      try {
        const foundPost = id
          ? await getPostByEntryId(id, { preview })
          : await getPostBySlug(slug, { preview });
        if (!isMounted) return;

        if (!foundPost) {
          setError('Post not found.');
        } else {
          setPost(foundPost);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load this post right now. Please try again shortly.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug, id, preview]);

  return (
    <>
      {post && (
        <>
          <SEO
            title={post.title}
            description={post.excerpt || undefined}
            canonical={`/blog/${post.slug}`}
            image={post.coverImage?.url || undefined}
            noindex={preview}
            breadcrumbs={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]}
          />
          <script type="application/ld+json" {...jsonLdProps({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || undefined,
            "url": `https://www.peakslocal.com/blog/${post.slug}`,
            "datePublished": post.publishedDate || undefined,
            "image": post.coverImage?.url || "https://www.peakslocal.com/og-image.jpg",
            "author": { "@type": "Organization", "name": "PeaksLocal" },
            "publisher": {
              "@type": "Organization",
              "name": "PeaksLocal",
              "logo": { "@type": "ImageObject", "url": "https://www.peakslocal.com/logo-mark-512.png" }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.peakslocal.com/blog/${post.slug}` }
          })} />
        </>
      )}
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <article className="blog-post-page">
          <div className="container-narrow">
            <Link to="/blog" className="blog-back-link">
              Back to Blog
            </Link>

            {loading && <p className="blog-state-message">Loading post...</p>}
            {!loading && error && <p className="blog-state-message blog-state-error">{error}</p>}

            {!loading && !error && post && (
              <>
                <header className="blog-post-header">
                  {post.publishedDate && (
                    <p className="blog-card-date">{formatDate(post.publishedDate)}</p>
                  )}
                  <h1 className="blog-post-title">{post.title}</h1>
                  {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
                </header>

                {post.coverImage?.url && (
                  <img
                    src={post.coverImage.url}
                    alt={post.coverImage.description || post.coverImage.title || post.title}
                    className="blog-post-cover"
                  />
                )}

                {(() => {
                  const headings = extractHeadings(post.body);
                  if (headings.length < JUMP_NAV_MIN_HEADINGS) return null;
                  return (
                    <nav className="blog-post-jump-nav" aria-label="Jump to section">
                      <span className="blog-post-jump-nav-label">Jump to:</span>
                      {headings.map((h) => (
                        <a key={h.slug} href={`#${h.slug}`} className="blog-post-jump-nav-link">
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  );
                })()}

                <section className="blog-post-body">
                  {post.body ? (
                    documentToReactComponents(post.body, richTextOptions)
                  ) : (
                    <p className="blog-post-paragraph">No post content available.</p>
                  )}
                </section>

                {post.externalLink && (
                  <div className="blog-post-external-wrap">
                    <a
                      href={post.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      External Link
                    </a>
                  </div>
                )}

                {post.commentary && (
                  <blockquote className="blog-post-commentary">{post.commentary}</blockquote>
                )}
              </>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
