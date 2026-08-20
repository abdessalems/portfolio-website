import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import ScrollTools from './ScrollTools';
import RouteMeta from './RouteMeta';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <RouteMeta />
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
