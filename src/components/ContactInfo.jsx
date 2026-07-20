import React from 'react';

export default function ContactInfo({ contactInfoData }) {
  return (
    <div className="contact-info">
      {contactInfoData.map((item, index) => (
        <div
          className="contact-info-in"
          key={index}
        >
          <label>{item.title}</label>
          {item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}
          {item.tel && <a href={`tel:${item.tel}`}>{item.tel}</a>}
          {item.web && (
            <a
              href={`https://${item.web}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.web}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
