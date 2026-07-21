import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import ScrollTools from './ScrollTools';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <ScrollTools />
      <Header />
      <main>
        <Outlet />
      </main>
      <CustomCursor />
      <Footer />
    </>
  );
}
