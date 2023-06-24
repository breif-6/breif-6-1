import Footer from './Footer';
import Header from './Header';
// import AuthRegister from './authentication/auth-forms/AuthRegister';
import AuthRegister from '../views/pages/authentication/auth-forms/AuthRegister';

function LandingPage() {
    return (
      <>
        <Header/>
        <div><br /><br /><br /><br /><AuthRegister/></div>
        <h2>Landing Page</h2>
        <Footer/>
      </>
    );
  }

  export default LandingPage;
