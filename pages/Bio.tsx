
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEANDRO_IMG, LOGOS, TESTIMONIALS } from '../constants';
import { AppRoutes } from '../types';

const Bio: React.FC = () => {
  const navigate = useNavigate();
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5491132980398&text=Lezac%20Consultoria%20I%20Me%20interesa%20conocer%20m%C3%A1s";
  const ebookDownloadUrl = "https://drive.usercontent.com/download?id=13W74uwI2NI0EnbXucMi_HHg0qlzHCe1H&export=download&authuser=0&confirm=t&uuid=d5e24944-f01b-424f-ac7a-0ef428910651&at=APcXIO0ZIYiGBg6C7kHmcgAbER2e:1769520241201";
  const calendlyUrl = "https://calendly.com/lezacconsultoria/asesoria-comercial";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cargo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!formData.cargo) {
      alert("Por favor, selecciona tu cargo.");
      return;
    }

    // Success: Redirect to download
    window.location.href = ebookDownloadUrl;
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-24 px-6 py-16 pb-32">
        {/* Intro */}
        <section className="flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center">
            <div className="size-24 rounded-full border border-slate-100 p-1 mb-6 shadow-xl overflow-hidden bg-white">
              <img alt="Leandro Zacaría" className="h-full w-full rounded-full object-cover" src={LEANDRO_IMG}/>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">Leandro Zacaría — CONSULTOR B2B</span>
            </div>
            <div className="bg-primary/10 text-primary text-[10px] font-black tracking-widest px-5 py-2 rounded-full mb-4 uppercase">
              METODOLOGÍA EXCLUSIVA
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-brand-dark dark:text-white leading-[1.1] mt-4 tracking-tighter">
              <span className="italic text-emerald-400 font-extrabold">Consultor</span>&nbsp;Comercial
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mt-6 leading-relaxed">
              Transformamos el caos operativo en precisión estratégica para distribuidores y fábricas. De la información a la decisión.
            </p>
          </div>
        </section>

        {/* Marquee (Logo section inspired by image top) */}
        <section className="py-12 border-y border-slate-100 dark:border-slate-800/50 group overflow-hidden">
          <div className="flex flex-col items-center gap-10">
            <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300 text-center opacity-70">CONFIARON EN NUESTRA METODOLOGÍA</h3>
            <div className="w-full overflow-hidden relative">
              <div className="flex whitespace-nowrap animate-marquee items-center gap-20">
                <div className="flex items-center gap-20">
                  {LOGOS.map((logo, i) => (
                    <span key={i} className="text-sm font-black tracking-tighter text-slate-400/60 dark:text-slate-600 grayscale hover:grayscale-0 transition-all cursor-default uppercase">{logo}</span>
                  ))}
                </div>
                <div className="flex items-center gap-20">
                  {LOGOS.map((logo, i) => (
                    <span key={i + 100} className="text-sm font-black tracking-tighter text-slate-400/60 dark:text-slate-600 grayscale hover:grayscale-0 transition-all cursor-default uppercase">{logo}</span>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* New Feature Section (Based on requested image) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Browser Mockup */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex gap-1.5 mb-4 ml-4">
              <div className="size-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="size-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              <div className="size-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>
            <div className="aspect-video bg-brand-dark rounded-3xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 ring-8 ring-primary/5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-3xl fill-1">play_arrow</span>
              </div>
              <h4 className="text-white text-2xl font-black mb-2 tracking-tight">Decisión Inteligente</h4>
              <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">METODOLOGÍA EN ACCIÓN</p>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-10">
            {[
              {
                icon: "monitoring",
                title: "Data Real-Time",
                desc: "Dejamos de lado las planillas estáticas. Accedé a un panel de control vivo de tu negocio."
              },
              {
                icon: "target",
                title: "Foco Comercial",
                desc: "Identificamos exactamente dónde está la fuga de dinero y dónde la mayor oportunidad."
              },
              {
                icon: "handshake",
                title: "Soporte Continuo",
                desc: "No somos un software, somos tu socio comercial. Acompañamos la ejecución del plan."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-black text-brand-dark dark:text-white tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ebook Card */}
        <section className="bg-white dark:bg-slate-900/50 rounded-[3rem] p-8 md:p-20 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="relative aspect-[3/4.2] w-full bg-brand-dark rounded-r-2xl shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.5)] flex flex-col justify-between p-10 border-y border-r border-slate-700/50">
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-black/40 rounded-l-sm"></div>
                  <div className="space-y-8 pt-4">
                    <div className="w-12 h-1.5 bg-primary"></div>
                    <h4 className="text-white text-3xl font-black leading-tight tracking-tight">INTELIGENCIA COMERCIAL B2B</h4>
                    <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase">GUÍA ESTRATÉGICA</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">insights</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">LEZAC CONSULTORÍA</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none rounded-r-2xl"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="h-px w-12 bg-primary/30"></span>
                <span className="text-primary font-black text-[10px] tracking-[0.3em] uppercase">RECURSO GRATUITO</span>
              </div>
              <div>
                <h3 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-[1.1] tracking-tight">Descarga Gratis: Guía de Inteligencia Comercial B2B</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">Los 5 indicadores clave que toda distribuidora debe monitorear para crecer.</p>
              </div>
              <form className="flex flex-col gap-4 mt-4 w-full" onSubmit={handleEbookSubmit}>
                <div className="grid gap-4">
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-brand-dark dark:text-white focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 font-bold text-sm" 
                    placeholder="Tu nombre" 
                    type="text"
                    required
                  />
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-brand-dark dark:text-white focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 font-bold text-sm" 
                    placeholder="Tu correo electrónico" 
                    type="email"
                    required
                  />
                  <select 
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none cursor-pointer font-bold text-sm"
                    required
                  >
                    <option value="">Tu cargo</option>
                    <option value="owner">Dueño / Director</option>
                    <option value="manager">Gerente Comercial</option>
                    <option value="consultant">Consultor</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-black tracking-widest py-6 px-10 rounded-2xl shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-4 group active:scale-95 text-base uppercase mt-2"
                >
                  ENVIAR EBOOK
                  <span className="material-symbols-outlined text-2xl group-hover:translate-y-1 transition-transform">download</span>
                </button>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-emerald-200 dark:shadow-none"
                >
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                  AGENDA UNA LLAMADA
                </a>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/50 p-12 rounded-[2.5rem] text-center border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <p className="text-4xl font-black text-emerald-400 tracking-tighter mb-4">{t.metric}</p>
              <p className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest mb-3">{t.label}</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wide leading-relaxed">{t.context}</p>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="bg-brand-dark p-16 md:p-24 rounded-[3.5rem] shadow-2xl text-center relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 bg-primary/20 blur-[140px] rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 h-96 w-96 bg-emerald-500/10 blur-[140px] rounded-full"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">¿Querés claridad comercial real?</h3>
            <p className="text-slate-400 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">Agenda una sesión diagnóstica y transformá tus datos en facturación real.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={() => navigate(AppRoutes.BOOKING)}
                className="flex-1 flex items-center justify-center gap-3 py-6 bg-primary text-white font-black rounded-3xl hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30 text-sm uppercase tracking-widest active:scale-95"
              >
                <span className="material-symbols-outlined font-bold">calendar_month</span>
                RESERVAR REUNIÓN
              </button>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 py-6 bg-white/10 text-white font-black rounded-3xl hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md text-sm uppercase tracking-widest active:scale-95"
              >
                <span className="material-symbols-outlined font-bold text-emerald-400">chat</span>
                WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Bio;
