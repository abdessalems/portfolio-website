import React from 'react';
import SectionHeading from './SectionHeading';

export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;

  return (
    <section className="section gray-bg">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-3">
          {allExperience?.map((item, index) => (
            <div
              className="col-12"
              key={index}
            >
              <div className="ex-box">
                <div className="row gy-4">
                  <div className="col-md-4 col-lg-3">
                    <div className="ex-left">
                      <h4>{item.designation}</h4>
                      <span>{item.company}</span>
                      <p>{item.duration}</p>
                      <label>{item.jobType}</label>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-9">
                    <div className="ex-right">
                      <h5>{item.companyTitle}</h5>
                      <p className={item.tech?.length ? '' : 'm-0'}>
                        {item.companyDescription}
                      </p>
                      {item.tech?.length > 0 && (
                        <ul className="ex-tags">
                          {item.tech.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
