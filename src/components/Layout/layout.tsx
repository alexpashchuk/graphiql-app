import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/header.tsx';
import Footer from '@/components/Footer/footer.tsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
