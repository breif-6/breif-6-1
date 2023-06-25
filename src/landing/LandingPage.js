// import React from 'react';
// import { styled } from '@mui/system';
// import { Container } from '@mui/material';
// import Footer from './Footer';
// import Header from './Header';
import Login from './Login';
import Home from './Home';
// import ContractCard from './ContractCard';
// import Youtube from './Youtube';
// import About from './About';
import AuthRegister from './authentication/auth-forms/AuthRegister';
// import CustomerCenter from './CustomerCenter';
import { Routes, Route } from 'react-router-dom';

// const MainContainer = styled(Container)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '100vh',
//   padding: '32px',
// });

// const LandingPage = () => {
//   return (
//     <>
//       <Header />
//       <MainContainer>
//         <About />
//         <ContractCard />
//         <Youtube />
//         <CustomerCenter />
//         <Routes>
//           <Route exact path="/LandingPage" element={<LandingPage />} />
//           <Route exact path="/login" element={<Login />} />
//           <Route exact path="/register" element={<AuthRegister />} />
//         </Routes>
//       </MainContainer>
//       <Footer />
//     </>
//   );
// };

// export default LandingPage;


import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
<<<<<<< HEAD
    <>
      <Header/>
        <h2>login Page</h2>

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<AuthRegister />} />
         </Routes>
        <Footer/>
    </>
=======
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
>>>>>>> 976a646170f10cf7e61b83ffa39b71323db56bf5
  );
}


const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              NexTalk
            </Link>
          </Typography>
          <nav>
            
            
            <Link
              variant="button"
              color="text.primary"
              href="/login"
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Link>
          </nav>
            {/* <Link to=""> */}
          <Button href="/register" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Sign up
          </Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
       {/* start Home */}
        <Routes>
           {/* <Route exact path="/LandingPage" element={<LandingPage />} /> */}
           <Route exact path="/login" element={<Login />} />
           <Route exact path="/register" element={<AuthRegister />} />
           <Route exact path="/" element={<Home />} />
        </Routes>
      {/* end Home */}
         
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}