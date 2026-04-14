'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API = 'http://localhost:5000/api';

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  budget: string;
  landAvailability: string;
  message?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface Analytics {
  overview: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    approvedLeads: number;
    rejectedLeads: number;
    conversionRate: string;
  };
  budgetBreakdown: { _id: string; count: number }[];
  locationBreakdown: { _id: string; count: number }[];
}

interface Pagination {
  total: number;
  page: number;
  pages: number;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  negotiation: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, pages: 0 });
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads'>('dashboard');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Check stored token
  useEffect(() => {
    const stored = localStorage.getItem('sbpl_admin_token');
    if (stored) setToken(stored);
  }, []);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('sbpl_admin_token', data.token);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch {
      setLoginError('Cannot connect to server. Make sure backend is running.');
    }
    setLoginLoading(false);
  };

  // Fetch leads
  const fetchLeads = useCallback(async (page = 1) => {
    if (!token) return;
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (filterStatus) params.set('status', filterStatus);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`${API}/leads?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads);
        setPagination(data.pagination);
      }
    } catch { /* ignore */ }
  }, [token, filterStatus, searchQuery]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setAnalytics(data);
    } catch { /* ignore */ }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchLeads();
      fetchAnalytics();
    }
  }, [token, fetchLeads, fetchAnalytics]);

  // Update lead status
  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API}/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchLeads(pagination.page);
      fetchAnalytics();
      if (selectedLead?._id === id) {
        setSelectedLead(prev => prev ? { ...prev, status } : null);
      }
    } catch { /* ignore */ }
  };

  // Logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('sbpl_admin_token');
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-green-600/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-green-400/5 blur-[120px]" />
        
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row relative z-10 items-stretch gap-6">
          {/* Left Side: Branding / Visual */}
          <div className="hidden md:flex flex-1 flex-col justify-between p-12 glass-card border-none bg-gradient-to-br from-green-950/40 to-black/60 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/frames/ezgif-frame-010.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-white text-2xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                SB
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-['Outfit']">
                Secure Access <br />
                <span className="text-green-400">Portal</span>
              </h2>
              <p className="text-green-100/60 max-w-sm">
                Managing India's fastest-growing multi-energy infrastructure network.
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-4 text-xs font-semibold text-green-400/50 uppercase tracking-widest">
              <span>Shivay BioIndhan Pvt Ltd</span>
              <span className="w-1 h-1 rounded-full bg-green-500/50" />
              <span>System</span>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto p-8 lg:p-12 glass-card rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="text-center md:text-left mb-10">
              <div className="md:hidden w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center font-bold text-white text-xl mx-auto mb-6">
                SB
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 font-['Outfit']">
                Welcome Back
              </h1>
              <p className="text-sm text-green-100/50">Enter your credentials to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="form-label" htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@sbpl.in"
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary w-full disabled:opacity-50 mt-4 !py-4 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center md:text-left">
            <a href="/" className="inline-flex items-center gap-2 text-sm text-green-500/40 hover:text-green-400 transition-colors">
              <span>←</span> Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div className="glass border-b border-green-800/20 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center font-bold text-white text-xs" style={{ fontFamily: 'Outfit' }}>
              SB
            </div>
            <div>
              <h1 className="text-sm font-bold text-green-300" style={{ fontFamily: 'Outfit' }}>SBPL Admin</h1>
              <p className="text-[10px] text-green-500/40">Shivay BioIndhan Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-green-900/20 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-green-500/20 text-green-300'
                    : 'text-green-500/40 hover:text-green-300'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'leads'
                    ? 'bg-green-500/20 text-green-300'
                    : 'text-green-500/40 hover:text-green-300'
                }`}
              >
                📋 Leads
              </button>
            </div>
            <button onClick={handleLogout} className="text-sm text-red-400/60 hover:text-red-400 transition-colors ml-4">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && analytics && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: 'Total Leads', value: analytics.overview.totalLeads, color: 'text-green-400' },
                { label: 'New', value: analytics.overview.newLeads, color: 'text-blue-400' },
                { label: 'Contacted', value: analytics.overview.contactedLeads, color: 'text-yellow-400' },
                { label: 'Qualified', value: analytics.overview.qualifiedLeads, color: 'text-purple-400' },
                { label: 'Approved', value: analytics.overview.approvedLeads, color: 'text-green-400' },
                { label: 'Conversion', value: `${analytics.overview.conversionRate}%`, color: 'text-emerald-400' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: 'Outfit' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-green-300/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget breakdown */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-sm font-semibold text-green-300 mb-4">Leads by Budget</h3>
                {analytics.budgetBreakdown.length === 0 ? (
                  <p className="text-sm text-green-500/30">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.budgetBreakdown.map((item) => (
                      <div key={item._id} className="flex items-center justify-between">
                        <span className="text-sm text-green-100/50">{item._id}</span>
                        <span className="text-sm font-semibold text-green-400">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location breakdown */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-sm font-semibold text-green-300 mb-4">Top Locations</h3>
                {analytics.locationBreakdown.length === 0 ? (
                  <p className="text-sm text-green-500/30">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.locationBreakdown.map((item) => (
                      <div key={item._id} className="flex items-center justify-between">
                        <span className="text-sm text-green-100/50">{item._id}</span>
                        <span className="text-sm font-semibold text-green-400">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchLeads(1)}
                placeholder="Search by name, email, phone..."
                className="form-input max-w-xs !py-2.5"
              />
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); }}
                className="form-select max-w-[200px] !py-2.5"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="negotiation">Negotiation</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => fetchLeads(1)}
                className="btn-primary !py-2.5 !px-6 !text-sm"
              >
                Search
              </button>
            </div>

            {/* Leads table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-800/20">
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Name</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Contact</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Location</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Budget</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Date</th>
                      <th className="text-left p-4 text-xs font-semibold text-green-400/60 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-green-500/30">
                          No leads found. Applications from the website will appear here.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead._id} className="border-b border-green-800/10 hover:bg-green-500/5 transition-colors">
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="text-sm font-medium text-green-200 hover:text-green-400 transition-colors"
                            >
                              {lead.name}
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="text-xs text-green-100/50">{lead.email}</div>
                            <div className="text-xs text-green-100/30">{lead.phone}</div>
                          </td>
                          <td className="p-4 text-sm text-green-100/50">{lead.location}</td>
                          <td className="p-4 text-sm text-green-300 font-medium">{lead.budget}</td>
                          <td className="p-4">
                            <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[lead.status] || ''}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-green-500/40">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                              className="text-xs bg-green-900/20 border border-green-800/20 rounded-lg px-2 py-1 text-green-300 outline-none"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="negotiation">Negotiation</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-green-800/20">
                  <span className="text-sm text-green-500/40">
                    Showing {leads.length} of {pagination.total} leads
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchLeads(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="btn-secondary !py-1.5 !px-4 !text-xs disabled:opacity-30"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => fetchLeads(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="btn-secondary !py-1.5 !px-4 !text-xs disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLead(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 rounded-2xl w-full max-w-lg glow-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-200" style={{ fontFamily: 'Outfit' }}>
                  Lead Details
                </h2>
                <button onClick={() => setSelectedLead(null)} className="text-green-500/40 hover:text-green-300 text-lg">✕</button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Name', value: selectedLead.name },
                  { label: 'Email', value: selectedLead.email },
                  { label: 'Phone', value: selectedLead.phone },
                  { label: 'Location', value: selectedLead.location },
                  { label: 'Budget', value: selectedLead.budget },
                  { label: 'Land', value: selectedLead.landAvailability },
                  { label: 'Status', value: selectedLead.status },
                  { label: 'Message', value: selectedLead.message || '—' },
                  { label: 'Applied', value: new Date(selectedLead.createdAt).toLocaleString('en-IN') },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-xs text-green-400/50 w-20 flex-shrink-0 mt-0.5 uppercase tracking-wider">{label}</span>
                    <span className="text-sm text-green-100/70">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-green-800/20">
                <label className="form-label">Update Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead._id, e.target.value)}
                  className="form-select"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
