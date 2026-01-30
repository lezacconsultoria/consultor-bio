
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQS, LEANDRO_IMG } from '../constants';
import { AppRoutes } from '../types';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
    };
  }
}

type BookingStep = 'selection' | 'details';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Initialize Calendly widget on mount
  useEffect(() => {
    const initCalendly = () => {
      const container = document.querySelector('.calendly-inline-widget');
      if (window.Calendly && container) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/lezacconsultoria/asesoria-comercial?hide_event_type_details=1&hide_gdpr_banner=1',
          parentElement: container,
        });
      }
    };

    // Try immediately, then retry after a short delay if script isn't ready
    initCalendly();
    const timer = setTimeout(initCalendly, 500);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic calendar logic
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayDate = now.getDate();

  const [step, setStep] = useState<BookingStep>('selection');
  const [selectedDay, setSelectedDay] = useState<number>(todayDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cargo: ''
  });

  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(now);
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Previous month padding
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const padding = [];
    for (let i = firstDay; i > 0; i--) {
      padding.push({ day: prevMonthLastDay - i + 1, current: false });
    }

    // Current month days
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, current: true });
    }

    return { padding, days };
  }, [currentYear, currentMonth]);

  const times = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (!selectedTime) {
      alert("Por favor, seleccione un horario.");
      return;
    }
    setStep('details');
  };

  const handleConfirm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim() || !emailRegex.test(formData.email) || !formData.cargo) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
    navigate(AppRoutes.SUCCESS);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="py-12 lg:py-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-start">

          {/* Left Column: Copy */}
          <div className="flex flex-col space-y-10 max-w-xl">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-brand-dark dark:text-white">
                Elija el mejor momento para su Asesoría Estratégica.
              </h1>
              <p className="mt-8 text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Una sesión de 45 minutos para diagnosticar su situación comercial y trazar un plan de acción real para su fábrica o distribuidora.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: "Diagnóstico de 360°", desc: "Análisis profundo de sus procesos actuales." },
                { title: "Identificación de fugas de ventas", desc: "Localizamos dónde está perdiendo oportunidades de cierre." },
                { title: "Hoja de ruta personalizada", desc: "Pasos concretos para escalar su facturación B2B." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl fill-1">check_circle</span>
                  </div>
                  <div>
                    <p className="text-lg font-black text-brand-dark dark:text-white">{item.title}</p>
                    <p className="text-base text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div
                    className="size-24 rounded-3xl bg-center bg-cover border-4 border-white dark:border-slate-800 shadow-2xl"
                    style={{ backgroundImage: `url('${LEANDRO_IMG}')` }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-xl">
                    Expert
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-black tracking-tight text-brand-dark dark:text-white">Leandro Zacaría</p>
                  <p className="text-primary font-bold text-base tracking-wide">Consultor Senior B2B</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-amber-400 text-base fill-1">star</span>
                    ))}
                    <span className="text-sm text-slate-400 font-black ml-2 uppercase tracking-tighter">(150+ asesorías)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calendly Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
            <div
              className="calendly-inline-widget w-full"
              data-url="https://calendly.com/lezacconsultoria/asesoria-comercial?hide_event_type_details=1&hide_gdpr_banner=1"
              style={{ minWidth: '320px', height: '800px' }}
            ></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white dark:bg-brand-dark border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-6 text-brand-dark dark:text-white">Preguntas Frecuentes</h2>
            <p className="text-slate-500 font-bold text-xl">Todo lo que necesita saber sobre nuestra metodología de trabajo.</p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group border-b border-slate-100 dark:border-slate-800 pb-10">
                <summary className="flex items-center justify-between cursor-pointer list-none py-6 outline-none">
                  <span className="text-2xl font-black text-brand-dark dark:text-white group-hover:text-primary transition-colors pr-8">{faq.question}</span>
                  <div className="size-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-primary transition-all">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
                  </div>
                </summary>
                <div className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-bold pr-16 text-lg">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
