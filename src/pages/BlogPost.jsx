import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { getPostBySlug } from '../lib/contentful.js';
import SEO from '../components/SEO.jsx';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="blog-post-paragraph">{children}</p>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="blog-post-h2">{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="blog-post-h3">{children}</h3>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="blog-post-list">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="blog-post-list">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li className="blog-post-list-item">{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className="blog-post-quote">{children}</blockquote>,
    [BLOCKS.HR]: () => <hr className="blog-post-hr" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noreferrer" className="blog-post-link">
        {children}
      </a>
    ),
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      try {
        const foundPost = await getPostBySlug(slug);
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
  }, [slug]);

  return (
    <>
      {post && (
        <>
          <SEO
            title={post.title}
            description={post.excerpt || undefined}
            canonical={`/blog/${post.slug}`}
            image={post.coverImage?.url || undefined}
          />
          <script type="application/ld+json">{JSON.stringify({
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
              "logo": { "@type": "ImageObject", "url": "https://www.peakslocal.com/peaks-local-without-tagline.png" }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.peakslocal.com/blog/${post.slug}` }
          })}</script>
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
