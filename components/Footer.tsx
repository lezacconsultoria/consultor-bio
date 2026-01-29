
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Consultoría Privada. 100% Confidencial.</p>
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="text-xs text-slate-400 hover:text-primary transition underline underline-offset-4 decoration-slate-200">Términos y Condiciones</a>
          <a href="#" className="text-xs text-slate-400 hover:text-primary transition underline underline-offset-4 decoration-slate-200">Política de Privacidad</a>
        </div>
        <p className="text-[10px] text-slate-300 dark:text-slate-600 font-medium">
          © 2024 LEZAC Consultoría Estratégica. Inteligencia que vende. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
