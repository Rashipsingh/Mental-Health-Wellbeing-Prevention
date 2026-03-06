import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

/* ---------------- LANDING PAGE ---------------- */

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="card shadow-lg p-5" style={{ width: "450px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Mental Wellbeing And Prevention</h2>
        <p className="text-center text-muted mb-4">
          Select your role to continue
        </p>

        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/user")}>
            User
          </button>

          <button className="btn btn-success btn-lg" onClick={() => navigate("/consultant")}>
            Consultant
          </button>

          <button className="btn btn-dark btn-lg" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- USER PAGE ---------------- */

function User() {

  const [mode, setMode] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    language: "English",
    anonymous: false
  });

  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;

    setRegData({
      ...regData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage("Login Successful (Demo)");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setMessage("Registration Successful (Demo)");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#8e52ee",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div className="card shadow p-4" style={{ width: "500px", borderRadius: "15px" }}>

        <h3 className="text-center mb-3">User Access</h3>

        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn me-2 ${mode === "login" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => { setMode("login"); setMessage(""); }}
          >
            Login
          </button>

          <button
            className={`btn ${mode === "register" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => { setMode("register"); setMessage(""); }}
          >
            Register
          </button>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        {mode === "login" ? (

          <form onSubmit={handleLoginSubmit}>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Login
            </button>

          </form>

        ) : (

          <form onSubmit={handleRegisterSubmit}>

            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={regData.fullName}
                onChange={handleRegChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={regData.email}
                onChange={handleRegChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={regData.phone}
                onChange={handleRegChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={regData.password}
                onChange={handleRegChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Preferred Language</label>
              <select
                name="language"
                className="form-select"
                value={regData.language}
                onChange={handleRegChange}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Gujarati</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="anonymous"
                className="form-check-input"
                checked={regData.anonymous}
                onChange={handleRegChange}
              />
              <label className="form-check-label">
                Register as Anonymous
              </label>
            </div>

            <button className="btn btn-success w-100">
              Register
            </button>

          </form>

        )}

      </div>

    </div>
  );
}

/* ---------------- CONSULTANT REGISTRATION ---------------- */
function Consultant({ consultants, setConsultants }) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    license: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [status] = useState("Pending");

  const existingConsultant = consultants.find(
    (c) => c.email === formData.email
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newConsultant = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      license: formData.license,
      status: "Pending",
      feedback: ""
    };

    setConsultants(prev => [...prev, newConsultant]);

    setSubmitted(true);
  };


  /* UPDATE APPLICATION FUNCTION */
  const handleUpdate = () => {

    // remove old consultant entry
    setConsultants(
      consultants.filter(c => c.email !== existingConsultant.email)
    );

    // refill form with previous data
    setFormData({
      fullName: existingConsultant.name,
      email: existingConsultant.email,
      phone: existingConsultant.phone,
      qualification: existingConsultant.qualification,
      license: existingConsultant.license
    });

    // reopen form
    setSubmitted(false);

  };


  return (
    <div style={{
      minHeight: "100vh",
      background: "#8e52ee",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div className="card shadow p-4" style={{ width: "500px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4">Consultant Registration</h3>

        {submitted || existingConsultant ? (
          <div className="text-center">

            <h4 className="mb-3">Application Submitted</h4>

            <p><strong>Name:</strong> {existingConsultant?.name || formData.fullName}</p>
            <p><strong>Email:</strong> {existingConsultant?.email || formData.email}</p>

            <div className="mt-3">
              <span className="badge bg-warning p-2">
                Status: {existingConsultant ? existingConsultant.status : status}
              </span>
            </div>

            {existingConsultant?.status === "Approved" && (
              <p className="text-success mt-2">
                Your profile has been approved. You can now provide consultations.
              </p>
            )}

            {existingConsultant?.status === "Rejected" && (
              <div className="mt-2">

                <p className="text-danger">
                  Your application was rejected.
                </p>

                <button
                  className="btn btn-warning btn-sm mt-2"
                  onClick={handleUpdate}
                >
                  Update Application
                </button>

              </div>
            )}

            {existingConsultant?.status === "Suspended" && (
              <p className="text-danger mt-2">
                Your account has been suspended by the admin.
              </p>
            )}

            {/* Admin Feedback */}
            {existingConsultant?.feedback && (
              <div className="card mt-3 p-3 bg-light">
                <h6>Admin Feedback</h6>
                <p className="text-muted mb-0">
                  {existingConsultant.feedback}
                </p>
              </div>
            )}

          </div>
        ) : (

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Qualification</label>
              <input
                type="text"
                name="qualification"
                className="form-control"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>License Number</label>
              <input
                type="text"
                name="license"
                className="form-control"
                value={formData.license}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Application
            </button>

          </form>
        )}

      </div>
    </div>
  );
}



/* ---------------- ADMIN DASHBOARD ---------------- */



function Admin({ consultants, setConsultants }) {

  const navigate = useNavigate();

  const updateStatus = (id, newStatus) => {
    setConsultants(
      consultants.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  const pending = consultants.filter(c => c.status === "Pending").length;
  const approved = consultants.filter(c => c.status === "Approved").length;
  const rejected = consultants.filter(c => c.status === "Rejected").length;
  const suspended = consultants.filter(c => c.status === "Suspended").length;

  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackConsultant, setFeedbackConsultant] = useState(null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#8e52ee" }}>

      {/* Sidebar */}
      <div style={{
        width: "230px",
        background: "#5e43d6",
        color: "white",
        padding: "25px",
        minHeight: "100vh"
      }}>

        <h4 className="mb-4">Mental-Wellbeing</h4>

        <div className="mb-3" style={{cursor:"pointer"}} onClick={() => navigate("/admin")}>
          📊 Dashboard
        </div>

        <div className="mb-3">👨‍⚕️ Consultants</div>
        <div className="mb-3">👤 Users</div>
        <div className="mb-3">📑 Reports</div>
        <div className="mb-3">⚙ Settings</div>

      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard</h2>

          <div>
            <span className="me-3 text-muted">Welcome, Admin</span>
            <button className="btn btn-outline-dark btn-sm">Logout</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h6 className="text-muted">Pending</h6>
              <h2 className="text-warning">{pending}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h6 className="text-muted">Approved</h6>
              <h2 className="text-success">{approved}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h6 className="text-muted">Rejected</h6>
              <h2 className="text-danger">{rejected}</h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h6 className="text-muted">Suspended</h6>
              <h2 className="text-secondary">{suspended}</h2>
            </div>
          </div>

        </div>

        {/* Consultant Table */}
        <div className="card shadow p-4">

          <h4 className="mb-3">Consultant Applications</h4>

          <table className="table table-bordered table-hover">

            <thead style={{ background: "#667eea", color: "white" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {consultants.map((consultant) => (

                <tr key={consultant.id}>

                  <td>{consultant.name}</td>
                  <td>{consultant.email}</td>

                  <td>
                    {consultant.status === "Pending" && (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                    {consultant.status === "Approved" && (
                      <span className="badge bg-success">Approved</span>
                    )}
                    {consultant.status === "Rejected" && (
                      <span className="badge bg-danger">Rejected</span>
                    )}
                    {consultant.status === "Suspended" && (
                      <span className="badge bg-secondary">Suspended</span>
                    )}
                  </td>

                  <td>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(consultant.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => updateStatus(consultant.id, "Rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateStatus(consultant.id, "Suspended")}
                    >
                      Suspend
                    </button>

                    <button
                      className="btn btn-warning btn-sm ms-2"
                      onClick={() => {
                        setFeedbackConsultant(consultant);
                        setFeedbackText("");
                      }}
                    >
                      Feedback
                    </button>

                  </td>

                  <td>

                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => setSelectedConsultant(consultant)}
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}
            </tbody>

          </table>

          {/* Consultant Details */}
          {selectedConsultant && (

            <div className="card mt-4 p-4 shadow">

              <h4>Consultant Details</h4>

              <p><strong>Name:</strong> {selectedConsultant.name}</p>
              <p><strong>Email:</strong> {selectedConsultant.email}</p>
              <p><strong>Phone:</strong> {selectedConsultant.phone}</p>
              <p><strong>Qualification:</strong> {selectedConsultant.qualification}</p>
              <p><strong>License:</strong> {selectedConsultant.license}</p>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => setSelectedConsultant(null)}
              >
                Close
              </button>

            </div>

          )}

          {/* Feedback Panel */}
          {feedbackConsultant && (

            <div className="card mt-4 p-4 shadow">

              <h4>Write Feedback</h4>

              <p><strong>Consultant:</strong> {feedbackConsultant.name}</p>

              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="Enter feedback..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />

              <button
                className="btn btn-success me-2"
                onClick={() => {

                  setConsultants(
                    consultants.map((c) =>
                      c.id === feedbackConsultant.id
                        ? { ...c, feedback: feedbackText }
                        : c
                    )
                  );

                  setFeedbackConsultant(null);
                }}
              >
                Save Feedback
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setFeedbackConsultant(null)}
              >
                Cancel
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


/* ---------------- MAIN ROUTER ---------------- */

function App() {

  const [consultants, setConsultants] = useState(() => {
    const saved = localStorage.getItem("consultants");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("consultants", JSON.stringify(consultants));
  }, [consultants]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<User />} />

        <Route
          path="/consultant"
          element={<Consultant consultants={consultants} setConsultants={setConsultants} />}
        />

        <Route
          path="/admin"
          element={<Admin consultants={consultants} setConsultants={setConsultants} />}
        />

      </Routes>
    </Router>
  );
}

export default App;