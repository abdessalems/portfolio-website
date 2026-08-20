import React from 'react';
import BoxingHero from '../components/BoxingHero';
import FightRecord from '../components/FightRecord';
import BoxingGallery from '../components/BoxingGallery';
import BoxingVideos from '../components/BoxingVideos';
import BoxingPageData from '../data/BoxingPageData.json';

export default function Boxing() {
  const { hero, fightRecord, amateurRecord, gallery, videos } = BoxingPageData;

  return (
    <>
      <BoxingHero data={hero} />
      <FightRecord data={fightRecord} />
      <FightRecord data={amateurRecord} variant="plain-bg" />
      <BoxingGallery data={gallery} />
      <BoxingVideos data={videos} />
    </>
  );
}
