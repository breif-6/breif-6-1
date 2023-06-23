import Header from './Header';
import Main from './Main';
import About from './About';
import Values from './Values';
import Features from './Features';
import Footer from './Footer';
import ContractList from './ContractList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './sign_up'


import '../styles/Home.css';
import React, { useEffect } from 'react';
import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

  useEffect(() => {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
      });
    });
  }, []);

    return (
      <>

     <BrowserRouter>
      <div className="Home">
        <Header />
        <Routes>
         
          <Route exact path="/sign_up" element={<SignUpForm />} />
        </Routes>

        <Footer />
      </div>
     </BrowserRouter>

      {/* 
      <ContractList />
      <Main />
      <About />
      <Values />
      <Features />
      <Footer /> */}
      </>
    );
  }
  
  export default Home;
  