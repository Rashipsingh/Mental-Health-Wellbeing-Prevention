import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNavigation from '../../components/layout/PageNavigation';

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
    <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4 fade-in">
      <div className="klues-panel" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <h3 className="mt-2 fw-bold" style={{ color: "var(--text-main)" }}>Welcome to Klever Klues</h3>
          <p className="text-muted small">Step into your personal wellbeing space.</p>
        </div>

        <div className="d-flex justify-content-center mb-4 bg-light rounded-pill p-1" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
          <button className={`btn w-50 rounded-pill fw-bold ${mode === "login" ? "text-white shadow-sm" : "btn-light text-muted border-0"}`} style={mode === "login" ? { background: "var(--primary)" } : {}} onClick={() => setMode("login")}>Login</button>
          <button className={`btn w-50 rounded-pill fw-bold ${mode === "register" ? "text-white shadow-sm" : "btn-light text-muted border-0"}`} style={mode === "register" ? { background: "var(--primary)" } : {}} onClick={() => setMode("register")}>Register</button>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          {mode === "register" && (
            <div className="mb-3">
              <label className="small text-muted mb-1 fw-bold">Full Name</label>
              <input type="text" name="fullName" className="klues-input-light" placeholder="John Doe or 'Phoenix'" value={formData.fullName || ""} onChange={handleChange} autoComplete="off" required />
            </div>
          )}
          <div className="mb-3">
            <label className="small text-muted mb-1 fw-bold">Email Address</label>
            <input type="email" name="email" className="klues-input-light" placeholder="Enter your email" value={formData.email || ""} onChange={handleChange} autoComplete="off" required />
          </div>
          {mode === "register" && (
            <>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Phone</label>
                <input type="tel" name="phone" className="klues-input-light" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Alternate Phone Number</label>
                <input type="tel" name="alternatePhone" className="klues-input-light" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="small text-muted mb-1 fw-bold">Preferred Language</label>
                <div className="position-relative">
                  <select name="language" className="klues-input-light" onChange={handleChange} style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none", paddingRight: "30px" }}>
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
            <input type="password" name="password" className="klues-input-light" placeholder="Enter your password" value={formData.password || ""} onChange={handleChange} autoComplete="new-password" required />
          </div>
          <button className="klues-btn klues-btn-primary w-100 mt-2">{mode === "login" ? "Login" : "Create Account"}</button>
        </form>
      </div>
      <PageNavigation />
    </div>
  );
}

export default UserAuth;
