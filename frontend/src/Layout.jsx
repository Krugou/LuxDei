import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Articles from './components/main/Articles';
import Login from './components/main/Login';
import Register from './components/main/Register';
import Footer from './views/Footer';
import Header from './views/Header';
import LandingPage from './views/main/LandingPage';
import LiveStream from './views/main/LiveStream';

const Layout = () => {
  return (
    <div className='max-w-screen-2xl flex flex-col mx-auto justify-center'>
      <Router basename={import.meta.env.BASE_URL}>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/livestream' element={<LiveStream />} />
            <Route path='*' element={<LandingPage />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;
