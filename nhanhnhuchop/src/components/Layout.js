import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div>
    <NavBar />
    <main style={{ maxWidth: '900px', margin: '24px auto', padding: '0 16px' }}>
      {loading && <p>Đang tải câu hỏi...</p>}
      {!loading && error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <Outlet />}
    </main>
  </div>
);

export default Layout;
