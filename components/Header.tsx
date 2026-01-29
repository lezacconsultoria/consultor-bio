
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to={AppRoutes.HOME} className="flex items-center gap-2 group">
          <div className="size-8 text-primary group-hover:scale-110 transition-transform">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-black tracking-widest">LEZAC</h2>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">lock</span>
            Confidencial
          </div>
          <Link 
            to={AppRoutes.BOOKING}
            className="text-xs font-bold px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 uppercase tracking-wider"
          >
            Reservar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
