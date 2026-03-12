import React from 'react';
import { Activity, Users, Sparkles, Shield } from 'lucide-react';

function LandingFeatures() {
  const features = [
    { title: "Mood Tracking", desc: "Monitor your emotional journey with daily insights.", icon: <Activity size={32} /> },
    { title: "Expert Consultants", desc: "Connect with certified therapists securely.", icon: <Users size={32} /> },
    { title: "AI Insights", desc: "Personalized resources based on your profile.", icon: <Sparkles size={32} /> },
    { title: "Privacy Protection", desc: "Your data is encrypted and strictly confidential.", icon: <Shield size={32} /> }
  ];

  return (
    <section className="klues-features-section">
      <div className="klues-section-header">
        <h2 className="klues-section-title">Why Choose Us</h2>
        <p className="klues-section-subtitle">Features designed to support your mental health journey every step of the way.</p>
      </div>
      <div className="klues-features-grid">
        {features.map((f, i) => (
          <div className="klues-feature-card" key={i}>
            <div className="klues-feature-icon-wrap">
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LandingFeatures;
