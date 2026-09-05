import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';

/**
 * Every credential, one section, one size.
 *
 * The Oracle examinations used to sit in wide cards with a large badge while
 * the rest were narrow rows, so a single section looked like two that had been
 * pushed together. They are all the same card now: the issuer's mark, what it
 * is, who issued it and when, and a link where there is a public record to
 * point at.
 *
 * Certifications still lead the list, and the ones that can be verified say
 * so - which is the honest way to show that a proctored examination and a
 * course certificate are not quite the same thing, without ranking them in
 * two separate blocks.
 */
/**
 * The issuer's badge where there is one, its mark where there is not.
 *
 * Some issuers - IIBA among them - publish no logo in any icon set, and
 * drawing an approximation of a real organisation's trademark is not an
 * option. So a badge file is used when it is present and the row falls back to
 * an icon when it is missing, which means dropping the image into
 * public/images/certs is the whole of the job: nothing here needs changing.
 */
function CredentialLogo({ item }) {
  const [failed, setFailed] = React.useState(false);
  const showBadge = item.badge && !failed;

  return (
    <span className="cred-logo" aria-hidden="true">
      {showBadge ? (
        <img
          src={item.badge}
          alt=""
          width="54"
          height="54"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon icon={item.icon || 'bi:patch-check-fill'} />
      )}
    </span>
  );
}

export default function Credentials({ credentials, languages }) {
  const list = credentials?.list ?? [];

  return (
    <section className="section" id="credentials">
      <div className="container">
        <SectionHeading
          miniTitle={credentials.sectionHeading.miniTitle}
          title={credentials.sectionHeading.title}
        />

        <div className="cred-grid">
          {list.map((item, index) => (
            <div
              className="cred-card"
              key={item.name}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={Math.min(index, 6) * 60}
            >
              <CredentialLogo item={item} />

              <span className="cred-body">
                <span className="cred-name">{item.name}</span>
                <span className="cred-meta">
                  {item.issuer}
                  {item.date && <> · {item.date}</>}
                </span>
                {item.credentialId && (
                  <span className="cred-id">ID {item.credentialId}</span>
                )}
                {/* Only where there is a public record: a "Verify" link that
                    verifies nothing is worse than no link at all. */}
                {item.verifyUrl && (
                  <a
                    className="cred-verify"
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Verify</span>
                    <Icon icon="bi:box-arrow-up-right" />
                  </a>
                )}
              </span>
            </div>
          ))}
        </div>

        {/*
          Languages as one line, not a section. Four progress bars implied a
          precision a CEFR level does not carry - a bar at 70% says nothing
          "B2" had not already said - and spent four cards' height saying it.
        */}
        <p className="lang-note">
          <span className="lang-note-label">Languages</span>
          {languages?.list?.map((lang) => (
            <span className="lang-chip" key={lang.name}>
              <strong>{lang.name}</strong>
              {lang.level.split('—')[0].trim()}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
