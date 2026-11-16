import React from 'react';

// Sample of the Local Visibility Map (5x5 geogrid plus the AI snapshot), for a
// fictional business. The dots are placeholder data; replace the background
// with a real geogrid screenshot if one is ever added. Dot colors follow the
// report legend: green 1-3, teal/blue 4-10, amber/orange/red 11+, gray = not
// found.

const dots = [
  ['a2', '14'], ['t2', '8'], ['t1', '6'], ['t2', '9'], ['a1', '12'],
  ['t2', '7'], ['g2', '3'], ['g1', '2'], ['g2', '3'], ['t1', '5'],
  ['t1', '5'], ['g1', '1'], ['g1', '1'], ['g1', '2'], ['t2', '7'],
  ['a1', '11'], ['t1', '4'], ['g2', '3'], ['t2', '8'], ['a2', '15'],
  ['gy', '-'], ['a3', '19'], ['a2', '13'], ['a1', '12'], ['gy', '-'],
];

// Raw CSS via dangerouslySetInnerHTML for the same SSR reason as the other
// components: React would HTML-escape quotes inside a text-child <style>.
const styles = `
  .svm-card { background: var(--white); border: 1px solid var(--rule); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow-card); font-family: 'DM Sans', sans-serif; color: var(--ink); max-width: 440px; margin: 0 auto; }
  .svm-head { background: var(--navy); color: var(--white); padding: 12px 16px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .svm-brand { font-weight: 500; font-size: 0.9rem; }
  .svm-title { font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate); text-align: right; }
  .svm-body { display: flex; gap: 12px; padding: 14px 16px 10px; align-items: stretch; }
  .svm-map { position: relative; flex: 0 0 58%; aspect-ratio: 1 / 1; border-radius: 6px; overflow: hidden; background: #e8eee6; }
  .svm-map svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .svm-grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); place-items: center; }
  .svm-dot { width: 74%; max-width: 30px; aspect-ratio: 1 / 1; border-radius: 50%; display: grid; place-items: center; font-size: 0.7rem; font-weight: 500; border: 2px solid var(--white); color: var(--white); }
  .svm-dot.g1 { background: #2e9d57; } .svm-dot.g2 { background: #7cc576; color: #0d2a14; }
  .svm-dot.t1 { background: #2a9d9d; } .svm-dot.t2 { background: #4f8fd6; }
  .svm-dot.a1 { background: #e6a817; color: #3a2800; } .svm-dot.a2 { background: #e8742a; } .svm-dot.a3 { background: #d13b3b; }
  .svm-dot.gy { background: #aab1bc; }
  .svm-ai { flex: 1; min-width: 0; background: #eef6f0; border-radius: 6px; padding: 10px 8px; display: flex; flex-direction: column; justify-content: center; text-align: center; }
  .svm-ai-k { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.1em; color: var(--green); font-weight: 500; }
  .svm-ai-n { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 2.6rem; line-height: 1; color: var(--navy); margin: 6px 0 4px; }
  .svm-ai-n small { font-size: 1.1rem; font-weight: 700; color: var(--mid); }
  .svm-ai-t { font-size: 0.78rem; line-height: 1.35; }
  .svm-ai-m { font-size: 0.64rem; color: var(--mid); margin-top: 6px; }
  .svm-legend { display: flex; flex-wrap: wrap; gap: 4px 12px; padding: 0 16px 12px; font-size: 0.7rem; color: var(--mid); }
  .svm-legend i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 5px; vertical-align: -1px; }
  .svm-foot { background: #f6f8f9; padding: 8px 16px; font-size: 0.68rem; color: var(--mid); text-align: center; border-top: 1px solid var(--rule); }
  @media (max-width: 400px) {
    .svm-body { padding: 12px; gap: 8px; }
    .svm-ai-n { font-size: 2.1rem; }
    .svm-dot { font-size: 0.62rem; }
  }
`;

export default function SampleVisibilityMap() {
  return (
    <figure style={{ margin: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="svm-card" role="img" aria-label="Sample Local Visibility Map for a fictional business: a five by five grid showing where it ranks in local search, and how often AI answers named it">
        <div className="svm-head">
          <span className="svm-brand">PeaksLocal</span>
          <span className="svm-title">Local Visibility Map</span>
        </div>
        <div className="svm-body">
          <div className="svm-map">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 30 L100 22" stroke="#fff" strokeWidth="2.2" />
              <path d="M0 68 L100 74" stroke="#fff" strokeWidth="2.2" />
              <path d="M26 0 L32 100" stroke="#fff" strokeWidth="2.2" />
              <path d="M72 0 L66 100" stroke="#fff" strokeWidth="2.2" />
              <path d="M0 50 C30 46 60 56 100 48" stroke="#f6e9c8" strokeWidth="3" fill="none" />
              <rect x="40" y="6" width="18" height="12" fill="#d6e6d0" />
              <rect x="6" y="76" width="16" height="14" fill="#d6e6d0" />
            </svg>
            <div className="svm-grid">
              {dots.map(([tone, label], i) => (
                <span key={i} className={`svm-dot ${tone}`}>{label}</span>
              ))}
            </div>
          </div>
          <div className="svm-ai">
            <span className="svm-ai-k">AI SNAPSHOT</span>
            <div className="svm-ai-n">3<small> of 12</small></div>
            <div className="svm-ai-t">AI answers that named your business</div>
            <div className="svm-ai-m">ChatGPT · Gemini · Perplexity</div>
          </div>
        </div>
        <div className="svm-legend">
          <span><i style={{ background: '#2e9d57' }} />Positions 1 to 3</span>
          <span><i style={{ background: '#4f8fd6' }} />4 to 10</span>
          <span><i style={{ background: '#e8742a' }} />11 or lower</span>
          <span><i style={{ background: '#aab1bc' }} />Not found</span>
        </div>
        <div className="svm-foot">A dated snapshot, not a score. AI answers vary from run to run.</div>
      </div>
    </figure>
  );
}
