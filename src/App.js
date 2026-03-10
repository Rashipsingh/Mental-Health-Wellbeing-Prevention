import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';

/* ---------------- INITIAL STATE MOCKS ---------------- */
const initialForums = [
  { id: 1, title: "Coping with Anxiety in 2024", author: "Anonymous", content: "What are your best daily tips tailored for a remote work lifestyle?", replies: [1, 2] },
  { id: 2, title: "Meditation benefits after 30 days", author: "User123", content: "I have started meditating recently and wanted to share the profound changes...", replies: [] }
];

/* ---------------- EMERGENCY SOS BUTTON ---------------- */
function SOSButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="sos-button" onClick={() => setShowModal(true)}>
        SOS
      </div>
      {showModal && (
        <div className="sos-modal-overlay">
          <div className="glass-card text-center fade-in" style={{ maxWidth: "400px" }}>
            <div style={{ fontSize: "3rem" }} className="mb-3"></div>
            <h3 className="fw-bold text-danger mb-3">Emergency & SOS</h3>
            <p className="text-muted mb-4 small">
              This action will immediately alert the volunteer response network, connect to authorities, and initiate location-based emergency dispatch.
            </p>
            <button className="btn btn-danger btn-premium w-100 mb-3" onClick={() => {
              alert("Emergency Services & Local Response Network Dispatched.");
              setShowModal(false);
            }}>Confirm Emergency Dispatch</button>
            <button className="btn btn-light w-100 fw-bold border" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- PAGE NAVIGATION BUTTONS ---------------- */
function PageNavigation() {
  const navigate = useNavigate();
  return (
    <div className="page-nav-container">
      <button className="page-nav-btn" onClick={() => navigate("/")}>
        ← Back
      </button>
      <div className="page-nav-spacer" />
    </div>
  );
}

/* ---------------- MOTIVATIONAL QUOTES ---------------- */
const motivationalQuotes = [
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "It's okay to not be okay, as long as you are not giving up.",
  "You don't have to control your thoughts. You just have to stop letting them control you.",
  "Healing takes time, and asking for help is a courageous step.",
  "The strongest people are those who win battles we know nothing about.",
  "Be gentle with yourself. You're doing the best you can.",
  "You are not your illness. You have a name, a history, a personality. Staying yourself is part of the battle.",
  "Every day may not be good, but there is something good in every day.",
  "Self-care is not selfish. You cannot serve from an empty vessel.",
  "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
  "There is hope, even when your brain tells you there isn't.",
  "You are allowed to feel messed up and inside out. It doesn't mean you're defective. It just means you're human.",
  "One small crack does not mean that you are broken. It means you were put to the test and you didn't fall apart.",
  "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
  "Almost everything will work again if you unplug it for a few minutes, including you.",
  "Your present circumstances don't determine where you can go; they merely determine where you start.",
  "The only journey is the journey within."
];

/* ---------------- LANDING PAGE ---------------- */
function Landing() {
  const navigate = useNavigate();
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  return (
    <div className="hero-wrapper" style={{ flexDirection: "column", gap: "30px" }}>
      <div className="glass-card text-center fade-in">
        <h2 className="mb-2">Klever Klues</h2>
        <p className="text-muted mb-5" style={{ fontSize: "1.05rem", fontStyle: "italic" }}>Find the clues to your inner peace.</p>
        <div className="d-flex flex-column gap-3">
          <button className="btn btn-primary btn-premium" onClick={() => navigate("/user")}>Enter as User</button>
          <button className="btn btn-success btn-premium" style={{ background: "rgba(255,255,255,0.2)", color: "#1e293b", backdropFilter: "blur(10px)" }} onClick={() => navigate("/consultant")}>Join as Consultant</button>
          <div className="mt-4">
            <button className="btn btn-link text-muted text-decoration-none" onClick={() => navigate("/admin")}>Admin Access →</button>
          </div>
        </div>
      </div>
      <div className="motivational-quote fade-in-quote">
        "{quote}"
      </div>
      <PageNavigation />
    </div>
  );
}

/* ---------------- USER FLOW: AUTH ---------------- */
function UserAuth({ setAuthUser }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");
      const savedName = storedUsers[formData.email] || (formData.email ? formData.email.split('@')[0] : "User");
      setAuthUser({ name: savedName, email: formData.email, role: "User", id: 101 });
      navigate("/user/dashboard");
    } else {
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");
      storedUsers[formData.email] = formData.fullName;
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
      setAuthUser({ name: formData.fullName, email: formData.email, role: "User", id: Date.now() });
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="hero-wrapper" style={{ flexDirection: "column" }}>
      <div className="glass-card fade-in">
        <div className="text-center mb-4">
          <h3 className="mt-2">Welcome to Klever Klues</h3>
          <p className="text-muted small">Step into your personal wellbeing space.</p>
        </div>

        <div className="d-flex justify-content-center mb-4 bg-light rounded-pill p-1" style={{ border: "1px solid #e2e8f0" }}>
          <button className={`btn w-50 rounded-pill ${mode === "login" ? "btn-primary shadow-sm" : "btn-light text-muted border-0"}`} onClick={() => setMode("login")}>Login</button>
          <button className={`btn w-50 rounded-pill ${mode === "register" ? "btn-primary shadow-sm" : "btn-light text-muted border-0"}`} onClick={() => setMode("register")}>Register</button>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          {mode === "register" && (
            <div className="mb-3">
              <label className="small text-muted mb-1 fw-bold">Full Name</label>
              <input type="text" name="fullName" className="form-control" placeholder="John Doe or 'Phoenix'" value={formData.fullName || ""} onChange={handleChange} autoComplete="off" required />
            </div>
          )}
          <div className="mb-3">
            <label className="small text-muted mb-1 fw-bold">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email || ""} onChange={handleChange} autoComplete="off" required />
          </div>
          {mode === "register" && (
            <>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Phone</label>
                <input type="tel" name="phone" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Alternate Phone Number</label>
                <input type="tel" name="alternatePhone" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Preferred Language</label>
                <div className="position-relative">
                  <select name="language" className="form-control" onChange={handleChange} style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: "30px" }}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi / हिन्दी</option>
                    <option value="Spanish">Spanish / Español</option>
                  </select>
                  <div className="position-absolute text-muted" style={{ right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: "0.8rem" }}>▼</div>
                </div>
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="anonCheck" name="anonymous" onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })} />
                <label className="form-check-label small fw-bold text-muted mt-1" htmlFor="anonCheck">
                  Anonymous Mode
                </label>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="small text-muted mb-1 fw-bold">{mode === "register" ? "Create Password" : "Password"}</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password || ""} onChange={handleChange} autoComplete="new-password" required />
          </div>
          <button className="btn btn-primary btn-premium w-100">{mode === "login" ? "Login" : "Create Account"}</button>
        </form>
      </div>
      <PageNavigation />
    </div>
  );
}

