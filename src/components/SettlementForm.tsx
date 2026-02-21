import { useState } from 'react';
import type { Dict } from '../lib/dict';
import { CheckIcon } from './Icons';

interface Props {
    t: Dict;
}

const initialFormState = {
    companyName: '', website: '', jurisdiction: '', contactName: '', email: '',
    ticketSize: '', volume: '', integration: '',
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
            alert('Terjadi kesalahan. Coba lagi atau hubungi developer@oxo.so');
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
    const selectClass = `${inputClass} appearance-none cursor-pointer`;

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

    return (
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="bento-glow" />

            {/* Stepper */}
            <div className="flex items-center mb-10 relative z-10">
                <div className="absolute left-0 right-0 top-5 h-px bg-white/10 -z-10" />
                {[1, 2].map(s => (
                    <div key={s} className="flex-1 flex flex-col items-center gap-2">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-display font-bold text-sm transition-all duration-300 ${step >= s ? 'bg-oxo-purple text-white shadow-[0_0_15px_rgba(108,63,255,0.6)]' : 'bg-[#05050A] border border-white/10 text-gray-600'}`}>{s}</div>
                        <span className={`text-xs font-semibold tracking-widest uppercase transition-colors ${step >= s ? 'text-oxo-lightpurple' : 'text-gray-600'}`}>
                            {s === 1 ? t.form_step1 : t.form_step2}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
                {/* STEP 1 — Company Info */}
                {step === 1 && (
                    <div className="space-y-5 animate-fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder={t.f_name} className={inputClass} />
                            <input required type="text" name="website" value={formData.website} onChange={handleInputChange} placeholder={t.f_web} className={inputClass} />
                        </div>
                        <input required type="text" name="jurisdiction" value={formData.jurisdiction} onChange={handleInputChange} placeholder={t.f_jur} className={inputClass} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input required type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder={t.f_cp} className={inputClass} />
                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.f_email} className={inputClass} />
                        </div>
                        <button type="button" onClick={() => setStep(2)} className="w-full mt-4 bg-white/5 border border-white/10 hover:bg-oxo-purple text-white font-bold py-4 rounded-xl transition-colors">
                            Next →
                        </button>
                    </div>
                )}

                {/* STEP 2 — Settlement Needs */}
                {step === 2 && (
                    <div className="space-y-5 animate-fade-in-up">

                        {/* Ticket Size dropdown */}
                        <div className="relative">
                            <select required name="ticketSize" value={formData.ticketSize} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled className="text-gray-500">{t.f_size}</option>
                                <option value="<0.5 BTC">{t.f_size_opt1}</option>
                                <option value="0.5-2 BTC">{t.f_size_opt2}</option>
                                <option value="2-10 BTC">{t.f_size_opt3}</option>
                                <option value="10+ BTC">{t.f_size_opt4}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        {/* Volume dropdown */}
                        <div className="relative">
                            <select required name="volume" value={formData.volume} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled className="text-gray-500">{t.f_vol}</option>
                                <option value="<50k">{t.f_vol_opt1}</option>
                                <option value="50k-200k">{t.f_vol_opt2}</option>
                                <option value="200k-1M">{t.f_vol_opt3}</option>
                                <option value="1M+">{t.f_vol_opt4}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        {/* Integration dropdown */}
                        <div className="relative">
                            <select required name="integration" value={formData.integration} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled className="text-gray-500">{t.f_integration}</option>
                                <option value="API">{t.f_int_opt1}</option>
                                <option value="Dashboard">{t.f_int_opt2}</option>
                                <option value="Both">{t.f_int_opt3}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        {/* Consent */}
                        <label className="flex items-start gap-4 cursor-pointer group bg-[#05050A] p-5 rounded-xl border border-white/5 mt-2">
                            <div className="relative flex items-center mt-0.5 flex-shrink-0">
                                <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="peer w-6 h-6 appearance-none border border-gray-600 rounded bg-transparent checked:bg-oxo-purple checked:border-oxo-purple transition-all cursor-pointer" />
                                <svg className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-white left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-white transition-colors">{t.f_agree}</span>
                        </label>

                        <div className="flex gap-4 mt-4">
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
        </div>
    );
}
