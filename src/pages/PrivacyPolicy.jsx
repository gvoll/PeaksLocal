import React, { useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'When you submit the free visibility audit form on our website, we collect the following information:',
      '• Your name and business name',
      '• Email address',
      '• Business website URL or physical location',
      '• Any additional information you voluntarily provide in the "biggest challenge" field',
      'We may also collect standard website analytics data (such as pages visited, time on site, and referring URLs) through analytics tools. This data is collected in aggregate and is not personally identifiable.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use the information you provide to:',
      '• Prepare and deliver your Local Visibility Score and audit report',
      '• Communicate with you about your audit results and recommendations',
      '• Respond to inquiries or follow-up questions about our services',
      '• Understand how to improve our website and services',
      'We do not use your information for automated decision-making or profiling. Your information is reviewed by a real person — Greg Voll, founder of PeaksLocal — who prepares your visibility audit.',
    ],
  },
  {
    title: 'Information Sharing',
    content: [
      'PeaksLocal does not sell, rent, or trade your personal information to third parties.',
      'We may share limited information with trusted service providers who assist us in operating our website or conducting our business (such as email delivery services). These providers are contractually obligated to keep your information confidential and may only use it to provide services to PeaksLocal.',
      'We may disclose your information if required by law, court order, or governmental authority.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We take reasonable precautions to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Our website uses HTTPS encryption for all data transmission.',
      'However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.',
      'We retain your information only as long as necessary to provide our services and fulfill the purposes outlined in this policy, or as required by law.',
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic.',
      'Types of cookies we may use:',
      '• Strictly necessary cookies: Required for the website to function properly.',
      '• Analytics cookies: Help us understand how visitors interact with our website (e.g., Google Analytics).',
      'You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Depending on your location, you may have the following rights regarding your personal information:',
      '• Access: Request a copy of the personal information we hold about you.',
      '• Correction: Request that we correct inaccurate or incomplete information.',
      '• Deletion: Request that we delete your personal information, subject to certain exceptions.',
      '• Opt-out: Opt out of receiving marketing communications from us at any time by replying "unsubscribe" to any email.',
      'To exercise any of these rights, please contact us at the information below. We will respond to your request within 30 days.',
    ],
  },
  {
      title: 'Contact',
      content: [],
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--ash)', minHeight: '100vh', paddingTop: '68px' }}>
        {/* Header */}
        <div style={{
          background: 'var(--navy)',
          padding: '80px 0 60px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div className="container-narrow">
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem',
              color: 'var(--green-hi)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Legal
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '3rem',
              textTransform: 'uppercase',
              color: 'var(--white)',
              lineHeight: 1.05,
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}>
              Privacy Policy
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--slate)',
            }}>
              Last updated: March 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '60px 0 80px' }}>
          <div className="container-narrow">
            {/* Intro */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              borderRadius: '12px',
              padding: '28px 32px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: 'var(--mid)',
                lineHeight: 1.75,
              }}>
                PeaksLocal ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or request our services. By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {sections.map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule)',
                    borderRadius: '12px',
                    padding: '28px 32px',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    letterSpacing: '0.04em',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid var(--green-pale)',
                  }}>
                    {section.title}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {section.title === 'Contact' ? (
                      <>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.75 }}>
                          If you have questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please{' '}
                          <a href="/contact" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
                            contact us via our contact page
                          </a>.
                        </p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.75 }}>
                          We are committed to working with you to resolve any concerns about your privacy.
                        </p>
                      </>
                    ) : (
                      section.content.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.9rem',
                            color: 'var(--mid)',
                            lineHeight: 1.75,
                          }}
                        >
                          {para}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Back link */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <a
                href="/"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem',
                  color: 'var(--green)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ← Back to PeaksLocal Home
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}






