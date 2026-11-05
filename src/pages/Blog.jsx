import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { getAllPosts } from '../lib/contentful.js';
import { getPreload } from '../lib/preload.js';
import SEO from '../components/SEO.jsx';
import { CATEGORIES, getCategory, getCategoryBySlug } from '../lib/categories.js';

function formatDate(dateString) {
  if (!dateString) return '';
  // Fixed locale, not the ambient one: the prerender runs in Node and the
  // visitor's browser may resolve a different default, which would render a
  // different date string and break hydration.
  //
  // Fixed timeZone: 'UTC' too. Contentful's publishedDate is a calendar date
  // (e.g. "2026-09-15"), not a moment in time, but a bare date string parses
  // as midnight UTC. Formatting that in the visitor's local timezone (Denver
  // is UTC-6/-7) rolls it back to the previous day. Reading it back out in
  // UTC returns the same calendar date that was entered.
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function Blog() {
  const preloaded = getPreload('posts:all');
  const [posts, setPosts] = React.useState(preloaded || []);
  const [loading, setLoading] = React.useState(!preloaded);
  const [error, setError] = React.useState('');
  const [showScrollCue, setShowScrollCue] = React.useState(false);
  // Starts at 'all' on both server and client so hydration matches the
  // prerendered HTML; a ?category= link is applied after mount.
  const [activeSlug, setActiveSlug] = React.useState('all');

  React.useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('category');
    if (fromUrl && getCategoryBySlug(fromUrl)) setActiveSlug(fromUrl);
  }, []);

  // Only categories that have at least one post get a chip, and the whole
  // filter stays hidden until there is more than one to choose between, so
  // the page looks unchanged while every post is still the default category.
  const presentCategories = CATEGORIES.filter((c) =>
    posts.some((p) => getCategory(p.category).slug === c.slug)
  );
  const showCategories = presentCategories.length > 1;
  const effectiveSlug =
    showCategories && presentCategories.some((c) => c.slug === activeSlug) ? activeSlug : 'all';
  const visiblePosts =
    effectiveSlug === 'all' ? posts : posts.filter((p) => getCategory(p.category).slug === effectiveSlug);
  const activeCategory = getCategoryBySlug(effectiveSlug);

  // The cue points at articles further down, so it follows the filtered list:
  // a filter that leaves one or two posts has nothing below to scroll to.
  React.useEffect(() => {
    setShowScrollCue(visiblePosts.length > 3);
  }, [visiblePosts.length]);

  function selectCategory(slug) {
    setActiveSlug(slug);
    const url = new URL(window.location.href);
    if (slug === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', slug);
    window.history.replaceState(null, '', url);
  }

  React.useEffect(() => {
    if (!showScrollCue) return;
    const onScroll = () => {
      if (window.scrollY > 280) setShowScrollCue(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showScrollCue]);

  React.useEffect(() => {
    if (preloaded) return;
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
      <SEO
        title="Blog: Local Search + Digital Identity Insights"
        description="The PeaksLocal blog covers how to improve your digital identity and online visibility across Google Business Profile, Apple Maps, Bing, and AI search."
        canonical="/blog"
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
      />
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

            {showScrollCue && (
              <button
                className="blog-scroll-cue"
                onClick={() => {
                  setShowScrollCue(false);
                  const items = document.querySelectorAll('.blog-list-item');
                  items[items.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }}
                aria-label="Scroll to articles"
              >
                ↓ more articles below
              </button>
            )}

            {showCategories && (
              <div className="category-filter">
                <div className="category-chips" role="group" aria-label="Filter posts by category">
                  {[{ name: 'All', slug: 'all' }, ...presentCategories].map((c) => (
                    <button
                      type="button"
                      key={c.slug}
                      className="category-chip"
                      aria-pressed={effectiveSlug === c.slug}
                      onClick={() => selectCategory(c.slug)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
                <p className="category-desc" aria-live="polite">
                  {activeCategory ? activeCategory.description : 'Everything we publish, newest first.'}
                </p>
              </div>
            )}

            <div className="blog-list">
              {visiblePosts.map((post) => (
                <article className="blog-list-item" key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="blog-list-link">
                    {post.publishedDate && (
                      <p className="blog-list-date">{formatDate(post.publishedDate)}</p>
                    )}
                    <div className="blog-list-body">
                      {showCategories && (
                        <span className={`category-tag category-tag--${getCategory(post.category).slug}`}>
                          {getCategory(post.category).name}
                        </span>
                      )}
                      <h2 className="blog-list-title">{post.title}</h2>
                      {post.excerpt && <p className="blog-list-excerpt">{post.excerpt}</p>}
                    </div>
                    <span className="blog-list-arrow" aria-hidden="true">→</span>
                  </Link>
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
              Our free audit provides a personalized Digital Identity Report Card showing exactly where you're strong, where you have gaps, and what to fix first.
            </p>
            <Link to="/audit" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get My Free Visibility Score
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
