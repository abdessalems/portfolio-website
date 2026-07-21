import React from 'react';
import SectionHeading from './SectionHeading';

export default function Languages({ data }) {
  const { sectionHeading, list } = data;
  return (
    <section className="section gray-bg" id="languages">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-4">
          {list?.map((lang, index) => (
            <div className="col-md-6" key={index}>
              <div
                className="lang-item"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 80}
              >
                <div className="lang-head">
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-level">{lang.level}</span>
                </div>
                <div className="lang-bar">
                  <span
                    className="lang-fill"
                    style={{ width: `${lang.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
