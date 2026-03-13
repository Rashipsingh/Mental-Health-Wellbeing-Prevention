import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { ArrowLeft } from 'lucide-react';

const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Understanding Anxiety: Myths vs. Reality",
    category: "Mental Health",
    author: "Dr. Sarah Jenkins",
    date: "Oct 20, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512438248406-306b9a047721?w=800&auto=format&fit=crop&q=60",
    content: `
      Anxiety is a complex emotion that affects millions. We debunk common myths and look at what science says about coping mechanisms.
      
      Many people believe that anxiety is just "worrying too much" or something that can be switched off with a positive attitude. However, clinical anxiety often involves physiological responses that are not easily controlled by willpower alone.
      
      ### Common Myths
      1. **Myth: Anxiety is just stress.** 
         Fact: While stress is a response to a specific threat, anxiety is a sustained mental health condition that can exist without an immediate trigger.
      2. **Myth: Medication is the only way.** 
         Fact: While medication is helpful for many, cognitive behavioral therapy (CBT), mindfulness, and lifestyle changes are also highly effective.
         
      Understanding the reality of anxiety is the first step toward effective management. If you're feeling overwhelmed, reaching out to a professional is a sign of strength, not weakness.
    `
  },
  {
    id: 2,
    title: "Building Resilience in Challenging Times",
    category: "Wellbeing",
    author: "Dr. Michael Chen",
    date: "Oct 15, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
    content: `
      Resilience isn't about avoiding stress, but about how we bounce back. Discover practical steps to strengthen your mental fortitude.
      
      In an ever-changing world, the ability to adapt and recover from setbacks is more important than ever. Resilience is a skill that can be developed over time through practice and self-reflection.
      
      ### How to Build Resilience
      - **Practice Self-Compassion**: Be as kind to yourself as you would be to a friend.
      - **Maintain Perspective**: Remind yourself that challenges are temporary, not permanent.
      - **Nurture Connections**: Strong social support is a key pillar of mental resilience.
      
      By focusing on what we can control and accepting what we cannot, we build the inner strength needed to face life's uncertainties with confidence.
    `
  }
];

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = BLOG_ARTICLES.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h3>Article not found</h3>
        <button onClick={() => navigate('/blog')} style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 700, border: 'none', background: 'none', cursor: 'pointer' }}>Back to Blog</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Breadcrumb />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <button onClick={() => navigate('/blog')} style={{ marginBottom: '2rem', background: '#f1f5f9', border: 'none', padding: '8px 20px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Back to Blog
        </button>
        
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#e0e7ff', color: 'var(--primary)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{article.category}</span>
          <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginTop: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>{article.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#64748b', fontSize: '0.95rem' }}>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <div style={{ height: '400px', borderRadius: '32px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '1.1rem' }}>
          {article.content.split('\n').map((para, i) => {
            if (para.startsWith('###')) return <h3 key={i} style={{ fontWeight: 800, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>{para.replace('###', '')}</h3>;
            if (para.startsWith('-')) return <li key={i} style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>{para.replace('-', '').trim()}</li>;
            if (para.trim() === '') return <br key={i} />;
            return <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>;
          })}
        </div>

        <div style={{ marginTop: '4rem', padding: '3rem', background: '#f8fafc', borderRadius: '32px', textAlign: 'center' }}>
          <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>Was this article helpful?</h4>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Subscribe to our newsletter for more mental health insights.</p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
            <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700 }}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
