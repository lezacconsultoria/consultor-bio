
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Bio from './pages/Bio';
import Success from './pages/Success';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppRoutes } from './types';

const App: React.FC = () => {
  const location = useLocation();
  // We consider the "Bio" content as the main landing now. 
  // We'll hide the common header/footer only if explicitly on the /bio alias or success, 
  // but typically we want the Bio page to be the main landing (HOME).
  const isSpecialPage = location.pathname === AppRoutes.SUCCESS;

  return (
    <div className="flex flex-col min-h-screen">
      {!isSpecialPage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path={AppRoutes.HOME} element={<Bio />} />
          <Route path={AppRoutes.BOOKING} element={<Home />} />
          <Route path={AppRoutes.BIO} element={<Bio />} />
          <Route path={AppRoutes.SUCCESS} element={<Success />} />
        </Routes>
      </main>

      {!isSpecialPage && <Footer />}
      
      {/* Dynamic Nav Indicator for Dev/Demo */}
      <div className="fixed bottom-4 left-4 z-[99] flex gap-2">
        <Link to={AppRoutes.HOME} className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-50 hover:opacity-100 transition">Inicio (Bio)</Link>
        <Link to={AppRoutes.BOOKING} className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-50 hover:opacity-100 transition">Booking</Link>
        <Link to={AppRoutes.SUCCESS} className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-50 hover:opacity-100 transition">Success</Link>
      </div>
    </div>
  );
};

export default App;
