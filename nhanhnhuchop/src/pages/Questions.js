import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const Questions = ({ questions }) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'official' | 'reserve'
  const [sortOrder, setSortOrder] = useState('id'); // 'id' | 'asc' | 'desc'
  const [search, setSearch] = useState('');

  const officialCount = questions.filter((q) => !q.reserve).length;
  const reserveCount = questions.filter((q) => q.reserve).length;

  const filtered = questions.filter((q) => {
    if (filterType === 'official' && q.reserve) return false;
    if (filterType === 'reserve' && !q.reserve) return false;
    if (search.trim() && !q.question.toLowerCase().includes(search.trim().toLowerCase())) {
      return false;
    }
    return true;
  });

  const displayed = [...filtered].sort((a, b) => {
    if (sortOrder === 'asc') return a.level - b.level || a.id - b.id;
    if (sortOrder === 'desc') return b.level - a.level || a.id - b.id;
    return a.id - b.id;
  });

  const btnStyle = (active) => ({
    padding: '6px 12px',
    marginRight: '8px',
    border: '1px solid #e65100',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: active ? '#e65100' : '#fff',
    color: active ? '#fff' : '#e65100',
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <div>
          <button style={btnStyle(filterType === 'all')} onClick={() => setFilterType('all')}>
            Tất cả ({questions.length})
          </button>
          <button style={btnStyle(filterType === 'official')} onClick={() => setFilterType('official')}>
            Chính thức ({officialCount})
          </button>
          <button style={btnStyle(filterType === 'reserve')} onClick={() => setFilterType('reserve')}>
            Dự bị ({reserveCount})
          </button>
        </div>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '6px' }}>
          <option value="id">Theo số thứ tự</option>
          <option value="asc">Mức độ: Dễ → Khó</option>
          <option value="desc">Mức độ: Khó → Dễ</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '6px 10px', flex: '1', minWidth: '200px' }}
        />
      </div>

      <p>Có {displayed.length} câu hỏi</p>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Loại</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((q) => (
            <tr key={q.id}>
              <td style={{ textAlign: 'center' }}>{q.id}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{q.reserve ? 'Dự bị' : 'Chính thức'}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;
