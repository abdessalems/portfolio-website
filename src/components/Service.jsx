import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';
import Ratings from './Ratings';

export default function Service({ data }) {
  const { sectionHeading, allService } = data;
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-5">
          {allService?.map((item, index) => (
            <div className="col-sm-6 col-lg-4" key={index}>
              {/* The artwork is a background, not content: it says nothing a
                  screen reader needs, and the card's own title carries the
                  meaning. Drawn by scripts/generate-service-art.mjs. */}
              <div
                className="services-box"
                style={{ '--card-art': `url(${item.imgUrl})` }}
              >
                <div className="services-body">
                  <div className="icon">
                    <Icon icon={item.icon} />
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.subTitle}</p>
                  <div className="rating-wrap">
                    <Ratings ratings={item.ratings} />
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
