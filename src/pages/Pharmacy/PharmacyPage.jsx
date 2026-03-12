import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import { medicines, pharmacyCategories } from '../../constants/mockData';

function PharmacyPage() {
  const [category, setCategory] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = useMemo(() => {
    return medicines.filter(m => {
      const matchCat = category === 'All' || m.category === category;
      const matchQ = !searchQ || m.name.toLowerCase().includes(searchQ.toLowerCase());
      return matchCat && matchQ;
    });
  }, [category, searchQ]);

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === medicine.id);
      if (existing) return prev.map(i => i.id === medicine.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...medicine, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Breadcrumb />

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '2.5rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Pharmacy Marketplace</h2>
            <p style={{ opacity: 0.85 }}>Browse medicines and health supplements</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input type="text" placeholder="Search medicines..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ padding: '10px 20px', borderRadius: '50px', border: 'none', fontSize: '0.9rem', outline: 'none', minWidth: '240px' }} />
            <button onClick={() => setShowCart(!showCart)} style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Cart
              {cartCount > 0 && <span style={{ background: '#ef4444', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 5%', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* CATEGORIES */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: '100px' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1rem' }}>Categories</h6>
            {pharmacyCategories.map(cat => (
              <div key={cat} onClick={() => setCategory(cat)} style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '4px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem', background: category === cat ? 'rgba(16,185,129,0.1)' : 'transparent', color: category === cat ? '#059669' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {showCart ? (
            /* CART VIEW */
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h5 style={{ fontWeight: 700, margin: 0 }}>Shopping Cart ({cartCount})</h5>
                <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>← Continue Shopping</button>
              </div>
              {cart.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#10b98115', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontWeight: 700, flexShrink: 0 }}>
                        {item.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: '#059669', fontWeight: 700 }}>₹{item.price}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                        <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                      </div>
                      <span style={{ fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>₹{(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}>✕</button>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Total: ₹{cartTotal.toFixed(2)}</div>
                    <button style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 15px rgba(5,150,105,0.3)' }}>Checkout</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* PRODUCTS GRID */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {filtered.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No medicines found</div>
              ) : filtered.map(med => (
                <div key={med.id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', transition: 'all 0.3s', border: '1px solid rgba(0,0,0,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: '#10b98115', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#059669', fontWeight: 700, fontSize: '1.2rem' }}>
                    {med.name.charAt(0)}
                  </div>
                  <span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>{med.category}</span>
                  <h6 style={{ fontWeight: 700, margin: '8px 0', fontSize: '0.95rem' }}>{med.name}</h6>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem' }}>{med.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#059669' }}>₹{med.price}</span>
                    {med.inStock ? (
                      <button onClick={() => addToCart(med)} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = ''}>
                        Add to Cart
                      </button>
                    ) : (
                      <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>Out of Stock</span>
                    )}
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

export default PharmacyPage;
