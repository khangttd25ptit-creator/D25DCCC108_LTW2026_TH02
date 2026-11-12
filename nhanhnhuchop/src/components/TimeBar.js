import { TIME_PER_QUESTION } from '../data';

const TimeBar = ({ timeLeft, isFrozen }) => {
  const percent = (timeLeft / TIME_PER_QUESTION) * 100;
  const barColor = timeLeft <= 5 ? '#e53935' : '#43a047';

  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>
        {`Còn ${timeLeft} giây${isFrozen ? ' (đã dừng)' : ''}`}
      </p>
      <div style={{ width: '100%', height: '12px', background: '#eee', borderRadius: '6px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: barColor,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

export default TimeBar;