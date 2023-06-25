import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import LandingPage from 'landing/LandingPage';

// ==============================||window.localStorge.getItem() APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const typeUser = window.localStorage.getItem('role_id');

  // const typeUser = window.localStorge.getItem('role_id');

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {typeUser == "1" ? (
            <Routes />
          ) : (
            <LandingPage/>
          )}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
    
  );
};

export default App;
