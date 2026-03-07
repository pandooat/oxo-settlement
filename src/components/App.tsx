import { useState, useEffect } from 'react';
import { dict, type Lang } from '../lib/dict';
import {
    ShieldIcon, LockIcon, ScanIcon, ZKProofIcon, ChainIcon, DashboardIcon,
    CloseIcon, GoogleIcon, ArrowUpRight,
} from './Icons';
import { SettlementForm } from './SettlementForm';

// --- HOOK ---
const useScrollReveal = () => {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        reveals.forEach(reveal => observer.observe(reveal));
        return () => reveals.forEach(reveal => observer.unobserve(reveal));
    }, []);
};

// ---- Coin data ----
const LEFT_COINS = [
    { symbol: 'Ξ', label: 'ETH', textColor: '#60a5fa', rawGlow: 'rgba(59,130,246,0.35)' },
    { symbol: '₿', label: 'BTC', textColor: '#fb923c', rawGlow: 'rgba(249,115,22,0.35)' },
    { symbol: '₮', label: 'USDT', textColor: '#4ade80', rawGlow: 'rgba(34,197,94,0.35)' },
    { symbol: '◎', label: 'SOL', textColor: '#c084fc', rawGlow: 'rgba(192,132,252,0.35)' },
];
const RIGHT_COINS = [
    { symbol: '₿', label: 'BTC', textColor: '#fb923c', rawGlow: 'rgba(249,115,22,0.35)' },
    { symbol: 'Ξ', label: 'ETH', textColor: '#60a5fa', rawGlow: 'rgba(59,130,246,0.35)' },
    { symbol: '⬡', label: 'BNB', textColor: '#facc15', rawGlow: 'rgba(234,179,8,0.35)' },
    { symbol: '₮', label: 'USDT', textColor: '#4ade80', rawGlow: 'rgba(34,197,94,0.35)' },
];
const BAR_HEIGHTS = [3, 5, 4, 8, 5, 7, 9, 6, 4, 8, 6, 10];

// Flow step icons
const FLOW_ICONS = ['📥', '🔍', '⚡', '💰', '🧾'];

