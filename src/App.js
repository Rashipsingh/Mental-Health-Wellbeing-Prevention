import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';

/* ---------------- INITIAL STATE MOCKS ---------------- */
const initialForums = [
  { id: 1, title: "Coping with Anxiety in 2024", author: "Anonymous", content: "What are your best daily tips tailored for a remote work lifestyle?", replies: [1,2] },
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
          <div className="glass-card text-center fade-in" style={{maxWidth: "400px"}}>
            <div style={{fontSize:"3rem"}} className="mb-3">🚨</div>
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

/* ---------------- LANDING PAGE ---------------- */
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="hero-wrapper">
      <div className="glass-card text-center fade-in">
        <div style={{fontSize:"3rem", marginBottom:"10px"}}>✨</div>
        <h2 className="mb-3">Aura Wellbeing</h2>
        <p className="text-muted mb-5" style={{fontSize: "1.1rem"}}>
          Your premium oasis for mental health, professional consultation, and mindful progress.
        </p>
        <div className="d-flex flex-column gap-3">
          <button className="btn btn-primary btn-premium" onClick={() => navigate("/user")}>Enter as User</button>
          <button className="btn btn-success btn-premium" style={{background: "rgba(255,255,255,0.2)", color: "#1e293b", backdropFilter: "blur(10px)"}} onClick={() => navigate("/consultant")}>Join as Consultant</button>
          <div className="mt-4">
            <button className="btn btn-link text-muted text-decoration-none" onClick={() => navigate("/admin")}>Admin Access →</button>
          </div>
        </div>
      </div>
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
      setAuthUser({ name: "Demo User", email: formData.email, role: "User", id: 101 });
      navigate("/user/dashboard");
    } else {
      setAuthUser({ name: formData.fullName, email: formData.email, role: "User", id: Date.now() });
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card fade-in">
        <div className="text-center mb-4">
          <div style={{fontSize:"2rem"}}>👋</div>
          <h3 className="mt-2">Welcome Back</h3>
          <p className="text-muted small">Access your personal wellbeing dashboard</p>
        </div>

        <div className="d-flex justify-content-center mb-4 bg-light rounded-pill p-1" style={{border: "1px solid #e2e8f0"}}>
          <button className={`btn w-50 rounded-pill ${mode === "login" ? "btn-primary shadow-sm" : "btn-light text-muted border-0"}`} onClick={() => setMode("login")}>Login</button>
          <button className={`btn w-50 rounded-pill ${mode === "register" ? "btn-primary shadow-sm" : "btn-light text-muted border-0"}`} onClick={() => setMode("register")}>Register</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Full Name / Alias</label>
                <input type="text" name="fullName" className="form-control" placeholder="John Doe or 'Phoenix'" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Preferred Language</label>
                <select name="language" className="form-control" onChange={handleChange}>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi / हिन्दी</option>
                  <option value="Spanish">Spanish / Español</option>
                </select>
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="anonCheck" name="anonymous" onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}/>
                <label className="form-check-label small fw-bold text-muted mt-1" htmlFor="anonCheck">
                  Use Anonymous Mode (Hide personal details)
                </label>
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="small text-muted mb-1 fw-bold">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="you@domain.com" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="small text-muted mb-1 fw-bold">Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" onChange={handleChange} required />
          </div>
          <button className="btn btn-primary btn-premium w-100">{mode === "login" ? "Secure Login" : "Create Account"}</button>
        </form>
      </div>
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
    <div className="layout-app fade-in">
      <div className="layout-sidebar">
        <div className="sidebar-logo">
          <span>✨</span> Aura Wellbeing
        </div>
        <div className={`sidebar-nav-item ${view === "home" ? "active" : ""}`} onClick={() => setView("home")}>
          <span>🏠</span> Overview
        </div>
        <div className={`sidebar-nav-item ${view === "book" ? "active" : ""}`} onClick={() => setView("book")}>
          <span>📅</span> Book Session
        </div>
        <div className={`sidebar-nav-item ${view === "prescriptions" ? "active" : ""}`} onClick={() => setView("prescriptions")}>
          <span>📝</span> Plans & Targets
        </div>
        <div className={`sidebar-nav-item ${view === "forum" ? "active" : ""}`} onClick={() => setView("forum")}>
          <span>💬</span> Community
        </div>
        <div className={`sidebar-nav-item ${view === "resources" ? "active" : ""}`} onClick={() => setView("resources")}>
          <span>📚</span> Resources
        </div>
        <div className={`sidebar-nav-item ${view === "assessments" ? "active" : ""}`} onClick={() => setView("assessments")}>
          <span>🧠</span> Assessments
        </div>
        <div style={{marginTop: "auto", paddingTop:"40px"}}>
          <div className="sidebar-nav-item text-danger" onClick={onLogout}>
            <span>🚪</span> Secure Logout
          </div>
        </div>
      </div>

      <div className="layout-main">
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="mb-1 fw-bold" style={{letterSpacing:"-0.02em"}}>Hello, {authUser.name.split(" ")[0]}</h2>
            <p className="text-muted m-0">Here is what's happening with your wellbeing today.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
             <div style={{width:"40px", height:"40px", borderRadius:"50%", background:"var(--primary)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>
                {authUser.name.charAt(0)}
             </div>
          </div>
        </header>

        {view === "home" && (
          <div className="fade-in">
            <h5 className="mb-4 fw-bold">Upcoming Sessions</h5>
            {myAppointments.length === 0 ? (
              <div className="premium-card text-center py-5">
                <div style={{fontSize:"3rem", color:"#e2e8f0"}} className="mb-3">📅</div>
                <h5 className="text-muted">No sessions scheduled</h5>
                <button className="btn btn-primary btn-premium mt-3" onClick={()=>setView("book")}>Book a Consultation</button>
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
                    <div style={{width:"80px", height:"80px", borderRadius:"50%", background:"#e0e7ff", margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem"}}>👨‍⚕️</div>
                    <h5 className="fw-bold">{c.name}</h5>
                    <p className="text-muted small mb-4">{c.qualification}</p>
                    
                    <div className="bg-light p-3 rounded-3 mb-3 text-start">
                      <label className="small fw-bold text-muted mb-1">Select Date</label>
                      <input type="date" className="form-control form-control-sm mb-2 border-0" id={`date-${c.id}`} style={{background:"white"}}/>
                      <label className="small fw-bold text-muted mb-1">Select Time</label>
                      <input type="time" className="form-control form-control-sm border-0" id={`time-${c.id}`} style={{background:"white"}}/>
                    </div>

                    <button className="btn btn-primary btn-premium w-100" onClick={() => {
                      const d = document.getElementById(`date-${c.id}`).value;
                      const t = document.getElementById(`time-${c.id}`).value;
                      if(d && t) handleBookSelect(c, d, t);
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
            <div className="premium-card w-100" style={{maxWidth:"450px"}}>
              <div className="text-center mb-4">
                 <div style={{fontSize:"2rem", marginBottom:"10px"}}>💳</div>
                 <h4 className="fw-bold">Secure Checkout</h4>
              </div>
              <div className="bg-light p-3 rounded-3 mb-4">
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Consultant</span><span className="fw-bold">Dr. {bookingData.consultant.name}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Date</span><span className="fw-bold">{bookingData.date}</span></div>
                <div className="d-flex justify-content-between mb-2 small"><span className="text-muted">Time</span><span className="fw-bold">{bookingData.time}</span></div>
                <hr className="my-2"/>
                <div className="d-flex justify-content-between"><span className="text-muted">Total</span><span className="fw-bold text-primary fs-5">$50.00</span></div>
              </div>
              
              <div className="mb-3"><input type="text" className="form-control" placeholder="Card Number (**** **** **** ****)"/></div>
              <div className="row g-2 mb-4">
                <div className="col-6"><input type="text" className="form-control" placeholder="MM/YY"/></div>
                <div className="col-6"><input type="password" className="form-control" placeholder="CVV ***"/></div>
              </div>
              <p className="text-center text-muted small mb-4">🔒 256-bit AES Encryption</p>
              <button className="btn btn-primary btn-premium w-100" onClick={handlePaymentSuccess}>Confirm Payment</button>
              <button className="btn btn-link text-muted w-100 mt-2 text-decoration-none" onClick={()=>setView("book")}>Cancel</button>
            </div>
          </div>
        )}

        {view.startsWith("consult-room") && (
          <div className="fade-in consultation-wrapper row g-0">
             <div className="col-lg-8 video-stream">
                <div className="text-center">
                  <div style={{fontSize:"3rem", opacity:0.5}} className="mb-2">📷</div>
                  <p className="text-white-50 m-0">End-to-End Encrypted Video</p>
                </div>
                <div className="video-controls-overlay">
                   <button className="ctrl-btn">🎤</button>
                   <button className="ctrl-btn">📹</button>
                   <button className="ctrl-btn">💻</button>
                   <button className="ctrl-btn danger" onClick={() => setView("home")}>☎</button>
                </div>
             </div>
             <div className="col-lg-4 chat-panel">
                <div className="p-3 border-bottom text-center fw-bold text-muted small text-uppercase tracking-widest">
                  Secure Chat
                </div>
                <div className="chat-history">
                   <div className="msg-bubble system">Connection secured. Dr. Smith joined.</div>
                   <div className="msg-bubble them">Hello, I am ready when you are.</div>
                   <div className="msg-bubble me">Joining with video now!</div>
                </div>
                <div className="chat-composer">
                   <input type="text" placeholder="Type a secure message..." />
                   <button className="btn btn-primary text-white" style={{borderRadius:"50%", width:"42px", height:"42px", padding:0}}>➤</button>
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
                          <label key={idx} className="d-flex align-items-center gap-3 p-3 border rounded-3 cursor-pointer" style={{transition: "all 0.2s"}}>
                            <input type="checkbox" className="form-check-input mt-0" defaultChecked={t.completed} style={{width:"1.2rem", height:"1.2rem"}} />
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
                    <div className="text-center" style={{minWidth:"60px"}}>
                      <div className="text-primary fw-bold fs-4">{f.replies.length}</div>
                      <div className="small text-muted">Replies</div>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{fontSize:"1.1rem"}}>{f.title}</h6>
                      <p className="text-muted small mb-2">{f.content.substring(0,80)}...</p>
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
                <button className="btn btn-outline-primary btn-sm fw-bold border-2" onClick={() => alert("Simulating mobile scan and storing securely locally...")}>Scan Local Docs 📱</button>
             </div>
             <p className="text-muted mb-4 small">Access curated books, audio, and videos to aid your mental wellbeing journey.</p>
             <div className="row g-4 mb-4">
               {["Audio: Guided Relaxation", "Book: The Mindful Path", "Video: Managing Stress"].map((res, i) => (
                 <div key={i} className="col-lg-4 col-md-6">
                    <div className="premium-card text-center">
                      <div style={{fontSize:"2rem"}} className="mb-3">{res.includes("Audio") ? "🎧" : res.includes("Video") ? "▶️" : "📖"}</div>
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
                  <div style={{fontSize:"2rem"}}>🤖</div>
                  <div>
                    <h6 className="fw-bold mb-0">AI Content Generator</h6>
                    <p className="text-muted small m-0">Dynamic custom books, stories, and audio based on personality.</p>
                  </div>
                </div>
                <button className="btn btn-secondary btn-premium w-100 mt-2" onClick={() => alert("AI generating personalized books, stories, and audio based on your recent 16-personality assessment...")}>Generate Customized Resources 🪄</button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ---------------- CONSULTANT FLOW: REGISTRATION ---------------- */
function ConsultantRegistration({ consultants, setConsultants }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", qualification: "", license: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const aiScore = Math.floor(Math.random() * 15) + 85; 
    setConsultants(prev => [...prev, {
      id: Date.now(), ...formData, status: "Pending",
      aiEvaluation: { score: aiScore, notes: `Documents Authenticated. Screening criteria passed with ${aiScore}% confidence.` },
      feedback: ""
    }]);
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="auth-wrapper">
      <div className="glass-card text-center fade-in">
        <div style={{fontSize:"3rem"}} className="mb-3">🧠</div>
        <h3 className="fw-bold mb-3">AI Evaluation in Progress</h3>
        <p className="text-muted mb-4">Our advanced models are verifying your credentials. An administrator will review the findings shortly.</p>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
      </div>
    </div>
  );

  return (
    <div className="auth-wrapper">
      <div className="glass-card fade-in" style={{maxWidth: "600px"}}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Partner with Aura</h3>
          <p className="text-muted small">Join our network of elite mental health professionals.</p>
        </div>
        <div className="alert bg-primary bg-opacity-10 text-primary border-0 rounded-3 mb-4 small fw-medium">
          ℹ️ Your application will undergo immediate AI-driven credential verification post-submission.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="small fw-bold text-muted mb-1">Full Name</label>
              <input type="text" className="form-control" onChange={e=>setFormData({...formData, fullName:e.target.value})} required/>
            </div>
            <div className="col-md-6">
              <label className="small fw-bold text-muted mb-1">Email Address</label>
              <input type="email" className="form-control" onChange={e=>setFormData({...formData, email:e.target.value})} required/>
            </div>
            <div className="col-12">
              <label className="small fw-bold text-muted mb-1">Credentials / Qualification</label>
              <input type="text" className="form-control" onChange={e=>setFormData({...formData, qualification:e.target.value})} placeholder="e.g. Psy.D, Clinical Psychology" required/>
            </div>
            <div className="col-12">
              <label className="small fw-bold text-muted mb-1">Verification Documents</label>
              <div className="border border-dashed p-4 text-center rounded-3 bg-light cursor-pointer" style={{borderColor: "#cbd5e1"}}>
                <div style={{fontSize:"2rem"}} className="text-muted mb-2">📄</div>
                <div className="small text-muted fw-medium">Click to upload PDFs of your licenses</div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-premium w-100 mt-2">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- ADMIN DASHBOARD: STATUS GOVERNANCE ---------------- */
function Admin({ consultants, setConsultants }) {
  const navigate = useNavigate();

  const updateStatus = (id, newStatus, feedback="") => {
    setConsultants(consultants.map(c => c.id === id ? { ...c, status: newStatus, feedback } : c));
  };

  const pending = consultants.filter(c => c.status === "Pending").length;
  const approved = consultants.filter(c => c.status === "Approved").length;

  return (
    <div className="layout-app fade-in">
      <div className="layout-sidebar" style={{background: "#0f172a", color: "white", borderRight:"none"}}>
        <div className="sidebar-logo text-white">
          <span>🛡️</span> Aura Command
        </div>
        <div className="sidebar-nav-item active text-white" style={{background: "rgba(255,255,255,0.1)"}}>
          <span>👨‍⚕️</span> Vendor Governance
        </div>
        <div className="sidebar-nav-item" style={{color: "#94a3b8"}}>
          <span>📊</span> System Metrics
        </div>
        <div className="sidebar-nav-item" style={{color: "#94a3b8"}}>
          <span>⚙️</span> Security Logs
        </div>
        <div style={{marginTop: "auto", paddingTop:"40px"}}>
          <button className="btn btn-outline-light w-100" onClick={() => navigate("/")}>Exit Command</button>
        </div>
      </div>

      <div className="layout-main">
        <header className="mb-5">
          <h2 className="mb-1 fw-bold">Governance & Compliance</h2>
          <p className="text-muted m-0">Manage multi-vendor evaluations and platform security.</p>
        </header>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
             <div className="stat-box">
                <div className="title">Pending Screening</div>
                <div className="value text-warning">{pending}</div>
             </div>
          </div>
          <div className="col-md-4">
             <div className="stat-box">
                <div className="title">Active Providers</div>
                <div className="value text-success">{approved}</div>
             </div>
          </div>
          <div className="col-md-4">
             <div className="stat-box">
                <div className="title">System Health</div>
                <div className="value text-primary">100%</div>
             </div>
          </div>
        </div>

        <div className="premium-card">
          <h5 className="fw-bold mb-4">Vendor Evaluation Pipeline</h5>
          <div className="table-responsive">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>AI Verification</th>
                  <th>Compliance Status</th>
                  <th className="text-end">Command Action</th>
                </tr>
              </thead>
              <tbody>
                {consultants.length === 0 ? <tr><td colSpan="4" className="text-center text-muted py-4">No pending applications.</td></tr> : consultants.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="fw-bold">{c.name}</div>
                      <div className="small text-muted">{c.email}</div>
                    </td>
                    <td>
                      {c.aiEvaluation ? (
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-1">
                             <div className="progress w-50" style={{height:"6px"}}>
                               <div className="progress-bar bg-success" style={{width: `${c.aiEvaluation.score}%`}}></div>
                             </div>
                             <span className="small fw-bold text-success">{c.aiEvaluation.score}%</span>
                          </div>
                          <div className="small text-muted" style={{maxWidth:"250px", fontSize:"0.75rem"}}>{c.aiEvaluation.notes}</div>
                        </div>
                      ) : <span className="small text-muted border px-2 py-1 rounded-pill">Manual Review Required</span>}
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 fw-medium ${
                        c.status === "Approved" ? "bg-success bg-opacity-10 text-success" : 
                        c.status === "Rejected" ? "bg-warning bg-opacity-10 text-warning" : 
                        c.status === "Blacklisted" ? "bg-danger bg-opacity-10 text-danger" : 
                        "bg-secondary bg-opacity-10 text-secondary"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-success fw-bold px-3 border-0" onClick={() => updateStatus(c.id, "Approved")}>Approve</button>
                        <button className="btn btn-sm btn-light text-dark fw-bold px-3 border" onClick={() => {
                          const f = prompt("Enter required remediation feedback:");
                          if(f) updateStatus(c.id, "Rejected", f);
                        }}>Reject</button>
                        <button className="btn btn-sm btn-danger fw-bold px-3 border-0" onClick={() => {
                          if(window.confirm("Permanently ban vendor?")) updateStatus(c.id, "Blacklisted", "Policy Violation");
                        }}>Ban</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
      { id: 999, userId: 101, consultantName: "Sarah Jenkins", diagnosis: "Generalized Anxiety", notes: "Patient making good progress. Continue CBT.", targets: [{task: "15 min Guided Mindfulness", completed: false}, {task:"Journal daily triggers", completed: true}] }
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
            onLogout={() => { setAuthUser(null); window.location.href="/"; }} 
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