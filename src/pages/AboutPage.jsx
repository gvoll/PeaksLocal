import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import About from '../components/About.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { jsonLdProps } from '../lib/jsonLd.js';
import { founder, founderSchema } from '../data/founder.js';

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

const steps = [
  {
    title: 'Free Visibility Score',
    text: 'A check of your business across seven areas: Google Business Profile, Apple Business Connect, Bing Places, website structured data, trust directories, reviews, and social profiles. You get an overall rating and a short list of what to fix first.',
  },
  {
    title: 'Identity Build',
    text: 'I set up and correct your profiles on every major platform, add structured data to your website, and bring your directory listings into line, with defined milestones and documented deliverables.',
  },
  {
    title: 'Identity Management',
    text: 'Monthly profile updates, review monitoring and responses, and correction of any details that drift, with a monthly visibility report so you can see what changed.',
  },
];

function Section({ bg, heading, children }) {
  return (
    <section style={{ background: bg, padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={h2Style}>{heading}</h2>
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About PeaksLocal & Founder Greg Voll"
        description="Meet Greg Voll, founder of PeaksLocal, a Denver local SEO and digital identity firm built on 20+ years of systems and program management experience."
        canonical="/about"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />
      <script type="application/ld+json" {...jsonLdProps({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "url": "https://www.peakslocal.com/about",
        "mainEntity": founderSchema(),
      })} />
      <Nav />
      <main style={{ paddingTop: '68px' }}>
        <About />

        <Section bg="var(--white)" heading="How I Approach Local Visibility">
          <p style={bodyTextStyle}>
            Most local visibility problems aren't marketing problems. They're data problems. A business moves, changes its hours, or adds a service, and the update reaches Google but not Apple Maps, Bing, Yelp, or the directories that feed them. Over time those small differences add up, and search engines and AI tools trust the business a little less each time they find a mismatch.
          </p>
          <p style={bodyTextStyle}>
            I treat that as a systems problem: map every place your business information lives, get it right once, then monitor it so it stays right. It's the same discipline I used for years on large operational systems and programs, applied to the platforms that decide whether local customers find you. You can read more about why that matters in{' '}
            <Link to="/blog/why-nap-consistency-matters" style={linkStyle}>why NAP consistency matters</Link>.
          </p>
        </Section>

        <Section bg="var(--ash)" heading="What Working Together Looks Like">
          <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
            {steps.map((step, i) => (
              <li key={step.title} style={{
                display: 'flex',
                gap: '14px',
                padding: '14px 0',
                borderBottom: i < steps.length - 1 ? '1px solid var(--rule)' : 'none',
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'var(--green)',
                  fontWeight: 600,
                  marginTop: '3px',
                  flexShrink: 0,
                }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '6px' }}>
                    {step.title}
                  </h3>
                  <p style={{ ...bodyTextStyle, marginBottom: 0 }}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p style={bodyTextStyle}>
            You always know what's being worked on, what's done, and what's next. If you want a deeper look before deciding, the{' '}
            <Link to="/contact?interest=deep-dive" style={linkStyle}>Visibility Deep-Dive</Link> adds a Google Maps ranking report, a competitor comparison, and a review analysis. The full process is on{' '}
            <Link to="/how-it-works" style={linkStyle}>How It Works</Link>.
          </p>
        </Section>

        <Section bg="var(--white)" heading="Your Accounts Stay Yours">
          <p style={bodyTextStyle}>
            I never ask for passwords. On Google Business Profile, Apple Business Connect, and Bing Places, you add PeaksLocal as a manager through each platform's own access controls. You stay the owner, you can see every change, and you can remove access at any time. If a former employee or a past agency controls your profile, I'll help you{' '}
            <Link to="/blog/move-google-business-profile-into-organization-account" style={linkStyle}>bring it back under your own account</Link>.
          </p>
        </Section>

        <Section bg="var(--ash)" heading="Who I Work With">
          <p style={bodyTextStyle}>
            Law firms, medical and dental practices, real estate professionals, financial advisors and CPAs, contractors and home services, restaurants, and wellness and fitness studios. Some have a storefront, some serve customers at their location with no public address, and some run several locations. Each needs a different setup, and I build for the one you are.
          </p>
          <p style={bodyTextStyle}>
            I also work with web designers, branding studios, PR firms, and marketing consultants who want a specialist to handle local digital identity for their clients. See{' '}
            <Link to="/partners" style={linkStyle}>agency and referral partners</Link>.
          </p>
        </Section>

        <Section bg="var(--white)" heading="Based in Denver, Working Nationwide">
          <p style={bodyTextStyle}>
            PeaksLocal is based at 4423 East Bails Place, Denver, CO 80222. I meet local clients in person across the Front Range, including{' '}
            <Link to="/serve/denver" style={linkStyle}>Denver</Link>,{' '}
            <Link to="/serve/boulder" style={linkStyle}>Boulder</Link>, and{' '}
            <Link to="/serve/colorado-springs" style={linkStyle}>Colorado Springs</Link>, and work with local businesses anywhere in the country through virtual consultations.
          </p>
          <p style={bodyTextStyle}>
            I also write the <Link to="/blog" style={linkStyle}>PeaksLocal blog</Link>, which explains changes to Google, Apple Maps, Bing, and AI search in plain language and what they mean for a local business.
          </p>
          <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
            Office hours are Monday to Friday, 7am to 6pm. Call <a href="tel:+17204413167" style={linkStyle}>720.441.3167</a>,{' '}
            <Link to="/contact" style={linkStyle}>send a message</Link>, or start with a{' '}
            <Link to="/audit" style={linkStyle}>free Visibility Score</Link>.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600, marginTop: '24px', marginBottom: 0 }}>
            {founder.name}, {founder.jobTitle}
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
