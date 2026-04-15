'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

/* ─── Land‑requirement data ─── */
const landData = [
  { road: 'PMGSY & MMGSY', size: '70 Feet × 70 Feet' },
  { road: 'RWD, PWD, MDR, SH', size: '115 Feet × 115 Feet' },
  { road: '4‑Lane / 6‑Lane', size: '115 Feet × 115 Feet' },
  { road: 'Town', size: '70 Feet × 70 Feet' },
];

/* ─── Documents‑required checklist ─── */
const documentList = [
  'Aadhaar Card',
  'PAN Card',
  'Passport‑size Photos (6 pcs)',
  'Nazri Naksa',
  'Mauza Map',
  'Electric Bill',
  'Land Registry Deed',
  'Land Current Receipt',
  'LPC (Last Paid Certificate)',
  'Land NOC',
  'ITR (1 Year)',
  'Bank Statement (1 Year)',
  '₹1000 Non‑Judicial Stamp Paper (1 pc)',
];

export default function ApplicationForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    budget: '',
    landAvailability: '',
    landType: '',
    aadharNo: '',
    panNo: '',
    landArea: '',
    roadType: '',
    leaseDuration: '',
    itrYear: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
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
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '', phone: '', email: '', location: '', budget: '',
          landAvailability: '', landType: '', aadharNo: '', panNo: '',
          landArea: '', roadType: '', leaseDuration: '', itrYear: '', message: '',
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

  /* ─── Shared animation ─── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay },
  });

  return (
    <section id="apply" className="apply-section" ref={ref}>
      {/* Decorative background */}
      <div className="apply-bg">
        <div className="apply-bg__line" />
        <div className="apply-bg__gradient" />
        <div className="apply-bg__orb" />
      </div>

      <div className="grid-container apply-wrapper">

        {/* ╔═══════════════════════════════════════╗
           ║  LEFT — Info + Land Req + Doc list    ║
           ╚═══════════════════════════════════════╝ */}
        <motion.div {...fadeUp()} className="apply-info">
          {/* Header */}
          <div className="section-label">Partner with SBPL</div>
          <h2 className="section-title">
            Start Your <span className="gradient-text-gold">Fuel Business</span> Today
          </h2>
          <div className="gradient-line" />

          <p className="apply-info__desc">
            Take the first step toward building your own multi-energy fuel business with
            <strong className="text-green-300"> Shivay BioIndhan Pvt Ltd</strong>. Fill out the
            application form and our team will contact you within 24 hours.
          </p>

          {/* Benefits */}
          <div className="apply-benefits">
            {[
              'Dedicated relationship manager assigned',
              'Free feasibility study for your location',
              'Detailed ROI projection report',
              'Transparent commercial discussion — no hidden charges',
              'End‑to‑end setup support by SBPL',
            ].map((b) => (
              <div key={b} className="apply-benefit">
                <span className="apply-benefit__icon">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="apply-benefit__text">{b}</span>
              </div>
            ))}
          </div>

          {/* ── Land Requirement Table ── */}
          <motion.div {...fadeUp(0.15)} className="apply-card">
            <h3 className="apply-card__title">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.447-1.894L9 1m0 0l6 3m-6-3v18m6-15l5.447 2.724A2 2 0 0121 8.618v9.764a2 2 0 01-1.447 1.894L15 23m0-18v18" />
              </svg>
              Land Required
            </h3>
            <div className="apply-table-wrap">
              <table className="apply-table">
                <thead>
                  <tr>
                    <th>Road Type</th>
                    <th>Required Land Size</th>
                  </tr>
                </thead>
                <tbody>
                  {landData.map((r) => (
                    <tr key={r.road}>
                      <td>{r.road}</td>
                      <td className="apply-table__highlight">{r.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Important Notes */}
            <div className="apply-notes">
              <h4 className="apply-notes__head">Important Guidelines</h4>
              <ul className="apply-notes__list">
                <li>पंप वाली जमीन के <strong>300 मीटर</strong> के अंदर कोई भी दूसरा पंप, intersection / branch रोड, या डिवाइडर का कट नहीं होना चाहिए।</li>
                <li>300m के अन्दर <strong>फ्लाई ओवर ब्रिज का स्टार्ट</strong> नहीं होना चाहिए।</li>
                <li><strong>4‑Lane / 6‑Lane:</strong> दूसरा पंप 1 km के बाद होना चाहिए।</li>
                <li><strong>Toll Plaza & Railway Crossing:</strong> 1 km की दूरी के बाद होना चाहिए।</li>
                <li>अगर intersection रोड है तो उस road की चौड़ाई <strong>5.50 मीटर</strong> से अधिक नहीं होनी चाहिए (NH पर <strong>3.0 मीटर</strong> से अधिक नहीं)।</li>
                <li>If on <strong>lease</strong>, minimum duration must be <strong>19 Years 11 Months</strong>.</li>
              </ul>
            </div>
          </motion.div>

          {/* ── Documents Required ── */}
          <motion.div {...fadeUp(0.25)} className="apply-card">
            <h3 className="apply-card__title">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documents Required
            </h3>
            <div className="apply-doc-grid">
              {documentList.map((doc, i) => (
                <div key={doc} className="apply-doc-item">
                  <span className="apply-doc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div {...fadeUp(0.35)} className="glass-card rounded-[28px] p-7 glow-border">
            <div className="flex items-start gap-4">
              <div className="apply-fast-badge">Fast</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h4 className="apply-cta-title">Limited Territories Available</h4>
                <p className="apply-cta-desc">
                  SBPL is onboarding partners in select locations. Applying early gives your
                  territory a better chance of staying open.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ╔═══════════════════════════════════════╗
           ║  RIGHT — The Application Form         ║
           ╚═══════════════════════════════════════╝ */}
        <motion.div {...fadeUp(0.2)} className="apply-form-col">
          {status === 'success' ? (
            <div className="apply-success glass-card glow-border">
              <div className="apply-success__icon">✓</div>
              <h3 className="apply-success__title">Application Submitted</h3>
              <p className="apply-success__desc">
                Thank you for your interest in Shivay BioIndhan. Our partnership team will review
                your application and contact you within <strong>24 hours</strong>.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ marginTop: 12 }}>
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="apply-form glass-card glow-border">
              <div className="apply-form__header">
                <h3 className="apply-form__title">Partnership Application</h3>
                <p className="apply-form__sub">All fields marked with * are required.</p>
              </div>

              {/* ── Section: Personal Details ── */}
              <fieldset className="apply-fieldset">
                <legend className="apply-legend">Personal Details</legend>

                <div className="apply-field-full">
                  <label className="form-label" htmlFor="form-name">Full Name *</label>
                  <input id="form-name" type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Enter your full name" />
                </div>

                <div className="apply-field-row">
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-phone">Phone Number *</label>
                    <input id="form-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-email">Email Address *</label>
                    <input id="form-email" type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="apply-field-row">
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-aadhar">Aadhaar Number *</label>
                    <input id="form-aadhar" type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required className="form-input" placeholder="XXXX XXXX XXXX" maxLength={14} />
                  </div>
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-pan">PAN Number *</label>
                    <input id="form-pan" type="text" name="panNo" value={formData.panNo} onChange={handleChange} required className="form-input" placeholder="ABCDE1234F" maxLength={10} style={{ textTransform: 'uppercase' }} />
                  </div>
                </div>
              </fieldset>

              {/* ── Section: Location & Land ── */}
              <fieldset className="apply-fieldset">
                <legend className="apply-legend">Location & Land Details</legend>

                <div className="apply-field-full">
                  <label className="form-label" htmlFor="form-location">Preferred Location / City *</label>
                  <input id="form-location" type="text" name="location" value={formData.location} onChange={handleChange} required className="form-input" placeholder="City, District, State" />
                </div>

                <div className="apply-field-row">
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-roadType">Road Type *</label>
                    <select id="form-roadType" name="roadType" value={formData.roadType} onChange={handleChange} required className="form-select">
                      <option value="">Select road type</option>
                      <option value="PMGSY & MMGSY">PMGSY & MMGSY</option>
                      <option value="RWD / PWD / MDR / SH">RWD / PWD / MDR / SH</option>
                      <option value="4-Lane / 6-Lane">4‑Lane / 6‑Lane</option>
                      <option value="Town">Town</option>
                      <option value="NH">National Highway (NH)</option>
                    </select>
                  </div>
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-landArea">Land Area (in Feet) *</label>
                    <input id="form-landArea" type="text" name="landArea" value={formData.landArea} onChange={handleChange} required className="form-input" placeholder="e.g. 70 × 70 or 115 × 115" />
                  </div>
                </div>

                <div className="apply-field-row">
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-land">Land Availability *</label>
                    <select id="form-land" name="landAvailability" value={formData.landAvailability} onChange={handleChange} required className="form-select">
                      <option value="">Select availability</option>
                      <option value="Yes - Own Land">Yes — Own Land</option>
                      <option value="Yes - Leased">Yes — Leased</option>
                      <option value="No - Need Assistance">No — Need Assistance</option>
                      <option value="Under Negotiation">Under Negotiation</option>
                    </select>
                  </div>
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-landType">Land Ownership Type</label>
                    <select id="form-landType" name="landType" value={formData.landType} onChange={handleChange} className="form-select">
                      <option value="">Select type</option>
                      <option value="Self Owned">Self Owned</option>
                      <option value="Family Owned">Family Owned</option>
                      <option value="Leased (19yr+)">Leased (Min. 19 Yr 11 Mo)</option>
                      <option value="Government Land">Government Land</option>
                    </select>
                  </div>
                </div>

                {formData.landAvailability === 'Yes - Leased' && (
                  <div className="apply-field-full">
                    <label className="form-label" htmlFor="form-lease">Lease Duration *</label>
                    <input id="form-lease" type="text" name="leaseDuration" value={formData.leaseDuration} onChange={handleChange} className="form-input" placeholder="e.g. 20 Years (Minimum 19 Yr 11 Mo required)" />
                  </div>
                )}
              </fieldset>

              {/* ── Section: Financial Details ── */}
              <fieldset className="apply-fieldset">
                <legend className="apply-legend">Financial Details</legend>

                <div className="apply-field-row">
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-budget">Investment Budget *</label>
                    <select id="form-budget" name="budget" value={formData.budget} onChange={handleChange} required className="form-select">
                      <option value="">Select budget range</option>
                      <option value="50L - 1Cr">₹50 Lakhs – ₹1 Crore</option>
                      <option value="1Cr - 1.5Cr">₹1 Crore – ₹1.5 Crore</option>
                      <option value="1.5Cr - 2Cr">₹1.5 Crore – ₹2 Crore</option>
                      <option value="2Cr - 5Cr">₹2 Crore – ₹5 Crore</option>
                      <option value="5Cr+">₹5 Crore+</option>
                    </select>
                  </div>
                  <div className="apply-field">
                    <label className="form-label" htmlFor="form-itr">ITR Filed For (Year)</label>
                    <input id="form-itr" type="text" name="itrYear" value={formData.itrYear} onChange={handleChange} className="form-input" placeholder="e.g. 2024‑25" />
                  </div>
                </div>
              </fieldset>

              {/* ── Section: Message ── */}
              <fieldset className="apply-fieldset">
                <legend className="apply-legend">Additional Information</legend>
                <div className="apply-field-full">
                  <label className="form-label" htmlFor="form-message">Message (Optional)</label>
                  <textarea id="form-message" name="message" value={formData.message} onChange={handleChange} rows={4} className="form-input apply-textarea" placeholder="Tell us about your investment goals, previous experience, or any questions…" />
                </div>
              </fieldset>

              {status === 'error' && (
                <div className="apply-error">{errorMsg}</div>
              )}

              <button type="submit" disabled={status === 'submitting'} className="apply-submit btn-primary">
                {status === 'submitting' ? (
                  <span className="apply-spinner-wrap">
                    <span className="apply-spinner" />
                    Submitting…
                  </span>
                ) : (
                  'Start Your Fuel Business'
                )}
              </button>

              <p className="apply-disclaimer">
                By submitting, you agree to be contacted by Shivay BioIndhan Pvt Ltd regarding partnership opportunities.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
