
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQS, LEANDRO_IMG } from '../constants';
import { AppRoutes } from '../types';

type BookingStep = 'selection' | 'details';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
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

          {/* Right Column: Calendar Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col min-h-[700px]">
            <div className="p-8 lg:p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <h3 className="font-black text-2xl tracking-tight text-brand-dark dark:text-white">
                  {step === 'selection' ? 'Seleccione Fecha y Hora' : 'Confirme sus Datos'}
                </h3>
                <p className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-widest">
                  {step === 'selection' ? 'Zona horaria local detectada' : `Para el ${selectedDay} de ${capitalizedMonth} a las ${selectedTime}`}
                </p>
              </div>
              <button 
                onClick={() => setStep('selection')}
                className={`material-symbols-outlined text-slate-300 transition-all ${step === 'details' ? 'hover:text-primary' : 'cursor-default'}`}
              >
                {step === 'selection' ? 'calendar_month' : 'arrow_back'}
              </button>
            </div>
            
            <div className="flex-grow p-8 lg:p-12 relative">
              {step === 'selection' ? (
                <div className="flex flex-col xl:flex-row gap-14 animate-in fade-in duration-500">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-10">
                      <span className="font-black text-4xl tracking-tighter text-slate-900 dark:text-white">{capitalizedMonth} {currentYear}</span>
                      <div className="flex gap-3">
                        <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-transparent">
                          <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">chevron_left</span>
                        </button>
                        <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-transparent">
                          <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">chevron_right</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 text-center text-[12px] text-slate-800 dark:text-slate-400 font-black mb-8 uppercase tracking-widest">
                      {["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"].map(d => <div key={d} className="py-2">{d}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-3">
                      {calendarData.padding.map((item, i) => (
                        <div key={`pad-${i}`} className="aspect-square flex items-center justify-center text-slate-200 text-lg font-bold opacity-10">
                          {item.day}
                        </div>
                      ))}
                      {calendarData.days.map((item) => {
                        const isSelected = item.day === selectedDay;
                        const isToday = item.day === todayDate;
                        const isPast = item.day < todayDate;

                        return (
                          <button 
                            key={item.day} 
                            onClick={() => setSelectedDay(item.day)}
                            disabled={isPast}
                            className={`group aspect-square relative flex items-center justify-center font-black transition-all outline-none ${isPast ? 'opacity-20 cursor-not-allowed' : ''}`}
                          >
                            <div className={`absolute inset-0 rounded-full transition-all duration-300 transform
                              ${isSelected ? 'bg-primary scale-100 shadow-xl shadow-primary/30' : 'group-hover:bg-primary/5 group-hover:scale-95'}
                              ${isToday && !isSelected ? 'border-2 border-primary/30' : ''}
                            `} />
                            <span className={`relative z-10 text-2xl transition-colors ${isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                              {item.day}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full xl:w-72 flex flex-col border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-slate-800 pt-10 xl:pt-0 xl:pl-10">
                    <p className="font-black text-sm mb-10 flex items-center gap-3 text-slate-900 dark:text-white uppercase tracking-widest">
                      <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                      Horarios
                    </p>
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 overflow-y-auto max-h-[440px] pr-2 custom-scrollbar">
                      {times.map(t => (
                        <button 
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`w-full py-6 px-4 border rounded-3xl font-black text-lg transition-all transform active:scale-95
                            ${selectedTime === t 
                              ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                              : 'border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5'}
                          `}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-6">
                      <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">event_available</span>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Sesión Agendada</p>
                        <p className="text-brand-dark dark:text-white font-black text-xl">
                          {selectedDay} {capitalizedMonth} — {selectedTime} HS
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Nombre Completo</label>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-brand-dark dark:text-white focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-slate-200 font-bold text-lg" 
                        placeholder="Ej: Juan Pérez" 
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Corporativo</label>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-brand-dark dark:text-white focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-slate-200 font-bold text-lg" 
                        placeholder="juan@empresa.com" 
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Tu Cargo</label>
                      <select 
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none cursor-pointer font-bold text-lg"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="owner">Dueño / Director</option>
                        <option value="manager">Gerente Comercial</option>
                        <option value="consultant">Consultor Externo</option>
                        <option value="other">Otro Perfil Gerencial</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-10 bg-slate-50/80 dark:bg-slate-800/80 flex justify-center items-center border-t border-slate-100 dark:border-slate-800 backdrop-blur-sm">
              {step === 'selection' ? (
                <button 
                  onClick={handleNextStep}
                  disabled={!selectedTime}
                  className="w-full max-w-lg bg-primary hover:bg-primary-dark disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black py-7 px-16 rounded-[2rem] shadow-2xl shadow-primary/30 transition-all transform hover:-translate-y-1 active:translate-y-0 tracking-widest uppercase text-sm"
                >
                  Siguiente: Completar Datos
                </button>
              ) : (
                <button 
                  onClick={handleConfirm}
                  className="w-full max-w-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black py-7 px-16 rounded-[2rem] shadow-2xl shadow-emerald-200 dark:shadow-emerald-950/20 transition-all transform hover:-translate-y-1 active:translate-y-0 tracking-widest uppercase text-sm"
                >
                  Finalizar Reserva Estratégica
                </button>
              )}
            </div>
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
