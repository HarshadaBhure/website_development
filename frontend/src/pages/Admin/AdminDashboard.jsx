import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Inbox, Briefcase, Layers, Users, LogOut, RefreshCw, Eye, ShieldCheck, Search, Filter, Trash2, X, MessageSquare, Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/Common/SEO';
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import { 
  fetchAdminInquiries, updateInquiryStatus, deleteInquiry, 
  fetchAdminApplications, fetchServices, fetchJobs 
} from '../../services/api';

export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  // Modals state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [inqData, appData, srvData, jobData] = await Promise.all([
        fetchAdminInquiries(),
        fetchAdminApplications(),
        fetchServices(),
        fetchJobs(),
      ]);
      setInquiries(inqData);
      setApplications(appData);
      setServices(srvData);
      setJobs(jobData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prev => prev.map(item => item.id === inquiryId ? { ...item, status: newStatus } : item));
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!deleteConfirmId) return;
    setDeleting(true);
    try {
      await deleteInquiry(deleteConfirmId);
      setInquiries(prev => prev.filter(item => item.id !== deleteConfirmId));
      if (selectedInquiry?.id === deleteConfirmId) {
        setSelectedInquiry(null);
      }
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      (inq.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.service_interested || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || (inq.source || 'Contact Form') === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // Calculate Statistics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const inProgressInquiries = inquiries.filter(i => i.status === 'In Progress').length;
  const resolvedInquiries = inquiries.filter(i => i.status === 'Resolved' || i.status === 'Closed' || i.status === 'Contacted').length;

  return (
    <>
      <SEO title="Admin Dashboard | Swaraj Asia Technologies" description="Corporate administration dashboard." />

      {/* Header Bar */}
      <section className="py-8 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan text-slate-900 flex items-center justify-center font-bold font-display text-xl shadow-md">
              SA
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
                Executive Management Portal
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">Active Session</span>
              </h1>
              <p className="text-xs text-slate-600">Signed in as <span className="text-slate-900 font-bold">{user?.full_name || user?.username || "Admin"}</span></p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadDashboardData}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Overview Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Enquiries</div>
              <div className="font-display font-bold text-3xl text-slate-900">{totalInquiries}</div>
              <div className="text-[11px] text-slate-500">All submissions</div>
            </div>

            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-1 shadow-2xs">
              <div className="text-amber-800 text-xs font-semibold uppercase tracking-wider">New Enquiries</div>
              <div className="font-display font-bold text-3xl text-amber-900">{newInquiries}</div>
              <div className="text-[11px] text-amber-700">Pending review</div>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-1 shadow-2xs">
              <div className="text-blue-800 text-xs font-semibold uppercase tracking-wider">In Progress</div>
              <div className="font-display font-bold text-3xl text-blue-900">{inProgressInquiries}</div>
              <div className="text-[11px] text-blue-700">Under evaluation</div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-1 shadow-2xs">
              <div className="text-emerald-800 text-xs font-semibold uppercase tracking-wider">Resolved</div>
              <div className="font-display font-bold text-3xl text-emerald-900">{resolvedInquiries}</div>
              <div className="text-[11px] text-emerald-700">Completed</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-brand-cyan text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Inbox className="w-4 h-4 text-slate-900" />
              <span>Enquiries & Leads ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'applications'
                  ? 'bg-brand-cyan text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-slate-900" />
              <span>Job Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'services'
                  ? 'bg-brand-cyan text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-900" />
              <span>Service Practices ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'jobs'
                  ? 'bg-brand-cyan text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-900" />
              <span>Active Job Openings ({jobs.length})</span>
            </button>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div>
              {/* TAB 1: ENQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {/* Search and Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search by name, email, company, subject, or service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-cyan"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Filter className="w-3.5 h-3.5" />
                        <span>Status:</span>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-white border border-slate-200 text-xs text-slate-900 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium"
                        >
                          <option value="All">All Statuses</option>
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span>Source:</span>
                        <select
                          value={sourceFilter}
                          onChange={(e) => setSourceFilter(e.target.value)}
                          className="bg-white border border-slate-200 text-xs text-slate-900 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium"
                        >
                          <option value="All">All Sources</option>
                          <option value="Contact Form">Contact Form</option>
                          <option value="Chatbot">Chatbot</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  {filteredInquiries.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-500 border border-slate-200">No enquiries found matching your search or filters.</div>
                  ) : (
                    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3.5">Source & ID</th>
                            <th className="px-4 py-3.5">Name</th>
                            <th className="px-4 py-3.5">Email & Phone</th>
                            <th className="px-4 py-3.5">Company / Practice</th>
                            <th className="px-4 py-3.5">Subject & Message</th>
                            <th className="px-4 py-3.5">Date</th>
                            <th className="px-4 py-3.5">Status</th>
                            <th className="px-4 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredInquiries.map((inq) => {
                            const isChatbot = inq.source === 'Chatbot';
                            return (
                              <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3.5">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                                      isChatbot ? 'bg-cyan-100 text-slate-900 border border-cyan-300' : 'bg-slate-100 text-slate-900 border border-slate-200'
                                    }`}>
                                      {isChatbot ? <MessageSquare className="w-3 h-3 text-brand-cyan" /> : <Mail className="w-3 h-3 text-brand-pink" />}
                                      {inq.source || 'Contact Form'}
                                    </span>
                                    <span className="text-slate-400 font-mono">#{inq.id}</span>
                                  </div>
                                </td>

                                <td className="px-4 py-3.5 font-bold text-slate-900">{inq.full_name}</td>

                                <td className="px-4 py-3.5">
                                  <a href={`mailto:${inq.email}`} className="text-slate-900 hover:text-brand-cyan hover:underline font-semibold">{inq.email}</a>
                                  <div className="text-[11px] text-slate-500">{inq.phone || "N/A"}</div>
                                </td>

                                <td className="px-4 py-3.5">
                                  <div className="font-semibold text-slate-900">{inq.company || "Individual / N/A"}</div>
                                  <div className="text-[11px] text-brand-cyan font-bold truncate max-w-[140px]">{inq.service_interested}</div>
                                </td>

                                <td className="px-4 py-3.5 max-w-xs">
                                  <div className="font-bold text-slate-900 truncate">{inq.subject || "No Subject"}</div>
                                  <div className="text-[11px] text-slate-500 truncate">{inq.message}</div>
                                </td>

                                <td className="px-4 py-3.5 text-slate-500 font-medium whitespace-nowrap">
                                  {new Date(inq.created_at).toLocaleDateString()}
                                </td>

                                <td className="px-4 py-3.5">
                                  <select
                                    value={inq.status}
                                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                    className={`text-[11px] font-bold rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer border ${
                                      inq.status === 'New' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                      inq.status === 'In Progress' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                                      'bg-emerald-100 text-emerald-900 border-emerald-300'
                                    }`}
                                  >
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                  </select>
                                </td>

                                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => setSelectedInquiry(inq)}
                                      title="View Details"
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-cyan text-slate-700 hover:text-slate-900 transition-colors"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-slate-900" />
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirmId(inq.id)}
                                      title="Delete Inquiry"
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CANDIDATE APPLICATIONS */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Candidate Applications</h3>
                  {applications.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-500 border border-slate-200">No candidate applications submitted yet.</div>
                  ) : (
                    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3">Applicant Name</th>
                            <th className="px-4 py-3">Email & Phone</th>
                            <th className="px-4 py-3">Job ID</th>
                            <th className="px-4 py-3">LinkedIn URL</th>
                            <th className="px-4 py-3">Cover Letter</th>
                            <th className="px-4 py-3">Applied On</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3.5 font-bold text-slate-900">{app.full_name}</td>
                              <td className="px-4 py-3.5">
                                <div className="font-medium text-slate-900">{app.email}</div>
                                <div className="text-[11px] text-slate-500">{app.phone}</div>
                              </td>
                              <td className="px-4 py-3.5 font-semibold">Position #{app.job_id}</td>
                              <td className="px-4 py-3.5">
                                {app.linkedin_url ? (
                                  <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-brand-cyan font-bold hover:underline">
                                    View Profile
                                  </a>
                                ) : "N/A"}
                              </td>
                              <td className="px-4 py-3.5 max-w-xs truncate text-slate-600">{app.cover_letter || "N/A"}</td>
                              <td className="px-4 py-3.5 text-slate-500 font-medium">{new Date(app.created_at).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Configured Service Practices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((s) => (
                      <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-brand-yellow">{s.category}</span>
                        <h4 className="font-bold text-slate-900 text-base">{s.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{s.short_description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: JOBS */}
              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Active Recruitment Openings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.map((j) => (
                      <div key={j.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                        <div className="flex justify-between">
                          <span className="text-xs font-bold text-brand-pink">{j.department}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{j.location}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{j.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{j.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* DETAIL VIEW MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedInquiry.source === 'Chatbot' ? 'bg-cyan-100 text-slate-900 border border-cyan-300' : 'bg-pink-100 text-brand-pink border border-pink-200'
              }`}>
                Source: {selectedInquiry.source || 'Contact Form'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">ID #{selectedInquiry.id}</span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900">{selectedInquiry.subject || "Enquiry Details"}</h3>
              <p className="text-xs text-slate-500 mt-1">Submitted on {new Date(selectedInquiry.created_at).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block uppercase">Client Name</span>
                <span className="text-slate-900 font-extrabold text-sm">{selectedInquiry.full_name}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block uppercase">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-brand-cyan font-bold text-sm hover:underline">{selectedInquiry.email}</a>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block uppercase">Phone Number</span>
                <span className="text-slate-900 font-semibold text-sm">{selectedInquiry.phone || "N/A"}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block uppercase">Company Name</span>
                <span className="text-slate-900 font-semibold text-sm">{selectedInquiry.company || "N/A"}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="text-slate-500 font-bold uppercase">Practice / Service Interested In</span>
              <div className="text-brand-cyan font-bold text-sm">{selectedInquiry.service_interested}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-slate-500 font-bold uppercase">Message Content</span>
              <div className="text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">{selectedInquiry.message}</div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <span>Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="bg-white border border-slate-300 text-xs text-slate-900 rounded-lg px-3 py-1.5 focus:outline-none font-bold"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="btn-outline px-5 py-2 text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">Delete Enquiry #{deleteConfirmId}?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-outline px-5 py-2.5 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteInquiry}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
