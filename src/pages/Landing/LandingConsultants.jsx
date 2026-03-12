import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

function LandingConsultants() {
  const consultants = [
    { name: "Dr. Sarah Jenkins", spec: "Clinical Psychologist", rating: "4.9", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4" },
    { name: "Dr. Michael Chen", spec: "Cognitive Behavioral Therapy", rating: "4.8", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Michael&backgroundColor=c0aede" },
    { name: "Emma Thompson", spec: "Anxiety & Stress Management", rating: "5.0", image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf" }
  ];

  const navigate = useNavigate();

  return (
    <section className="klues-consultants-section">
      <div className="klues-section-header">
        <h2 className="klues-section-title">Meet Our Experts</h2>
        <p className="klues-section-subtitle">Compassionate professionals ready to guide you towards a better tomorrow.</p>
      </div>
      <div className="klues-consultants-grid">
        {consultants.map((c, i) => (
          <div className="klues-consultant-card" key={i}>
            <div className="klues-consultant-avatar">
              <img src={c.image} alt={c.name} />
            </div>
            <div className="klues-consultant-name">{c.name}</div>
            <div className="klues-consultant-spec">{c.spec}</div>
            <div className="klues-consultant-rating">
              <Heart size={14} fill="var(--accent)" />
              {c.rating} <span>(120+ Sessions)</span>
            </div>
            <button className="klues-btn klues-btn-secondary" style={{ width: '100%', padding: '0.6rem' }} onClick={() => navigate("/consultant")}>
              View Profile
            </button>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="klues-btn klues-btn-primary" onClick={() => navigate("/consultant")}>
          See All Consultants
        </button>
      </div>
    </section>
  );
}

export default LandingConsultants;
