const PowerUps = ({
  status,
  usedSwap,
  usedDouble,
  isDoubleActive,
  usedFreeze,
  onSwap,
  onDouble,
  onFreeze,
}) => (
  <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
    <button disabled={status !== 'answering' || usedSwap} onClick={onSwap}>
      Đổi câu hỏi
    </button>
    <button disabled={status !== 'answering' || usedDouble} onClick={onDouble}>
      {isDoubleActive ? 'Đang nhân đôi' : 'Nhân đôi'}
    </button>
    <button disabled={status !== 'answering' || usedFreeze} onClick={onFreeze}>
      Dừng giờ
    </button>
  </div>
);

export default PowerUps;