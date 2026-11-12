import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const bestRecord =
    history.length > 0
      ? [...history].sort((a, b) => b.score - a.score || b.correctCount - a.correctCount)[0]
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div>
      <h1>Nhanh như chớp</h1>
      <p>
        Trả lời 15 câu hỏi về HTML, CSS, JavaScript và React (15 giây/câu). Trả lời càng nhanh điểm thưởng tốc độ càng cao.
        Bạn có 3 quyền trợ giúp: Đổi câu hỏi, Nhân đôi điểm và Dừng giờ.
      </p>

      {bestRecord && (
        <p style={{ fontWeight: 'bold', color: '#e65100' }}>
          {`Kỷ lục: ${bestRecord.score} điểm – ${bestRecord.name}`}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <input
          type="text"
          placeholder="Tên người chơi"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '16px' }}
        />
        <button type="submit" disabled={!playerName.trim()} style={{ padding: '8px 16px', fontSize: '16px' }}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;