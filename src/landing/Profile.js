// import Footer from './Footer';
// import Header from './Header';
// import Logout from './Logout';
// import AuthRegister from './authentication/auth-forms/AuthRegister';
// import { Routes, Route } from 'react-router-dom';
import Weather from "./Weather";
import Userprofile from "./Userprofile";

function Profile() {
  return (
    <>
      
      <h2>profile Page</h2>
      <Weather />
      <Userprofile/>
    </>
  );
}

export default Profile;
