import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';

export default function Certifications({ data }) {
  const { sectionHeading, list } = data;
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-4">
          {list?.map((item, index) => (
            <div className="col-lg-6" key={index}>
              <div
                className="cert-item"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
              >
                {/* The badge repeats the credential name printed beside it,
                    so it is decorative to a screen reader. Dimensions are set
                    so the card does not reflow when the image arrives. */}
                <img
                  className="cert-badge"
                  src={item.badge}
                  alt=""
                  width="240"
                  height="255"
                  loading="lazy"
                  decoding="async"
                />
                <div className="cert-body">
                  <h5 className="cert-name">{item.name}</h5>
                  <p className="cert-meta">
                    {item.issuer} · {item.date}
                  </p>
                  {item.note && <p className="cert-note">{item.note}</p>}
                  {/* Only rendered when a credential has a public record to
                      point at. A "Verify" link that verifies nothing is worse
                      than no link at all. */}
                  {item.verifyUrl && (
                    <a
                      className="cert-verify"
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Verify credential</span>
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
