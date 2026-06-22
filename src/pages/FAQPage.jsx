import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const faqs = [
  {
    id: 'what-is-digital-identity',
    q: 'What is a digital identity?',
    a: 'Your digital identity is the collection of business information — name, address, phone, categories, hours, descriptions — that platforms use to understand who you are, where you are, and what you offer. It lives across Google, Apple Maps, Bing, directories, and your website simultaneously.',
  },
  {
    id: 'is-this-seo',
    q: 'Is this the same as SEO?',
    a: 'Not exactly. Traditional SEO focuses on keywords and content ranking. PeaksLocal focuses on the underlying identity and data layer that makes visibility possible across search, maps, and AI — before content strategy even enters the picture.',
  },
  {
    id: 'nap-consistency',
    q: 'Why does NAP consistency matter?',
    a: 'NAP stands for Name, Address, Phone. When these match exactly across every platform, search systems trust the information and are more likely to surface your business. Mismatches create confusion — and platforms resolve that confusion by recommending someone else.',
  },
  {
    id: 'structured-data',
    q: 'What is structured data?',
    a: 'Structured data is code added to your website (called Schema markup) that helps search engines and AI systems understand your business in a machine-readable way — your hours, service area, categories, and more. Without it, platforms have to guess.',
  },
  {
    id: 'apple-maps',
    q: 'Why does Apple Maps matter?',
    a: 'Apple Maps powers directions, Siri recommendations, and local search on every iPhone. If your Apple Business Connect profile is incomplete or unclaimed, you\'re invisible to a large share of mobile users who never open Google.',
  },
  {
    id: 'why-bing',
    q: 'Why does Bing matter?',
    a: 'Bing powers its own search and also feeds data into ChatGPT and other AI tools. An optimized Bing Places profile extends your reach into AI-driven discovery — not just traditional search.',
  },
  {
    id: 'why-reviews',
    q: 'Why are reviews important?',
    a: 'Reviews signal trust to both customers and platforms. Volume, recency, and owner responses all factor into how platforms rank and recommend your business. One strong, recent review can move the needle more than most technical fixes.',
  },
  {
    id: 'report-card',
    q: 'What is the free report card?',
    a: 'It\'s a scored audit (0–100) of your digital identity across all seven categories: business profiles, structured data, NAP consistency, trust directories, reviews, social identity, and ongoing maintenance. You get a breakdown of where you\'re strong, where you\'re weak, and what to fix first.',
  },
  {
    id: 'profile-drift',
    q: 'Why do profiles drift over time?',
    a: 'Businesses change addresses, update hours, or add services — but not every platform gets updated automatically. Data aggregators also push old information back into directories. Without active maintenance, your identity drifts and your visibility quietly erodes.',
  },
  {
    id: 'identity-build-vs-management',
    q: "What's the difference between Identity Build and Identity Management?",
    a: 'Identity Build is a complete setup and correction of your digital identity layer — establishing your verified presence across every major platform from scratch. Identity Management is ongoing monitoring and maintenance to keep everything current and consistent as platforms and your business details change over time.',
  },
];

const glossary = [
  { id: 'data-layer', term: 'Data Layer', def: 'The underlying collection of structured business information — profiles, schema, citations, and signals — that platforms use to understand and recommend your business. It\'s the foundation beneath any search or AI visibility strategy.' },
  { id: 'entity', term: 'Entity', def: 'How a search engine or AI system understands a business as a distinct, real-world thing — not just a keyword match.' },
  { id: 'knowledge-graph', term: 'Knowledge Graph', def: 'A database Google and other platforms use to store verified facts about businesses, people, and places. Getting your business into it improves recommendation accuracy.' },
  { id: 'localbusiness-schema', term: 'LocalBusiness Schema', def: 'A specific type of structured data markup that tells search engines exactly what kind of business you are, where you\'re located, and how to reach you.' },
  { id: 'citation', term: 'Citation', def: 'Any online mention of your business name, address, and phone number — on directories, review sites, or industry listings. Consistent citations build platform trust.' },
  { id: 'review-recency', term: 'Review Recency', def: 'How recently you\'ve received reviews. Platforms weight recent reviews more heavily than older ones — a steady stream matters more than a one-time burst.' },
  { id: 'trust-signal', term: 'Trust Signal', def: 'Any verified data point that tells a platform your business is real and reliable — a claimed profile, a consistent NAP, a review response, or a schema tag.' },
  { id: 'profile-drift', term: 'Profile Drift', def: 'The gradual degradation of your business information across platforms as details go out of date, data aggregators push stale records, or new platforms go unclaimed.' },
];

function AccordionItem({ id, q, a, isOpen, onToggle }) {
  return (
    <div
      id={id}
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        scrollMarginTop: '88px',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '1.15rem',
          textTransform: 'uppercase',
          color: 'var(--white)',
          letterSpacing: '0.02em',
          lineHeight: 1.2,
        }}>
          {q}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '1.1rem',
          color: 'var(--green-hi)',
          flexShrink: 0,
          transition: 'transform 0.25s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.95rem',
          color: 'var(--slate)',
          lineHeight: 1.75,
          paddingBottom: '24px',
          maxWidth: '720px',
        }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Common Questions
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3.4rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              What Is Digital Identity —<br />
              <span style={{ color: 'var(--green-hi)' }}>And Why Does It Matter?</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '620px',
            }}>
              Answers to the questions we hear most from local business owners — in plain language, no jargon.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ background: 'var(--navy)', padding: '0 0 80px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {faqs.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  id={item.id}
                  q={item.q}
                  a={item.a}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Glossary */}
        <section style={{ background: 'var(--ash)', padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Glossary
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2rem',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '40px',
            }}>
              Terms You'll See Us Use
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {glossary.map((item, i) => (
                <div
                  key={item.term}
                  id={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '24px',
                    padding: '20px 0',
                    borderBottom: i < glossary.length - 1 ? '1px solid var(--rule)' : 'none',
                    alignItems: 'baseline',
                    scrollMarginTop: '88px',
                  }}
                >
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    letterSpacing: '0.04em',
                  }}>
                    {item.term}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--mid)',
                    lineHeight: 1.65,
                  }}>
                    {item.def}
                  </span>
                </div>
              ))}
            </div>
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
              Still have questions? We're happy to walk you through how it works.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                Contact Us
              </Link>
              <Link to="/audit" className="btn-ghost" style={{ textDecoration: 'none' }}>
                Get Your Free Report Card →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
