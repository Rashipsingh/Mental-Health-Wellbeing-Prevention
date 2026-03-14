import React, { useState } from 'react';
import PageNavigation from '../../components/layout/PageNavigation';
import { Heart, Send, Star, Calendar, MessageSquare, Pill, BarChart2, BookOpen, Settings, HelpCircle, StarOfLife, CreditCard } from 'lucide-react';
import PaymentHistory from './PaymentHistory';

function UserDashboard({ authUser, onLogout, consultants, appointments, setAppointments, prescriptions, forums, reviews, setReviews, payments }) {
  const [view, setView] = useState("home");
  const [bookingData, setBookingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [reviewForm, setReviewForm] = useState({ consultantId: null, rating: 0, comment: "", hoverRating: 0 });

  const toggleFavorite = (id) => {
    const next = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("favorites", JSON.stringify(next));
  };

  const handleReviewSubmit = (consultantId, consultantName) => {
    if (reviewForm.rating === 0) { alert("Please select a rating."); return; }
    setReviews(prev => [...prev, {
      id: Date.now(), consultantId, consultantName,
      userName: authUser.name || "Anonymous", rating: reviewForm.rating,
      comment: reviewForm.comment, date: new Date().toLocaleDateString(), status: "pending"
    }]);
    setReviewForm({ consultantId: null, rating: 0, comment: "", hoverRating: 0 });
    alert("Review submitted! It will appear after admin approval.");
  };

  const handleBookSelect = (consultant, date, time) => {
    setBookingData({ consultant, date, time });
    setView("payment");
  };

  const handlePaymentSuccess = () => {
    setAppointments([...appointments, { ...bookingData, id: Date.now(), userId: authUser.id, status: "Confirmed" }]);
    alert("Payment Successful! Confirmation sent via Email & WhatsApp.");
    setBookingData(null);
    setView("home");
  };

  const myAppointments = appointments.filter(a => a.userId === authUser.id);
  const myPrescriptions = prescriptions.filter(p => p.userId === authUser.id);
  
  const approvedConsultants = consultants.filter(c => {
    const isApproved = c.status === "Approved";
    const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "All" || c.specialty === specialtyFilter;
    return isApproved && matchesSearch && matchesSpecialty;
  });

  const specialties = ["All", ...new Set(consultants.filter(c => c.status === "Approved").map(c => c.specialty).filter(Boolean))];

  return (
    <div className="d-flex flex-grow-1 fade-in">
      <div className="klues-sidebar-light" style={{ width: "260px", padding: "20px 0" }}>
        <div className="sidebar-logo px-4">
          Klever Klues
        </div>
        <div className={`sidebar-nav-item ${view === "home" ? "active" : ""}`} onClick={() => setView("home")}>
          Overview
        </div>
        <div className={`sidebar-nav-item ${view === "book" ? "active" : ""}`} onClick={() => setView("book")}>
          Book Session
        </div>
        <div className={`sidebar-nav-item ${view === "prescriptions" ? "active" : ""}`} onClick={() => setView("prescriptions")}>
          Prescriptions
        </div>
        <div className={`sidebar-nav-item ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>
          Medical History
        </div>
        <div className={`sidebar-nav-item ${view === "forum" ? "active" : ""}`} onClick={() => setView("forum")}>
          Community
        </div>
        <div className={`sidebar-nav-item ${view === "resources" ? "active" : ""}`} onClick={() => setView("resources")}>
          Resources
        </div>
        <div className={`sidebar-nav-item ${view === "messages" ? "active" : ""}`} onClick={() => setView("messages")}>
          Messages
        </div>
        <div className={`sidebar-nav-item ${view === "reviews" ? "active" : ""}`} onClick={() => setView("reviews")}>
          Reviews
        </div>
        <div className={`sidebar-nav-item ${view === "favorites" ? "active" : ""}`} onClick={() => setView("favorites")}>
          Favorites
        </div>
        <div className={`sidebar-nav-item ${view === "assessments" ? "active" : ""}`} onClick={() => setView("assessments")}>
          Assessments
        </div>
        <div className={`sidebar-nav-item ${view === "payments" ? "active" : ""}`} onClick={() => setView("payments")}>
           Payment History
        </div>
        <div style={{ marginTop: "auto", paddingTop: "40px" }} className="px-3">
          <div className="sidebar-nav-item text-danger fw-bold" onClick={onLogout}>
            Logout
          </div>
        </div>
      </div>

      <div className="layout-main">
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="mb-1 fw-bold" style={{ letterSpacing: "-0.02em" }}>Hello</h2>
            <p className="text-muted m-0">Here is what's happening with your wellbeing today.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              {authUser?.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {view === "home" && (
          <div className="fade-in">
            <h5 className="mb-4 fw-bold">Upcoming Sessions</h5>
            {myAppointments.length === 0 ? (
              <div className="klues-panel text-center py-5">
                <div style={{ fontSize: "3rem", color: "#e2e8f0" }} className="mb-3"></div>
                <h5 className="text-muted">No sessions scheduled</h5>
                <div className="klues-btn-block mt-4">
                  <button className="klues-btn klues-btn-primary" onClick={() => setView("book")}>Book a Consultation</button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {myAppointments.map(appt => (
                  <div className="col-lg-6" key={appt.id}>
                    <div className="klues-panel d-flex flex-column h-100 p-4">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                          <h6 className="fw-bold mb-2">Dr. {appt.consultant.name}</h6>
                          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-semibold">Confirmed</span>
                        </div>
                        <div className="text-end">
                          <div className="text-primary fw-bold text-nowrap">{appt.date}</div>
                          <div className="text-muted small text-nowrap">{appt.time}</div>
                        </div>
                      </div>
                      <button className="klues-btn klues-btn-primary mt-auto w-100" onClick={() => setView(`consult-room-${appt.id}`)}>
                        Enter Secure Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "book" && (
          <div className="fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
              <h5 className="fw-bold m-0">Available Experts</h5>
              <div className="d-flex gap-2">
                <input 
                  type="text" 
                  className="klues-input-light py-2 px-3" 
                  placeholder="Search name or specialty..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: "250px" }}
                />
                <select 
                  className="klues-input-light py-2 px-3" 
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                >
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="row g-4">
              {approvedConsultants.length === 0 ? <p className="text-muted">No specialists available currently.</p> : approvedConsultants.map(c => (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="klues-panel text-center p-4" style={{ position: 'relative' }}>
                    <button 
                      onClick={() => toggleFavorite(c.id)} 
                      style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: favorites.includes(c.id) ? '#ef4444' : '#d1d5db', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title={favorites.includes(c.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={24} fill={favorites.includes(c.id) ? '#ef4444' : 'none'} />
                    </button>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e0e7ff", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}></div>
                    <h5 className="fw-bold">{c.name}</h5>
                    <p className="text-muted small mb-1">{c.specialty || ''}</p>
                    <p className="text-muted small mb-4">{c.qualification}</p>

                    <div className="bg-light p-3 rounded-3 mb-4 text-start mt-auto" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                      <label className="small fw-bold text-muted mb-1">Select Date</label>
                      <input type="date" className="klues-input-light mb-2 py-1 px-2" id={`date-${c.id}`} style={{ background: "white" }} />
                      <label className="small fw-bold text-muted mb-1 mt-2">Select Time</label>
                      <input type="time" className="klues-input-light py-1 px-2" id={`time-${c.id}`} style={{ background: "white" }} />
                    </div>

                    <button className="klues-btn klues-btn-primary w-100 mt-2" onClick={() => {
                      const d = document.getElementById(`date-${c.id}`).value;
                      const t = document.getElementById(`time-${c.id}`).value;
                      if (d && t) handleBookSelect(c, d, t);
                      else alert("Please select date and time");
                    }}>Book & Pay $50</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "payment" && bookingData && (
          <div className="fade-in d-flex justify-content-center w-100 p-4">
            <div className="klues-panel" style={{ width: "100%", maxWidth: "450px" }}>
              <div className="text-center mb-4">
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}></div>
                <h4 className="fw-bold">Secure Checkout</h4>
              </div>
              <div className="bg-light p-3 rounded-3 mb-4" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Consultant</span><span className="fw-bold">Dr. {bookingData.consultant.name}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Date</span><span className="fw-bold">{bookingData.date}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Time</span><span className="fw-bold">{bookingData.time}</span></div>
                <hr className="my-2 border-muted" />
                <div className="d-flex justify-content-between mt-2"><span className="text-muted fw-bold">Total</span><span className="fw-bold text-primary fs-5">$50.00</span></div>
              </div>

              <div className="mb-3"><input type="text" className="klues-input-light" placeholder="Card Number (**** **** **** ****)" /></div>
              <div className="row g-3 mb-5">
                <div className="col-6"><input type="text" className="klues-input-light" placeholder="MM/YY" /></div>
                <div className="col-6"><input type="password" className="klues-input-light" placeholder="CVV ***" /></div>
              </div>

              <button className="klues-btn klues-btn-primary w-100" onClick={handlePaymentSuccess}>Confirm Payment</button>
              <button className="btn btn-link text-muted w-100 mt-3 text-decoration-none fw-bold" onClick={() => setView("book")}>Cancel</button>
            </div>
          </div>
        )}

        {view.startsWith("consult-room") && (
          <div className="fade-in consultation-wrapper row g-0">
            <div className="col-lg-8 video-stream">
              <div className="text-center">
                <div style={{ fontSize: "3rem", opacity: 0.5 }} className="mb-2"></div>
              </div>
              <div className="video-controls-overlay">
                <div className="d-flex flex-column align-items-center gap-1">
                  <button className="ctrl-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                  </button>
                  <span className="text-white small" style={{ fontSize: "0.75rem" }}>Mic</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <button className="ctrl-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                  </button>
                  <span className="text-white small" style={{ fontSize: "0.75rem" }}>Video</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <button className="ctrl-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
                  </button>
                  <span className="text-white small" style={{ fontSize: "0.75rem" }}>Screen</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <button className="ctrl-btn danger" onClick={() => setView("home")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="22" x2="2" y1="2" y2="22"></line></svg>
                  </button>
                  <span className="text-white small" style={{ fontSize: "0.75rem" }}>End</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 chat-panel">
              <div className="p-3 border-bottom text-center fw-bold text-muted small text-uppercase tracking-widest">
                Chat
              </div>
              <div className="chat-history">
                <div className="msg-bubble system">Connection secured. Dr. Smith joined.</div>
                <div className="msg-bubble them">Hello, I am ready when you are.</div>
                <div className="msg-bubble me">Joining with video now!</div>
              </div>
              <div className="chat-composer">
                <input type="text" placeholder="Type a secure message..." />
                <button className="btn btn-primary text-white d-flex align-items-center justify-content-center" style={{ borderRadius: "50%", width: "42px", height: "42px", padding: 0 }}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {view === "prescriptions" && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">My Prescriptions</h5>
              <button className="klues-btn klues-btn-secondary fw-bold" onClick={() => alert("Redirecting to Pharmacy...")}>Order Medicines</button>
            </div>
            {myPrescriptions.length === 0 ? (
              <div className="klues-panel text-center py-5">
                <p className="text-muted">No prescriptions found.</p>
              </div>
            ) : (
              <div className="row g-4">
                {myPrescriptions.map(p => (
                  <div key={p.id} className="col-lg-6">
                    <div className="klues-panel border-top border-4 border-primary p-4 h-100 shadow-sm">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold m-0 fs-5">Dr. {p.consultantName}</h6>
                        <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">Validated</span>
                      </div>
                      <div className="bg-light p-3 rounded-3 mb-4" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                        <p className="mb-2 small"><span className="text-muted fw-bold">Diagnosis:</span> <span className="fw-bold ms-1">{p.diagnosis}</span></p>
                        <p className="m-0 small"><span className="text-muted fw-bold">Prescribed on:</span> <span className="ms-1">Oct 24, 2023</span></p>
                      </div>
                      <div className="d-flex gap-2 mt-4">
                        <button className="klues-btn klues-btn-primary flex-grow-1" onClick={() => alert("Downloading Prescription PDF...")}>
                          Download PDF
                        </button>
                        <button className="btn btn-outline-secondary fw-bold" onClick={() => setView("history")}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "history" && (
          <div className="fade-in">
            <h5 className="mb-4 fw-bold">Patient History Timeline</h5>
            <div className="klues-panel p-4">
              <div style={{ position: 'relative', paddingLeft: '30px' }}>
                <div style={{ position: 'absolute', left: '7px', top: '5px', bottom: '5px', width: '2px', background: '#e2e8f0' }}></div>
                
                {/* TIMELINE ITEM */}
                <div className="mb-5" style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-28px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid white', boxShadow: '0 0 0 3px rgba(108,99,255,0.1)' }}></div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold m-0">Consultation with Dr. Sarah Jenkins</h6>
                    <span className="text-muted small fw-bold">Oct 24, 2023</span>
                  </div>
                  <p className="text-muted small mb-3">Focus on Generalized Anxiety and CBT techniques. Patient reported feeling more grounded after mindfulness exercises.</p>
                  <div className="d-flex gap-2">
                    <span className="badge bg-light text-muted border px-2 py-1">Anxiety</span>
                    <span className="badge bg-light text-muted border px-2 py-1">CBT</span>
                  </div>
                </div>

                {/* TIMELINE ITEM */}
                <div className="mb-5" style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-28px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '2px solid white' }}></div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold m-0">Assessment: 16 Personalities</h6>
                    <span className="text-muted small fw-bold">Sep 15, 2023</span>
                  </div>
                  <p className="text-muted small mb-0">Result: INFJ-T (The Advocate). Analysis used to customize care plan resources.</p>
                </div>

                {/* TIMELINE ITEM */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-28px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: '#64748b', border: '2px solid white' }}></div>
                  <h6 className="fw-bold mb-1">Account Created</h6>
                  <span className="text-muted smaller">Sep 10, 2023</span>
                </div>
              </div>
            </div>
            
            <h5 className="mt-5 mb-4 fw-bold">Past Appointment Records</h5>
            <div className="klues-panel p-0 overflow-hidden">
              <table className="table table-hover m-0" style={{ fontSize: '0.9rem' }}>
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 border-0">Doctor</th>
                    <th className="py-3 border-0">Specialty</th>
                    <th className="py-3 border-0">Date</th>
                    <th className="py-3 border-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 fw-bold">Dr. Sarah Jenkins</td>
                    <td className="py-3 text-muted">Psychiatrist</td>
                    <td className="py-3">Oct 24, 2023</td>
                    <td className="py-3"><span className="text-success fw-bold">Completed</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 fw-bold">Dr. Michael Chen</td>
                    <td className="py-3 text-muted">Counselor</td>
                    <td className="py-3">Oct 12, 2023</td>
                    <td className="py-3"><span className="text-danger fw-bold">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "forum" && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Community Discussions</h5>
              <button className="klues-btn klues-btn-primary">New Topic</button>
            </div>
            <div className="d-flex flex-column gap-3">
              {forums.map(f => (
                <div key={f.id} className="klues-panel p-4 d-flex gap-4 align-items-center cursor-pointer">
                  <div className="text-center bg-light rounded-3 p-3" style={{ minWidth: "80px" }}>
                    <div className="text-primary fw-bold fs-4">{f.replies.length}</div>
                    <div className="small text-muted fw-bold">Replies</div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-2 fs-5">{f.title}</h6>
                    <p className="text-muted small mb-3">{f.content.substring(0, 80)}...</p>
                    <div className="d-flex align-items-center gap-3 small">
                      <span className="fw-bold text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">{f.author}</span>
                      <span className="text-muted fw-medium">• 2 hours ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "resources" && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Resources Centre</h5>
              <button className="klues-btn klues-btn-secondary fw-bold" onClick={() => alert("Simulating mobile scan and storing securely locally...")}>Scan Local Docs</button>
            </div>
            <p className="text-muted mb-4 small">Access curated books, audio, and videos to aid your mental wellbeing journey.</p>
            <div className="row g-4 mb-4">
              {["Audio: Guided Relaxation", "Book: The Mindful Path", "Video: Managing Stress"].map((res, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="klues-panel text-center p-4">
                    <div style={{ fontSize: "2rem" }} className="mb-3"></div>
                    <h6 className="fw-bold mb-3">{res}</h6>
                    <button className="klues-btn klues-btn-secondary w-100 fw-bold mt-2">Access Resource</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "messages" && (
          <div className="fade-in d-flex flex-column h-100" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <h5 className="fw-bold mb-4">Your Messages</h5>
            <div className="klues-panel p-0 overflow-hidden d-flex flex-grow-1" style={{ minHeight: '500px' }}>
              <div className="border-right bg-light" style={{ width: '300px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="p-3 border-bottom fw-bold small text-muted text-uppercase">Recent Chats</div>
                <div className="overflow-auto" style={{ maxHeight: '450px' }}>
                  {myAppointments.length === 0 ? <div className="p-4 text-center text-muted small">No active chats. Book a session to start.</div> : 
                    [...new Set(myAppointments.map(a => a.consultant.name))].map(name => (
                      <div key={name} className="p-3 border-bottom cursor-pointer hover-bg-white d-flex align-items-center gap-3 active-chat">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>{name.charAt(0)}</div>
                        <div>
                          <div className="fw-bold small">Dr. {name}</div>
                          <div className="text-muted smaller">Active now</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex-grow-1 d-flex flex-column bg-white">
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                  {myAppointments.length > 0 ? (
                    <>
                      <div className="fw-bold">Dr. {myAppointments[0].consultant.name}</div>
                      <div className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 small">Online</div>
                    </>
                  ) : <div className="text-muted">Select a chat</div>}
                </div>
                <div className="flex-grow-1 p-4 overflow-auto chat-history" style={{ background: '#f8fafc' }}>
                  {myAppointments.length > 0 ? (
                    <>
                      <div className="msg-bubble them">Hello! How are you feeling today?</div>
                      <div className="msg-bubble me">I've been feeling a bit better, thanks for the tips!</div>
                    </>
                  ) : <div className="h-100 d-flex align-items-center justify-content-center text-muted">No messages yet</div>}
                </div>
                <div className="p-3 border-top d-flex gap-2 bg-light">
                  <input type="text" className="klues-input-light bg-white border" placeholder="Type your message..." />
                  <button className="klues-btn klues-btn-primary py-2 px-3">Send</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "assessments" && (
          <div className="fade-in">
            <h5 className="fw-bold mb-2">Assessments & AI Generation</h5>
            <p className="text-muted mb-4 small">Take personality tests to unlock customized multimedia content through AI.</p>
            <div className="row g-4 mb-5">
              {["BPAT Integration", "LpAT Test", "16 Personalities"].map((test, i) => (
                <div key={i} className="col-lg-4">
                  <div className="klues-panel p-4 d-flex flex-column h-100">
                    <h6 className="fw-bold mb-2 fs-5 text-main">{test}</h6>
                    <p className="text-muted small mb-4 flex-grow-1">Complete this test to build your personality profile.</p>
                    <button className="klues-btn klues-btn-primary w-100 mt-auto">Take Assessment</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="klues-panel border-top border-4 border-secondary p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div style={{ fontSize: "2.5rem" }} className="text-secondary"></div>
                <div>
                  <h6 className="fw-bold mb-1 fs-5">AI Content Generator</h6>
                  <p className="text-muted small m-0">Dynamic custom books, stories, and audio based on personality.</p>
                </div>
              </div>
              <button className="klues-btn klues-btn-secondary w-100 py-3" onClick={() => alert("AI generating personalized books, stories, and audio based on your recent 16-personality assessment...")}>Generate Customized Resources</button>
            </div>
          </div>
        )}

        {view === "reviews" && (
          <div className="fade-in">
            <h5 className="fw-bold mb-4">Rate & Review Consultants</h5>
            {approvedConsultants.length === 0 ? <p className="text-muted">No consultants to review yet.</p> : (
              <div className="row g-4 mb-5">
                {approvedConsultants.map(c => {
                  const avgRating = reviews.filter(r => r.consultantId === c.id && r.status === 'approved').length > 0
                    ? (reviews.filter(r => r.consultantId === c.id && r.status === 'approved').reduce((a, r) => a + r.rating, 0) / reviews.filter(r => r.consultantId === c.id && r.status === 'approved').length).toFixed(1)
                    : 'N/A';
                  return (
                    <div key={c.id} className="col-lg-6">
                      <div className="klues-panel p-4 h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '50px', height: '50px', fontSize: '1.3rem' }}>{(c.name || 'D').charAt(0)}</div>
                          <div>
                            <h6 className="fw-bold mb-0">Dr. {c.name}</h6>
                            <span className="text-muted small">{c.specialty || c.qualification}</span>
                          </div>
                          <span className="ms-auto badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold">Avg: {avgRating}</span>
                        </div>

                        {reviewForm.consultantId === c.id ? (
                          <div className="bg-light p-3 rounded-3 mt-3">
                            <div className="d-flex gap-1 mb-3">
                              {[1,2,3,4,5].map(star => (
                                <span key={star} style={{ cursor: 'pointer', transition: 'color 0.15s' }}
                                  onMouseEnter={() => setReviewForm(f => ({...f, hoverRating: star}))}
                                  onMouseLeave={() => setReviewForm(f => ({...f, hoverRating: 0}))}
                                  onClick={() => setReviewForm(f => ({...f, rating: star}))}>
                                  <Star size={24} fill={star <= (reviewForm.hoverRating || reviewForm.rating) ? '#f59e0b' : 'none'} color={star <= (reviewForm.hoverRating || reviewForm.rating) ? '#f59e0b' : '#d1d5db'} />
                                </span>
                              ))}
                              <span className="ms-2 small text-muted fw-bold mt-1">{reviewForm.rating}/5</span>
                            </div>
                            <textarea className="klues-input-light mb-3" rows="3" placeholder="Share your experience..." value={reviewForm.comment} onChange={e => setReviewForm(f => ({...f, comment: e.target.value}))} />
                            <div className="d-flex gap-2">
                              <button className="klues-btn klues-btn-primary" onClick={() => handleReviewSubmit(c.id, c.name)}>Submit Review</button>
                              <button className="btn btn-light fw-bold border" onClick={() => setReviewForm({ consultantId: null, rating: 0, comment: '', hoverRating: 0 })}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button className="klues-btn klues-btn-secondary w-100 mt-2" onClick={() => setReviewForm({ consultantId: c.id, rating: 0, comment: '', hoverRating: 0 })}>Write a Review</button>
                        )}

                        {reviews.filter(r => r.consultantId === c.id && r.status === 'approved').length > 0 && (
                          <div className="mt-3 pt-3 border-top">
                            <p className="small fw-bold text-muted text-uppercase mb-2">Recent Reviews</p>
                            {reviews.filter(r => r.consultantId === c.id && r.status === 'approved').slice(0, 3).map(r => (
                              <div key={r.id} className="bg-light p-2 rounded mb-2 small">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="fw-bold">{r.userName}</span>
                                  <div className="d-flex gap-1">
                                    {[1,2,3,4,5].map(i => (
                                      <Star key={i} size={12} fill={i <= r.rating ? '#f59e0b' : 'none'} color={i <= r.rating ? '#f59e0b' : '#d1d5db'} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-muted mb-0 mt-1">{r.comment}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {view === "favorites" && (
          <div className="fade-in">
            <h5 className="fw-bold mb-4">Your Favorite Doctors</h5>
            {favorites.length === 0 ? (
              <div className="klues-panel text-center py-5">
                <h5 className="text-muted">No favorites yet</h5>
                <p className="text-muted small">Browse experts and tap the heart to save your favorites.</p>
                <button className="klues-btn klues-btn-primary mt-2" onClick={() => setView('book')}>Browse Experts</button>
              </div>
            ) : (
              <div className="row g-4">
                {consultants.filter(c => favorites.includes(c.id) && c.status === 'Approved').map(c => (
                  <div key={c.id} className="col-lg-4 col-md-6">
                    <div className="klues-panel text-center p-4">
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e0e7ff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}></div>
                      <h5 className="fw-bold">{c.name}</h5>
                      <p className="text-muted small mb-3">{c.specialty || c.qualification}</p>
                      <div className="d-flex gap-2">
                        <button className="klues-btn klues-btn-primary flex-grow-1" onClick={() => setView('book')}>Book</button>
                        <button className="btn btn-outline-danger fw-bold px-3" onClick={() => toggleFavorite(c.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "payments" && (
          <PaymentHistory payments={payments} authUser={authUser} />
        )}

        <PageNavigation />
      </div>
    </div>
  );
}

export default UserDashboard;
