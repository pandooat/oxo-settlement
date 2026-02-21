import { useState } from 'react';
import type { Dict } from '../lib/dict';
import { LockIcon, CheckIcon } from './Icons';

interface Props {
    t: Dict;
}

const initialFormState = {
    companyName: '', website: '', jurisdiction: '', contactName: '', email: '',
    asset: 'USDT', ticketSize: '', volume: '',
    needsBtcToUsdt: false, acceptsMultiChain: false,
    consent: false,
};

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpgT48YUZxRBn0RUdLtGxtbnZuRavUsdAxkRHPDis0u3F33rQcMqEicY7JgsoC9l-6/exec';

export function SettlementForm({ t }: Props) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? target.checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = { ...formData, timestamp: new Date().toISOString() };
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload),
            });
            setIsSuccess(true);
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Terjadi kesalahan saat mengirim data. Pastikan URL Apps Script sudah benar.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setStep(1);
        setFormData(initialFormState);
    };

    const inputClass = "w-full bg-[#05050A] border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:outline-none focus:border-oxo-purple transition-all placeholder-gray-600";

    if (isSuccess) {
        return (
            <div className="glass-panel p-8 md:p-16 rounded-3xl relative overflow-hidden text-center border-green-500/30 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckIcon className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{t.succ_title}</h3>
                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">{t.succ_desc}</p>
                <button onClick={resetForm} className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-bold transition-all">
                    {t.succ_btn}
                </button>
            </div>
        );
    }

    const CheckboxField = ({ name, checked, label }: { name: string; checked: boolean; label: string }) => (
        <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleInputChange}
                    className="peer w-6 h-6 appearance-none border border-gray-600 rounded bg-transparent checked:bg-oxo-purple checked:border-oxo-purple transition-all cursor-pointer"
                />
                <svg className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-white left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="text-gray-400 font-medium group-hover:text-white transition-colors">{label}</span>
        </label>
    );

    return (
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="bento-glow" />

            {/* Stepper — now 2 steps */}
            <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -z-10" />
                {[1, 2].map(s => (
                    <div key={s} className={`flex items-center justify-center w-10 h-10 rounded-full font-display font-bold text-sm transition-all duration-300 ${step >= s ? 'bg-oxo-purple text-white shadow-[0_0_15px_rgba(108,63,255,0.6)]' : 'bg-[#05050A] border border-white/10 text-gray-600'}`}>{s}</div>
                ))}
            </div>

            <div className="text-center mb-10 text-sm text-oxo-lightpurple font-bold tracking-widest uppercase relative z-10">
                {step === 1 && t.form_step1}
                {step === 2 && t.form_step2}
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
                {/* STEP 1 — Company Info */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder={t.f_name} className={inputClass} />
                            <input required type="text" name="website" value={formData.website} onChange={handleInputChange} placeholder={t.f_web} className={inputClass} />
                        </div>
                        <input required type="text" name="jurisdiction" value={formData.jurisdiction} onChange={handleInputChange} placeholder={t.f_jur} className={inputClass} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input required type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder={t.f_cp} className={inputClass} />
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.f_email} className={inputClass} />
                        </div>
                        <button type="button" onClick={() => setStep(2)} className="w-full mt-8 bg-white/5 border border-white/10 hover:bg-oxo-purple text-white font-bold py-4 rounded-xl transition-colors">
                            Next Step →
                        </button>
                    </div>
                )}

                {/* STEP 2 — Settlement Details + Submit */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <input required type="text" name="asset" value={formData.asset} onChange={handleInputChange} placeholder={t.f_asset} className={inputClass} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input required type="text" name="ticketSize" value={formData.ticketSize} onChange={handleInputChange} placeholder={t.f_size} className={inputClass} />
                            <input required type="text" name="volume" value={formData.volume} onChange={handleInputChange} placeholder={t.f_vol} className={inputClass} />
                        </div>
                        <div className="space-y-4 mt-2 bg-[#05050A] p-6 rounded-xl border border-white/5">
                            <CheckboxField name="needsBtcToUsdt" checked={formData.needsBtcToUsdt} label={t.f_check1} />
                            <CheckboxField name="acceptsMultiChain" checked={formData.acceptsMultiChain} label={t.f_check2} />
                        </div>

                        {/* Consent — moved from old step 3 */}
                        <label className="flex items-start gap-4 cursor-pointer group bg-[#05050A] p-5 rounded-xl border border-white/5">
                            <div className="relative flex items-center mt-1">
                                <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="peer w-6 h-6 appearance-none border border-gray-600 rounded bg-transparent checked:bg-oxo-purple checked:border-oxo-purple transition-all cursor-pointer" />
                                <svg className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-white left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-white transition-colors">{t.f_agree}</span>
                        </label>

                        <div className="flex gap-4 mt-8">
                            <button type="button" disabled={isSubmitting} onClick={() => setStep(1)} className="w-1/3 bg-transparent border border-white/10 text-gray-400 font-bold py-4 rounded-xl hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50">← Back</button>
                            <button type="submit" disabled={isSubmitting} className="w-2/3 bg-oxo-purple text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(108,63,255,0.4)] hover:bg-[#5a33db] hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center gap-2">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2"><div className="spinner" /> {t.btn_submitting}</span>
                                ) : t.btn_submit}
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {/* Lock icon bottom note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-600 relative z-10">
                <LockIcon className="w-3 h-3" />
                <span>End-to-end encrypted</span>
            </div>
        </div>
    );
}
