import React from 'react';
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './sign_up';

function Header() {
    return (
      <>
   
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>
              <NavLink class="navbar-brand" to="#myPage">Logo</NavLink>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right">
                <li><NavLink to="#about">ABOUT</NavLink></li>
                <li><NavLink to="#services">SERVICES</NavLink></li>
                <li><NavLink to="#portfolio">PORTFOLIO</NavLink></li>
                <li><NavLink to="#pricing">PRICING</NavLink></li>
                <li><NavLink to="#contact">CONTACT</NavLink></li>
                <li><NavLink to='/sign_up'> sign up</NavLink> </li>
               
              </ul>
            </div>
          </div>
        </nav>
      

       
      </>
    );
  }
  
  export default Header;
  