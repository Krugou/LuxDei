import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Footer from './views/Footer';
import Header from './views/Header';
import About from './views/main/About';
import Articles from './views/main/Articles';
import LandingPage from './views/main/LandingPage';
import LiveStream from './views/main/LiveStream';
import Login from './views/main/Login';
import PrivacyPolicy from './views/main/PrivacyPolicy';
import Register from './views/main/Register';
import Team from './views/main/Team';
import TermsOfService from './views/main/TermsofService';
import NotFound from './views/main/NotFound';
import Schedule from './views/main/Schedule';
import Profile from './views/main/Profile';
import Logout from './views/main/Logout';
import Movies from './views/main/Movies';
import Archive from './views/main/Archive';
const Layout = () => {
  return (
    <UserProvider>
      <div className='max-w-screen-2xl flex flex-col mx-auto justify-center'>
        <Router basename={import.meta.env.BASE_URL}>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='*' element={<NotFound />} />
              <Route path='404' element={<NotFound />} />
              <Route path='/home' element={<LandingPage />} />
              <Route path='/livestream' element={<LiveStream />} />
              <Route path='/articles' element={<Articles />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/privacypolicy' element={<PrivacyPolicy />} />
              <Route path='/termsofservice' element={<TermsOfService />} />
              <Route path='/team' element={<Team />} />
              <Route path='/schedule' element={<Schedule />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/archive' element={<Archive />} />

            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
};

export default Layout;
