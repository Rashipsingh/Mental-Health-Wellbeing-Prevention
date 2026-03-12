import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { hospitals, doctors, sampleReviews } from '../../constants/mockData';

function HospitalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find(h => h.id === parseInt(id));

  if (!hospital) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontWeight: 700 }}>Hospital not found</h3>
        <button className="klues-btn klues-btn-primary" onClick={() => navigate('/search?tab=hospitals')}>Browse Hospitals</button>
      </div>
    );
  }

  const hospitalDoctors = doctors.filter(d => d.hospital === hospital.name);
  const hospitalReviews = sampleReviews.filter(r => hospitalDoctors.some(d => d.id === r.doctorId));

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />

      {/* HOSPITAL HEADER */}
      <div style={{ height: '240px', background: 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 50%, #a78bfa 100%)', display: 'flex', alignItems: 'flex-end', padding: '0 5%' }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', paddingBottom: '2rem', color: 'white' }}>
          <h1 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '2rem' }}>{hospital.name}</h1>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', opacity: 0.9, fontSize: '0.95rem' }}>
            <span>{hospital.location}</span>
            <span>•</span>
            <span>★ {hospital.rating} ({hospital.reviews} reviews)</span>
            <span>•</span>
            <span>Est. {hospital.established}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 5%', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* ABOUT */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>About</h5>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{hospital.description}</p>
          </div>

          {/* DEPARTMENTS */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Available Departments</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {hospital.departments.map(dept => (
                <div key={dept} style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700 }}>
                    {dept.charAt(0)}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{dept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DOCTORS */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Our Doctors ({hospitalDoctors.length})</h5>
            {hospitalDoctors.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No doctors listed for this hospital yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {hospitalDoctors.map(doc => (
                  <div key={doc.id} onClick={() => navigate(`/doctor/${doc.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = ''; }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
                      {doc.name.split(' ').pop().charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{doc.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{doc.specialty} • {doc.experience} yrs</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <span style={{ color: '#f59e0b' }}>★</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{doc.rating}</span>
                    </div>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, flexShrink: 0 }}>₹{doc.fee}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REVIEWS */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Patient Reviews</h5>
            {hospitalReviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No reviews yet for this hospital.</p>
            ) : hospitalReviews.map(r => (
              <div key={r.id} style={{ padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.userName}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.date}</span>
                </div>
                <div style={{ color: '#f59e0b', marginBottom: '4px', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - CONTACT */}
        <div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: '100px' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Hospital Info</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Contact</div>
                <div style={{ fontWeight: 600 }}>{hospital.contact}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                <div style={{ fontWeight: 600 }}>{hospital.location}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Doctors</div>
                <div style={{ fontWeight: 600 }}>{hospital.doctorCount} Specialists</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Rating</div>
                <div style={{ fontWeight: 600, color: '#f59e0b' }}>★ {hospital.rating} ({hospital.reviews} reviews)</div>
              </div>
            </div>
            <button className="klues-btn klues-btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => navigate('/search?specialty=All')}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetail;
