import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import LandingPage from 'landing/LandingPage';
import Profile from 'landing/Profile'; // Assuming the correct import path for the Profile component

const App = () => {
  const customization = useSelector((state) => state.customization);
  const typeUser = window.localStorage.getItem('role_id');

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {typeUser == '1' ? (
            <Routes />
          ) : typeUser == '2' ? (
            <>
              <Profile />
              {console.log('You are in the profile')}
            </>
          ) : (

            <LandingPage />
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
