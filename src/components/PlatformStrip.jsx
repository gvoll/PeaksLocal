import React from 'react';

const items = [
  'Google Maps & Gemini',
  'Apple Maps & Siri',
  'ChatGPT & Bing',
  'BBB & Directories',
  '300+ Data Aggregators',
];

export default function PlatformStrip() {
  return (
    <section style={{
      background: 'var(--navy-mid)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {items.map((item, i) => (
            <React.Fragment key={item}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 400,
                color: 'var(--slate)',
                whiteSpace: 'nowrap',
                padding: '6px 12px',
                transition: 'color 0.2s',
              }}>
                {item}
              </span>
              {i < items.length - 1 && (
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  flexShrink: 0,
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
