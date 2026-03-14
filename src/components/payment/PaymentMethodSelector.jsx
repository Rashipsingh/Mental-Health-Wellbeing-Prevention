import React from 'react';
import { CreditCard, Wallet, Building2, ChevronRight } from 'lucide-react';

const PaymentMethodSelector = ({ selectedMethod, onSelect, totalAmount }) => {
  const methods = [
    {
      id: 'clinic',
      title: 'Pay at Clinic',
      description: 'Pay directly at the hospital reception',
      icon: <Building2 className="text-primary" size={24} />,
    },
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Direct transfer to our bank account',
      icon: <Wallet className="text-primary" size={24} />,
    },
    {
      id: 'online',
      title: 'Online Payment',
      description: 'Credit/Debit Card, UPI, or Net Banking',
      icon: <CreditCard className="text-primary" size={24} />,
      badge: 'Fastest'
    }
  ];

  return (
    <div className="payment-method-selector">
      <div className="mb-4">
        <h6 className="fw-bold text-muted mb-3 text-uppercase small" style={{ letterSpacing: '0.05em' }}>Select Payment Method</h6>
        <div className="d-flex flex-column gap-3">
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`klues-panel p-3 cursor-pointer d-flex align-items-center gap-3 transition-all ${selectedMethod === method.id ? 'border-primary' : 'border-transparent'}`}
              style={{
                border: selectedMethod === method.id ? '2px solid var(--primary)' : '1px solid #f1f5f9',
                background: selectedMethod === method.id ? '#fcfaff' : 'white',
                transform: selectedMethod === method.id ? 'scale(1.02)' : 'none',
                boxShadow: selectedMethod === method.id ? '0 8px 20px rgba(108,99,255,0.08)' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: selectedMethod === method.id ? 'rgba(108,99,255,0.1)' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                {method.icon}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="fw-bold mb-0">{method.title}</h6>
                  {method.badge && (
                    <span className="badge bg-primary bg-opacity-10 text-primary small py-1 px-2" style={{ fontSize: '0.65rem' }}>{method.badge}</span>
                  )}
                </div>
                <p className="text-muted small mb-0 mt-1">{method.description}</p>
              </div>
              <div className={`rounded-circle border d-flex align-items-center justify-content-center ${selectedMethod === method.id ? 'bg-primary border-primary' : 'border-light-subtle'}`} style={{ width: '22px', height: '22px' }}>
                {selectedMethod === method.id && <div className="bg-white rounded-circle" style={{ width: '8px', height: '8px' }}></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="klues-panel bg-light p-4 rounded-4 mt-5 d-flex justify-content-between align-items-center" style={{ border: '2px dashed #e2e8f0' }}>
        <div>
          <span className="text-muted small fw-bold text-uppercase">Total Payable</span>
          <h3 className="fw-800 text-primary mb-0">₹{totalAmount}</h3>
        </div>
        <button
          className="klues-btn klues-btn-primary py-3 px-5 d-flex align-items-center gap-2"
          disabled={!selectedMethod}
          onClick={() => {}}
        >
          {selectedMethod === 'online' ? 'Proceed to Payment' : 'Confirm Appointment'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
