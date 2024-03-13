function NavBar() {
  return (
    <>
      <nav className="header__nav">
        <div className="logo">PayMe.</div>
        <div className="header__nav--links">
          <ul className="nav__items">
            <li className="header__nav--link login">Login</li>
            <li className="header__nav--link register">Register</li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
