import React, { useState } from 'react';
import PageNavigation from '../../components/layout/PageNavigation';

function ConsultantRegistration({ consultants, setConsultants }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", qualification: "", license: "" });
  const [view, setView] = useState("register"); // 'register', 'statusCheck', 'showStatus'
  const [checkEmail, setCheckEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = consultants.find(c => c.email === formData.email);
    if (!existing) {
      setConsultants(prev => [...prev, {
        id: Date.now(), name: formData.fullName, ...formData, status: "Pending",
        evaluation: { status: "Pending Review", notes: "Documents submitted and awaiting verification." },
        feedback: ""
      }]);
    }

    alert("Application submitted successfully. You can check your status later.");
    setFormData({ fullName: "", email: "", phone: "", qualification: "", license: "" });
  };

  if (view === "statusCheck") {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4 fade-in">
        <div className="klues-panel text-center" style={{ width: "100%", maxWidth: "450px" }}>
          <h4 className="fw-bold mb-3">Check Application Status</h4>
          <p className="text-muted small mb-4">Enter your registered email address to view your latest status.</p>
          <input
            type="email"
            className="klues-input-light mb-3"
            placeholder="Email Address"
            value={checkEmail}
            onChange={(e) => setCheckEmail(e.target.value)}
          />
          <button className="klues-btn klues-btn-primary w-100 mb-4" onClick={() => {
            if (checkEmail) {
              setSubmittedEmail(checkEmail);
              setView("showStatus");
            }
          }}>
            Check Status
          </button>
          <button className="btn btn-link text-muted text-decoration-none w-100 fw-bold" onClick={() => setView("register")}>
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
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4 fade-in">
        <div className="klues-panel text-center" style={{ width: "100%", maxWidth: "450px" }}>
          <h3 className="fw-bold mb-1">Application Status</h3>
          <p className="text-muted fw-bold mb-4">Submitted</p>

          <div className="text-start mb-2 bg-light p-4 rounded-3" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
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

          <button className="klues-btn klues-btn-secondary mt-4 w-100" onClick={() => setView("register")}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4 fade-in">
      <div className="klues-panel" style={{ width: "100%", maxWidth: "650px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Personal Details</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Full Name</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Email ID</label>
                <input type="email" className="klues-input-light" placeholder="you@domain.com" onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Address</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, address: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted mb-1">Date of Birth</label>
                <input type="date" className="klues-input-light" onChange={e => setFormData({ ...formData, dob: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted mb-1">Contact</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, contact: e.target.value })} required />
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Nationality</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, nationality: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Educational Qualifications</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Qualification</label>
                <input type="text" className="klues-input-light" placeholder="MBBS, MD/MS/DNB, etc." onChange={e => setFormData({ ...formData, qualification: e.target.value })} required />
              </div>
              <div className="col-md-8">
                <label className="small fw-bold text-muted mb-1">University Name</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, university: e.target.value })} required />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold text-muted mb-1">Year of Passing</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, passingYear: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Professional Registration</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Valid License Number</label>
                <input type="text" className="klues-input-light" onChange={e => setFormData({ ...formData, license: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-muted mb-3 text-uppercase border-bottom pb-2">Experience Profile</h6>
            <div className="row g-3">
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Details of previous positions</label>
                <textarea className="klues-input-light" rows="3" placeholder="Designation, Organization, Duration in years/months (or N/A)" onChange={e => setFormData({ ...formData, experience: e.target.value })} required></textarea>
              </div>
              <div className="col-12">
                <label className="small fw-bold text-muted mb-1">Specialty / Area of Expertise</label>
                <input type="text" className="klues-input-light" placeholder="e.g., Cardiology, General Medicine" onChange={e => setFormData({ ...formData, specialty: e.target.value })} required />
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

          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="small fw-bold text-muted mb-1">Verification Documents</label>
              <div className="border border-dashed p-4 text-center rounded-3 bg-light cursor-pointer" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "2rem" }} className="text-muted mb-2"></div>
                <div className="small text-muted fw-medium">Click to upload PDFs of your licenses</div>
              </div>
            </div>
          </div>
          <button className="klues-btn klues-btn-primary w-100 mt-2 mb-4">Submit Application</button>

          <div className="text-center pt-3 border-top pb-2">
            <p className="text-muted small mb-3">Already applied?</p>
            <button type="button" className="klues-btn klues-btn-secondary py-2" onClick={() => setView("statusCheck")}>
              Check Application Status
            </button>
          </div>
        </form>
      </div>
      <PageNavigation />
    </div>
  );
}

export default ConsultantRegistration;
