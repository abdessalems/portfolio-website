import React from 'react';
import parser from 'html-react-parser';

export default function SectionHeading({ miniTitle, title, variant }) {
  return (
    <div className={`section-heading ${variant ? variant : ''}`}>
      <h6>
        <span>{miniTitle}</span>
      </h6>
      <h2>{parser(title)}</h2>
    </div>
  );
}
