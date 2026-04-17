import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandHub from './CommandHub';
import NeuralBackground from './NeuralBackground';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <div className="min-h-screen relative flex flex-col selection:bg-lime-neon/30 selection:text-charcoal">
      <div className="noise" />
      <ScrollToTop />
      <NeuralBackground />
      <Navbar />
      <CommandHub />
      
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
