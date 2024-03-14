function NavBar() {
  return (
    <nav className="header__nav">
      <div className="header__nav--logo">PayMe.</div>

      <div className="header__nav--links">
        <ul className="header__nav--items">
          <div>
            <span className="new">New</span>
          </div>
          <li className="header__nav--link">
            Multi-currency-account
            <svg
              className="main_icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </li>

          <li className="header__nav--link">
            Business
            <svg
              className="main_icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </li>
          <li className="header__nav--link">Login</li>
          <li className=" register">Register</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
