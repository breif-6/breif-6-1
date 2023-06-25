import React from 'react';
import { styled } from '@mui/system';
import { Container } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import ContractCard from './ContractCard';
import Youtube from './Youtube';
import About from './About';
import AuthRegister from './authentication/auth-forms/AuthRegister';
import CustomerCenter from './CustomerCenter';
import { Routes, Route } from 'react-router-dom';

const MainContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '32px',
});

const LandingPage = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <About />
        <ContractCard />
        <Youtube />
        <CustomerCenter />
        <Routes>
          <Route exact path="/LandingPage" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<AuthRegister />} />
        </Routes>
      </MainContainer>
      <Footer />
    </>
  );
};

export default LandingPage;
