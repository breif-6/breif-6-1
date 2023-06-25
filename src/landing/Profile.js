// import Footer from './Footer';
// import Header from './Header';
import Logout from './Logout';
import Userprofile from './Userprofile';
import ContractList from './ContractList';

// import AuthRegister from './authentication/auth-forms/AuthRegister';
// import { Routes, Route } from 'react-router-dom';
import Weather from "./Weather";
// import Userprofile from "./Userprofile";
// import UserEdit from "./UserEdit";

function Profile() {
  return (
    <>
      <Logout />
      <Userprofile />
      <ContractList />
      <Weather />
      {/* <Userprofile/>
      <UserEdit/> */}
    </>
  );
}

export default Profile;
