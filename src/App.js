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

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const typeUser = window.localStorge.getItem;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {typeUser === "admin" ? (
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
