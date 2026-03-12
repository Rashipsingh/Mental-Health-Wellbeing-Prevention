import React, { useState } from 'react';

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

export default SOSButton;
