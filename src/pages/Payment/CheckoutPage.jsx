import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import PaymentMethodSelector from '../../components/payment/PaymentMethodSelector';
import { Calendar, Clock, MapPin, User, ChevronLeft } from 'lucide-react';

const CheckoutPage = ({ setAppointments, setPayments, authUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, doctor, slot, date, items, total } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!type && !doctor) {
    return (
      <div className="container py-5 text-center">
        <h4>No checkout data found.</h4>
        <button className="klues-btn klues-btn-primary mt-3" onClick={() => navigate('/search')}>Browse Services</button>
      </div>
    );
  }

  const handlePayment = () => {
    if (!selectedMethod) return;
    
    const transactionId = 'TXN' + Date.now();
    const paymentRecord = {
      id: Date.now(),
      transactionId,
      userId: authUser?.id || 101,
      userName: authUser?.name || 'Test User',
      type: type || 'Doctor',
      purpose: type === 'Pharmacy' ? 'Medicine Purchase' : `Consultation with Dr. ${doctor?.name}`,
      items: items || [],
      details: type === 'Pharmacy' ? { itemCount: items.length } : { doctor: doctor?.name, slot, date },
      amount: total || doctor?.fee,
      method: selectedMethod,
      date: new Date().toLocaleDateString(),
      status: 'Paid'
    };

    // Save to global payments state
    setPayments(prev => [...prev, paymentRecord]);

    // If it's a doctor appointment, also save to appointments state
    if (type !== 'Pharmacy' && doctor) {
      const newAppt = {
        id: Date.now(),
        doctor,
        consultant: doctor,
        slot,
        date,
        status: 'Confirmed',
        userId: authUser?.id || 101,
        paymentMethod: selectedMethod,
        transactionId
      };
      setAppointments(prev => [...prev, newAppt]);
    }
    
    navigate('/payment/success', { state: { ...location.state, transactionId } });
  };

  const displayTotal = total || doctor?.fee;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 5%' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center gap-1 fw-bold small"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <h2 className="fw-800 mb-4" style={{ letterSpacing: '-0.03em' }}>{type === 'Pharmacy' ? 'Confirm Order' : 'Checkout'}</h2>
        
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="klues-panel p-4 h-100">
              <PaymentMethodSelector 
                selectedMethod={selectedMethod} 
                onSelect={setSelectedMethod} 
                totalAmount={displayTotal}
              />
              <button 
                className="klues-btn klues-btn-primary w-100 py-3 mt-4 fs-5 fw-bold"
                disabled={!selectedMethod}
                onClick={handlePayment}
                style={{ borderRadius: '16px' }}
              >
                {selectedMethod === 'online' ? 'Proceed to Secure Payment' : 'Confirm Order'}
              </button>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="klues-panel p-4" style={{ position: 'sticky', top: '100px', background: 'white', border: '1px solid #e2e8f0' }}>
              <h5 className="fw-bold mb-4">Summary</h5>
              
              {type === 'Pharmacy' ? (
                <div className="d-flex flex-column gap-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center small">
                      <span className="text-muted">{item.name} x {item.qty}</span>
                      <span className="fw-bold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3 mb-4 p-3 rounded-4 bg-light">
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
                    {doctor?.name.charAt(0)}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Dr. {doctor?.name}</h6>
                    <span className="text-primary small fw-bold">{doctor?.specialty}</span>
                  </div>
                </div>
              )}

              {type !== 'Pharmacy' && (
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3 text-muted">
                    <div className="bg-light p-2 rounded-3"><Calendar size={18} /></div>
                    <div>
                      <div className="small fw-bold text-dark">Date</div>
                      <div className="small">{date || 'Not Selected'}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 text-muted">
                    <div className="bg-light p-2 rounded-3"><Clock size={18} /></div>
                    <div>
                      <div className="small fw-bold text-dark">Time Slot</div>
                      <div className="small">{slot || 'Not Selected'}</div>
                    </div>
                  </div>
                  {doctor && (
                    <div className="d-flex align-items-center gap-3 text-muted">
                      <div className="bg-light p-2 rounded-3"><MapPin size={18} /></div>
                      <div>
                        <div className="small fw-bold text-dark">Location</div>
                        <div className="small">{doctor.hospital}, {doctor.location}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <hr className="my-4 border-light" />

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Subtotal</span>
                <span className="fw-bold">₹{displayTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Service Fee</span>
                <span className="text-success fw-bold">Free</span>
              </div>
              <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                <span className="fw-bold">Total Amount</span>
                <span className="fw-800 text-primary fs-4">₹{displayTotal}</span>
              </div>
              
              <div className="mt-4 p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-10">
                <p className="small mb-0 text-primary fw-medium" style={{ lineHeight: 1.5 }}>
                  🛡️ Your payment data is encrypted and secure. By proceeding, you agree to our terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
