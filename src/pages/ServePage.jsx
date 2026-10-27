import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { serveCities } from '../data/serveCities.js';

const otherCommunities = [
  'Aurora', 'Lakewood', 'Westminster', 'Thornton', 'Englewood', 'Centennial', 'Littleton',
  'Glendale', 'Commerce City', 'Golden', 'Broomfield', 'Lafayette', 'Louisville', 'Longmont',
  'Fort Collins', 'Castle Rock', 'Manitou Springs',
];

const linkStyle = { color: 'var(--green)', textDecoration: 'none', fontWeight: 600 };

const bodyTextStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.95rem',
  color: 'var(--mid)',
  lineHeight: 1.75,
  marginBottom: '20px',
};

const h2Style = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  fontSize: '1.6rem',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  marginBottom: '20px',
};

export default function ServePage() {
  return (
    <>
      <SEO
        title="Areas We Serve: Local SEO Across Colorado"
        description="Local SEO for businesses in Denver, Boulder, and Colorado Springs: Google Maps, Apple Maps, Bing, and AI search visibility, built for each market."
        canonical="/serve"
        breadcrumbs={[{ name: 'Areas We Serve', path: '/serve' }]}
      />
      <Nav />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-eyebrow light" style={{ marginBottom: '20px' }}>
              Areas We Serve
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              Local SEO Across Colorado, <span style={{ color: 'var(--green-hi)' }}>Built for Your Market</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '620px',
            }}>
              PeaksLocal is a Denver-based local SEO and digital identity firm serving small businesses across Colorado's Front Range. We manage your verified presence across Google, Apple Maps, Bing, and AI search so customers find you when it matters, whether you run a physical location or a service area business.
            </p>
          </div>
        </section>

        {/* City cards */}
        <section style={{ background: 'var(--ash)', padding: '80px 0' }}>
          <div className="container">
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--mid)',
              lineHeight: 1.75,
              maxWidth: '680px',
              marginBottom: '48px',
            }}>
              We focus on three primary markets where local search competition is highest and the stakes for getting your digital identity right are clearest.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {serveCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/serve/${city.slug}`}
                  style={{
                    display: 'block',
                    background: 'var(--white)',
                    border: '1px solid var(--rule)',
                    borderRadius: '12px',
                    padding: '28px 24px',
                    boxShadow: 'var(--shadow-card)',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    letterSpacing: '0.02em',
                    marginBottom: '10px',
                  }}>
                    {city.name}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--mid)',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}>
                    {city.tagline}
                  </p>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                  }}>
                    View market details →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How local search differs across the Front Range */}
        <section style={{ background: 'var(--white)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h2Style}>Every Town Has Its Own Search Results</h2>
            <p style={bodyTextStyle}>
              Local search on the Front Range isn't one market. Google weighs how close a business is to the person searching, so a search in Boulder, Lakewood, or Colorado Springs returns its own map pack, and a business that leads in one town can be missing in the next. AI assistants like ChatGPT and Gemini work the same way: they recommend a few nearby businesses they can verify, not the biggest name in the state.
            </p>
            <p style={bodyTextStyle}>
              That's why we start every client with the details that apply everywhere (an accurate, consistent identity across Google, Apple Maps, Bing, and the directories AI tools read) and then tune profiles, service areas, and website content to the specific places you want customers from.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--ash)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h2Style}>Storefronts, Service Areas, and Multiple Locations</h2>
            <p style={bodyTextStyle}>
              A storefront or office that customers visit needs one strong profile tied to its address. A service area business, like a contractor or mobile service with no public address, needs specific geographic signals to make up for the missing pin, plus{' '}
              <Link to="/blog/service-area-business-local-seo-strategy" style={linkStyle}>a different ranking strategy</Link>. A business with several locations needs every location consistent and clearly separate, so search engines and AI tools never mix them up.
            </p>
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
              In every market, the work is the same three services:{' '}
              <Link to="/local-seo-denver" style={linkStyle}>local SEO</Link>,{' '}
              <Link to="/google-business-profile-management-denver" style={linkStyle}>Google Business Profile management</Link>, and{' '}
              <Link to="/ai-search-optimization-denver" style={linkStyle}>AI search optimization</Link>.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--white)', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={h2Style}>Other Communities We Serve</h2>
            <p style={bodyTextStyle}>
              Beyond our three main markets, we work with businesses across the Front Range, from Fort Collins to Castle Rock:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {otherCommunities.map((name) => (
                <span key={name} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--navy)',
                  background: 'var(--ash)',
                  border: '1px solid var(--rule)',
                  borderRadius: '20px',
                  padding: '7px 16px',
                }}>
                  {name}
                </span>
              ))}
            </div>
            <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
              Outside Colorado? Our service isn't limited by geography. We work with local businesses anywhere in the country through virtual consultations, and meet Front Range clients in person.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              Not sure where your business fits? Get a free, no-commitment look at your current visibility.
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
