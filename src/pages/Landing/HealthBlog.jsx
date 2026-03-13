import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { ArrowRight } from 'lucide-react';

const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Understanding Anxiety: Myths vs. Reality",
    category: "Mental Health",
    author: "Dr. Sarah Jenkins",
    date: "Oct 20, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512438248406-306b9a047721?w=500&auto=format&fit=crop&q=60",
    excerpt: "Anxiety is a complex emotion that affects millions. We debunk common myths and look at what science says about coping mechanisms..."
  },
  {
    id: 2,
    title: "Building Resilience in Challenging Times",
    category: "Wellbeing",
    author: "Dr. Michael Chen",
    date: "Oct 15, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60",
    excerpt: "Resilience isn't about avoiding stress, but about how we bounce back. Discover practical steps to strengthen your mental fortitude..."
  },
  {
    id: 3,
    title: "The Role of Nutrition in Mental Health",
    category: "Lifestyle",
    author: "Elena Rodriguez",
    date: "Oct 12, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60",
    excerpt: "What we eat significantly impacts how we feel. Explore the gut-brain connection and the best foods for sustained mental clarity..."
  },
  {
    id: 4,
    title: "Sleep Hygiene: Tips for Better Rest",
    category: "Self-Care",
    author: "Dr. James Wilson",
    date: "Oct 10, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=60",
    excerpt: "Quality sleep is the foundation of mental health. Learn how to optimize your environment and routine for restorative rest..."
  }
];

const CATEGORIES = ["All", "Mental Health", "Wellbeing", "Lifestyle", "Self-Care"];

function HealthBlog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All" 
    ? BLOG_ARTICLES 
    : BLOG_ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />

      {/* BLOG HERO */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '4rem 5%', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem' }}>Health & Wellbeing Blog</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
          Insights, tips, and professional advice to help you navigate your mental health journey.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 5%' }}>
        {/* FILTERS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                background: activeCategory === cat ? 'var(--primary)' : 'white',
                color: activeCategory === cat ? 'white' : '#64748b',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(99,102,241,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ARTICLES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}
                 onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{article.readTime}</span>
                </div>
                <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.4, color: '#1e293b' }}>{article.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>{article.excerpt}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: '0.75rem' }}>{article.author.charAt(0)}</div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#44546a' }}>{article.author}</span>
                  </div>
                  <button onClick={() => navigate(`/blog/${article.id}`)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthBlog;
