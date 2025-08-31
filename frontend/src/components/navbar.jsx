import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setShow }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log("logging out")
    navigate("/auth");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-navbar-md border-bottom border-top">
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
        <ul className="navbar-navigation m-0">
          <li className="navbar-item">
            <a
              className={`navbar-link${isActive("/") ? " active" : ""}`}
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a
              className={`navbar-link${isActive("/dashboard") ? " active" : ""}`}
              href="/dashboard"
            >
              Dashboard
            </a>
          </li>
          <li className={`navbar-item dropdown${dropdownOpen ? " show" : ""}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              className={`navbar-link dropdown-toggle${["/guide","/about","/privacy"].includes(location.pathname) ? " active" : ""}`}
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded={dropdownOpen ? "true" : "false"}
              href="#"
              onClick={e => e.preventDefault()}
            >
              Documentation
            </a>
            <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`} aria-labelledby="navbarDropdown">
              <li>
                <a className={`dropdown-item${isActive("/guide") ? " active" : ""}`} href="/guide">User Guide</a>
              </li>
              <li>
                <a className={`dropdown-item${isActive("/about") ? " active" : ""}`} href="/about">About Us</a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className={`dropdown-item${isActive("/privacy") ? " active" : ""}`} href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </li>
          <li className="navbar-item">
            <a
              className={`navbar-link${isActive("/notifications") ? " active" : ""}`}
              href="/notifications"
            >
              Notifications
            </a>
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
            <a class="dropdown-item" onClick={() => setShow(true)}>Profile</a>
          </li>
          <li>
            <a class="dropdown-item" href="/notifications">Notifications</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" onClick={handleSignOut}>Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
