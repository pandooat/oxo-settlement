import React, { useState, useEffect } from 'react';
import { dict, type Lang } from '../lib/dict';
import {
    ShieldIcon, LockIcon, ScanIcon, ZKProofIcon, ChainIcon, DashboardIcon,
    CloseIcon, GoogleIcon, ArrowUpRight, SwapIcon, WalletIcon, CheckIcon, FingerprintIcon,
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

// --- Helper Icons for Cards ---
const CopyIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const QrIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const RefreshIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);
const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
);

// --- HeroCards Component ---
const CardStepper = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="px-5 pt-6 pb-5 relative">
            <div className="absolute top-[36px] left-[15%] right-[15%] h-[2px] bg-gray-100 z-0"></div>
            {currentStep > 1 && <div className="absolute top-[36px] left-[15%] w-[35%] h-[2px] bg-[#2A6FF6] z-0"></div>}
            {currentStep > 2 && <div className="absolute top-[36px] left-[50%] w-[35%] h-[2px] bg-[#2A6FF6] z-0"></div>}

            <div className="relative z-10 flex justify-between">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${currentStep >= 1 ? 'bg-[#2A6FF6]' : 'bg-gray-200'}`}>
                        {currentStep > 1 ? <CheckIcon className="w-3.5 h-3.5" /> : (currentStep === 1 ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : null)}
                    </div>
                    <div className="text-center">
                        <div className="text-[11px] font-bold text-[#0A0A0A]">DEPOSIT</div>
                        <div className="text-[9px] font-medium text-gray-400 mt-0.5">{currentStep === 1 ? 'Awaiting Funds' : 'Funds Detected'}</div>
                    </div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${currentStep >= 2 ? 'bg-[#2A6FF6]' : 'bg-white border-2 border-gray-100'}`}>
                        {currentStep > 2 ? <CheckIcon className="w-3.5 h-3.5" /> : (currentStep === 2 ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>)}
                    </div>
                    <div className="text-center">
                        <div className="text-[11px] font-bold text-[#0A0A0A] opacity-70">SWAP</div>
                        <div className="text-[9px] font-medium text-gray-400 mt-0.5">On-Chain Route</div>
                    </div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${currentStep >= 3 ? 'bg-[#2A6FF6]' : 'bg-white border-2 border-gray-100'}`}>
                        {currentStep > 3 ? <CheckIcon className="w-3.5 h-3.5" /> : (currentStep === 3 ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>)}
                    </div>
                    <div className="text-center">
                        <div className="text-[11px] font-bold text-[#0A0A0A] opacity-70">SETTLEMENT</div>
                        <div className="text-[9px] font-medium text-gray-400 mt-0.5">To Wallet</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HeroCards = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 px-2 w-full max-w-5xl mx-auto">
            {/* Card 1: Deposit Awaiting */}
            <div className="bg-white rounded-2xl w-full flex flex-col shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <CardStepper currentStep={1} />
                <div className="px-5 pb-5 flex-1 flex flex-col">
                    <div className="bg-[#F8F9FA] rounded-xl p-4 mb-4 border border-gray-100/60">
                        <div className="flex justify-between text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-widest mb-1.5 uppercase">
                            <span>Amount to show</span>
                            <span>Deposit Amount</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base font-bold text-[#0A0A0A] mb-4">
                            <span>USD 8000</span>
                            <span>1 BTC</span>
                        </div>
                        <div className="flex justify-between text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-widest mb-1.5 uppercase">
                            <span>Amount to receive</span>
                            <span>Expiry Time</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base font-bold mb-1">
                            <span className="text-[#2A6FF6]">~8,240 USDC</span>
                            <span className="text-[#F56C00]">14:59</span>
                        </div>
                    </div>

                    <div className="px-1 mb-4">
                        <div className="relative flex justify-center items-center mb-3 mt-2">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100/80"></div></div>
                            <span className="bg-white px-3 text-[8px] sm:text-[9px] font-bold text-gray-300 tracking-widest uppercase z-10">Checkout Address</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg border border-gray-200 p-2.5 shadow-sm">
                            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-gray-500">0x742d35Cc6634...8f44e</span>
                            <div className="flex gap-2">
                                <button className="text-gray-400 hover:text-[#2A6FF6] transition-colors"><CopyIcon className="w-3.5 h-3.5" /></button>
                                <button className="text-gray-400 flex items-center justify-center p-0.5 bg-gray-100 rounded hover:bg-gray-200 transition-colors"><QrIcon className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto bg-[#FFF7ED] text-[#F56C00] text-[9px] sm:text-[10px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 border border-[#FFEDD5]">
                        <RefreshIcon className="w-3 h-3 animate-spin" /> Monitoring for incoming transaction...
                    </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-50 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-1.5 text-[#2A6FF6] text-[8px] font-bold uppercase tracking-widest">
                        <ShieldCheckIcon className="w-3 h-3" /> Non-Custodial Settlement
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[8px] font-bold uppercase tracking-widest hover:text-gray-600 transition-colors cursor-pointer">
                        Explorer <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>

            {/* Card 2: Swap Executing */}
            <div className="bg-white rounded-2xl w-full flex flex-col shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <CardStepper currentStep={2} />
                <div className="px-5 pb-5 flex-1 flex flex-col">
                    <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <div className="text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-widest mb-1.5 uppercase">Incoming Deposit</div>
                                <div className="text-sm sm:text-base font-bold text-[#0A0A0A]">1 BTC</div>
                            </div>
                            <div className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 mb-1.5 bg-gray-50">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </div>
                            <div className="text-right">
                                <div className="text-[8px] sm:text-[9px] font-bold text-gray-400 tracking-widest mb-1.5 uppercase">Settling In</div>
                                <div className="text-sm sm:text-base font-bold text-[#2A6FF6]">8,240 USDC</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-lg border border-gray-100/80">
                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2A6FF6]">
                                <RefreshIcon className="w-4 h-4 animate-spin" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-bold text-[#0A0A0A]">Executing Swap Route</div>
                                <div className="text-[9px] sm:text-[10px] text-gray-400 font-medium">Finding best on-chain liquidity...</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-auto mb-2">
                        <div className="flex-1 border border-gray-100 rounded-lg p-3">
                            <div className="text-[8px] font-bold text-gray-400 tracking-widest mb-1 mt-1 uppercase">Network</div>
                            <div className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2A6FF6]"></span> Ethereum</div>
                        </div>
                        <div className="flex-1 border border-gray-100 rounded-lg p-3">
                            <div className="text-[8px] font-bold text-gray-400 tracking-widest mb-1 mt-1 uppercase">Estimated Gas</div>
                            <div className="text-xs font-bold text-[#0A0A0A]">0.002 ETH</div>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-50 flex justify-between items-center bg-white mt-auto">
                    <div className="flex items-center gap-1.5 text-[#2A6FF6] text-[8px] font-bold uppercase tracking-widest opacity-30">
                        <ShieldCheckIcon className="w-3 h-3" /> Non-Custodial Settlement
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[8px] font-bold uppercase tracking-widest opacity-30">
                        Explorer <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>

            {/* Card 3: Settling Funds */}
            <div className="bg-white rounded-2xl w-full flex flex-col shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <CardStepper currentStep={3} />
                <div className="px-5 pb-5 flex-1 flex flex-col">
                    <div className="bg-[#F8F9FA] border border-gray-100/80 rounded-xl p-6 sm:p-8 flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2A6FF6] mb-5 shadow-[inset_0_2px_4px_rgba(42,111,246,0.1)]">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div className="text-sm sm:text-base font-bold text-[#0A0A0A] mb-2 tracking-tight">Settling Funds</div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium mb-6 px-4">Transferring 8,240 USDC to &lt;wallet name&gt;</div>

                        <div className="w-full bg-white border border-gray-200 rounded-lg py-3.5 px-4 text-[9px] sm:text-[10px] font-mono font-bold text-gray-400 tracking-widest text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                            Destination: 0xa9b...Fa2a1
                        </div>
                    </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-50 flex justify-between items-center bg-white mt-auto">
                    <div className="flex items-center gap-1.5 text-[#2A6FF6] text-[8px] font-bold uppercase tracking-widest opacity-30">
                        <ShieldCheckIcon className="w-3 h-3" /> Non-Custodial Settlement
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[8px] font-bold uppercase tracking-widest opacity-30">
                        Explorer <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

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

    // List of steps for "How It Works" section
    const flowSteps = [
        { title: t.flow_1_title, desc: t.flow_1_desc, micro: t.flow_1_micro },
        { title: t.flow_2_title, desc: t.flow_2_desc, micro: t.flow_2_micro },
        { title: t.flow_3_title, desc: t.flow_3_desc, micro: t.flow_3_micro },
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
                        <a href="/" className={`hover: text - white transition - colors ${page === 'home' ? 'text-white' : ''} `}>{t.nav_home}</a>
                        <a href="/features#compliance" className={`hover: text - white transition - colors ${page === 'features' ? 'text-white' : ''} `}>{t.nav_compliance}</a>
                        <a href="/contact" className={`hover: text - white transition - colors ${page === 'contact' ? 'text-white' : ''} `}>{t.nav_contact}</a>
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
                        <div className="relative w-full mt-16 md:mt-24 reveal active select-none flex flex-col items-center px-4" style={{ minHeight: '380px' }}>
                            {/* Atmosphere gradient behind cards */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at center, rgba(108,63,255,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
                            />

                            {/* THE 3 CARDS */}
                            <div className="relative z-10 w-full max-w-[1100px]">
                                <HeroCards />
                            </div>

                            {/* Dissolve to next section */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
                                style={{ background: 'linear-gradient(to bottom, transparent 0%, #030308 100%)' }}
                            />
                        </div>
                    </section>

                    {/* ── SUPPORTED NETWORK ── */}
                    <section className="py-12 border-y border-white/5 bg-[#05050A]">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 opacity-80 hover:opacity-100 transition-all duration-500">
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Supported Network</span>
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                                {/* Bitcoin */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-white/5 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] group hover:border-[#F7931A]/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#F7931A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src="https://cdn.crypto-logo.com/logos/bitcoin-btc/64x64/transparent.webp" alt="Bitcoin" className="w-5 h-5 sm:w-6 sm:h-6 brightness-[1.2] relative z-10 drop-shadow-[0_0_8px_rgba(247,147,26,0.3)]" />
                                </div>
                                {/* Ethereum */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-white/5 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] group hover:border-[#627EEA]/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#627EEA]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src="https://cdn.crypto-logo.com/logos/ethereum-eth/64x64/transparent.webp" alt="Ethereum" className="w-5 h-5 sm:w-6 sm:h-6 brightness-[1.2] relative z-10 drop-shadow-[0_0_8px_rgba(98,126,234,0.3)]" />
                                </div>
                                {/* Solana */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-white/5 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] group hover:border-[#00FFA3]/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#00FFA3]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src="https://crypto-logo.com/api/logo/solana-sol.webp?w=128&h=128" alt="Solana" className="w-5 h-5 sm:w-6 sm:h-6 brightness-[1.2] relative z-10 drop-shadow-[0_0_8px_rgba(0,255,163,0.3)]" />
                                </div>
                                {/* Base (active state example style) */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-[#0052FF]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,82,255,0.15)] group hover:border-[#0052FF]/50 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#0052FF]/20" />
                                    <img src="https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue-300x300.webp" alt="Base" className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-[0_0_12px_rgba(0,82,255,0.6)] brightness-[1.5]" />
                                </div>
                                {/* Polygon */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-white/5 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] group hover:border-[#8247E5]/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#8247E5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src="https://crypto-logo.com/api/logo/polygon-matic.webp?w=128&h=128" alt="Polygon" className="w-5 h-5 sm:w-6 sm:h-6 brightness-[1.2] relative z-10 drop-shadow-[0_0_8px_rgba(130,71,229,0.3)]" />
                                </div>
                                {/* Binance */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-[#0A0A0E] border border-white/5 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] group hover:border-[#F3BA2F]/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#F3BA2F]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src="https://cdn.crypto-logo.com/logos/binance-coin-bnb/64x64/transparent.webp" alt="Binance" className="w-5 h-5 sm:w-6 sm:h-6 brightness-[1.3] relative z-10 drop-shadow-[0_0_8px_rgba(243,186,47,0.3)]" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── HOW IT WORKS ── */}
                    <section id="how-it-works" className="py-24 sm:py-32 px-6 relative z-10 bg-[#05050A]">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16 sm:mb-24 reveal">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                                    {t.flow_tag}
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-8 tracking-tight text-white">
                                    {t.flow_title}
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                                    {t.flow_desc}
                                </p>
                            </div>

                            <div className="space-y-6 relative">
                                {/* Connecting line */}
                                <div className="absolute left-[39px] sm:left-[47px] top-12 bottom-12 w-[1px] bg-gradient-to-b from-oxo-purple/80 via-oxo-lightpurple/40 to-transparent z-0" />

                                {flowSteps.map((step, i) => (
                                    <div key={i} className="glass-panel p-6 sm:p-10 rounded-3xl relative z-10 reveal group border-white/5 hover:border-oxo-purple/20 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                                        <div className="bento-glow" />
                                        <div className="flex flex-row items-start gap-6 sm:gap-10">
                                            {/* Step Number Container */}
                                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#08080C] border border-white/5 flex items-center justify-center group-hover:border-oxo-purple/50 transition-colors shadow-2xl">
                                                <span className="text-3xl sm:text-4xl font-display font-bold text-white/90 group-hover:text-white transition-colors">{i + 1}</span>
                                            </div>

                                            {/* Content Area */}
                                            <div className="flex-1 pt-2 sm:pt-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-oxo-lightpurple transition-colors tracking-tight">
                                                        {step.title}
                                                    </h4>
                                                    <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/5 items-center justify-center text-gray-600 group-hover:text-oxo-purple group-hover:border-oxo-purple/40 transition-all">
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-5 max-w-2xl">
                                                    {step.desc}
                                                </p>
                                                {step.micro && (
                                                    <p className="text-sm sm:text-base font-medium text-[#7B46FF] italic opacity-80 group-hover:opacity-100 transition-opacity">
                                                        "{step.micro}"
                                                    </p>
                                                )}
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
                                    <div key={i} className="glass-panel p-7 rounded-2xl border-white/5 group hover:border-oxo-purple/40 transition-colors reveal" style={{ transitionDelay: `${i * 60} ms` }}>
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
