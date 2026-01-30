
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to={AppRoutes.HOME} className="flex items-center group">
          <img
            src="/logo-lezac.png"
            alt="LEZAC"
            className="h-7 md:h-10 group-hover:scale-105 transition-transform"
          />
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">lock</span>
            Confidencial
          </div>
          <Link
            to={AppRoutes.BOOKING}
            className="text-[10px] md:text-xs font-bold px-4 md:px-6 py-2 md:py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-wider whitespace-nowrap"
          >
            Agendar Llamada
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