export default function App({ page = 'home' }: { page?: 'home' | 'features' | 'contact' }) {
    const [lang, setLang] = useState<Lang>('en');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const t = dict[lang];
    useScrollReveal();

    const handleCloseModal = () => {
        setIsLoginOpen(false);
        setTimeout(() => setIsLoginMode(true), 300);
    };
    const toggleLang = () => setLang(l => l === 'en' ? 'id' : 'en');

    // Map flow icons using new futuristic icon components
    const FlowIcons = [
        <ChainIcon className="w-7 h-7" />,
        <ScanIcon className="w-7 h-7" />,
        <ArrowUpRight className="w-7 h-7" />,
        <LockIcon className="w-7 h-7" />,
        <ZKProofIcon className="w-7 h-7" />,
    ];

    const flowSteps = [
        { title: t.flow_1_title, desc: t.flow_1_desc, micro: t.flow_1_micro },
        { title: t.flow_2_title, desc: t.flow_2_desc, micro: t.flow_2_micro },
        { title: t.flow_3_title, desc: t.flow_3_desc, micro: t.flow_3_micro },
        { title: t.flow_4_title, desc: t.flow_4_desc, micro: t.flow_4_micro },
        { title: t.flow_5_title, desc: t.flow_5_desc, micro: t.flow_5_micro },
    ];

    // Feature icon components — each paired with title/desc from dict
    const features = [
        { icon: <ScanIcon className="w-6 h-6" />, title: t.feat_1_title, desc: t.feat_1_desc },
        { icon: <ArrowUpRight className="w-6 h-6" />, title: t.feat_2_title, desc: t.feat_2_desc },
        { icon: <ShieldIcon className="w-6 h-6" />, title: t.feat_3_title, desc: t.feat_3_desc },
        { icon: <ZKProofIcon className="w-6 h-6" />, title: t.feat_4_title, desc: t.feat_4_desc },
        { icon: <DashboardIcon className="w-6 h-6" />, title: t.feat_5_title, desc: t.feat_5_desc },
        { icon: <ChainIcon className="w-6 h-6" />, title: t.feat_6_title, desc: t.feat_6_desc },
        { icon: <LockIcon className="w-6 h-6" />, title: t.feat_7_title, desc: t.feat_7_desc },
    ];

    const faqs = [
        { q: t.faq_1_q, a: t.faq_1_a },
        { q: t.faq_2_q, a: t.faq_2_a },
        { q: t.faq_3_q, a: t.faq_3_a },
        { q: t.faq_4_q, a: t.faq_4_a },
        { q: t.faq_5_q, a: t.faq_5_a },
        { q: t.faq_6_q, a: t.faq_6_a },
    ];

    return (
        <div className="text-gray-100 selection:bg-oxo-purple selection:text-white overflow-hidden">

            {/* Global Spotlights */}
            <div className="spotlight bg-oxo-purple/20 w-[600px] h-[600px] top-[-200px] left-1/2 transform -translate-x-1/2" />
            <div className="spotlight bg-oxo-lightpurple/10 w-[800px] h-[800px] bottom-[10%] right-[-200px]" />
            <div className="spotlight bg-oxo-purple/15 w-[500px] h-[500px] top-[40%] left-[-150px]" />

            {/* ── NAVBAR ── */}
            <nav className="fixed w-full z-40 bg-[#030308]/60 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="font-display font-bold text-[28px] tracking-wide text-white">OXO</span>
                    </a>
                    <div className="hidden md:flex flex-1 justify-center gap-10 text-[15px] font-medium text-gray-300">
                        <a href="/" className={`hover:text-white transition-colors ${page === 'home' ? 'text-white' : ''}`}>{t.nav_home}</a>
                        <a href="/features#compliance" className={`hover:text-white transition-colors ${page === 'features' ? 'text-white' : ''}`}>{t.nav_compliance}</a>
                        <a href="/contact" className={`hover:text-white transition-colors ${page === 'contact' ? 'text-white' : ''}`}>{t.nav_contact}</a>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => setIsLoginOpen(true)} className="text-sm font-semibold text-white bg-transparent hover:bg-white/5 border border-white/30 px-7 py-2 rounded-full transition-all">{t.nav_login}</button>
                    </div>
                </div>
            </nav>

            {/* ── HOME PAGE CONTENT ── */}
            {page === 'home' && (
                <>
                    {/* ── HERO SECTION ── */}
                    <section className="relative z-10 pt-40 pb-0 flex flex-col items-center text-center overflow-hidden">

                        {/* Hero copy */}
                        <div className="px-6 max-w-5xl mx-auto reveal active space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-[#16142A]/80 shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-gray-300 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
                                {t.hero_tag}
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-display font-bold leading-[1.15] tracking-tight whitespace-pre-line text-white">
                                {t.hero_title}
                            </h1>
                            <p className="text-[17px] md:text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed whitespace-pre-line">
                                {t.hero_sub}
                            </p>
                            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#7B46FF] hover:bg-[#6c3aed] font-semibold text-white transition-all shadow-[0_0_30px_rgba(123,70,255,0.4)] hover:shadow-[0_0_50px_rgba(123,70,255,0.65)] hover:-translate-y-0.5 text-sm">
                                    {t.btn_primary}
                                </a>
                                <a href="#how-it-works" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#1A1822] hover:bg-[#201e29] border border-white/5 hover:border-white/10 font-semibold text-white transition-all text-sm">
                                    {t.btn_secondary}
                                </a>
                            </div>
                        </div>

                        {/* ── HERO VISUAL ── */}
                        <div className="relative w-full mt-[4.5rem] reveal active select-none flex justify-center px-4" style={{ minHeight: '380px' }}>
                            {/* Atmosphere gradient behind image */}
                            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at center, rgba(108,63,255,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
                            />

                            <img src="/images/hero/checkout_ui.png" alt="Checkout UI Demo" className="relative z-10 w-full max-w-[1000px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -translate-y-4" />

                            {/* Dissolve to next section */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
                                style={{ background: 'linear-gradient(to bottom, transparent 0%, #030308 100%)' }}
                            />
                        </div>
                    </section>

                    {/* ── SUPPORTED ASSETS ── */}
                    <section className="py-10 border-y border-white/5 bg-[#05050A]">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-all duration-500">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Supported Assets</p>
                            <div className="flex items-center gap-10">
                                {[
                                    { sym: '₿', label: 'BITCOIN', glow: '#fb923c' },
                                    { sym: 'Ξ', label: 'ETH', glow: '#60a5fa' },
                                    { sym: '₮', label: 'USDT', glow: '#4ade80' },
                                    { sym: 'IX', label: 'IDRX', glow: '#a78bfa' },
                                ].map(({ sym, label, glow }) => (
                                    <div key={label} className="flex items-center gap-2.5 group/a">
                                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                            style={{ background: `${glow}22`, color: glow, boxShadow: `0 0 10px ${glow}44` }}
                                        >{sym}</span>
                                        <span className="font-display font-bold text-base tracking-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── HOW IT WORKS ── */}
                    <section id="how-it-works" className="py-32 px-6 relative z-10 bg-[#05050A]">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-20 reveal">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">{t.flow_tag}</div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">{t.flow_title}</h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.flow_desc}</p>
                            </div>
                            <div className="space-y-6 relative">
                                <div className="absolute left-[39px] top-10 bottom-10 w-px bg-gradient-to-b from-oxo-purple via-oxo-lightpurple to-transparent z-0 hidden md:block" />
                                {flowSteps.map((step, i) => (
                                    <div key={i} className="glass-panel p-6 md:p-8 rounded-3xl relative z-10 reveal group border-white/5 hover:border-oxo-purple/30 transition-colors" style={{ transitionDelay: `${i * 80}ms` }}>
                                        <div className="bento-glow" />
                                        <div className="flex flex-col md:flex-row items-start gap-6">
                                            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#05050A] border border-white/10 flex flex-col items-center justify-center gap-1 group-hover:border-oxo-purple transition-colors relative overflow-hidden">
                                                <div className="absolute inset-0 bg-oxo-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-white/80 group-hover:text-white transition-colors">{FlowIcons[i]}</span>
                                                <span className="text-[10px] font-bold text-gray-500 group-hover:text-oxo-lightpurple transition-colors tracking-widest">0{i + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-display font-bold text-white mb-2">{step.title}</h4>
                                                <p className="text-gray-400 leading-relaxed mb-3">{step.desc}</p>
                                                {step.micro && (
                                                    <p className="text-sm font-semibold text-oxo-lightpurple/80 italic">"{step.micro}"</p>
                                                )}
                                            </div>
                                            <div className="md:ml-auto flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-oxo-purple group-hover:border-oxo-purple transition-colors">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* ── FEATURES PAGE CONTENT ── */}
            {page === 'features' && (
                <div className="pt-24">
                    {/* ── PROBLEM SECTION ── */}
                    <section id="problem" className="py-32 px-6 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="reveal">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold tracking-widest uppercase mb-6">{t.prob_tag}</div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 leading-tight">{t.prob_title}</h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                <div className="reveal space-y-5">
                                    <p className="text-gray-300 text-lg leading-relaxed">{t.prob_body_1}</p>
                                    <p className="text-gray-400 text-lg leading-relaxed">{t.prob_body_2}</p>
                                    <div className="mt-8">
                                        <a href="#how-it-works" className="inline-flex items-center gap-2 text-oxo-neon hover:text-white font-bold transition-all hover:gap-4 border-b border-transparent hover:border-white pb-1">
                                            {t.prob_cta} <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="reveal space-y-3">
                                    {[t.prob_1, t.prob_2, t.prob_3, t.prob_4].map((text, i) => (
                                        <div key={i} className="flex gap-4 items-center glass-panel p-5 rounded-2xl border-red-500/10 group hover:border-red-500/30 transition-colors">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 text-sm">✕</div>
                                            <p className="text-gray-300 font-medium">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── FEATURES SECTION ── */}
                    <section id="features" className="py-32 px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-20 reveal">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">{t.feat_tag}</div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight whitespace-pre-line">{t.feat_title}</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {features.map((f, i) => (
                                    <div key={i} className="glass-panel p-7 rounded-2xl border-white/5 group hover:border-oxo-purple/40 transition-colors reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                                        <div className="bento-glow" />
                                        <div className="w-11 h-11 mb-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-oxo-lightpurple group-hover:bg-oxo-purple/20 group-hover:border-oxo-purple/60 group-hover:text-white transition-all duration-200 group-hover:scale-110">{f.icon}</div>
                                        <h4 className="text-base font-display font-bold text-white mb-2">{f.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                                {/* Stat callout card */}
                                <div className="glass-panel p-7 rounded-2xl border-white/5 group hover:border-oxo-neon/40 transition-colors reveal flex flex-col justify-between" style={{ transitionDelay: '480ms' }}>
                                    <div className="bento-glow" />
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <p className="font-display font-bold text-5xl text-oxo-neon">4+</p>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">BTC Single Tx</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-display font-bold text-5xl text-oxo-purple">20+</p>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-1">Chains</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── COMPLIANCE SECTION ── */}
                    <section id="compliance" className="py-32 px-6 relative z-10 bg-[#05050A]">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16 reveal">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">{t.comp_tag}</div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">{t.comp_title}</h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.comp_body}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group reveal border-white/5 hover:border-red-500/20 transition-colors">
                                    <div className="bento-glow" />
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-red-400 group-hover:bg-red-500/20 transition-colors">
                                        <ScanIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 text-white">{t.comp_1_title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{t.comp_1_desc}</p>
                                </div>
                                <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group reveal border-white/5 hover:border-oxo-neon/20 transition-colors" style={{ transitionDelay: '100ms' }}>
                                    <div className="bento-glow" />
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-oxo-neon group-hover:bg-oxo-neon/20 transition-colors">
                                        <ZKProofIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 text-white">{t.comp_2_title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{t.comp_2_desc}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* ── CONTACT PAGE CONTENT ── */}
            {page === 'contact' && (
                <div className="pt-24">
                    {/* ── FORM SECTION ── */}
                    <section id="form" className="py-32 px-6 relative z-10">
                        <div className="max-w-3xl mx-auto reveal">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.form_title}</h2>
                                <p className="text-gray-400 font-medium text-lg max-w-xl mx-auto">{t.form_subtitle}</p>
                            </div>
                            <SettlementForm t={t} />
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                                <LockIcon className="w-4 h-4 text-oxo-lightpurple" />
                                <p>{t.f_secure}</p>
                            </div>
                        </div>
                    </section>

                    {/* ── FOUNDER SECTION ── */}
                    <section id="about" className="pb-32 px-6 relative z-10 bg-[#05050A]">
                        <div className="max-w-4xl mx-auto glass-panel p-10 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-10 items-center reveal border-white/5">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-oxo-purple to-[#030308] border border-white/20 flex-shrink-0 flex items-center justify-center shadow-[0_0_30px_rgba(108,63,255,0.2)]">
                                <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-3.315 0-10 1.66-10 5v2h20v-2c0-3.34-6.685-5-10-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">{t.found_title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">{t.found_bio}</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* ── FOOTER with FAQ (Only shown completely on 'home' and 'features') ── */}
            <footer className="pt-24 pb-10 px-6 border-t border-white/5 bg-[#030308] relative z-10">
                {page !== 'contact' && (
                    <div className="max-w-4xl mx-auto mb-24 reveal">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">{t.faq_title}</h2>
                        <div className="space-y-4">
                            {faqs.map(({ q, a }, i) => (
                                <div key={i} className="glass-panel p-8 rounded-2xl hover:border-oxo-purple/30 transition-colors border-white/5">
                                    <h4 className="font-bold text-lg mb-3 text-white flex items-start gap-3">
                                        <span className="text-oxo-purple flex-shrink-0">Q.</span>{q}
                                    </h4>
                                    <p className="text-gray-400 font-medium leading-relaxed pl-7">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="max-w-4xl mx-auto text-center mb-12 reveal">
                    <p className="text-gray-400 font-medium">{t.footer_tagline}</p>
                    <p className="text-gray-600 text-sm mt-1">{t.footer_contact}</p>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <a href="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-xs">O</div>
                        <span className="font-display font-bold tracking-wide">OXO.</span>
                    </a>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-gray-500">
                        <a href="/" className="hover:text-white transition-colors">{t.nav_home}</a>
                        <a href="/features#compliance" className="hover:text-white transition-colors">{t.nav_compliance}</a>
                        <a href="/contact#about" className="hover:text-white transition-colors">{t.nav_about}</a>
                        <a href="/contact" className="hover:text-white transition-colors">{t.nav_contact}</a>
                    </div>
                    <button onClick={() => window.scrollTo(0, 0)} className="text-xs font-bold text-white bg-oxo-purple hover:bg-[#5a33db] px-5 py-2.5 rounded-full transition-all">Back to Top</button>
                </div>
            </footer>

            {/* ── LOGIN MODAL ── */}
            {isLoginOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <div className="absolute inset-0 bg-[#030308]/90 backdrop-blur-md" onClick={handleCloseModal} />
                    <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border-white/10 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-oxo-purple/30 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-oxo-purple/20 rounded-full blur-3xl" />
                        <button onClick={handleCloseModal} className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full z-20 transition-colors">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                        <div className="text-center mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-oxo-purple mx-auto flex items-center justify-center font-bold text-white text-2xl shadow-[0_0_20px_rgba(108,63,255,0.6)] mb-4">O</div>
                            <h3 className="text-2xl font-display font-bold text-white">{isLoginMode ? t.login_title : t.signup_title}</h3>
                        </div>
                        <form className="space-y-5 relative z-10" onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
                            {!isLoginMode && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">{t.signup_name}</label>
                                    <input required type="text" placeholder="John Doe" className="w-full bg-[#05050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oxo-purple transition-all placeholder-gray-700" />
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">{t.login_email}</label>
                                <input required type="email" placeholder="admin@company.com" className="w-full bg-[#05050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oxo-purple transition-all placeholder-gray-700" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2 pl-1 pr-1">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{t.login_pass}</label>
                                    {isLoginMode && <a href="#" className="text-xs text-oxo-lightpurple hover:text-white transition-colors">{t.login_forgot}</a>}
                                </div>
                                <input required type="password" placeholder="••••••••" className="w-full bg-[#05050A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-oxo-purple transition-all placeholder-gray-700" />
                            </div>
                            <button type="submit" className="w-full bg-oxo-purple hover:bg-[#5a33db] text-white font-bold py-3.5 rounded-xl transition-all mt-4 shadow-[0_0_20px_rgba(108,63,255,0.3)] hover:shadow-[0_0_30px_rgba(108,63,255,0.5)]">
                                {isLoginMode ? t.login_btn : t.signup_btn}
                            </button>
                        </form>
                        <div className="mt-6 flex items-center gap-4 relative z-10">
                            <div className="flex-1 h-px bg-white/10" /><span className="text-xs text-gray-600 font-bold uppercase">OR</span><div className="flex-1 h-px bg-white/10" />
                        </div>
                        <button type="button" className="w-full mt-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 relative z-10">
                            <GoogleIcon className="w-5 h-5" /> {t.login_google}
                        </button>
                        <div className="mt-8 text-center relative z-10">
                            <p className="text-sm text-gray-500">
                                {isLoginMode ? t.login_no_acc : t.signup_has_acc}
                                <button onClick={() => setIsLoginMode(m => !m)} className="ml-2 text-white hover:text-oxo-lightpurple font-bold transition-colors">
                                    {isLoginMode ? t.login_signup : t.nav_login}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
