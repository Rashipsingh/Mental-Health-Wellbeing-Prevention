import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sun, Sparkles, User } from 'lucide-react';

function LandingHero() {
  const navigate = useNavigate();
  return (
    <div className="klues-hero">
      <div className="klues-hero-content">
        <h1 className="klues-hero-title">
          Your Mental <br /><span>Wellbeing</span> Matters
        </h1>
        <p className="klues-hero-subtitle">
          A safe space to understand, track, and improve your mental wellbeing with expert support.
        </p>
        <div className="klues-hero-actions">
          <button className="klues-btn klues-btn-primary" onClick={() => navigate("/user")}>
            Get Started
            <ArrowRight size={18} />
          </button>
          <button className="klues-btn klues-btn-secondary" onClick={() => navigate("/user")}>
            Explore Dashboard
          </button>
        </div>
      </div>
      <div className="klues-hero-visual">
        <div className="klues-blob-bg"></div>
        <div className="klues-blob-accent"></div>

        <div className="klues-float-badge badge-1">
          <div className="klues-badge-icon"><Heart size={16} /></div>
          Safe Space
        </div>

        <div className="klues-float-badge badge-2">
          <div className="klues-badge-icon alert"><Sun size={16} /></div>
          Inner Peace
        </div>

        <div className="klues-visual-card">
          <div className="klues-visual-icon-wrap">
            <Sparkles size={40} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Emotional Wellness</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Find your balance today.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', opacity: 0.8 }}>
            <User size={24} color="var(--primary)" />
            <User size={24} color="var(--secondary)" />
            <User size={24} color="var(--accent)" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingHero;
