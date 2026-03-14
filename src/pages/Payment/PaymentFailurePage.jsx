import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, RefreshCw, CreditCard, MessageCircleQuestion, Home } from 'lucide-react';

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, slot, date } = location.state || {};

  return (
    <div style={{ minHeight: '100vh', background: '#fffafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="klues-panel text-center p-5 fade-in" style={{ maxWidth: '500px', width: '100%', borderRadius: '32px', border: '1px solid #fee2e2' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#ef444415', 
          color: '#ef4444', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem',
          animation: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both'
        }}>
          <AlertCircle size={40} />
        </div>
        
        <h2 className="fw-800 mb-2">Payment Failed</h2>
        <p className="text-muted mb-4">We couldn't process your payment. Don't worry, no money was deducted from your account.</p>
        
        <div className="bg-light p-4 rounded-4 mb-4 text-start border border-danger border-opacity-10">
          <p className="small text-danger fw-bold mb-2">Possible Reasons:</p>
          <ul className="small text-muted mb-0 ps-3">
            <li>Insufficient balance in card/wallet</li>
            <li>Bank server is temporarily down</li>
            <li>Incorrect card details entered</li>
          </ul>
        </div>

        <div className="d-grid gap-3">
          <button 
            className="klues-btn klues-btn-primary bg-danger border-danger py-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate('/payment', { state: { doctor, slot, date } })}
          >
            <RefreshCw size={18} /> Retry Payment
          </button>
          
          <button 
            className="klues-btn klues-btn-secondary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate('/payment', { state: { doctor, slot, date } })}
          >
            <CreditCard size={18} /> Change Payment Method
          </button>
        </div>

        <div className="d-flex justify-content-center gap-4 mt-5">
          <button className="btn btn-link text-muted p-0 text-decoration-none small d-flex align-items-center gap-1" onClick={() => navigate('/')}>
            <Home size={14} /> Home
          </button>
          <button className="btn btn-link text-muted p-0 text-decoration-none small d-flex align-items-center gap-1" onClick={() => alert('Opening Support...')}>
            <MessageCircleQuestion size={14} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
