import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';

/**
 * Work and study, side by side.
 *
 * Eight entries used to run down the page at full width, one under another,
 * which made this the tallest section on the site and gave a high-school
 * diploma exactly the weight of the current role. Splitting the two and
 * setting them in two columns halves the height and restores the order a
 * reader expects: what you do now, then what you studied.
 */
export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;

  const isEducation = (item) => item.jobType === 'Education';
  const work = allExperience?.filter((item) => !isEducation(item)) ?? [];
  const study = allExperience?.filter(isEducation) ?? [];

  return (
    <section className="section gray-bg" id="experience">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        {/*
          Two panels, not two lists side by side. Given only a small label
          each, the columns read as one long section and a reader could not
          tell where work stopped and study began.
        */}
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="ex-column">
              <h6 className="ex-column-title">
                <span className="ex-column-icon" aria-hidden="true">
                  <Icon icon="bi:briefcase-fill" />
                </span>
                Work Experience
                <span className="ex-column-count">{work.length}</span>
              </h6>
              <div className="ex-list">
                {work.map((item, index) => (
                  <ExperienceItem key={item.company + item.duration} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ex-column is-education">
              <h6 className="ex-column-title">
                <span className="ex-column-icon" aria-hidden="true">
                  <Icon icon="bi:mortarboard-fill" />
                </span>
                Education
                <span className="ex-column-count">{study.length}</span>
              </h6>
              <div className="ex-list">
                {study.map((item, index) => (
                  <ExperienceItem key={item.company + item.duration} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <div
      className="ex-box"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay={Math.min(index, 4) * 60}
    >
      <div className="ex-head">
        <h4>{item.designation}</h4>
        <span className="ex-company">{item.company}</span>
        <span className="ex-duration">{item.duration}</span>
      </div>
      <p className={item.tech?.length ? '' : 'm-0'}>{item.companyDescription}</p>
      {item.tech?.length > 0 && (
        <ul className="ex-tags">
          {item.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
