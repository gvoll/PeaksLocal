import React from 'react';

// One shared sample of the free report card (status only: no notes and no
// fix-it steps, matching what a prospect actually receives). Used on the
// homepage, /audit, and /services so the sample can't drift out of date.
//
// The business is fictional. Statuses follow the real tiers; the bar length
// follows the "Needs Attention" band, not a numeric score.

const rows = [
  { cat: 'Google Business Profile', platform: 'Maps · Search · Gemini AI', status: 'Optimization Gap', tone: 'o' },
  { cat: 'Apple Business Connect', platform: 'Apple Maps · Siri', status: 'Needs Attention', tone: 'n' },
  { cat: 'Bing Places', platform: 'Bing Maps · ChatGPT results', status: 'Passed', tone: 'p' },
  { cat: 'Website Identity Schema', platform: 'JSON-LD structured data', status: 'Critical Gap', tone: 'c' },
  { cat: 'Trust Directories', platform: 'BBB · Yelp · Industry listings', status: 'Needs Attention', tone: 'n' },
  { cat: 'Review Profile', platform: 'Recency · Volume · Response rate', status: 'Optimization Gap', tone: 'o' },
  { cat: 'Social Profile Sync', platform: 'NAP consistency across platforms', status: 'Passed', tone: 'p' },
];

// Raw CSS via dangerouslySetInnerHTML for the same SSR reason as the other
// components: React would HTML-escape quotes inside a text-child <style>.
const styles = `
  .src-card { background: var(--white); border: 1px solid var(--rule); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow-card); font-family: 'DM Sans', sans-serif; color: var(--ink); max-width: 440px; margin: 0 auto; }
  .src-head { background: var(--navy); color: var(--white); padding: 12px 16px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .src-brand { font-weight: 500; font-size: 0.9rem; }
  .src-title { font-family: 'DM Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate); text-align: right; }
  .src-biz { padding: 12px 16px 10px; border-bottom: 1px solid var(--rule); }
  .src-biz-name { font-weight: 500; font-size: 0.95rem; }
  .src-score { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
  .src-score-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; color: var(--mid); white-space: nowrap; }
  .src-bar { position: relative; flex: 1; height: 10px; background: repeating-linear-gradient(90deg, #d9dde4 0 6px, transparent 6px 8px); }
  .src-bar-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 48%; background: repeating-linear-gradient(90deg, #d97306 0 6px, transparent 6px 8px); }
  .src-score-status { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.95rem; color: #d97306; letter-spacing: 0.03em; white-space: nowrap; }
  .src-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 10px; padding: 9px 16px; border-bottom: 1px solid var(--rule); }
  .src-row:nth-child(even) { background: #fafbfc; }
  .src-cat { font-weight: 500; font-size: 0.82rem; }
  .src-platform { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--slate); margin-top: 2px; }
  .src-pill { display: inline-block; min-width: 118px; text-align: center; font-weight: 500; font-size: 0.72rem; padding: 4px 8px; border-radius: 4px; white-space: nowrap; }
  .src-pill.p { background: #c8e6c9; color: #1b5e20; }
  .src-pill.o { background: #bbdefb; color: #1565c0; }
  .src-pill.n { background: #ffe0b2; color: #b85c00; }
  .src-pill.c { background: #ffcdd2; color: #b00020; }
  .src-foot { background: #eef6f0; padding: 9px 16px; font-size: 0.75rem; color: var(--green); text-align: center; }
  .src-caption { text-align: center; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: var(--mid); margin: 10px 0 0; }
  @media (max-width: 400px) {
    .src-pill { min-width: 104px; font-size: 0.68rem; padding: 4px 6px; }
    .src-row { padding: 9px 12px; }
  }
`;

export default function SampleReportCard({ caption = 'Sample report. Yours is built from your actual listings.' }) {
  return (
    <figure style={{ margin: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="src-card" role="img" aria-label="Sample Visibility Report Card for a fictional business, showing a status for each of seven areas">
        <div className="src-head">
          <span className="src-brand">PeaksLocal</span>
          <span className="src-title">Digital Visibility Report Card</span>
        </div>
        <div className="src-biz">
          <div className="src-biz-name">Summit Plumbing Co.</div>
          <div className="src-score">
            <span className="src-score-label">VISIBILITY SCORE</span>
            <span className="src-bar"><span className="src-bar-fill" /></span>
            <span className="src-score-status">Needs Attention</span>
          </div>
        </div>
        {rows.map((r) => (
          <div className="src-row" key={r.cat}>
            <div>
              <div className="src-cat">{r.cat}</div>
              <div className="src-platform">{r.platform}</div>
            </div>
            <span className={`src-pill ${r.tone}`}>{r.status}</span>
          </div>
        ))}
        <div className="src-foot">Next step: a free 15-minute walkthrough of your results</div>
      </div>
      {caption && <figcaption className="src-caption">{caption}</figcaption>}
    </figure>
  );
}
