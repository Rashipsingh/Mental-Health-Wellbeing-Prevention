import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default PageNavigation;
