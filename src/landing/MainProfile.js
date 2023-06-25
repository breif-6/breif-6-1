import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Footer from './Footer';
import Profile from 'landing/Profile';

function MainProfile() {
  return (
    <Router>
      {/* <Header/> */}
      <nav>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      <h2>MainProfile</h2>
      {/* <Footer/> */}
    </Router>
  );
}

export default MainProfile;
