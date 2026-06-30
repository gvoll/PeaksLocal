import React from 'react';
import SEO from '../components/SEO.jsx';

const platforms = [
  {
    name: 'Google',
    action: 'Review us on Google',
    sub: 'Takes about 1 minute',
    url: 'https://g.page/r/CdXP05vcNGKqEBM/review',
    bg: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
    ),
  },
  {
    name: 'Yelp',
    action: 'Review us on Yelp',
    sub: 'Also supports our Apple Maps presence',
    url: 'ADD_YELP_URL_HERE',
    bg: '#D32323',
    border: 'none',
    iconColor: '#fff',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 13.5c-.2.7-.9 1.1-1.6.9l-2.1-.6c-.7-.2-1.1-.9-.9-1.6l1.5-5.1c.1-.3.4-.4.7-.3l3.3 1c.3.1.4.4.3.7l-1.2 5zm6.3-1.8l-1.8 1.4c-.6.4-1.4.3-1.8-.3l-3-4.2c-.2-.3-.1-.6.2-.8l2.8-2c.3-.2.6-.1.8.2l3 4.2c.4.5.3 1.3-.2 1.5zm-2.3-7.4l-.3 3.5c0 .3-.3.5-.6.5l-3.5-.3c-.3 0-.5-.3-.5-.6l.3-3.5c0-.3.3-.5.6-.5l3.5.3c.4 0 .6.3.5.6z"/>
      </svg>
    ),
  },
  {
    name: 'Bing',
    action: 'Find us on Bing',
    sub: 'For Windows and Edge users',
    url: 'ADD_BING_PLACES_URL_HERE',
    bg: '#008373',
    border: 'none',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M5 3l4 1.5v13l5-2.8-2-1.2 1-6 5 1.8V15l-9 5-4-2.3z"/>
      </svg>
    ),
  },
];

export default function ReviewsPage() {
  return (
    <>
      <SEO
        title="Leave a Review"
        description="Had a good experience with PeaksLocal? Leave us a review on Google, Yelp, or Bing — it takes about a minute and helps other local businesses find us."
        canonical="/reviews"
      />
      <style>{`
        .review-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 20px 24px;
          text-decoration: none;
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.15s ease;
          margin: 0 auto;
        }
        .review-btn:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        @media (max-width: 480px) {
          .review-btn { padding: 16px 20px; }
        }
      `}</style>
      <main style={{
        minHeight: '100vh',
        background: 'var(--navy)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>

        {/* Logo */}
        <a href="/" style={{ marginBottom: '40px', display: 'block' }}>
          <img src="/peaks-local-without-tagline.png" alt="PeaksLocal" style={{ height: '72px', width: 'auto' }} />
        </a>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '520px' }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '2.4rem',
            textTransform: 'uppercase',
            color: 'var(--white)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '16px',
          }}>
            Thank You for Working<br />
            <span style={{ color: 'var(--green-hi)' }}>with PeaksLocal!</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: 'var(--slate)',
            lineHeight: 1.7,
          }}>
            Where would you like to leave your feedback? It only takes a minute and means a lot.
          </p>
        </div>

        {/* Platform buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="review-btn"
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: p.bg,
                border: p.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {p.icon}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: '#1a1a1a',
                  marginBottom: '2px',
                }}>
                  {p.action}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem',
                  color: '#888',
                }}>
                  {p.sub}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', color: '#ccc', fontSize: '1.2rem' }}>→</div>
            </a>
          ))}
        </div>

        {/* Apple Maps note */}
        <div style={{
          maxWidth: '420px',
          width: '100%',
          marginTop: '24px',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            color: 'var(--slate)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>A note on Apple Maps:</strong> Apple does not currently support direct reviews for service-area businesses. Leaving a review on Yelp is the best way to support our Apple Maps presence in the meantime.
          </p>
        </div>

        {/* Footer note */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.75rem',
          color: 'rgba(138,160,184,0.5)',
          marginTop: '40px',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          PeaksLocal · Denver, Colorado
        </p>

      </main>
    </>
  );
}
