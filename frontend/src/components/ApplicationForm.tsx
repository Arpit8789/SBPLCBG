'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export default function ApplicationForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    budget: '',
    landAvailability: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '', phone: '', email: '', location: '',
          budget: '', landAvailability: '', message: ''
        });
      } else {
        setStatus('error');
        setErrorMsg(data.errors?.[0]?.msg || data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Unable to connect. Please try again later.');
    }
  };

  return (
    <section id="apply" className="section-padding section-divider relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-transparent to-green-950/20" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/5 blur-[150px]" />
      </div>

      <div className="grid-container relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-stack max-w-xl"
          >
            <div className="section-label">Partner with SBIPL</div>
            <h2 className="section-title">
              Start Your <span className="gradient-text-gold">Fuel Business</span> Today
            </h2>
            <div className="gradient-line" />

            <p className="text-[18px] leading-[1.9] text-green-100/55">
              Take the first step toward building your own multi-energy fuel business with
              <strong className="text-green-300"> Shivay BioIndhan Pvt Ltd</strong>. Fill out the application form and our team will contact you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                'Dedicated relationship manager assigned',
                'Free feasibility study for your location',
                'Detailed ROI projection report',
                'Transparent commercial discussion with no hidden charges',
                'End-to-end setup support by SBIPL',
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/15">
                    <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[16px] leading-[1.8] text-green-100/55">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-[28px] p-7 glow-border">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-[12px] font-bold uppercase tracking-[0.12em] text-yellow-300">
                  Fast
                </div>
                <div className="space-y-2">
                  <h4 className="text-[18px] font-bold text-yellow-400/85" style={{ fontFamily: 'Outfit' }}>
                    Limited Territories Available
                  </h4>
                  <p className="text-[15px] leading-[1.8] text-green-100/45">
                    SBIPL is onboarding partners in select locations. Applying early gives your territory a better chance of staying open.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className="glass-card rounded-[30px] p-10 text-center glow-border md:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-[14px] font-bold uppercase tracking-[0.12em] text-green-300">
                  Done
                </div>
                <h3 className="mb-4 text-3xl font-bold text-green-300" style={{ fontFamily: 'Outfit' }}>
                  Application Submitted
                </h3>
                <p className="mb-6 text-[16px] leading-[1.9] text-green-100/55">
                  Thank you for your interest in Shivay BioIndhan. Our partnership team will review your application and contact you within <strong className="text-green-300">24 hours</strong>.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-[30px] p-8 glow-border md:p-10">
                <div className="mb-8 space-y-2">
                  <h3 className="text-[28px] font-bold text-green-200" style={{ fontFamily: 'Outfit' }}>
                    Partnership Application
                  </h3>
                  <p className="text-[14px] text-green-400/45">
                    All fields marked with * are required.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="form-label" htmlFor="form-name">Full Name *</label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="form-phone">Phone Number *</label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="form-email">Email Address *</label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="form-location">Preferred Location / City *</label>
                    <input
                      id="form-location"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="City, State"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="form-budget">Investment Budget *</label>
                      <select
                        id="form-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select budget range</option>
                        <option value="50L - 1Cr">INR 50 Lakhs - INR 1 Crore</option>
                        <option value="1Cr - 1.5Cr">INR 1 Crore - INR 1.5 Crore</option>
                        <option value="1.5Cr - 2Cr">INR 1.5 Crore - INR 2 Crore</option>
                        <option value="2Cr - 5Cr">INR 2 Crore - INR 5 Crore</option>
                        <option value="5Cr+">INR 5 Crore+</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="form-land">Land Availability *</label>
                      <select
                        id="form-land"
                        name="landAvailability"
                        value={formData.landAvailability}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select availability</option>
                        <option value="Yes - Own Land">Yes - Own Land</option>
                        <option value="Yes - Leased">Yes - Leased</option>
                        <option value="No - Need Assistance">No - Need Assistance</option>
                        <option value="Under Negotiation">Under Negotiation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="form-message">Message (Optional)</label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell us about your investment goals, previous experience, or any questions..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary mt-2 w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Start Your Fuel Business'
                    )}
                  </button>

                  <p className="text-center text-[12px] leading-[1.8] text-green-400/30">
                    By submitting, you agree to be contacted by Shivay BioIndhan Pvt Ltd regarding partnership opportunities.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
