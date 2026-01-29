
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
    </div>
  );
};

export default App;
