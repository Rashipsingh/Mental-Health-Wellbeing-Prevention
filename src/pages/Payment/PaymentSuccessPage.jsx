import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Download, LayoutDashboard, CalendarDays, Share2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, doctor, slot, date, transactionId, total } = location.state || {};

  const isPharmacy = type === 'Pharmacy';
  const successTitle = isPharmacy ? 'Order Placed Successfully!' : 'Appointment Booked!';
  const successMsg = isPharmacy 
    ? `Your order has been received and is being processed. Thank you for shopping with Klever Klues Pharmacy.`
    : `Your session with Dr. ${doctor?.name || 'your consultant'} has been successfully scheduled and payment received.`;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 0%, #fcfaff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="klues-panel text-center p-5 fade-in" style={{ maxWidth: '550px', width: '100%', borderRadius: '32px', boxShadow: '0 20px 60px rgba(108,99,255,0.12)' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#10b98120', 
          color: '#10b981', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem',
          animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="fw-800 mb-2">{successTitle}</h2>
        <p className="text-muted mb-4">{successMsg}</p>
        
        <div className="bg-light p-4 rounded-4 mb-4 text-start" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted small fw-bold">Transaction ID</span>
            <span className="fw-bold font-monospace">{transactionId || 'TXN' + Date.now()}</span>
          </div>
          
          {isPharmacy ? (
            <div className="d-flex justify-content-between mb-0">
              <span className="text-muted small fw-bold">Total Paid</span>
              <span className="fw-bold">₹{total}</span>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted small fw-bold">Doctor</span>
                <span className="fw-bold">Dr. {doctor?.name}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted small fw-bold">Hospital</span>
                <span className="fw-bold">{doctor?.hospital}</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-muted small fw-bold">Date & Time</span>
                <span className="fw-bold">{date} at {slot}</span>
              </div>
            </>
          )}
        </div>

        <div className="d-grid gap-3">
          <button 
            className="klues-btn klues-btn-primary py-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => alert('Downloading receipt...')}
          >
            <Download size={18} /> Download Invoice
          </button>
          
          <div className="row g-2">
            <div className="col-6">
              <button 
                className="klues-btn klues-btn-secondary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/user/dashboard')}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
            </div>
            <div className="col-6">
              <button 
                className="klues-btn klues-btn-secondary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/user/dashboard', { state: { view: 'payments' } })}
              >
                <CalendarDays size={18} /> {isPharmacy ? 'Order History' : 'My Sessions'}
              </button>
            </div>
          </div>
        </div>

        <button className="btn btn-link text-muted mt-4 text-decoration-none small d-flex align-items-center justify-content-center gap-2" onClick={() => alert('Link copied!')}>
          <Share2 size={14} /> Share Details
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
