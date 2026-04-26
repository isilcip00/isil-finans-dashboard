import React, { useState, useEffect } from 'react';

const s = {
  body: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '30px', fontFamily: 'Arial, sans-serif' },
  card: { background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { background: '#f1f5f9', padding: '12px', textAlign: 'left', fontSize: '12px', color: '#64748b' },
  td: { padding: '12px', borderBottom: '1px solid #f1f5f9' }
};

function App() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState(''); // Alış Fiyatı
  const [nowPrice, setNowPrice] = useState(''); // Güncel Fiyat

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('isil_kar_zarar')) || [];
    setAssets(data);
  }, []);

  const ekle = (e) => {
    e.preventDefault();
    const yeni = { id: Date.now(), name, amount: Number(amount), buy: Number(buyPrice), now: Number(nowPrice) };
    const liste = [...assets, yeni];
    setAssets(liste);
    localStorage.setItem('isil_kar_zarar', JSON.stringify(liste));
    setName(''); setAmount(''); setBuyPrice(''); setNowPrice('');
  };

  const sil = (id) => {
    const yeni = assets.filter(a => a.id !== id);
    setAssets(yeni);
    localStorage.setItem('isil_kar_zarar', JSON.stringify(yeni));
  };

  const toplamDeger = assets.reduce((t, a) => t + (a.amount * a.now), 0);
  const toplamKar = assets.reduce((t, a) => t + ((a.now - a.buy) * a.amount), 0);

  return (
    <div style={s.body}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', color: '#1e3a8a'}}>Işıl <span style={{color: '#3b82f6'}}>Varlık</span> Analiz 📈</h1>

        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          <div style={{...s.card, flex: '1.2'}}>
            <h3 style={{marginTop: 0}}>Varlık Bilgilerini Gir</h3>
            <form onSubmit={ekle}>
              <input style={s.input} placeholder="Varlık Adı (Altın, BTC, USD...)" value={name} onChange={e => setName(e.target.value)} required />
              <input style={s.input} type="number" step="any" placeholder="Miktar" value={amount} onChange={e => setAmount(e.target.value)} required />
              <input style={s.input} type="number" step="any" placeholder="Alış Fiyatın ($)" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} required />
              <input style={s.input} type="number" step="any" placeholder="Şu Anki Fiyat ($)" value={nowPrice} onChange={e => setNowPrice(e.target.value)} required />
              <button style={s.btn} type="submit">Hesapla ve Ekle</button>
            </form>
          </div>

          <div style={{...s.card, flex: '1', textAlign: 'center'}}>
            <p style={{color: '#64748b', fontSize: '12px', fontWeight: 'bold'}}>NET PORTFÖY DEĞERİ</p>
            <h2 style={{fontSize: '32px', color: '#1e293b'}}>${toplamDeger.toLocaleString()}</h2>
            <div style={{padding: '10px', borderRadius: '10px', background: toplamKar >= 0 ? '#f0fdf4' : '#fef2f2'}}>
              <p style={{margin: 0, fontSize: '12px', color: '#64748b'}}>TOPLAM KÂR/ZARAR</p>
              <h3 style={{margin: 0, color: toplamKar >= 0 ? '#16a34a' : '#dc2626'}}>
                {toplamKar >= 0 ? '▲' : '▼'} ${Math.abs(toplamKar).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <div style={s.card}>
          <table style={s.table}>
            <thead>
              <tr><th style={s.th}>VARLIK</th><th style={s.th}>MİKTAR</th><th style={s.th}>ALIŞ / GÜNCEL</th><th style={s.th}>DURUM</th><th style={s.th}>İŞLEM</th></tr>
            </thead>
            <tbody>
              {assets.map(a => {
                const kar = (a.now - a.buy) * a.amount;
                const yuzde = ((a.now - a.buy) / a.buy) * 100;
                return (
                  <tr key={a.id}>
                    <td style={s.td}><b>{a.name}</b></td>
                    <td style={s.td}>{a.amount}</td>
                    <td style={s.td}>${a.buy} / <span style={{color: '#3b82f6'}}>${a.now}</span></td>
                    <td style={{...s.td, color: kar >= 0 ? '#16a34a' : '#dc2626', fontWeight: 'bold'}}>
                      {kar >= 0 ? '+' : '-'}${Math.abs(kar).toLocaleString()} 
                      <span style={{fontSize: '10px', marginLeft: '5px'}}>({yuzde.toFixed(1)}%)</span>
                    </td>
                    <td style={s.td}><button onClick={() => sil(a.id)} style={{color: '#94a3b8', border: 'none', background: 'none', cursor: 'pointer'}}>Sil</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;