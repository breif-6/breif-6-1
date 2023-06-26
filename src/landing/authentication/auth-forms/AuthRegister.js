import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  AlertTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [selectedCity, setSelectedCity] = useState('');

  const navigate = useNavigate();

  const cityData = [
    { id: 1, name: 'Amman' },
    { id: 2, name: 'Ajloun' },
    { id: 3, name: 'Jerash' },
    { id: 4, name: 'Mafraq' },
    { id: 5, name: 'Balqa' },
    { id: 6, name: 'Amman' },
    { id: 7, name: 'Zarqa' },
    { id: 8, name: 'Madaba' },
    { id: 9, name: 'Karak' },
    { id: 10, name: 'Tafilah' },
    { id: 11, name: 'Maan' },
    { id: 12, name: 'Aqaba' },
  ];

  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await fetch('http://localhost/breif-6-1/api-users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.lname,
          email: values.email,
          password: values.password,
          address: selectedCity,
        }),
      });

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Registration successful. You can now log in.' });
        setSubmitting(false);

        // Redirect to login page after 3 seconds with success message
        setTimeout(() => {
          navigate('/login', { state: { successMessage: 'Registration successful. we will redirect on login' } });
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setSubmitStatus({ success: false, message: err.message }); // Set error message
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(temp < 30 ? 'Weak' : temp < 60 ? 'Medium' : 'Strong');
  };

  useEffect(() => {
    if (customization.isPasswordStrength) {
      changePassword('');
    }
  }, [customization.isPasswordStrength]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        {submitStatus.success && (
          <Alert severity="success" sx={{ width: '600px' }}>
            <AlertTitle>Success</AlertTitle>
            {submitStatus.message}
          </Alert>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Grid container justifyContent='center' alignItems="center" {...others}>
          <Formik
            initialValues={{
              lname: '',
              email: '',
              password: '',
              confirmPassword: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              lname: Yup.string().max(255).required('Name is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ width: 600 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      autoComplete="lname"
                      type="text"
                      name="lname"
                      id="lname"
                      label="Name"
                      error={Boolean(touched.lname && errors.lname)}
                      helperText={touched.lname && errors.lname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      autoComplete="email"
                      type="email"
                      name="email"
                      id="email"
                      label="Email Address"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText>{touched.password && errors.password}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type="password"
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        labelWidth={135}
                      />
                      <FormHelperText>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {customization.isPasswordStrength && (
                      <Box
                        sx={{
                          mb: 3,
                          mt: 1,
                          position: 'relative',
                          width: '100%',
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={strength}
                          sx={{
                            borderRadius: customization.borderRadius + 'px',
                            height: customization.progressHeight + 'px',
                            '& > .MuiLinearProgress-bar': {
                              borderRadius: customization.borderRadius + 'px',
                              backgroundColor: `progress.${level}`,
                            },
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: '-5px',
                            mb: 2,
                          }}
                        >
                          <Typography variant="caption" sx={{ ...theme.typography.caption, color: 'text.disabled' }}>
                            {level}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        label="City"
                      >
                        {cityData.map((city) => (
                          <MenuItem key={city.id} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Register
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AuthRegister;
