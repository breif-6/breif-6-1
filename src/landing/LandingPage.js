import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import AuthRegister from './authentication/auth-forms/AuthRegister';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <Header/>
        <h2>login Page</h2>

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<AuthRegister />} />
         </Routes>
        <Footer/>
    </>
  );
}

export default LandingPage;
