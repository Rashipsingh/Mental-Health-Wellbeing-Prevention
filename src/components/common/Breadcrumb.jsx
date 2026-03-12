import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return null;

  const breadcrumbMap = {
    'search': 'Search',
    'doctor': 'Doctors',
    'hospital': 'Hospitals',
    'user': 'Account',
    'dashboard': 'Dashboard',
    'consultant': 'Consultant',
    'admin': 'Admin',
    'pharmacy': 'Pharmacy',
  };

  return (
    <nav className="breadcrumb-nav" style={{
      padding: '12px 5%',
      background: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      fontSize: '0.875rem'
    }}>
      <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
      {pathSegments.map((segment, idx) => {
        const path = '/' + pathSegments.slice(0, idx + 1).join('/');
        const isLast = idx === pathSegments.length - 1;
        const label = breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        return (
          <span key={path}>
            <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
            {isLast ? (
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
            ) : (
              <Link to={path} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
