const Navbar = () => {
  return (
    <nav class="navbar navbar-navbar-md border-bottom border-top">
      <div class="navbar-title">
        <a class="navbar-title-link">
          <div class="navbar-logo">
            <img
              src="https://shared.sgmarkets.com/assets/images/logo/socgen_logo.svg"
              alt="SG logo Glyph"
            />
          </div>
          <div class="navbar-title-divider"></div>
          <div className="navbar-service-name">
            <b>
              Data
              <br />
              Anonymizer
            </b>
          </div>
        </a>
        <button
          class="navbar-menu-btn btn btn-flat btn-xl btn-icon flex-center"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-offset="0,4"
          aria-expanded="true"
        >
          <svg
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        </ul>
      </div>
      <div class="navbar-content navbar-content-">
        <ul class="navbar-navigation m-0">
          <li class="navbar-item">
            <a class="navbar-link active" aria-current="page">
              Home
            </a>
          </li>
          {/* <li class="navbar-item">
            <a class="navbar-link">Link</a>
          </li> */}
          <li class="navbar-item">
            <a class="navbar-link">Dashboard</a>
          </li>
          <li class="navbar-item">
            <a class="navbar-link">Profile</a>
          </li>
          <li class="navbar-item dropdown">
            <a
              class="navbar-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Documentation
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item">User Guide</a>
              </li>
              <li>
                <a class="dropdown-item">About Data Anonymizer</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item">Privacy Policy</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="input-group ms-auto" style={{ maxWidth: "500px" }}>
          <div class="input-icon-start">
            <em class="icon">search</em>
          </div>
          <input
            type="search"
            class="form-control"
            aria-label="Search input"
            placeholder="Search input placeholder"
          />
        </div>
      </div>

      <div class="navbar-toolbar dropdown">
        <span
          class="material-icons px-16px dropdown-toggle"
          id="accountDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="Account Circle"
          style={{ cursor: "pointer" }}
        >
          account_circle
        </span>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="accountDropdown"
        >
          <li>
            <a class="dropdown-item">Profile</a>
          </li>
          <li>
            <a class="dropdown-item">Dashboard</a>
          </li>
          <li>
            <a class="dropdown-item">Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
