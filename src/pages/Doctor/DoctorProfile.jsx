import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { doctors, sampleReviews } from '../../constants/mockData';

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id));
  const reviews = sampleReviews.filter(r => r.doctorId === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [myReviews, setMyReviews] = useState([]);

  if (!doctor) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontWeight: 700 }}>Doctor not found</h3>
        <button className="klues-btn klues-btn-primary" onClick={() => navigate('/search')}>Browse Doctors</button>
      </div>
    );
  }

  const avgRating = [...reviews, ...myReviews].length > 0
    ? ([...reviews, ...myReviews].reduce((acc, r) => acc + r.rating, 0) / [...reviews, ...myReviews].length).toFixed(1)
    : doctor.rating;

  const handleBookAppointment = () => {
    if (!selectedSlot) return alert('Please select a time slot');
    setShowBookingConfirm(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    setMyReviews(prev => [...prev, { id: Date.now(), doctorId: doctor.id, userName: 'You', rating: newReview.rating, comment: newReview.comment, date: new Date().toISOString().split('T')[0] }]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />

      {/* DOCTOR HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', padding: '3rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '24px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 700, backdropFilter: 'blur(10px)', flexShrink: 0 }}>
            {doctor.name.split(' ').pop().charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h2 style={{ fontWeight: 700, margin: 0 }}>{doctor.name}</h2>
              {doctor.available && <span style={{ background: 'rgba(16,185,129,0.3)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Available Now</span>}
            </div>
            <p style={{ opacity: 0.9, marginBottom: '6px', fontSize: '1.1rem' }}>{doctor.specialty}</p>
            <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.9rem' }}>{doctor.qualification}</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.85 }}>
              <span>{doctor.experience} years experience</span>
              <span>•</span>
              <span>{doctor.hospital}</span>
              <span>•</span>
              <span>{doctor.location}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.5rem' }}>
              <span style={{ color: '#fbbf24' }}>★</span>
              <span style={{ fontWeight: 700 }}>{avgRating}</span>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>({reviews.length + myReviews.length} reviews)</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹{doctor.fee} <span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.7 }}>/ session</span></div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 5%', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* ABOUT */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Professional Profile</h5>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              {doctor.bio || `Dr. ${doctor.name} is a dedicated healthcare professional specializing in ${doctor.specialty} with over ${doctor.experience} years of experience. Committed to providing compassionate and comprehensive care, Dr. ${doctor.name} focuses on evidence-based treatments and patient-centered approaches to improve mental wellbeing.`}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Hospital</div>
                <div style={{ fontWeight: 600, color: '#334155' }}>{doctor.hospital}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                <div style={{ fontWeight: 600, color: '#334155' }}>{doctor.location}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Experience</div>
                <div style={{ fontWeight: 600, color: '#334155' }}>{doctor.experience} Years</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Consultation Fee</div>
                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>₹{doctor.fee}</div>
              </div>
            </div>
          </div>

          {/* MEDICAL EXPERTISE */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Specialties & Expertise</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[doctor.specialty, "General Consultation", "Behavioral Health", "Stress Management"].map(s => (
                <span key={s} style={{ background: '#e0e7ff', color: 'var(--primary)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Patient Feedback ({reviews.length + myReviews.length})</h5>
            {[...myReviews, ...reviews].map(r => (
              <div key={r.id} style={{ padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{r.userName.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{r.userName}</div>
                      <div style={{ color: '#f59e0b', fontSize: '0.75rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>{r.date}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, paddingLeft: '52px' }}>{r.comment}</p>
              </div>
            ))}

            {/* WRITE REVIEW */}
            <form onSubmit={handleSubmitReview} style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed #e2e8f0' }}>
              <h6 style={{ fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>Leave a Review</h6>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} onClick={() => setNewReview(p => ({ ...p, rating: star }))} style={{ cursor: 'pointer', fontSize: '1.75rem', color: star <= newReview.rating ? '#f59e0b' : '#e2e8f0', transition: 'all 0.2s transform' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    ★
                  </span>
                ))}
              </div>
              <textarea placeholder="Tell us about your experience with the doctor..." value={newReview.comment} onChange={(e) => setNewReview(p => ({ ...p, comment: e.target.value }))} rows={3} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', background: '#f8fafc' }} />
              <button type="submit" style={{ marginTop: '12px', background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(108,99,255,0.2)' }}>Post Review</button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN - BOOKING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* ACTION BUTTONS */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <button onClick={() => setIsFavorite(!isFavorite)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: `2px solid ${isFavorite ? '#ef4444' : '#f1f5f9'}`, background: isFavorite ? '#fef2f2' : 'white', color: isFavorite ? '#ef4444' : '#64748b', fontWeight: 700, cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
              {isFavorite ? '♥ Saved' : '♡ Add to Favorites'}
            </button>
            <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #f1f5f9', background: 'white', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              ✉ Message Doctor
            </button>
          </div>

          {/* APPOINTMENT BOOKING */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', position: 'sticky', top: '100px', border: '1px solid #f1f5f9' }}>
            <h5 style={{ fontWeight: 800, marginBottom: '1.25rem', color: '#1e293b' }}>Book Session</h5>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Select Date</label>
              <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', background: '#f8fafc' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Available Slots</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {doctor.slots.map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} style={{ padding: '12px', borderRadius: '10px', border: selectedSlot === slot ? '2px solid var(--primary)' : '1px solid #e2e8f0', background: selectedSlot === slot ? 'rgba(108,99,255,0.08)' : 'white', color: selectedSlot === slot ? 'var(--primary)' : '#475569', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleBookAppointment} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', color: 'white', border: 'none', fontWeight: 800, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(108,99,255,0.3)', transition: 'all 0.3s' }}
              onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(108,99,255,0.4)';}}
              onMouseLeave={e => {e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 25px rgba(108,99,255,0.3)';}}>
              Book for ₹{doctor.fee}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem', marginBotttom: 0 }}>Instant confirmation • Secure Payment</p>
          </div>
        </div>
      </div>

      {/* BOOKING CONFIRMATION MODAL */}
      {showBookingConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(4px)' }}>
          <div className="fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', maxWidth: '420px', width: '90%', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#10b98120', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>✓</div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Appointment Confirmed!</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Your appointment with <strong>{doctor.name}</strong> at <strong>{selectedSlot}</strong> has been booked.
            </p>
            <button onClick={() => { setShowBookingConfirm(false); setSelectedSlot(null); }} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorProfile;
