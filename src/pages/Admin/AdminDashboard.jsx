import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNavigation from '../../components/layout/PageNavigation';

function Admin({ consultants, setConsultants, reviews, setReviews }) {
  const navigate = useNavigate();
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [adminView, setAdminView] = useState("consultants");
  const [selectedUser, setSelectedUser] = useState(null);

  const updateStatus = (id, newStatus, feedback = "") => {
    setConsultants(consultants.map(c => c.id === id ? { ...c, status: newStatus, feedback } : c));
  };

  const pending = consultants.filter(c => c.status === "Pending").length;
  const approved = consultants.filter(c => c.status === "Approved").length;

  const dummyUsers = [
    { id: 1, name: "Alice Smith", email: "alice@example.com", joined: "2026-01-15", status: "Active", riskLevel: "Low" },
    { id: 2, name: "Bob Jones", email: "bob@example.com", joined: "2026-02-01", status: "Active", riskLevel: "Medium" },
    { id: 3, name: "Charlie Day", email: "charlie@example.com", joined: "2026-03-05", status: "Inactive", riskLevel: "High" }
  ];

  const renderContent = () => {
    switch (adminView) {
      case "profile":
        return (
          <div className="klues-panel p-5 fade-in text-center mx-auto mt-4" style={{ maxWidth: "600px" }}>
            <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-3 shadow" style={{ width: "90px", height: "90px", fontSize: "2.5rem", fontWeight: "bold" }}>A</div>
            <h3 className="fw-bold mb-1">Admin User</h3>
            <p className="text-muted mb-4">admin@kleverklues.com</p>
            <div className="row g-4 text-start mt-2">
              <div className="col-md-6">
                <div className="bg-light p-3 rounded-3 border-0 shadow-sm h-100">
                  <p className="small fw-bold text-muted text-uppercase mb-1">Role</p>
                  <p className="fw-medium mb-0">Super Administrator</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bg-light p-3 rounded-3 border-0 shadow-sm h-100">
                  <p className="small fw-bold text-muted text-uppercase mb-1">Last Login</p>
                  <p className="fw-medium mb-0">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "report":
        return (
          <div className="klues-panel p-4 fade-in">
            <h5 className="fw-bold text-main mb-4">Platform Activity Report</h5>
            <div className="d-flex align-items-end justify-content-around gap-2 rounded bg-light p-4" style={{ height: "300px", border: "1px solid rgba(0,0,0,0.05)" }}>
              {[{ month: 'Oct', val: 30 }, { month: 'Nov', val: 50 }, { month: 'Dec', val: 40 }, { month: 'Jan', val: 70 }, { month: 'Feb', val: 90 }, { month: 'Mar', val: 100 }].map(d => (
                <div key={d.month} className="d-flex flex-column align-items-center flex-grow-1 h-100 justify-content-end">
                  <div className="bg-primary rounded-top" style={{ width: '100%', maxWidth: '50px', height: `${d.val}%`, transition: 'height 1s ease-out', opacity: 0.5 + (d.val / 200) }}></div>
                  <span className="small text-muted mt-3 fw-bold">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "users":
        return (
          <div className="mb-4 fade-in w-100">
            <h5 className="fw-bold text-main mb-4">User Management</h5>
            {selectedUser ? (
              <div className="klues-panel p-4 fade-in">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                  <h6 className="fw-bold mb-0 fs-5">User Details: {selectedUser.name}</h6>
                  <button className="btn btn-outline-secondary btn-sm fw-bold px-3" onClick={() => setSelectedUser(null)}>← Back to List</button>
                </div>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <p className="small text-muted mb-1 fw-bold text-uppercase">Email</p>
                    <p className="fw-medium mb-0">{selectedUser.email}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-muted mb-1 fw-bold text-uppercase">Joined Date</p>
                    <p className="fw-medium mb-0">{selectedUser.joined}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-muted mb-1 fw-bold text-uppercase">Status</p>
                    <p className="fw-medium mb-0"><span className={`badge rounded-pill px-3 ${selectedUser.status === 'Active' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>{selectedUser.status}</span></p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-muted mb-1 fw-bold text-uppercase">Risk Level</p>
                    <p className="fw-medium mb-0">{selectedUser.riskLevel}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="klues-panel p-0 overflow-hidden">
                <div className="table-responsive">
                  <table className="table mb-0 w-100">
                    <thead className="bg-light">
                      <tr>
                        <th className="px-4 py-3 border-0 small text-muted font-weight-bold">Name</th>
                        <th className="px-4 py-3 border-0 small text-muted font-weight-bold">Email</th>
                        <th className="px-4 py-3 border-0 small text-muted font-weight-bold">Status</th>
                        <th className="px-4 py-3 border-0 small text-muted font-weight-bold text-end">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyUsers.map(u => (
                        <tr key={u.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                          <td className="px-4 py-3 fw-bold align-middle">{u.name}</td>
                          <td className="px-4 py-3 text-muted align-middle">{u.email}</td>
                          <td className="px-4 py-3 align-middle"><span className={`badge rounded-pill px-3 py-2 ${u.status === 'Active' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>{u.status}</span></td>
                          <td className="px-4 py-3 text-end align-middle"><button className="btn btn-sm btn-light text-primary fw-bold px-3 border" onClick={() => setSelectedUser(u)}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      case "consultants":
        return (
          <div className="fade-in w-100">
            <div className="row g-4 mb-5">
              <div className="col-md-3">
                <div className="klues-panel p-4 h-100">
                  <div className="fw-bold text-muted small text-uppercase">Pending</div>
                  <div className="fs-1 fw-bold text-warning mt-2">{pending}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="klues-panel p-4 h-100">
                  <div className="fw-bold text-muted small text-uppercase">Approve</div>
                  <div className="fs-1 fw-bold text-success mt-2">{approved}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="klues-panel p-4 h-100">
                  <div className="fw-bold text-muted small text-uppercase">Reject</div>
                  <div className="fs-1 fw-bold text-danger mt-2">{consultants.filter(c => c.status === "Rejected").length}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="klues-panel p-4 h-100">
                  <div className="fw-bold text-muted small text-uppercase">Suspend</div>
                  <div className="fs-1 fw-bold text-secondary mt-2">{consultants.filter(c => c.status === "Blacklisted" || c.status === "Suspended").length}</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold text-main mb-4">Consultant Status</h5>
              {selectedConsultant ? (
                <div className="klues-panel p-4 fade-in">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h6 className="fw-bold mb-0 fs-5">Application Details: {selectedConsultant.fullName || selectedConsultant.name}</h6>
                    <button className="btn btn-outline-secondary btn-sm fw-bold px-3" onClick={() => setSelectedConsultant(null)}>← Back to List</button>
                  </div>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Email</p>
                      <p className="fw-medium mb-0">{selectedConsultant.email}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Date of Birth</p>
                      <p className="fw-medium mb-0">{selectedConsultant.dob || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Address</p>
                      <p className="fw-medium mb-0">{selectedConsultant.address || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Contact Number</p>
                      <p className="fw-medium mb-0">{selectedConsultant.contact || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Nationality</p>
                      <p className="fw-medium mb-0">{selectedConsultant.nationality || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Qualification</p>
                      <p className="fw-medium mb-0">{selectedConsultant.qualification || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">University & Year</p>
                      <p className="fw-medium mb-0">{selectedConsultant.university || "N/A"} ({selectedConsultant.passingYear || "N/A"})</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">License Number</p>
                      <p className="fw-medium mb-0">{selectedConsultant.license || "N/A"}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Specialty</p>
                      <p className="fw-medium mb-0">{selectedConsultant.specialty || "N/A"}</p>
                    </div>
                    <div className="col-12">
                      <p className="small text-muted mb-1 fw-bold text-uppercase">Experience Details</p>
                      <div className="bg-light p-3 rounded-3 mt-1" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                        <p className="fw-medium mb-0" style={{ whiteSpace: "pre-wrap" }}>{selectedConsultant.experience || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 pt-3 border-top flex-wrap">
                    <button className="klues-btn klues-btn-primary px-4" onClick={() => { updateStatus(selectedConsultant.id, "Approved"); setSelectedConsultant(null); }}>Approve</button>
                    <button className="btn btn-outline-danger fw-bold px-4" onClick={() => { updateStatus(selectedConsultant.id, "Rejected", prompt("Enter rejection feedback:")); setSelectedConsultant(null); }}>Reject</button>
                    <button className="btn btn-outline-secondary fw-bold px-4" onClick={() => { updateStatus(selectedConsultant.id, "Suspended", "Suspended by Admin"); setSelectedConsultant(null); }}>Suspend</button>
                  </div>
                </div>
              ) : (
                <div className="klues-panel p-0 overflow-hidden">
                  <div className="table-responsive">
                    <table className="table mb-0 w-100">
                      <thead className="bg-light">
                        <tr>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold" style={{ whiteSpace: "nowrap" }}>Name</th>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold" style={{ whiteSpace: "nowrap" }}>Email</th>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold" style={{ whiteSpace: "nowrap" }}>Status</th>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold" style={{ whiteSpace: "nowrap" }}>Action</th>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold" style={{ whiteSpace: "nowrap" }}>Feedback</th>
                          <th className="px-4 py-3 border-0 small text-muted font-weight-bold text-end" style={{ whiteSpace: "nowrap" }}>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultants.length === 0 ? <tr><td colSpan="6" className="text-center text-muted py-5">No applications found.</td></tr> : consultants.map(c => (
                          <tr key={c.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            <td className="px-4 py-3 align-middle">
                              <div className="fw-bold text-nowrap">{c.name || c.fullName}</div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <div className="small text-muted">{c.email}</div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <span className={`badge rounded-pill px-3 py-2 fw-medium ${c.status === "Approved" ? "bg-success bg-opacity-10 text-success" :
                                c.status === "Rejected" ? "bg-warning bg-opacity-10 text-warning" :
                                  c.status === "Blacklisted" || c.status === "Suspended" ? "bg-danger bg-opacity-10 text-danger" :
                                    "bg-secondary bg-opacity-10 text-secondary"
                                }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 align-middle" style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-success fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Approved")}>Approve</button>
                                <button className="btn btn-sm btn-warning text-dark fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Rejected", prompt("Enter rejection feedback:"))}>Reject</button>
                                <button className="btn btn-sm btn-danger fw-bold px-2 border-0" onClick={() => updateStatus(c.id, "Suspended", "Suspended by Admin")}>Suspend</button>
                              </div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <input type="text" className="klues-input-light form-control-sm py-1" style={{ minWidth: "150px" }} placeholder="Write feedback..." onBlur={(e) => {
                                if (e.target.value !== c.feedback) updateStatus(c.id, c.status, e.target.value);
                              }} defaultValue={c.feedback || ""} />
                            </td>
                            <td className="px-4 py-3 align-middle text-end">
                              <button className="btn btn-sm btn-light text-primary fw-bold px-3 border" onClick={() => setSelectedConsultant(c)}>View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="fade-in w-100">
            <h5 className="fw-bold text-main mb-4">Review Moderation</h5>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="klues-panel p-4 text-center">
                  <div className="fw-bold text-muted small text-uppercase">Pending</div>
                  <div className="fs-1 fw-bold text-warning mt-2">{(reviews || []).filter(r => r.status === 'pending').length}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="klues-panel p-4 text-center">
                  <div className="fw-bold text-muted small text-uppercase">Approved</div>
                  <div className="fs-1 fw-bold text-success mt-2">{(reviews || []).filter(r => r.status === 'approved').length}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="klues-panel p-4 text-center">
                  <div className="fw-bold text-muted small text-uppercase">Rejected</div>
                  <div className="fs-1 fw-bold text-danger mt-2">{(reviews || []).filter(r => r.status === 'rejected').length}</div>
                </div>
              </div>
            </div>
            <div className="klues-panel p-0 overflow-hidden">
              <div className="table-responsive">
                <table className="table mb-0 w-100">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold">User</th>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold">Doctor</th>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold">Rating</th>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold">Comment</th>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold">Status</th>
                      <th className="px-4 py-3 border-0 small text-muted fw-bold text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!reviews || reviews.length === 0) ? <tr><td colSpan="6" className="text-center text-muted py-5">No reviews submitted yet.</td></tr> : reviews.map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td className="px-4 py-3 fw-bold align-middle">{r.userName}</td>
                        <td className="px-4 py-3 text-muted align-middle">Dr. {r.consultantName}</td>
                        <td className="px-4 py-3 align-middle" style={{ color: '#f59e0b' }}>{'\u2605'.repeat(r.rating)}{'\u2606'.repeat(5 - r.rating)}</td>
                        <td className="px-4 py-3 align-middle text-muted small" style={{ maxWidth: '200px' }}>{r.comment || '-'}</td>
                        <td className="px-4 py-3 align-middle">
                          <span className={`badge rounded-pill px-3 py-2 fw-medium ${
                            r.status === 'approved' ? 'bg-success bg-opacity-10 text-success' :
                            r.status === 'rejected' ? 'bg-danger bg-opacity-10 text-danger' :
                            'bg-warning bg-opacity-10 text-warning'
                          }`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                        </td>
                        <td className="px-4 py-3 align-middle text-end" style={{ whiteSpace: 'nowrap' }}>
                          <div className="d-flex gap-2 justify-content-end">
                            {r.status !== 'approved' && <button className="btn btn-sm btn-success fw-bold px-2 border-0" onClick={() => setReviews(prev => prev.map(rv => rv.id === r.id ? {...rv, status: 'approved'} : rv))}>Approve</button>}
                            {r.status !== 'rejected' && <button className="btn btn-sm btn-warning text-dark fw-bold px-2 border-0" onClick={() => setReviews(prev => prev.map(rv => rv.id === r.id ? {...rv, status: 'rejected'} : rv))}>Reject</button>}
                            <button className="btn btn-sm btn-outline-danger fw-bold px-2" onClick={() => setReviews(prev => prev.filter(rv => rv.id !== r.id))}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="klues-panel p-4 fade-in w-100 mx-auto" style={{ maxWidth: "800px" }}>
            <h5 className="fw-bold text-main mb-4">Platform Settings</h5>
            <div className="mb-4 pb-4 border-bottom">
              <h6 className="fw-bold mb-3">General Settings</h6>
              <div className="form-check form-switch mt-3 d-flex align-items-center">
                <input className="form-check-input fs-5 mt-0" type="checkbox" id="maintenance" />
                <label className="form-check-label ms-3 fw-medium" htmlFor="maintenance" style={{ cursor: "pointer" }}>Enable Maintenance Mode</label>
              </div>
              <p className="small text-muted mt-2" style={{ marginLeft: "3rem" }}>When enabled, the platform will be unavailable to non-admin users.</p>
            </div>
            <div className="mb-5 pb-2">
              <h6 className="fw-bold mb-3">Notifications</h6>
              <div className="form-check form-switch mt-3 d-flex align-items-center">
                <input className="form-check-input fs-5 mt-0" type="checkbox" id="emailNotif" defaultChecked />
                <label className="form-check-label ms-3 fw-medium" htmlFor="emailNotif" style={{ cursor: "pointer" }}>Send Daily Reports via Email</label>
              </div>
              <p className="small text-muted mt-2" style={{ marginLeft: "3rem" }}>Receive an automated summary of new registrations and activity in your inbox.</p>
            </div>
            <button className="klues-btn klues-btn-primary px-5 py-3 shadow-none fw-bold" onClick={() => alert("Settings saved successfully!")}>Save Settings</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row flex-grow-1 fade-in">
      <div className="klues-sidebar-light admin-sidebar pe-md-3" style={{ width: "260px", padding: "20px 0", flexShrink: 0 }}>
        <div className="sidebar-logo px-4 pb-2">
          Admin Control
        </div>
        <div className={`sidebar-nav-item ${adminView === "profile" ? "active" : ""}`} onClick={() => setAdminView("profile")} style={{ cursor: "pointer" }}>
          Profile
        </div>
        <div className={`sidebar-nav-item ${adminView === "report" ? "active" : ""}`} onClick={() => setAdminView("report")} style={{ cursor: "pointer" }}>
          Report
        </div>
        <div className={`sidebar-nav-item ${adminView === "users" ? "active" : ""}`} onClick={() => { setAdminView("users"); setSelectedUser(null); }} style={{ cursor: "pointer" }}>
          Users
        </div>
        <div className={`sidebar-nav-item ${adminView === "consultants" ? "active" : ""}`} onClick={() => { setAdminView("consultants"); setSelectedConsultant(null); }} style={{ cursor: "pointer" }}>
          Consultants
        </div>
        <div className={`sidebar-nav-item ${adminView === "reviews" ? "active" : ""}`} onClick={() => setAdminView("reviews")} style={{ cursor: "pointer" }}>
          Reviews
        </div>
        <div className={`sidebar-nav-item ${adminView === "settings" ? "active" : ""}`} onClick={() => setAdminView("settings")} style={{ cursor: "pointer" }}>
          Settings
        </div>
        <div style={{ marginTop: "auto", paddingTop: "40px" }} className="px-3 pb-3">
          <button className="klues-btn klues-btn-secondary w-100" onClick={() => navigate("/")}>Exit Admin</button>
        </div>
      </div>

      <div className="layout-main p-3 p-md-5 w-100 d-flex flex-column" style={{ background: "transparent", overflowY: "auto", minWidth: 0 }}>
        {renderContent()}
        <PageNavigation />
      </div>
    </div>
  );
}

export default Admin;
