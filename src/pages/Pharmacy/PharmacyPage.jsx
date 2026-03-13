import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import { medicines, pharmacyCategories } from '../../constants/mockData';
import { ShoppingCart, FileText, Search, X, ArrowLeft, Plus } from 'lucide-react';

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
      <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '3.5rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ fontWeight: 800, marginBottom: '0.75rem', fontSize: '2.5rem' }}>E-Pharmacy</h1>
            <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '500px' }}>Genuine medicines delivered to your doorstep. Upload your prescription for faster processing.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ textAlign: 'right', display: 'none', sm: 'block' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 600 }}>Need help?</div>
              <div style={{ fontWeight: 700 }}>Talk to Pharmacist</div>
            </div>
            <button onClick={() => setShowCart(!showCart)} style={{ position: 'relative', background: 'white', border: 'none', color: '#059669', padding: '12px 24px', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
               <ShoppingCart size={20} /> Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 5%', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* UPLOAD PRESCRIPTION */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px dashed #10b981' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} /> Upload Prescription
            </h6>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Upload your doctor's prescription and we'll handle the rest.</p>
            <button style={{ width: '100%', padding: '10px', borderRadius: '12px', background: '#10b98115', color: '#059669', border: '1px solid #10b98140', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => alert("Simulating file picker...")}>
              Select File
            </button>
          </div>

          {/* CATEGORIES */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1.25rem', paddingLeft: '8px' }}>Categories</h6>
            {pharmacyCategories.map(cat => (
              <div key={cat} onClick={() => setCategory(cat)} style={{ padding: '10px 16px', borderRadius: '12px', marginBottom: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', background: category === cat ? '#10b98115' : 'transparent', color: category === cat ? '#059669' : '#64748b', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between' }}>
                {cat}
                {category === cat && <span>✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN AREA */}
        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
               <input type="text" placeholder="Search medicines, supplements..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ width: '100%', padding: '14px 20px 14px 45px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.95rem', outline: 'none' }} />
               <span style={{ position: 'absolute', left: '18px', top: '16px' }}>
                 <Search size={18} color="#64748b" />
               </span>
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '0 20px', fontWeight: 600 }}>Filter</button>
          </div>

          {showCart ? (
            /* CART VIEW */
            <div className="fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h4 style={{ fontWeight: 800, margin: 0 }}>Your Cart</h4>
                <button onClick={() => setShowCart(false)} style={{ background: '#f8fafc', border: 'none', color: '#64748b', padding: '8px 16px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowLeft size={18} /> Back to Shop
                </button>
              </div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                   <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#94a3b8' }}>
                     <ShoppingCart size={60} strokeWidth={1} />
                   </div>
                   <h5 style={{ fontWeight: 700 }}>Cart is empty</h5>
                   <p style={{ color: '#94a3b8' }}>Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', border: '1px solid #f1f5f9', borderRadius: '20px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontWeight: 800, fontSize: '1.5rem', flexShrink: 0 }}>
                          {item.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{item.name}</div>
                          <div style={{ color: '#059669', fontWeight: 800, fontSize: '1.1rem' }}>₹{item.price}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '6px', borderRadius: '12px' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '32px', height: '32px', borderRadius: '10px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>-</button>
                          <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '32px', height: '32px', borderRadius: '10px', border: 'none', background: 'white', cursor: 'pointer', fontWeight: 800, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2.5rem', padding: '2rem', background: '#f8fafc', borderRadius: '24px' }}>
                    <div>
                        <div style={{ color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>Subtotal</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1e293b' }}>₹{cartTotal.toFixed(2)}</div>
                    </div>
                    <button style={{ background: '#059669', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(5,150,105,0.3)' }}>Place Order</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* PRODUCTS GRID */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filtered.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#94a3b8', background: 'white', borderRadius: '24px' }}>No products match your search.</div>
              ) : filtered.map(med => (
                <div key={med.id} style={{ background: 'white', borderRadius: '24px', padding: '1.75rem', transition: 'all 0.3s', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#10b98110', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#059669', fontWeight: 800, fontSize: '1.5rem' }}>
                    {med.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                      <span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{med.category}</span>
                      <h6 style={{ fontWeight: 800, margin: '12px 0 8px', fontSize: '1.1rem', color: '#1e293b' }}>{med.name}</h6>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{med.description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f8fafc' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>PRICE</div>
                        <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#1e293b' }}>₹{med.price}</div>
                    </div>
                    {med.inStock ? (
                      <button onClick={() => addToCart(med)} style={{ background: '#059669', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = ''}>
                        <Plus size={20} />
                      </button>
                    ) : (
                      <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 800, background: '#fef2f2', padding: '6px 12px', borderRadius: '50px' }}>OUT OF STOCK</span>
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
