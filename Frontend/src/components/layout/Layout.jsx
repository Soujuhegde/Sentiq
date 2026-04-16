import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export function Layout() {
  useSmoothScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // For landing page, we might just want Outlet without sidebar.
  // But for the SaaS dashboard, we wrap it.
  const isHome = pathname === '/';

  if (isHome) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar className="hidden md:flex flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
