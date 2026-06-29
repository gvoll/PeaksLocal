import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const partnerTypes = [
  {
    category: 'Web & Creative',
    items: [
      'Web design & development agencies',
      'Branding & creative studios',
      'Graphic designers & visual identity firms',
    ],
  },
  {
    category: 'Marketing & PR',
    items: [
      'PR & communications firms',
      'Marketing consultants & freelancers',
      'Social media managers & content creators',
    ],
  },
  {
    category: 'Business Services',
    items: [
      'Business coaches & advisors',
      'Accountants & bookkeepers with SMB clients',
      'Virtual assistants working with local businesses',
    ],
  },
  {
    category: 'Adjacent Professionals',
    items: [
      'Commercial real estate brokers',
      'Business attorneys & legal consultants',
      'HR consultants & recruiters',
    ],
  },
];

const scenarios = [
  {
    title: 'Warm referral',
    body: 'You have a client who needs local SEO or digital identity work that falls outside your scope. You refer them to PeaksLocal, they get expert help, and the relationship stays intact: you stay in your lane without dropping the ball.',
  },
  {
    title: 'White-label support',
    body: 'You want to offer local identity services under your own brand. PeaksLocal handles the execution while you manage the client relationship. Clean, quiet, professional.',
  },
  {
    title: 'Project handoff',
    body: 'You\'ve completed a brand or site build and your client needs their profiles and structured data set up correctly. You hand off that piece to PeaksLocal as a natural next step in their launch.',
  },
];

export default function PartnersPage() {
  const [openScenario, setOpenScenario] = useState(null);

  return (
    <>
      <style>{`
        .partner-scenario {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .partner-scenario:first-child {
          border-top: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>
      <Nav />
      <main style={{ paddingTop: '68px', background: 'var(--navy)' }}>

        {/* Hero */}
        <section style={{ padding: '80px 0 72px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Work with PeaksLocal
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3.6rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}>
              Agency + Referral<br />
              <span style={{ color: 'var(--green-hi)' }}>Partners</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '600px',
              marginBottom: '36px',
            }}>
              If your clients need local digital identity work and it falls outside your core offering, PeaksLocal can handle it, so you stay focused on what you do best without leaving your client without a solution.
            </p>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get in touch →
            </Link>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              color: 'rgba(138,160,184,0.6)',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginTop: '16px',
              fontStyle: 'italic',
            }}>
              No formal program or revenue share required. Just a conversation about how we might work together in a way that benefits your clients and makes sense for both of us.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Why it works
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '40px',
            }}>
              Stay in Your Lane While<br /><span style={{ color: 'var(--green-hi)' }}>Enhancing</span> Your Client Relationship.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                {
                  title: 'Stay focused',
                  bullets: ['Local identity is specialized', 'Expertise + ongoing attention', 'Keep your team on core work'],
                },
                {
                  title: 'Client stays covered',
                  bullets: ['No gaps in their setup', 'Dedicated expert on their team', 'You get credit for the connection'],
                },
                {
                  title: 'No strings attached',
                  bullets: ['No formal agreement required', 'No mandatory referral program', 'No revenue share needed'],
                },
                {
                  title: 'Flexible arrangements',
                  bullets: ['Warm referrals', 'White-label execution', 'Project handoffs'],
                },
              ].map((card) => (
                <div key={card.title} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '22px 20px',
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    color: 'var(--green-hi)',
                    letterSpacing: '0.04em',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid rgba(58,173,100,0.2)',
                  }}>
                    {card.title}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {card.bullets.map((b) => (
                      <li key={b} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.84rem',
                        color: 'var(--slate)',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: 'var(--green-hi)', flexShrink: 0, marginTop: '1px' }}>·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works / scenarios */}
        <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Common scenarios
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '40px',
            }}>
              How Partners Work with Us
            </h2>
            <div>
              {scenarios.map((s, i) => (
                <div key={s.title} className="partner-scenario">
                  <button
                    onClick={() => setOpenScenario(openScenario === i ? null : i)}
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
                    }}>
                      {s.title}
                    </span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '1.1rem',
                      color: 'var(--green-hi)',
                      flexShrink: 0,
                      transition: 'transform 0.25s ease',
                      transform: openScenario === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: openScenario === i ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.95rem',
                      color: 'var(--slate)',
                      lineHeight: 1.75,
                      paddingBottom: '24px',
                      maxWidth: '680px',
                      margin: 0,
                    }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Who we work with
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.2rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '40px',
            }}>
              Partner Types
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {partnerTypes.map((group) => (
                <div key={group.category} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '24px',
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                    color: 'var(--green-hi)',
                    letterSpacing: '0.06em',
                    marginBottom: '14px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid rgba(58,173,100,0.2)',
                  }}>
                    {group.category}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {group.items.map((item) => (
                      <li key={item} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.85rem',
                        color: 'var(--slate)',
                        lineHeight: 1.55,
                      }}>
                        <span style={{ color: 'var(--green-hi)', flexShrink: 0, marginTop: '1px' }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '2.4rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}>
              Let's Start a Conversation
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: 'var(--slate)',
              lineHeight: 1.75,
              maxWidth: '680px',
              margin: '0 auto 32px',
            }}>
              We'd love to learn more about your business and the clients you serve.<br />Let's explore whether there's a relationship that works for both of us.
            </p>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get in touch →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
