import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  useMediaQuery,
  Typography,
  LinearProgress,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  // const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [selectedCity, setSelectedCity] = useState('');

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

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      console.log({
        lname: values.lname,
        email: values.email,
        password: values.password,
        address: selectedCity,
      });

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

      console.log({
        lname: values.lname,
        email: values.email,
        password: values.password,
        address: selectedCity,
      });

      if (response.ok) {
        setStatus({ success: true });
        setSubmitting(false);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
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
      <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center" {...others}>
        {/* <Grid item sm={6} md={6} lg={6}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} />}
            label="I agree to the terms of service."
          />
        </Grid> */}
      </Grid>
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
            <Grid container spacing={2}>
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
                    label="Password"
                    autoComplete="off"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {customization.isPasswordStrength && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.password && values.password.length > 0}
                          name="showPasswordStrength"
                          color="primary"
                        />
                      }
                      label="Show Password Strength"
                    />
                  )}
                  {customization.isPasswordStrength && values.password && values.password.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant={strength < 30 ? 'determinate' : strength < 60 ? 'buffer' : 'buffer'}
                        value={strength}
                        color={
                          strength < 30
                            ? 'error'
                            : strength < 60
                            ? 'warning'
                            : 'success'
                        }
                      />
                      <FormHelperText>{level}</FormHelperText>
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoComplete="new-password"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm Password"
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCity}
                    label="Select City"
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {cityData.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <Box sx={{ color: 'red' }}>{errors.submit}</Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" sx={{ mt: 1 }}>
                  {/* Already have an account? Login */}
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default AuthRegister;
