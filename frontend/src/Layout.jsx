import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './Layout.css';
import Footer from './views/Footer';
import Header from './views/Header';
import LandingPage from './views/LandingPage';

const Layout = () => {

  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Layout;
