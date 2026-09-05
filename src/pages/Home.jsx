import React from 'react';
import Brands from '../components/Brands';
import Projects from '../components/Projects';
import Hero from '../components/Hero';
import About from '../components/About';
import Service from '../components/Service';
import HomePagdData from '../data/HomePagdData.json';
import Experience from '../components/Experience';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

export default function Home() {
  const {
    hero,
    socialBtns,
    brands,
    about,
    projects,
    service,
    experience,
    credentials,
    languages,
    contact,
  } = HomePagdData;

  return (
    <>
      <Hero data={hero} socialData={socialBtns} />
      <Brands data={brands} />
      <About data={about} />
      <Projects data={projects} />
      <Service data={service} />
      <Experience data={experience} />
      {/* Certifications, certificates and languages were three sections for
          fourteen short rows between them. */}
      <Credentials credentials={credentials} languages={languages} />
      <Contact data={contact} socialData={socialBtns} />
    </>
  );
}
