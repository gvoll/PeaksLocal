import React from 'react';

const processSteps = [
  { title: 'AUDIT', subtitle: 'Map the system' },
  { title: 'DIAGNOSE', subtitle: 'Identify gaps' },
  { title: 'PLAN', subtitle: 'Build a roadmap' },
  { title: 'BUILD', subtitle: 'Execute plan' },
  { title: 'MANAGE', subtitle: 'Monitor progress' },
];

export default function ProcessFlow({ className = '' }) {
  const rootClass = ['about-process', className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className="about-process-steps">
        {processSteps.map((step, i) => (
          <React.Fragment key={step.title}>
            {i > 0 && (
              <>
                <span className="about-process-arrow about-process-arrow--h" aria-hidden="true">
                  →
                </span>
                <span className="about-process-arrow about-process-arrow--v" aria-hidden="true">
                  ↓
                </span>
              </>
            )}
            <div className="about-process-box">
              <div className="about-process-box-title">{step.title}</div>
              <div className="about-process-box-subtitle">{step.subtitle}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="about-process-labels">
        <div className="about-process-label-slot">
          <span className="about-service-label">Free Audit</span>
        </div>
        <span className="about-process-label-gap" aria-hidden="true" />
        <div className="about-process-label-slot about-process-label-slot--group">
          <div className="about-process-bracket" aria-hidden="true" />
          <span className="about-service-label">Identity Build</span>
        </div>
        <span className="about-process-label-gap" aria-hidden="true" />
        <div className="about-process-label-slot">
          <span className="about-service-label">Identity Management</span>
        </div>
      </div>
    </div>
  );
}
