

const Navbar = () => {
  return (
    <nav class="navbar navbar-navbar-md border-bottom border-top">
 <div class="navbar-title">
  <a class="navbar-title-link">
      <div class="navbar-logo">
        <img src="https://shared.sgmarkets.com/assets/images/logo/socgen_logo.svg" alt="SG logo Glyph" />
      </div>
      <div class="navbar-title-divider"></div>
      <div class="navbar-service-name">Service<br />name</div>
    </a>
    <button class="navbar-menu-btn btn btn-flat btn-xl btn-icon flex-center" type="button" data-bs-toggle="dropdown" data-bs-offset="0,4" aria-expanded="true">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="20" height="2" fill="currentColor"></rect>
        <rect x="2" y="11" width="20" height="2" fill="currentColor"></rect>
        <rect x="2" y="16" width="20" height="2" fill="currentColor"></rect>
      </svg>
    </button>
    <ul class="navbar-menu-dropdown dropdown-menu w-100">
      <li class="navbar-item">
        <a class="navbar-link active">Home</a>
      </li>
      <li class="navbar-item">
        <a class="navbar-link">Link</a>
      </li>
      <li class="navbar-item">
        <a class="navbar-link disabled">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="navbar-content navbar-content-">
    <ul class="navbar-navigation m-0">
      <li class="navbar-item">
        <a class="navbar-link active" aria-current="page">Home</a>
      </li>
      <li class="navbar-item">
        <a class="navbar-link">Link</a>
      </li>
      <li class="navbar-item dropdown">
        <a class="navbar-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item">Action</a></li>
          <li>
            <a class="dropdown-item">Another action</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item">Something else here</a>
          </li>
        </ul>
      </li>
      <li class="navbar-item">
        <a class="navbar-link disabled">Disabled</a>
      </li>
    </ul>
    <div class="input-group">
      <div class="input-icon-start">
        <em class="icon">search</em>
      </div>
      <input type="search" class="form-control" aria-label="Search input" placeholder="Search input placeholder" />
    </div>
  </div>
  <div class="navbar-toolbar">
    <div class="px-16px">Navbar</div>
  </div>
  </nav>
  );
};

export default Navbar;
