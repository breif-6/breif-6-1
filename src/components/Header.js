
function Header() {
    return (
      <>
<<<<<<< HEAD
<nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
    <div className="container-fluid">
    <a className="navbar-brand" href="#1">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#1">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#1">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            heba
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#1">Action</a></li>
            <li><a className="dropdown-item" href="#1">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#1">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#1">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
=======
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>
              <a class="navbar-brand" href="#myPage">Logo</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#services">SERVICES</a></li>
                <li><a href="#portfolio">PORTFOLIO</a></li>
                <li><a href="#pricing">PRICING</a></li>
                <li><a href="#contact">CONTACT</a></li>
              </ul>
            </div>
          </div>
        </nav>
>>>>>>> 29c9772a1a9d0e7b6ff3bb0cc5f3d4388e3beaf6
      </>
    );
  }
  
  export default Header;
  