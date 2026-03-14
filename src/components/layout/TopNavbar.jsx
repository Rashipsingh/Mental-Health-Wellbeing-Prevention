import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

function TopNavbar({ authUser }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/search', dropdown: [
      { label: 'Find Doctors', path: '/search' },
      { label: 'Browse by Specialty', path: '/search?specialty=All' },
      { label: 'Join as Doctor', path: '/consultant' },
    ]},
    { label: 'Hospitals', path: '/search?tab=hospitals', dropdown: [
      { label: 'All Hospitals', path: '/search?tab=hospitals' },
    ]},
    { label: 'Pharmacy', path: '/pharmacy' },
    { label: 'Blog', path: '/blog' },
    { label: 'Admin', path: '/admin' },
    { label: 'Dashboard', path: authUser ? '/user/dashboard' : '/user' },
  ];

  return (
    <nav className="klues-navbar" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <a href="#" className="klues-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
        <Brain className="klues-badge-icon" style={{ background: 'transparent', width: '28px', height: '28px' }} />
        Klever Klues
      </a>

      {/* DESKTOP NAV */}
      <div className="klues-nav-links">
        {navItems.map((item, idx) => (
          <div key={idx} style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown(idx)}
            onMouseLeave={() => setActiveDropdown(null)}>
            <a href="#" className="klues-nav-link" onClick={(e) => { e.preventDefault(); navigate(item.path); setActiveDropdown(null); }}>
              {item.label}
            </a>
            {item.dropdown && activeDropdown === idx && (
              <div className="fade-in" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '12px', padding: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', minWidth: '180px', marginTop: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                {item.dropdown.map((sub, si) => (
                  <a key={si} href="#" onClick={(e) => { e.preventDefault(); navigate(sub.path); setActiveDropdown(null); }}
                    style={{ display: 'block', padding: '10px 16px', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {authUser ? (
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
            onClick={() => navigate('/user/dashboard')}>
            {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
        ) : (
          <button onClick={() => navigate('/user')} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '50px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
            Sign In
          </button>
        )}
      </div>

      {/* MOBILE HAMBURGER */}
      <button className="klues-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', padding: '4px' }}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="klues-mobile-menu fade-in" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', padding: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '1px solid #f1f5f9', zIndex: 999 }}>
          {navItems.map((item, idx) => (
            <a key={idx} href="#" onClick={(e) => { e.preventDefault(); navigate(item.path); setMobileOpen(false); }}
              style={{ display: 'block', padding: '12px 16px', color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500, borderRadius: '8px', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {item.label}
            </a>
          ))}
          {!authUser && (
            <button onClick={() => { navigate('/user'); setMobileOpen(false); }} style={{ width: '100%', marginTop: '8px', background: 'var(--primary)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default TopNavbar;
