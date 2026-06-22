import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { getAllPosts } from '../lib/contentful.js';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts();
        if (isMounted) {
          setPosts(allPosts);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load blog posts right now. Please try again shortly.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <section className="blog-page">
          <div className="container">
            <p className="section-eyebrow">Insights</p>
            <h1 className="blog-page-title">PeaksLocal Blog</h1>
            <p className="blog-page-intro">
              Practical local SEO guidance, visibility strategy, and search performance insights.
            </p>

            {loading && <p className="blog-state-message">Loading posts...</p>}
            {error && <p className="blog-state-message blog-state-error">{error}</p>}
            {!loading && !error && posts.length === 0 && (
              <p className="blog-state-message">No blog posts published yet.</p>
            )}

            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card" key={post.id}>
                  {post.coverImage?.url && (
                    <img
                      src={post.coverImage.url}
                      alt={post.coverImage.description || post.coverImage.title || post.title}
                      className="blog-card-image"
                    />
                  )}
                  <div className="blog-card-content">
                    {post.publishedDate && (
                      <p className="blog-card-date">{formatDate(post.publishedDate)}</p>
                    )}
                    <h2 className="blog-card-title">{post.title}</h2>
                    {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Free Audit
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}>
              Not Sure Where Your Business Stands?
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              A free Digital Identity Report Card shows you exactly where you're strong, where you have gaps, and what to fix first.
            </p>
            <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get Your Free Report Card
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
