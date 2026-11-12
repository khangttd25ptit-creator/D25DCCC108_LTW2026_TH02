import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#e65100' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    marginRight: '20px',
  });

  return (
    <nav style={{ padding: '14px 24px', borderBottom: '1px solid #ddd', background: '#fafafa' }}>
      <NavLink to="/" end style={linkStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={linkStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={linkStyle}>Lịch sử</NavLink>
    </nav>
  );
};

export default NavBar;