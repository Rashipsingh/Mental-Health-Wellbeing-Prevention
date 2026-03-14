import React from 'react';
import { Download, CreditCard, Package, User, CheckCircle, Clock } from 'lucide-react';

const PaymentHistory = ({ payments, authUser }) => {
  const myPayments = (payments || []).filter(p => p.userId === (authUser?.id || 101));

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Payment History & Invoices</h5>
        <div className="text-muted small fw-bold">Total Transactions: {myPayments.length}</div>
      </div>

      <div className="klues-panel p-0 overflow-hidden border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        {myPayments.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3 text-muted opacity-50">
              <CreditCard size={48} strokeWidth={1} />
            </div>
            <h5 className="fw-bold">No transaction history found</h5>
            <p className="text-muted small">Your payments for appointments and pharmacy will appear here.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table m-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 border-0 small text-muted text-uppercase fw-bold">Service</th>
                  <th className="py-3 border-0 small text-muted text-uppercase fw-bold">Transaction ID</th>
                  <th className="py-3 border-0 small text-muted text-uppercase fw-bold">Date</th>
                  <th className="py-3 border-0 small text-muted text-uppercase fw-bold">Amount</th>
                  <th className="py-3 border-0 small text-muted text-uppercase fw-bold">Status</th>
                  <th className="px-4 py-3 border-0 small text-muted text-uppercase fw-bold text-end">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {myPayments.map((payment) => (
                  <tr key={payment.id || payment.transactionId} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td className="px-4 py-4 align-middle">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`p-2 rounded-3 ${payment.type === 'Pharmacy' ? 'bg-info bg-opacity-10 text-info' : 'bg-primary bg-opacity-10 text-primary'}`}>
                          {payment.type === 'Pharmacy' ? <Package size={18} /> : <User size={18} />}
                        </div>
                        <div>
                          <div className="fw-bold">{payment.purpose}</div>
                          <div className="small text-muted">{payment.type} Order</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 align-middle fw-bold text-primary small">
                      #{payment.transactionId.slice(-8)}
                    </td>
                    <td className="py-4 align-middle small text-muted">{payment.date}</td>
                    <td className="py-4 align-middle fw-800 text-dark">₹{payment.amount}</td>
                    <td className="py-4 align-middle">
                      <span className={`badge rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1 w-fit ${
                        payment.status === 'Paid' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                      }`}>
                        {payment.status === 'Paid' ? <CheckCircle size={14} /> : <Clock size={14} />} {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-middle text-end">
                      <button className="btn btn-sm btn-light border fw-bold px-3 d-inline-flex align-items-center gap-2" onClick={() => alert('Downloading Invoice PDF...')}>
                        <Download size={14} /> Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
