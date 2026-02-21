import { useState, useEffect } from 'react';
import { dict, type Lang } from '../lib/dict';
import {
    ShieldIcon, SwapIcon, LockIcon, CheckIcon, FingerprintIcon,
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

export default function App() {
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

    return (
        <div className="text-gray-100 selection:bg-oxo-purple selection:text-white overflow-hidden">

            {/* Global Ambient Spotlights */}
            <div className="spotlight bg-oxo-purple/20 w-[600px] h-[600px] top-[-200px] left-1/2 transform -translate-x-1/2" />
            <div className="spotlight bg-oxo-lightpurple/10 w-[800px] h-[800px] bottom-[10%] right-[-200px]" />
            <div className="spotlight bg-oxo-purple/15 w-[500px] h-[500px] top-[40%] left-[-150px]" />

            {/* NAVBAR */}
            <nav className="fixed w-full z-40 bg-[#030308]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black group-hover:bg-gray-200 transition-colors">O</div>
                        <span className="font-display font-bold text-xl tracking-wide group-hover:text-gray-300 transition-colors">OXO.</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                        <a href="#problem" className="hover:text-white transition-colors">Problem</a>
                        <a href="#solution" className="hover:text-white transition-colors">Features</a>
                        <a href="#flow" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#compliance" className="hover:text-white transition-colors">Compliance</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleLang} className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
                            {t.nav_lang}
                        </button>
                        <button onClick={() => setIsLoginOpen(true)} className="text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 rounded-full transition-all">
                            {t.nav_login}
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-40 pb-20 px-6 relative z-10 flex flex-col items-center justify-center text-center">
                <div className="max-w-5xl mx-auto reveal active space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-oxo-purple animate-pulse" />
                        {t.hero_tag}
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                        {t.hero_title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        {t.hero_sub}
                    </p>
                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#form" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-oxo-purple hover:bg-[#5a33db] font-semibold text-white transition-all shadow-[0_0_30px_rgba(108,63,255,0.4)] hover:shadow-[0_0_40px_rgba(108,63,255,0.6)] hover:-translate-y-0.5 w-full sm:w-auto">
                            {t.btn_primary}
                        </a>
                        <a href="#flow" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-white transition-all w-full sm:w-auto">
                            {t.btn_secondary}
                        </a>
                    </div>
                </div>

                {/* DASHBOARD MOCKUP */}
                <div className="w-full max-w-6xl mx-auto mt-20 relative reveal active">
                    <div className="absolute inset-0 bg-oxo-purple/20 blur-[100px] rounded-[3rem] z-0 pointer-events-none transform scale-90" />
                    <div className="relative z-10 glass-panel rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                        <div className="bg-[#0A0A12] rounded-xl md:rounded-[2rem] overflow-hidden border border-white/5 flex flex-col md:flex-row h-[450px] md:h-[650px]">
                            {/* Sidebar */}
                            <div className="hidden md:flex w-64 border-r border-white/5 bg-[#05050A] p-6 flex-col gap-6">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-oxo-purple flex items-center justify-center font-bold text-white text-xs">O</div>
                                    <span className="font-display font-bold text-lg">OXO.</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="px-4 py-2.5 rounded-lg bg-oxo-purple/10 text-oxo-lightpurple font-medium text-sm flex items-center gap-3"><ShieldIcon className="w-4 h-4" /> Live Pipeline</div>
                                    <div className="px-4 py-2.5 rounded-lg text-gray-500 font-medium text-sm flex items-center gap-3"><LockIcon className="w-4 h-4" /> Risk Quarantine</div>
                                    <div className="px-4 py-2.5 rounded-lg text-gray-500 font-medium text-sm flex items-center gap-3"><SwapIcon className="w-4 h-4" /> Routing Engine</div>
                                    <div className="px-4 py-2.5 rounded-lg text-gray-500 font-medium text-sm flex items-center gap-3"><FingerprintIcon className="w-4 h-4" /> ZK Reports</div>
                                </div>
                            </div>
                            {/* Main Content */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold">Settlement Engine</h3>
                                        <p className="text-gray-500 text-sm">Real-time risk screening & auto-routing pipeline.</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Live Ops
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 md:p-5 flex flex-col justify-center">
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Total Settled (24h)</p>
                                        <p className="text-2xl md:text-3xl font-display font-bold text-white">$1.24M <span className="text-xs text-green-400 ml-2 font-sans font-medium">↑ 12%</span></p>
                                    </div>
                                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 md:p-5 flex flex-col justify-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 blur-2xl" />
                                        <p className="text-red-400/80 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">In Quarantine</p>
                                        <p className="text-2xl md:text-3xl font-display font-bold text-red-400 relative z-10">2.5 BTC</p>
                                    </div>
                                    <div className="bg-oxo-purple/5 border border-oxo-purple/10 rounded-xl p-4 md:p-5 flex flex-col justify-center relative overflow-hidden">
                                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-oxo-purple/20 blur-2xl" />
                                        <p className="text-oxo-lightpurple text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Clean USDT Balance</p>
                                        <p className="text-2xl md:text-3xl font-display font-bold text-oxo-neon relative z-10">162,450 ₮</p>
                                    </div>
                                </div>
                                <div className="flex-1 bg-[#05050A] border border-white/5 rounded-xl overflow-hidden flex flex-col mt-2">
                                    <div className="hidden md:grid grid-cols-4 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5">
                                        <div>Incoming Asset</div><div>AML Risk Score</div><div>Execution Route</div><div>Settlement Status</div>
                                    </div>
                                    <div className="flex-1 p-3 space-y-2">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-white/5 items-center border border-white/10">
                                            <div className="flex items-center gap-3 font-display font-bold text-sm text-white">
                                                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">Ξ</span> 50.0 ETH
                                            </div>
                                            <div><span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold">Low (Score: 12)</span></div>
                                            <div className="hidden md:block text-xs text-gray-400 font-mono bg-black/40 px-2 py-1 rounded w-max">DEX Aggregator</div>
                                            <div><span className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold flex items-center gap-2 w-max"><span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" /> Swapping...</span></div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-red-500/5 items-center border border-red-500/20 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-500/5 pointer-events-none" />
                                            <div className="flex items-center gap-3 font-display font-bold text-sm text-white">
                                                <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">₿</span> 2.50 BTC
                                            </div>
                                            <div><span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 w-max"><ShieldIcon className="w-3 h-3" /> High (Flagged)</span></div>
                                            <div className="hidden md:block text-xs text-red-400/50 font-mono bg-red-900/20 px-2 py-1 rounded w-max">Execution Halted</div>
                                            <div><span className="px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold w-max block">Quarantined</span></div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-lg items-center border border-transparent hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3 font-display font-bold text-sm text-white">
                                                <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">₿</span> 0.85 BTC
                                            </div>
                                            <div><span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold">Low (Score: 05)</span></div>
                                            <div className="hidden md:block text-xs text-gray-400 font-mono bg-black/40 px-2 py-1 rounded w-max">Thorchain → USDT</div>
                                            <div><span className="px-3 py-1.5 rounded-full bg-oxo-purple/20 text-oxo-lightpurple border border-oxo-purple/30 text-xs font-bold w-max flex items-center gap-1.5"><CheckIcon className="w-3.5 h-3.5" /> Settled</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUSTED BY */}
            <section className="py-10 border-y border-white/5 bg-[#05050A]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Trusted by innovators</p>
                    <div className="flex items-center gap-12">
                        <span className="font-display font-bold text-2xl tracking-tight flex items-center gap-2"><div className="w-5 h-5 rounded bg-current" /> LIMINAL</span>
                        <span className="font-display font-bold text-2xl tracking-tight flex items-center gap-2"><div className="w-5 h-5 rounded-full border-[3px] border-current" /> INDODAX</span>
                    </div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section id="problem" className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold tracking-widest uppercase mb-6">The Challenge</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">{t.prob_title}</h2>
                        <ul className="space-y-6">
                            {[t.prob_1, t.prob_2, t.prob_3, t.prob_4].map((text, i) => (
                                <li key={i} className="flex gap-4 items-start group">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs group-hover:bg-red-500/20 transition-colors">✕</div>
                                    <p className="text-gray-300 leading-relaxed font-medium">{text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10">
                            <a href="#solution" className="inline-flex items-center gap-2 text-oxo-neon hover:text-white font-bold transition-all hover:gap-4 border-b border-transparent hover:border-white pb-1">
                                {t.prob_cta} <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="reveal">
                        <div className="glass-panel p-8 md:p-10 rounded-3xl relative group overflow-hidden border-white/5">
                            <div className="bento-glow" />
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="space-y-4 relative z-10">
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex justify-between items-center transform group-hover:-translate-x-2 transition-transform">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-500 font-bold">⚠</div>
                                        <span className="font-mono text-sm font-semibold">Tx: 0x8a7f...</span>
                                    </div>
                                    <span className="text-red-400 text-xs font-bold px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">High Risk Flagged</span>
                                </div>
                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex justify-between items-center opacity-80 transform group-hover:-translate-x-2 transition-transform" style={{ transitionDelay: '100ms' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">?</div>
                                        <span className="font-mono text-sm font-semibold">Tx: 0x1b4c...</span>
                                    </div>
                                    <span className="text-orange-400 text-xs font-bold px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">Manual Review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <section id="solution" className="py-32 px-6 relative z-10 bg-[#05050A]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20 reveal">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">Solution Layer</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">{t.sol_title}</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.sol_desc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Card 1 */}
                        <div className="md:col-span-2 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group reveal">
                            <div className="bento-glow" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-oxo-purple/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-oxo-purple/20 transition-colors" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="mb-12">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-oxo-purple transition-colors">
                                        <SwapIcon />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3">{t.sol_1_title}</h3>
                                    <p className="text-gray-400 font-medium leading-relaxed max-w-md">{t.sol_1_desc}</p>
                                </div>
                                <div className="w-full bg-[#030308] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs">₿</span> BTC</div>
                                    <span className="text-gray-600">→</span>
                                    <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">Ξ</span> ETH</div>
                                    <span className="text-gray-600">→</span>
                                    <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">₮</span> USDT</div>
                                </div>
                            </div>
                        </div>
                        {/* Small Card 1 */}
                        <div className="md:col-span-1 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group reveal" style={{ transitionDelay: '100ms' }}>
                            <div className="bento-glow" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-oxo-purple transition-colors"><ShieldIcon /></div>
                                <h3 className="text-xl font-display font-bold mb-3">{t.sol_2_title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed text-sm">{t.sol_2_desc}</p>
                            </div>
                            <div className="mt-8 space-y-3">
                                <div className="h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center px-4"><span className="w-2 h-2 rounded-full bg-green-500 mr-3" /> Pass</div>
                                <div className="h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center px-4"><span className="w-2 h-2 rounded-full bg-red-500 mr-3" /> Flagged</div>
                            </div>
                        </div>
                        {/* Small Card 2 */}
                        <div className="md:col-span-1 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group reveal" style={{ transitionDelay: '200ms' }}>
                            <div className="bento-glow" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-oxo-purple transition-colors"><LockIcon /></div>
                                <h3 className="text-xl font-display font-bold mb-3">{t.sol_3_title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed text-sm">{t.sol_3_desc}</p>
                            </div>
                            <div className="mt-8 relative h-20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-oxo-purple to-transparent" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-between px-4">
                                    <div className="w-8 h-8 rounded-full bg-[#030308] border border-white/10 flex items-center justify-center text-xs z-10">DEX</div>
                                    <div className="w-6 h-6 rounded-full bg-oxo-purple/50 animate-ping absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                    <div className="w-8 h-8 rounded-full bg-[#030308] border border-white/10 flex items-center justify-center text-xs z-10">CEX</div>
                                </div>
                            </div>
                        </div>
                        {/* Large Card 2 */}
                        <div className="md:col-span-2 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group reveal" style={{ transitionDelay: '300ms' }}>
                            <div className="bento-glow" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-oxo-purple/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-oxo-purple/20 transition-colors" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-oxo-purple transition-colors"><FingerprintIcon /></div>
                                <h3 className="text-2xl font-display font-bold mb-3">{t.sol_4_title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed max-w-md">{t.sol_4_desc}</p>
                                <div className="mt-8 bg-[#030308] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-500 overflow-hidden relative">
                                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030308] to-transparent" />
                                    <p className="truncate">Proof Generated: 0x8a7f9b2c4d...</p>
                                    <p className="truncate mt-1 text-green-400">Status: Verified on-chain</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FLOW SECTION */}
            <section id="flow" className="py-32 px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 reveal">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">User Flow</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">{t.flow_title}</h2>
                        <p className="text-gray-400 text-lg">{t.flow_desc}</p>
                    </div>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[39px] top-10 bottom-10 w-px bg-gradient-to-b from-oxo-purple via-oxo-lightpurple to-transparent z-0 hidden md:block" />
                        {([t.flow_1, t.flow_2, t.flow_3, t.flow_4, t.flow_5, t.flow_6] as string[]).map((step, i) => (
                            <div key={i} className="glass-panel p-6 md:p-8 rounded-3xl relative z-10 reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="bento-glow" />
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-[#05050A] border border-white/10 flex items-center justify-center text-2xl font-display font-bold text-gray-400 group-hover:text-white group-hover:border-oxo-purple transition-colors relative overflow-hidden">
                                        <div className="absolute inset-0 bg-oxo-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        0{i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-display font-bold text-white mb-2">{step}</h4>
                                        <p className="text-gray-400 text-sm max-w-lg">Automated and executed securely within the OXO execution environment, ensuring compliance at every step.</p>
                                    </div>
                                    <div className="md:ml-auto">
                                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-oxo-purple group-hover:border-oxo-purple transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-32 px-6 relative z-10 bg-[#05050A]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">Engine Capabilities</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 leading-tight">{t.feat_title}</h2>
                        <div className="space-y-10">
                            <div className="border-l-2 border-oxo-purple pl-6">
                                <h4 className="text-xl font-bold text-white mb-2">{t.feat_sub_1}</h4>
                                <p className="text-gray-400 font-medium leading-relaxed">{t.feat_desc_1}</p>
                            </div>
                            <div className="border-l-2 border-oxo-neon pl-6">
                                <h4 className="text-xl font-bold text-white mb-2">{t.feat_sub_2}</h4>
                                <p className="text-gray-400 font-medium leading-relaxed">{t.feat_desc_2}</p>
                            </div>
                        </div>
                    </div>
                    <div className="reveal flex gap-6 md:gap-8 justify-center lg:justify-end flex-wrap lg:flex-nowrap">
                        {[
                            { val: '1-3', label: 'Minutes\nExecution', color: 'text-oxo-neon' },
                            { val: '20+', label: 'Supported\nChains', color: 'text-oxo-purple' },
                            { val: '∞', label: 'No Daily\nLimit', color: 'text-white' },
                        ].map(({ val, label, color }, i) => (
                            <div key={i} className="glass-panel p-8 rounded-3xl text-center flex-1 min-w-[150px] border-white/5 group hover:border-oxo-purple/50">
                                <div className={`font-display font-bold text-4xl ${color} mb-2 group-hover:scale-110 transition-transform`}>{val}</div>
                                <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider whitespace-pre-line">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPLIANCE SECTION */}
            <section id="compliance" className="py-32 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 reveal">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-semibold tracking-widest uppercase mb-6">Security & Trust</div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.comp_title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group reveal">
                            <div className="bento-glow" />
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors">
                                <ShieldIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">{t.comp_1_title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{t.comp_1_desc}</p>
                        </div>
                        <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group reveal" style={{ transitionDelay: '100ms' }}>
                            <div className="bento-glow" />
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-oxo-neon group-hover:bg-oxo-neon/20 group-hover:text-oxo-neon transition-colors">
                                <FingerprintIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">{t.comp_2_title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{t.comp_2_desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section id="form" className="py-32 px-6 relative z-10 bg-[#05050A]">
                <div className="max-w-4xl mx-auto reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.form_title}</h2>
                        <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">{t.form_subtitle}</p>
                    </div>
                    <SettlementForm t={t} />
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium py-3 px-6 w-max mx-auto">
                        <LockIcon className="w-4 h-4 text-oxo-lightpurple" />
                        <p>{t.f_secure}</p>
                    </div>
                </div>
            </section>

            {/* FOUNDER SECTION */}
            <section className="py-24 px-6 relative z-10">
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

            {/* FAQ + FOOTER */}
            <footer className="pt-24 pb-10 px-6 border-t border-white/5 bg-[#030308] relative z-10">
                <div className="max-w-4xl mx-auto mb-24 reveal">
                    <h2 className="text-3xl font-display font-bold mb-10 text-center">{t.faq_title}</h2>
                    <div className="space-y-4">
                        {[
                            { q: t.faq_1_q, a: t.faq_1_a },
                            { q: t.faq_2_q, a: t.faq_2_a },
                        ].map(({ q, a }, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl hover:border-oxo-purple/30 transition-colors border-white/5">
                                <h4 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
                                    <span className="text-oxo-purple">Q.</span> {q}
                                </h4>
                                <p className="text-gray-400 font-medium leading-relaxed pl-7">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-xs">O</div>
                        <span className="font-display font-bold tracking-wide">OXO.</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#problem" className="hover:text-white transition-colors">Problem</a>
                        <a href="#solution" className="hover:text-white transition-colors">Features</a>
                        <a href="#compliance" className="hover:text-white transition-colors">Compliance</a>
                        <a href="mailto:developer@oxo.so" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <button onClick={() => window.scrollTo(0, 0)} className="text-xs font-bold text-white bg-oxo-purple hover:bg-[#5a33db] px-5 py-2.5 rounded-full transition-all">
                        Back to Top
                    </button>
                </div>
            </footer>

            {/* LOGIN MODAL */}
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
                        <form className="space-y-5 relative z-10" onSubmit={(e) => { e.preventDefault(); alert(isLoginMode ? 'Login!' : 'Signup!'); handleCloseModal(); }}>
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
