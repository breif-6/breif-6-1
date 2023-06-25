// import Footer from './Footer';
// import Header from './Header';
import Logout from './Logout';
import ContractList from './ContractList';

// import AuthRegister from './authentication/auth-forms/AuthRegister';
// import { Routes, Route } from 'react-router-dom';
import Weather from "./Weather";
import Userprofile from "./Userprofile";
import SelectContracts from "./SelectContracts";

function Profile() {
  return (
    <>
      <Logout />
      <Userprofile />
      <ContractList />
      <Weather />
      <SelectContracts/>
    </>
  );
}

export default Profile;
