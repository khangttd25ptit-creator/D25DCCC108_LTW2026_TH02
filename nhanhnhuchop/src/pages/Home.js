import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

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
        Trả lời 15 câu hỏi về HTML, CSS, JavaScript và React (15 giây/câu).
        Trả lời sai hoặc hết giờ không bị loại, trả lời càng nhanh điểm thưởng tốc độ càng cao.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <input
          type="text"
          placeholder="Tên người chơi"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '16px' }}
        />
        <button type="submit" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;