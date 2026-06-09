import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formState, setFormState] = useState('idle'); // Options: idle, submitting, success
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;
        
        setFormState('submitting');
        // Simulate API request lifecycle execution latency
        setTimeout(() => {
        setFormState('success');
        }, 1800);
    };

    const formFields = [
        { id: 'name', label: 'Name', type: 'text', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { id: 'message', label: 'Message Text', type: 'textarea', required: true }
    ];

    return (
        <section className="w-full bg-bg-dark-1 py-32 px-6 lg:px-24 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Information Meta Node Block Left */}
            <div>
            <span className="block text-logo-darkblue font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-4">
                // CONNECT INTERFACE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-text-white uppercase tracking-tight leading-none">
                Architect Your <br />
                <span className="text-logo-lightblue">Ecosystem</span><span className="text-logo-lightyellow">.</span>
            </h2>
            <p className="text-text-gray mt-6 max-w-sm leading-relaxed text-sm md:text-base">
                Reach out to our global coordination framework nodes. Let us design production scaling structures tailored to your operational realities.
            </p>

            <div className="mt-12 space-y-4 font-mono text-xs text-text-gray" aria-label="Corporate Contact Coordinates">
                <p>EMAIL: communications@qiyamventures.io</p>
                <p>phone: 123456789</p>
            </div>
            </div>

            {/* Structural Form Interface Grid Container Right */}
            <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-xl p-8 lg:p-12 backdrop-blur-md shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
                {formState !== 'success' ? (
                <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                    exit={{ opacity: 0, scale: 0.95 }}
                >
                    {formFields.map((field) => (
                    <div key={field.id} className="relative w-full">
                        <label 
                        htmlFor={field.id}
                        className={`absolute left-0 transition-all duration-300 font-medium pointer-events-none text-xs uppercase tracking-wider ${
                            focusedField === field.id || formData[field.id]
                            ? '-top-4 text-accent-cyan text-[10px]'
                            : 'top-2 text-text-gray'
                        }`}
                        >
                        {field.label} {field.required && <span className="text-logo-lightyellow">*</span>}
                        </label>

                        {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            required={field.required}
                            rows={3}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                        />
                        ) : (
                        <input
                            id={field.id}
                            type={field.type}
                            required={field.required}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-text-white focus:outline-none focus:border-accent-cyan transition-colors"
                        />
                        )}
                    </div>
                    ))}

                    <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full relative py-4 bg-white text-bg-dark-1 uppercase tracking-widest font-semibold text-xs rounded transition-all duration-300 hover:bg-accent-cyan hover:text-bg-dark-1 disabled:opacity-50"
                    >
                    {formState === 'submitting' ? 'Processing Matrix...' : 'Transmit Requirements'}
                    </button>
                </motion.form>
                ) : (
                // Physics-inspired Success Overlay State
                <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                >
                    <div className="w-16 h-16 rounded-full border border-accent-cyan flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <h4 className="font-display font-black text-xl text-text-white uppercase">Transmission Received</h4>
                    <p className="text-text-gray text-xs max-w-xs mt-2 leading-relaxed">
                    Your node telemetry parameters have successfully updated on our active communication streams.
                    </p>
                </motion.div>
                )}
            </AnimatePresence>
            </div>

        </div>
        </section>
    );
}