/* ---------------- USER FLOW: DASHBOARD ---------------- */
function UserDashboard({ authUser, onLogout, consultants, appointments, setAppointments, prescriptions, forums }) {
  const [view, setView] = useState("home");
  const [bookingData, setBookingData] = useState(null);

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
  const approvedConsultants = consultants.filter(c => c.status === "Approved");

  return (
    <div className="layout-app fade-in" style={{
      background: "linear-gradient(-45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e)",
      backgroundSize: "400% 400%",
      animation: "gradientPan 15s ease infinite"
    }}>
      <div className="layout-sidebar" style={{ background: "#0f172a", color: "white", borderRight: "none" }}>
        <div className="sidebar-logo text-white">
          Klever Klues
        </div>
        <div className={`sidebar-nav-item ${view === "home" ? "active" : ""} text-white`} style={view === "home" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("home")}>
          Overview
        </div>
        <div className={`sidebar-nav-item ${view === "book" ? "active" : ""} text-white`} style={view === "book" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("book")}>
          Book Session
        </div>
        <div className={`sidebar-nav-item ${view === "prescriptions" ? "active" : ""} text-white`} style={view === "prescriptions" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("prescriptions")}>
          Plans & Targets
        </div>
        <div className={`sidebar-nav-item ${view === "forum" ? "active" : ""} text-white`} style={view === "forum" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("forum")}>
          Community
        </div>
        <div className={`sidebar-nav-item ${view === "resources" ? "active" : ""} text-white`} style={view === "resources" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("resources")}>
          Resources
        </div>
        <div className={`sidebar-nav-item ${view === "assessments" ? "active" : ""} text-white`} style={view === "assessments" ? { background: "rgba(255,255,255,0.1)" } : { opacity: 0.8 }} onClick={() => setView("assessments")}>
          Assessments
        </div>
        <div style={{ marginTop: "auto", paddingTop: "40px" }}>
          <div className="sidebar-nav-item text-danger fw-bold" style={{ opacity: 0.9 }} onClick={onLogout}>
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
              <div className="premium-card text-center py-5">
                <div style={{ fontSize: "3rem", color: "#e2e8f0" }} className="mb-3"></div>
                <h5 className="text-muted">No sessions scheduled</h5>
                <button className="btn btn-primary btn-premium mt-3" onClick={() => setView("book")}>Book a Consultation</button>
              </div>
            ) : (
              <div className="row g-4">
                {myAppointments.map(appt => (
                  <div className="col-lg-6" key={appt.id}>
                    <div className="premium-card d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="fw-bold mb-1">Dr. {appt.consultant.name}</h5>
                          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-semibold">Confirmed</span>
                        </div>
                        <div className="text-end">
                          <div className="text-primary fw-bold">{appt.date}</div>
                          <div className="text-muted small">{appt.time}</div>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-premium mt-auto w-100" onClick={() => setView(`consult-room-${appt.id}`)}>
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
            <h5 className="mb-4 fw-bold">Available Experts</h5>
            <div className="row g-4">
              {approvedConsultants.length === 0 ? <p className="text-muted">No specialists available currently.</p> : approvedConsultants.map(c => (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="premium-card text-center">
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e0e7ff", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}></div>
                    <h5 className="fw-bold">{c.name}</h5>
                    <p className="text-muted small mb-4">{c.qualification}</p>

                    <div className="bg-light p-3 rounded-3 mb-3 text-start">
                      <label className="small fw-bold text-muted mb-1">Select Date</label>
                      <input type="date" className="form-control form-control-sm mb-2 border-0" id={`date-${c.id}`} style={{ background: "white" }} />
                      <label className="small fw-bold text-muted mb-1">Select Time</label>
                      <input type="time" className="form-control form-control-sm border-0" id={`time-${c.id}`} style={{ background: "white" }} />
                    </div>

                    <button className="btn btn-primary btn-premium w-100" onClick={() => {
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
          <div className="fade-in d-flex justify-content-center">
            <div className="premium-card w-100" style={{ maxWidth: "450px" }}>
              <div className="text-center mb-4">
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}></div>
                <h4 className="fw-bold">Secure Checkout</h4>
              </div>
              <div className="bg-light p-3 rounded-3 mb-4">
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Consultant</span><span className="fw-bold">Dr. {bookingData.consultant.name}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Date</span><span className="fw-bold">{bookingData.date}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Time</span><span className="fw-bold">{bookingData.time}</span></div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between"><span className="text-muted">Total</span><span className="fw-bold text-primary fs-5">$50.00</span></div>
              </div>

              <div className="mb-3"><input type="text" className="form-control" placeholder="Card Number (**** **** **** ****)" /></div>
              <div className="row g-2 mb-4">
                <div className="col-6"><input type="text" className="form-control" placeholder="MM/YY" /></div>
                <div className="col-6"><input type="password" className="form-control" placeholder="CVV ***" /></div>
              </div>

              <button className="btn btn-primary btn-premium w-100" onClick={handlePaymentSuccess}>Confirm Payment</button>
              <button className="btn btn-link text-muted w-100 mt-2 text-decoration-none" onClick={() => setView("book")}>Cancel</button>
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
                <button className="btn btn-primary text-white" style={{ borderRadius: "50%", width: "42px", height: "42px", padding: 0 }}>➤</button>
              </div>
            </div>
          </div>
        )}

        {view === "prescriptions" && (
          <div className="fade-in">
            <h5 className="mb-4 fw-bold">Care Plans & Targets</h5>
            {myPrescriptions.length === 0 ? <p className="text-muted">No active plans.</p> : (
              <div className="row g-4">
                {myPrescriptions.map(p => (
                  <div key={p.id} className="col-lg-6">
                    <div className="premium-card border-top border-4 border-primary">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold m-0">Dr. {p.consultantName}</h6>
                        <span className="badge bg-light text-primary rounded-pill border">Active Plan</span>
                      </div>
                      <div className="bg-light p-3 rounded-3 mb-4">
                        <p className="mb-1 small"><strong>Diagnosis:</strong> {p.diagnosis}</p>
                        <p className="m-0 small text-muted"><strong>Notes:</strong> {p.notes}</p>
                      </div>
                      <h6 className="fw-semibold small text-uppercase text-muted mb-3">Daily Targets</h6>
                      <div className="d-flex flex-column gap-2">
                        {p.targets.map((t, idx) => (
                          <label key={idx} className="d-flex align-items-center gap-3 p-3 border rounded-3 cursor-pointer" style={{ transition: "all 0.2s" }}>
                            <input type="checkbox" className="form-check-input mt-0" defaultChecked={t.completed} style={{ width: "1.2rem", height: "1.2rem" }} />
                            <span className={t.completed ? "text-decoration-line-through text-muted" : "fw-medium"}>{t.task}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "forum" && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Community Discussions</h5>
              <button className="btn btn-primary btn-premium">New Topic</button>
            </div>
            <div className="d-flex flex-column gap-3">
              {forums.map(f => (
                <div key={f.id} className="premium-card p-4 d-flex gap-4 align-items-center cursor-pointer">
                  <div className="text-center" style={{ minWidth: "60px" }}>
                    <div className="text-primary fw-bold fs-4">{f.replies.length}</div>
                    <div className="small text-muted">Replies</div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>{f.title}</h6>
                    <p className="text-muted small mb-2">{f.content.substring(0, 80)}...</p>
                    <div className="d-flex align-items-center gap-2 small">
                      <span className="fw-semibold text-primary">{f.author}</span>
                      <span className="text-muted">• 2 hours ago</span>
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
              <button className="btn btn-outline-primary btn-sm fw-bold border-2" onClick={() => alert("Simulating mobile scan and storing securely locally...")}>Scan Local Docs</button>
            </div>
            <p className="text-muted mb-4 small">Access curated books, audio, and videos to aid your mental wellbeing journey.</p>
            <div className="row g-4 mb-4">
              {["Audio: Guided Relaxation", "Book: The Mindful Path", "Video: Managing Stress"].map((res, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="premium-card text-center">
                    <div style={{ fontSize: "2rem" }} className="mb-3"></div>
                    <h6 className="fw-bold mb-2">{res}</h6>
                    <button className="btn btn-light btn-sm w-100 fw-bold border text-primary mt-2">Access Resource</button>
                  </div>
                </div>
              ))}
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
                  <div className="premium-card">
                    <h6 className="fw-bold mb-2">{test}</h6>
                    <p className="text-muted small mb-4">Complete this test to build your personality profile.</p>
                    <button className="btn btn-primary btn-sm btn-premium w-100">Take Assessment</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="premium-card border-top border-4 border-secondary bg-white">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ fontSize: "2rem" }}></div>
                <div>
                  <h6 className="fw-bold mb-0">AI Content Generator</h6>
                  <p className="text-muted small m-0">Dynamic custom books, stories, and audio based on personality.</p>
                </div>
              </div>
              <button className="btn btn-secondary btn-premium w-100 mt-2" onClick={() => alert("AI generating personalized books, stories, and audio based on your recent 16-personality assessment...")}>Generate Customized Resources</button>
            </div>
          </div>
        )}

        <PageNavigation />
      </div>
    </div>
  );
}

/* ---------------- CONSULTANT FLOW: REGISTRATION ---------------- */
function ConsultantRegistration({ consultants, setConsultants }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", qualification: "", license: "" });
  const [view, setView] = useState("register"); // 'register', 'statusCheck', 'showStatus'
  const [checkEmail, setCheckEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const aiScore = Math.floor(Math.random() * 15) + 85;

    // Check if consultant with same email exists
    const existing = consultants.find(c => c.email === formData.email);
    if (!existing) {
      setConsultants(prev => [...prev, {
        id: Date.now(), name: formData.fullName, ...formData, status: "Pending",
        aiEvaluation: { score: aiScore, notes: `Documents Authenticated. Screening criteria passed with ${aiScore}% confidence.` },
        feedback: ""
      }]);
    }

    alert("Application submitted successfully. You can check your status later.");
    setFormData({ fullName: "", email: "", phone: "", qualification: "", license: "" });
  };

  if (view === "statusCheck") {
    return (
      <div className="hero-wrapper" style={{ flexDirection: "column" }}>
        <div className="glass-card text-center fade-in" style={{ padding: "40px", minWidth: "350px", maxWidth: "450px" }}>
          <h4 className="fw-bold mb-3">Check Application Status</h4>
          <p className="text-muted small mb-4">Enter your registered email address to view your latest status.</p>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={checkEmail}
            onChange={(e) => setCheckEmail(e.target.value)}
          />
          <button className="btn btn-primary btn-premium w-100 mb-3" onClick={() => {
            if (checkEmail) {
              setSubmittedEmail(checkEmail);
              setView("showStatus");
            }
          }}>
            Check Status
          </button>
          <button className="btn btn-link text-muted text-decoration-none w-100" onClick={() => setView("register")}>
            ← Back to Registration
          </button>
        </div>
        <PageNavigation />
      </div>
    );
  }

  if (view === "showStatus") {
    const myApp = consultants.find(c => c.email === submittedEmail) || { name: "", fullName: "", email: submittedEmail, status: "Not Found" };
    return (
      <div className="hero-wrapper">
        <div className="glass-card text-center fade-in" style={{ padding: "40px", minWidth: "350px", maxWidth: "450px" }}>
          <h3 className="fw-bold mb-1">Application Status</h3>
          <p className="text-muted fw-bold mb-4">Submitted</p>

          <div className="text-start mb-2 bg-light p-4 rounded-3" style={{ border: "1px solid #e2e8f0" }}>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <span className="text-muted fw-bold">Name:</span>
              <span className="fw-medium text-dark">{myApp.name || myApp.fullName || "Applicant"}</span>
            </div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <span className="text-muted fw-bold">Email:</span>
              <span className="fw-medium text-dark">{myApp.email}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
              <span className="text-muted fw-bold">Status:</span>
              {myApp.status === "Pending" && <span className="badge bg-warning text-dark rounded-pill px-3 py-2">Pending Approval</span>}
              {myApp.status === "Approved" && <span className="badge bg-success rounded-pill px-3 py-2">Approved</span>}
              {myApp.status === "Rejected" && <span className="badge bg-danger rounded-pill px-3 py-2">Rejected</span>}
              {!(myApp.status === "Pending" || myApp.status === "Approved" || myApp.status === "Rejected") && <span className="badge bg-secondary rounded-pill px-3 py-2">{myApp.status}</span>}
            </div>
          </div>

          {myApp.status === "Rejected" && (
            <p className="text-danger mt-3 small fw-bold">
              Your application was not approved. Please contact support.
            </p>
          )}

          <button className="btn btn-outline-secondary mt-4 w-100 fw-bold" onClick={() => setView("register")}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-wrapper" style={{ flexDirection: "column" }}>
      <div className="glass-card fade-in" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Personal Details</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Full Name</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Email ID</label>
                <input type="email" className="form-control" placeholder="you@domain.com" onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Address</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, address: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted mb-1">Date of Birth</label>
                <input type="date" className="form-control" onChange={e => setFormData({ ...formData, dob: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted mb-1">Contact</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, contact: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Nationality</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, nationality: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Educational Qualifications</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Qualification</label>
                <input type="text" className="form-control" placeholder="MBBS, MD/MS/DNB, etc." onChange={e => setFormData({ ...formData, qualification: e.target.value })} required />
              </div>
              <div className="col-md-8">
                <label className="small fw-bold text-muted mb-1">University Name</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, university: e.target.value })} required />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold text-muted mb-1">Year of Passing</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, passingYear: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Professional Registration</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Valid License Number</label>
                <input type="text" className="form-control" onChange={e => setFormData({ ...formData, license: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Experience Profile</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Details of previous positions</label>
                <textarea className="form-control" rows="2" placeholder="Designation, Organization, Duration in years/months (or N/A)" onChange={e => setFormData({ ...formData, experience: e.target.value })} required></textarea>
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Specialty / Area of Expertise</label>
                <input type="text" className="form-control" placeholder="e.g., Cardiology, General Medicine" onChange={e => setFormData({ ...formData, specialty: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Declaration</h6>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="declarationCheck" required />
              <label className="form-check-label small fw-bold text-muted mt-1" htmlFor="declarationCheck">
                I confirm the accuracy of the information provided.
              </label>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="small fw-bold text-muted mb-1">Verification Documents</label>
              <div className="border border-dashed p-4 text-center rounded-3 bg-light cursor-pointer" style={{ borderColor: "#cbd5e1" }}>
                <div style={{ fontSize: "2rem" }} className="text-muted mb-2"></div>
                <div className="small text-muted fw-medium">Click to upload PDFs of your licenses</div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-premium w-100 mt-2 mb-4">Submit Application</button>

          <div className="text-center pt-3 border-top pb-2">
            <p className="text-muted small mb-2">Already applied?</p>
            <button type="button" className="btn btn-outline-primary btn-sm px-4 rounded-pill fw-bold" onClick={() => setView("statusCheck")}>
              Check Application Status
            </button>
          </div>
        </form>
      </div>
      <PageNavigation />
    </div>
  );
}

/* ---------------- ADMIN DASHBOARD: STATUS GOVERNANCE ---------------- */
function Admin({ consultants, setConsultants }) {
  const navigate = useNavigate();

  const updateStatus = (id, newStatus, feedback = "") => {
    setConsultants(consultants.map(c => c.id === id ? { ...c, status: newStatus, feedback } : c));
  };

  const pending = consultants.filter(c => c.status === "Pending").length;
  const approved = consultants.filter(c => c.status === "Approved").length;

  return (
    <div className="layout-app hero-wrapper fade-in" style={{
      background: "linear-gradient(-45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e)",
      backgroundSize: "400% 400%",
      animation: "gradientPan 15s ease infinite",
      alignItems: "stretch"
    }}>
      <div className="layout-sidebar" style={{ background: "#0f172a", color: "white", borderRight: "none" }}>
        <div className="sidebar-logo text-white">
          Dashboard
        </div>
        <div className="sidebar-nav-item active text-white" style={{ background: "rgba(255,255,255,0.1)" }}>
          Profile
        </div>
        <div className="sidebar-nav-item text-white" style={{ opacity: 0.8 }}>
          Report
        </div>
        <div className="sidebar-nav-item text-white" style={{ opacity: 0.8 }}>
          Users
        </div>
        <div className="sidebar-nav-item text-white" style={{ opacity: 0.8 }}>
          Consultants
        </div>
        <div className="sidebar-nav-item text-white" style={{ opacity: 0.8 }}>
          Settings
        </div>
        <div style={{ marginTop: "auto", paddingTop: "40px" }}>
          <button className="btn btn-outline-light w-100" onClick={() => navigate("/")}>Exit</button>
        </div>
      </div>

      <div className="layout-main">
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="stat-box">
              <div className="title">Pending</div>
              <div className="value text-warning">{pending}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box">
              <div className="title">Approve</div>
              <div className="value text-success">{approved}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box">
              <div className="title">Reject</div>
              <div className="value text-danger">{consultants.filter(c => c.status === "Rejected").length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-box">
              <div className="title">Suspend</div>
              <div className="value text-secondary">{consultants.filter(c => c.status === "Blacklisted" || c.status === "Suspended").length}</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold text-white mb-4">Consultant Status</h5>
          <div>
            <table className="table-premium">
              <thead>
                <tr>
                  <th style={{ width: "15%", whiteSpace: "nowrap", color: "#1e293b" }}>Name</th>
                  <th style={{ width: "20%", whiteSpace: "nowrap", color: "#1e293b" }}>Email</th>
                  <th style={{ width: "12%", whiteSpace: "nowrap", color: "#1e293b" }}>Status</th>
                  <th style={{ width: "28%", whiteSpace: "nowrap", color: "#1e293b" }}>Action</th>
                  <th style={{ width: "20%", whiteSpace: "nowrap", color: "#1e293b" }}>Feedback</th>
                  <th className="text-end" style={{ width: "5%", whiteSpace: "nowrap", color: "#1e293b" }}>View</th>
                </tr>
              </thead>
              <tbody>
                {consultants.length === 0 ? <tr><td colSpan="6" className="text-center text-muted py-4">No pending applications.</td></tr> : consultants.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="fw-bold">{c.name || c.fullName}</div>
                    </td>
                    <td>
                      <div className="small text-muted text-break">{c.email}</div>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 fw-medium ${c.status === "Approved" ? "bg-success bg-opacity-10 text-success" :
                        c.status === "Rejected" ? "bg-warning bg-opacity-10 text-warning" :
                          c.status === "Blacklisted" || c.status === "Suspended" ? "bg-danger bg-opacity-10 text-danger" :
                            "bg-secondary bg-opacity-10 text-secondary"
                        }`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Approved")}>Approve</button>
                        <button className="btn btn-sm btn-warning text-dark fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Rejected", prompt("Enter rejection feedback:"))}>Reject</button>
                        <button className="btn btn-sm btn-danger fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Suspended", "Suspended by Admin")}>Suspend</button>
                      </div>
                    </td>
                    <td>
                      <input type="text" className="form-control form-control-sm border-0 w-100" style={{ background: "#f8fafc" }} placeholder="Write feedback..." onBlur={(e) => {
                        if (e.target.value) updateStatus(c.id, c.status, e.target.value);
                      }} defaultValue={c.feedback || ""} />
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light text-primary fw-bold px-3 border" onClick={() => alert(`Viewing details for ${c.name || c.fullName}...`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}

/* ---------------- MAIN APP & STATE MANAGER ---------------- */
function App() {
  const [consultants, setConsultants] = useState(() => {
    const saved = localStorage.getItem("consultants");
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem("prescriptions");
    return saved ? JSON.parse(saved) : [
      { id: 999, userId: 101, consultantName: "Sarah Jenkins", diagnosis: "Generalized Anxiety", notes: "Patient making good progress. Continue CBT.", targets: [{ task: "15 min Guided Mindfulness", completed: false }, { task: "Journal daily triggers", completed: true }] }
    ];
  });

  const [forums, setForums] = useState(initialForums);

  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist State
  useEffect(() => localStorage.setItem("consultants", JSON.stringify(consultants)), [consultants]);
  useEffect(() => localStorage.setItem("appointments", JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem("prescriptions", JSON.stringify(prescriptions)), [prescriptions]);
  useEffect(() => localStorage.setItem("authUser", JSON.stringify(authUser)), [authUser]);

  return (
    <Router>
      <SOSButton />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* User Flows */}
        <Route path="/user" element={<UserAuth setAuthUser={setAuthUser} />} />
        <Route path="/user/dashboard" element={
          authUser ? <UserDashboard
            authUser={authUser}
            onLogout={() => { setAuthUser(null); window.location.href = "/"; }}
            consultants={consultants}
            appointments={appointments}
            setAppointments={setAppointments}
            prescriptions={prescriptions}
            forums={forums}
            setForums={setForums}
          /> : <Navigate to="/user" />
        } />

        {/* Consultant Flows */}
        <Route path="/consultant" element={<ConsultantRegistration consultants={consultants} setConsultants={setConsultants} />} />

        {/* Admin Flow */}
        <Route path="/admin" element={<Admin consultants={consultants} setConsultants={setConsultants} />} />
      </Routes>
    </Router>
  );
}

export default App;