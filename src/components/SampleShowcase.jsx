import React from 'react';
import SampleReportCard from './SampleReportCard.jsx';
import SampleVisibilityMap from './SampleVisibilityMap.jsx';

// The two free-audit samples (report card and visibility map) side by side,
// each with a short Shows / Benefits table. Shared by the homepage section and
// the /audit page so the wording only lives here. Callers handle the .reveal
// observer (the classes below are picked up by their existing observers).

// Raw CSS via dangerouslySetInnerHTML (see AuditForm for why).
const styles = `
  .srs-samples { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; max-width: 960px; margin: 0 auto; align-items: start; }
  .srs-label { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--green); font-weight: 500; margin: 0 0 10px; text-align: center; }
  .srs-table { width: 100%; max-width: 440px; margin: 16px auto 0; border-collapse: collapse; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; }
  .srs-table td { padding: 10px 0; border-top: 1px solid var(--rule); vertical-align: top; line-height: 1.5; color: var(--ink); }
  .srs-table td:first-child { width: 82px; padding-right: 12px; color: var(--green); font-weight: 500; }
  .srs-table ul { margin: 0; padding-left: 18px; list-style: disc; }
  .srs-table li { margin: 0 0 6px; }
  .srs-table li:last-child { margin-bottom: 0; }
  @media (max-width: 820px) {
    .srs-samples { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  }
`;

export default function SampleShowcase() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="srs-samples">
          <div className="reveal reveal-delay-2">
            <p className="srs-label">1 · YOUR REPORT CARD</p>
            <SampleReportCard caption="" />
            <table className="srs-table">
              <tbody>
                <tr>
                  <td>Shows</td>
                  <td>Your current status across these 7 key areas listed.</td>
                </tr>
                <tr>
                  <td>Benefits</td>
                  <td>Get a targeted snapshot of your strengths and gaps to boost your local search visibility.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="reveal reveal-delay-3">
            <p className="srs-label">2 · YOUR VISIBILITY MAP</p>
            <SampleVisibilityMap />
            <table className="srs-table">
              <tbody>
                <tr>
                  <td>Shows</td>
                  <td>
                    <ul>
                      <li>Local Search Grid: Maps your current local search rankings across your area, seen through a prospect's eyes.</li>
                      <li>AI Snapshot: Tests your keywords across leading AI models to see how often you're named.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Benefits</td>
                  <td>See where you rank strong, where you're buried below competitors, and how often AI names you.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}
