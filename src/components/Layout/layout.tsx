import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header/header.tsx';
import Footer from '@/components/Footer/footer.tsx';

import 'react-toastify/ReactToastify.min.css';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
        <ToastContainer position="bottom-left" autoClose={1500} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
