import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { doctors, hospitals } from '../../constants/mockData';

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialSpecialty = searchParams.get('specialty') || 'All';
  const initTab = searchParams.get('tab') || 'doctors';

  const [query, setQuery] = useState(initialQ);
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [location, setLocation] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [tab, setTab] = useState(initTab);

  const allSpecialties = ['All', ...new Set(doctors.map(d => d.specialty))];
  const allLocations = ['All', ...new Set(doctors.map(d => d.location))];

  const filteredDoctors = useMemo(() => {
    return doctors.filter(d => {
      const matchQ = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase()) || d.hospital.toLowerCase().includes(query.toLowerCase());
      const matchSpecialty = specialty === 'All' || d.specialty === specialty;
      const matchLocation = location === 'All' || d.location === location;
      const matchRating = d.rating >= minRating;
      const matchAvail = !availableOnly || d.available;
      return matchQ && matchSpecialty && matchLocation && matchRating && matchAvail;
    });
  }, [query, specialty, location, minRating, availableOnly]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(h => {
      const matchQ = !query || h.name.toLowerCase().includes(query.toLowerCase()) || h.location.toLowerCase().includes(query.toLowerCase());
      return matchQ;
    });
  }, [query]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />

      {/* SEARCH HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', padding: '2.5rem 5%', color: 'white' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.75rem' }}>Find Your Perfect Healthcare Provider</h2>
        <div style={{ display: 'flex', gap: '0', maxWidth: '700px', background: 'white', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
          <input
            type="text"
            placeholder="Search doctors, hospitals, specialties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: 'none', padding: '14px 24px', fontSize: '1rem', outline: 'none', color: '#2D3748' }}
          />
          <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '14px 28px', fontWeight: 600, cursor: 'pointer' }}>
            Search
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: '1300px', margin: '0 auto', padding: '2rem 5%', gap: '2rem', flexWrap: 'wrap' }}>
        {/* FILTERS SIDEBAR */}
        <div style={{ width: '260px', flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: '100px' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)' }}>Filters</h6>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Specialization</label>
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }}>
                {allSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' }}>
                {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Minimum Rating</label>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {[0, 4, 4.5, 4.7].map(r => (
                  <button key={r} onClick={() => setMinRating(r)} style={{ padding: '6px 10px', borderRadius: '8px', border: minRating === r ? '2px solid var(--primary)' : '1px solid #e2e8f0', background: minRating === r ? 'rgba(108,99,255,0.1)' : 'white', color: minRating === r ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', minWidth: '0' }}>
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Available Now Only</span>
              </label>
            </div>

            <button onClick={() => { setQuery(''); setSpecialty('All'); setLocation('All'); setMinRating(0); setAvailableOnly(false); }} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
              Clear All Filters
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* TABS */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <button onClick={() => setTab('doctors')} style={{ flex: 1, padding: '12px', border: 'none', background: tab === 'doctors' ? 'var(--primary)' : 'white', color: tab === 'doctors' ? 'white' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              Doctors ({filteredDoctors.length})
            </button>
            <button onClick={() => setTab('hospitals')} style={{ flex: 1, padding: '12px', border: 'none', background: tab === 'hospitals' ? 'var(--primary)' : 'white', color: tab === 'hospitals' ? 'white' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              Hospitals ({filteredHospitals.length})
            </button>
          </div>

          {tab === 'doctors' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {filteredDoctors.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No doctors found matching your criteria</p>
                  <p style={{ fontSize: '0.9rem' }}>Try adjusting your filters</p>
                </div>
              ) : filteredDoctors.map(doc => (
                <div key={doc.id} onClick={() => navigate(`/doctor/${doc.id}`)} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(108,99,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
                      {doc.name.split(' ').pop().charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h6 style={{ fontWeight: 700, marginBottom: '2px', fontSize: '0.95rem' }}>{doc.name}</h6>
                      <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 500 }}>{doc.specialty}</span>
                    </div>
                    {doc.available ? (
                      <span style={{ background: '#10b98115', color: '#10b981', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>Available</span>
                    ) : (
                      <span style={{ background: '#ef444415', color: '#ef4444', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>Unavailable</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.hospital}</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.location}</span>
                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.experience} yrs</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#f59e0b' }}>★</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{doc.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({doc.reviews})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>₹{doc.fee}</span>
                      <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '50px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); navigate(`/doctor/${doc.id}`); }}>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'hospitals' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.25rem' }}>
              {filteredHospitals.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No hospitals found</div>
              ) : filteredHospitals.map(h => (
                <div key={h.id} onClick={() => navigate(`/hospital/${h.id}`)} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ height: '100px', background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 700 }}>
                    {h.name.charAt(0)}
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>{h.name}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{h.location}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {h.departments.map(d => <span key={d} style={{ background: '#e0e7ff', color: 'var(--primary)', padding: '3px 8px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600 }}>{d}</span>)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#f59e0b' }}>★ {h.rating} ({h.reviews})</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{h.doctorCount} Doctors</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
