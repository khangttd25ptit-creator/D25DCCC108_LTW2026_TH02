const Countdown = ({ count }) => (
  <div style={{ textAlign: 'center', marginTop: '80px' }}>
    <p>Chuẩn bị...</p>
    <div style={{ fontSize: '96px', fontWeight: 'bold', color: '#e65100' }}>{count}</div>
  </div>
);

export default Countdown;