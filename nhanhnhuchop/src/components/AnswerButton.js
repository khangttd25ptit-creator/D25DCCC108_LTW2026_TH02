import { LETTERS } from '../data';

const AnswerButton = ({ index, text, status, isFocused, selectedIndex, correctIndex, onSelect }) => {
  let bg = '#fff';
  let border = '1px solid #ccc';

  if (status === 'answering' && isFocused) {
    border = '3px solid #1565c0';
  }
  if (status === 'revealed') {
    if (index === correctIndex) bg = '#c8e6c9';
    else if (index === selectedIndex) bg = '#ffcdd2';
  }

  return (
    <button
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
      style={{
        padding: '14px',
        textAlign: 'left',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: status === 'answering' ? 'pointer' : 'default',
        backgroundColor: bg,
        border,
      }}
    >
      {`${LETTERS[index]}. ${text}`}
    </button>
  );
};

export default AnswerButton;