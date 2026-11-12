import { LEVELS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, currentIndex, total, status, focusedIndex, selectedIndex, onSelect }) => (
  <div>
    <p style={{ color: '#666', fontWeight: 'bold' }}>
      {`Câu ${currentIndex + 1}/${total} · ${LEVELS[question.level]}`}
    </p>
    <h3 style={{ marginBottom: '16px' }}>{question.question}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {question.options.map((opt, idx) => (
        <AnswerButton
          key={idx}
          index={idx}
          text={opt}
          status={status}
          isFocused={focusedIndex === idx}
          selectedIndex={selectedIndex}
          correctIndex={question.answer}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

export default QuestionCard;