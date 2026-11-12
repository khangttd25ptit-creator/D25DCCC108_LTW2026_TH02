import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Câu hỏi số {question.id} – {LEVELS[question.level]} · {question.reserve ? 'Dự bị' : 'Chính thức'}
      </h2>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>{question.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
        {question.options.map((opt, idx) => {
          const isCorrect = showAnswer && idx === question.answer;
          return (
            <div
              key={idx}
              style={{
                padding: '10px 14px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: isCorrect ? '#c8e6c9' : '#fff',
              }}
            >
              {`${LETTERS[idx]}. ${opt}`}
              {isCorrect && <strong> (Đáp án đúng)</strong>}
            </div>
          );
        })}
      </div>

      {showAnswer && (
        <p style={{ background: '#f1f8e9', padding: '10px', borderRadius: '6px' }}>
          <strong>Giải thích:</strong> {question.explain}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
        </button>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default QuestionDetail;