const ScorePanel = ({ score, correctCount, lastBonus }) => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '16px', padding: '10px', background: '#f5f5f5', borderRadius: '6px' }}>
    <span><strong>Điểm:</strong> {score}</span>
    <span><strong>Số câu đúng:</strong> {correctCount}</span>
    {lastBonus > 0 && <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>{`+${lastBonus} điểm`}</span>}
  </div>
);

export default ScorePanel;