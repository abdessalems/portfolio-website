import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';

/**
 * Courses and training, kept apart from the Oracle certifications above.
 *
 * The distinction is deliberate and worth preserving: a proctored Oracle
 * examination and a completed course are not the same claim, and listing them
 * together quietly upgrades one or devalues the other. This section is a
 * compact list rather than badge cards for the same reason - it reads as
 * continuing education, which is what it is.
 */
export default function Training({ data }) {
  const { sectionHeading, list } = data;

  if (!list || list.length === 0) return null;

  return (
    <section className="section gray-bg" id="training">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-3">
          {list.map((item, index) => (
            <div className="col-lg-6" key={item.name}>
              <div
                className="training-item"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={Math.min(index, 6) * 60}
              >
                <span className="training-icon" aria-hidden="true">
                  <Icon icon={item.icon || 'bi:mortarboard-fill'} />
                </span>
                <div className="training-body">
                  <h5 className="training-name">{item.name}</h5>
                  <p className="training-meta">
                    {item.issuer}
                    {/* A course still in progress has no date to show, and an
                        invented one on a credential is worse than none. */}
                    {item.date && <> · {item.date}</>}
                    {item.status && <span className="training-status">{item.status}</span>}
                  </p>
                  {item.note && <p className="training-note">{item.note}</p>}
                  {item.verifyUrl && (
                    <a
                      className="cert-verify"
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View certificate</span>
                      <Icon icon="bi:box-arrow-up-right" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
