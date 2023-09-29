import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Footer from './views/Footer';
import Header from './views/Header';
import LandingPage from './views/LandingPage';

const Layout = () => {

  return (
    <div className='max-w-screen-lg flex flex-col mx-auto justify-center'>
      <Router basename={import.meta.env.BASE_URL}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;
