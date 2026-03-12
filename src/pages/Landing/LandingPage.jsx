import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors, hospitals, specialties, testimonials, howItWorks } from '../../constants/mockData';

function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredDoctors = doctors.filter(d => d.rating >= 4.7).slice(0, 4);
  const topHospitals = hospitals.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="klues-landing">
      {/* ===== HERO WITH SEARCH ===== */}
      <section className="klues-hero" style={{ minHeight: 'calc(100vh - 70px)', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%)' }}>
        <div className="klues-hero-content">
          <div style={{ display: 'inline-block', background: 'rgba(108,99,255,0.1)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Trusted Healthcare Platform
          </div>
          <h1 className="klues-hero-title">
            Find & Book <span>Your Doctor</span> Instantly
          </h1>
          <p className="klues-hero-subtitle">
            Search from hundreds of verified doctors, view profiles, read reviews, and book appointments — all in one place.
          </p>

          {/* HERO SEARCH BAR */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', maxWidth: '520px', background: 'white', borderRadius: '50px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
            <input
              type="text"
              placeholder="Search doctors, hospitals, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '16px 24px', fontSize: '1rem', outline: 'none', background: 'transparent' }}
            />
            <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '16px 28px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
              Search
            </button>
          </form>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>500+ Verified Doctors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6C63FF' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>50+ Hospitals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>10k+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="klues-hero-visual">
          <div className="klues-blob-bg"></div>
          <div className="klues-float-card" style={{ top: '15%', right: '10%' }}>
            <div className="klues-float-icon" style={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <span>Health Tracking</span>
          </div>
          <div className="klues-float-card klues-card-main">
            <div className="klues-float-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', width: '60px', height: '60px', fontSize: '1.5rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h4 style={{ fontWeight: 700, margin: '12px 0 4px', fontSize: '1.1rem' }}>Your Wellness</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Find your balance today.</p>
          </div>
          <div className="klues-float-card" style={{ bottom: '15%', left: '5%' }}>
            <div className="klues-float-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </div>
            <span>24/7 Support</span>
          </div>
        </div>
      </section>

      {/* ===== MEDICAL SPECIALTIES ===== */}
      <section style={{ padding: '5rem 5%', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Browse by Specialty</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>Find healthcare professionals by their area of expertise</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '1200px', margin: '0 auto' }}>
          {specialties.map((s, i) => (
            <div key={i} onClick={() => navigate(`/search?specialty=${s.name}`)} style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid transparent', textAlign: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = s.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'transparent'; }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: s.color, fontSize: '1.5rem', fontWeight: 700 }}>
                {s.name.charAt(0)}
              </div>
              <h6 style={{ fontWeight: 600, marginBottom: '4px' }}>{s.name}</h6>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.count} Doctors</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED DOCTORS ===== */}
      <section style={{ padding: '5rem 5%', background: 'var(--bg-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Featured Doctors</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Top-rated healthcare professionals</p>
          </div>
          <button className="klues-btn klues-btn-secondary" onClick={() => navigate('/search')}>View All Doctors →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {featuredDoctors.map(doc => (
            <div key={doc.id} onClick={() => navigate(`/doctor/${doc.id}`)} style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(108,99,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {doc.name.split(' ').pop().charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h6 style={{ fontWeight: 700, marginBottom: '2px', fontSize: '1rem' }}>{doc.name}</h6>
                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 500 }}>{doc.specialty}</span>
                </div>
                {doc.available && <span style={{ background: '#10b98115', color: '#10b981', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600 }}>Available</span>}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>{doc.experience} yrs exp</span>
                <span>•</span>
                <span>{doc.hospital}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#f59e0b' }}>★</span>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{doc.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({doc.reviews})</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>₹{doc.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOSPITAL LISTINGS ===== */}
      <section style={{ padding: '5rem 5%', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Top Hospitals</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Trusted healthcare institutions near you</p>
          </div>
          <button className="klues-btn klues-btn-secondary" onClick={() => navigate('/search?tab=hospitals')}>View All Hospitals →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {topHospitals.map(h => (
            <div key={h.id} onClick={() => navigate(`/hospital/${h.id}`)} style={{ background: '#f8fafc', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ height: '140px', background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 700 }}>
                {h.name.charAt(0)}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h5 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{h.name}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{h.location}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                  {h.departments.slice(0, 3).map(d => (
                    <span key={d} style={{ background: '#e0e7ff', color: 'var(--primary)', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600 }}>{d}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#f59e0b' }}>★</span>
                    <span style={{ fontWeight: 700 }}>{h.rating}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({h.reviews} reviews)</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{h.doctorCount} Doctors</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: '5rem 5%', background: 'linear-gradient(135deg, #f0f4ff, #faf5ff)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>Get started with your healthcare journey in 4 simple steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {howItWorks.map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700, margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(108,99,255,0.3)' }}>
                {item.step}
              </div>
              <h5 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: '5rem 5%', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>What Our Users Say</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>Real experiences from patients and doctors on our platform</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: '#f8fafc', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(0,0,0,0.04)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.1rem' }}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p style={{ color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '5rem 5%', background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Take Control of Your Health?</h2>
        <p style={{ opacity: 0.85, maxWidth: '550px', margin: '0 auto 2rem', lineHeight: 1.7 }}>Join thousands of patients who trust our platform to find the best healthcare providers and manage their wellbeing.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="klues-btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/user')}>
            Get Started Free →
          </button>
          <button className="klues-btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }} onClick={() => navigate('/search')}>
            Browse Doctors
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: '3rem 5%', background: '#1e293b', color: '#94a3b8' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto 2rem' }}>
          <div>
            <h5 style={{ color: 'white', fontWeight: 700, marginBottom: '1rem' }}>Klever Klues</h5>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>Your trusted healthcare marketplace. Find doctors, book appointments, and manage your health journey.</p>
          </div>
          <div>
            <h6 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>For Patients</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>Find Doctors</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/search?tab=hospitals')}>Hospitals</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/pharmacy')}>Pharmacy</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/user')}>My Account</span>
            </div>
          </div>
          <div>
            <h6 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>For Doctors</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/consultant')}>Join as Doctor</span>
              <span style={{ cursor: 'pointer' }}>Doctor Dashboard</span>
              <span style={{ cursor: 'pointer' }}>Resources</span>
            </div>
          </div>
          <div>
            <h6 style={{ color: 'white', fontWeight: 600, marginBottom: '1rem' }}>Support</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span>Help Center</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #334155', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem' }}>
          2026 Klever Klues Healthcare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
