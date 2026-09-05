import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';

export default function Brands({ data }) {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: 'linear',
    pauseOnHover: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="py-3 py-md-4 brand-section gray-bg">
      <div
        className="container"
      >
        <Slider {...settings} className="slider-gap-50">
          {data.map((item, index) => (
            <div key={index}>
              {/*
                The tools, named. A logo on its own asks the reader to
                recognise it; the label means a recruiter scanning for
                "Swagger" finds the word, not only the mark.
              */}
              <div className="pt-3 pb-3 d-flex flex-column align-items-center justify-content-center gap-2 w-100">
                {/*
                  A fixed box rather than a font size. Setting only font-size
                  let each mark keep its own proportions, so a wide wordmark
                  came out twice the width of a square one and the row looked
                  ragged. The box is identical for every logo now; the artwork
                  scales inside it.
                */}
                <span className="brand-logo" aria-hidden="true">
                  <Icon icon={item.icon} />
                </span>
                <span
                  className="text-center"
                  style={{ fontSize: '13px', fontWeight: 500, opacity: 0.75 }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
