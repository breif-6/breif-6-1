
import Home from 'landing/Home';
import Footer1 from 'landing/Footer.js';
import Header1 from 'landing/Header';


const Landing = {
  path: '/',
  element: <Home />,
  children: [
    {
      path: '/footer',
      element: <Footer1 />
    },
    {
      path: '/header',
      element: <Header1 />
    }
  ]
};

export default Landing;
