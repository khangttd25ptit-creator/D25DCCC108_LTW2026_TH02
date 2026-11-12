const History = ({ history, onDelete, onClear }) => {
  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const totalScore = history.reduce((sum, item) => sum + item.score, 0);
  const totalCorrect = history.reduce((sum, item) => sum + item.correctCount, 0);
  const avgScore = Math.round(totalScore / history.length);
  const correctRate = Math.round((totalCorrect / (15 * history.length)) * 100);

  const sorted = [...history].sort(
    (a, b) => b.score - a.score || b.correctCount - a.correctCount
  );

  return (
    <div>
      <h2>Lịch sử</h2>
      <p>{`Số lượt chơi: ${history.length}`}</p>
      <p>{`Điểm trung bình: ${avgScore}`}</p>
      <p>{`Tỉ lệ trả lời đúng: ${correctRate}%`}</p>

      <button onClick={onClear} style={{ marginBottom: '16px' }}>
        Xóa lịch sử
      </button>

      <table>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Xếp loại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{`${item.correctCount}/15`}</td>
              <td style={{ textAlign: 'center' }}>
                {'⭐'.repeat(item.stars) + '✩'.repeat(3 - item.stars)}
              </td>
              <td style={{ textAlign: 'center' }}>{item.score}</td>
              <td>{item.playedAt}</td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => onDelete(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;