import React from 'react';
import SectionHeading from './SectionHeading';

export default function FightRecord({ data, variant }) {
  const { sectionHeading, fights } = data;
  const isPlain = variant === 'plain-bg';
  return (
    <section
      className={`section ${isPlain ? '' : 'gray-bg'}`}
      id={isPlain ? 'amateur-record' : 'fight-record'}
    >
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="fight-table-wrap" data-aos="fade-up" data-aos-duration="900">
          <table className="fight-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Event</th>
                <th>Opponent</th>
                <th>Location</th>
                <th>Method</th>
                <th>Rd</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {fights?.map((fight, index) => (
                <tr key={index}>
                  <td data-label="Year">{fight.date}</td>
                  <td data-label="Event">{fight.event}</td>
                  <td data-label="Opponent">{fight.opponent}</td>
                  <td data-label="Location">{fight.location}</td>
                  <td data-label="Method">{fight.method}</td>
                  <td data-label="Rd">{fight.round}</td>
                  <td data-label="Result">
                    <span
                      className={`result-badge ${fight.result?.toLowerCase()}`}
                    >
                      {fight.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
