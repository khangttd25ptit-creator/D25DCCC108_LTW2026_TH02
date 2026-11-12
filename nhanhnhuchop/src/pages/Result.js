import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LETTERS } from '../data';
import { getStars } from '../utils';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  const { playerName, answers, score, correctCount } = state;
  const rating = getStars(correctCount);
  const starsDisplay = '⭐'.repeat(rating.stars) + '✩'.repeat(3 - rating.stars);

  return (
    <div>
      <h2>{rating.message}</h2>
      <p><strong>Người chơi:</strong> {playerName}</p>
      <p><strong>Số câu trả lời đúng:</strong> {`${correctCount}/15`}</p>
      <p><strong>Điểm:</strong> {score}</p>
      <p><strong>Xếp loại:</strong> {`${rating.stars} sao ${starsDisplay}`}</p>

      <div style={{ display: 'flex', gap: '12px', margin: '16px 0' }}>
        <button onClick={() => navigate('/play')}>Chơi lại</button>
        <button onClick={() => navigate('/')}>Về trang chủ</button>
      </div>

      <h3>Xem lại</h3>
      <table>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th>Câu</th>
            <th>Bạn chọn</th>
            <th>Đáp án đúng</th>
            <th>Còn lại</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((item, idx) => (
            <tr
              key={idx}
              style={{ backgroundColor: item.isCorrect ? '#e8f5e9' : '#ffebee' }}
            >
              <td>{`Câu ${item.id}`}</td>
              <td style={{ textAlign: 'center' }}>
                {item.chosen !== null ? LETTERS[item.chosen] : '–'}
              </td>
              <td style={{ textAlign: 'center' }}>{LETTERS[item.correct]}</td>
              <td>{`${item.timeLeft} giây`}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;