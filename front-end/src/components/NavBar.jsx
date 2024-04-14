import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className={styles.header__nav}>
      <div className={styles.header__nav__container}>
        <NavLink to="/" className={styles.header__nav__logo}>
          PayMe<span className={styles.header__nav__logo__dot}>.</span>
        </NavLink>
      </div>

      <div className={styles.header__nav__links}>
        <ul className={styles.header__nav__items}>
          <div>
            <span className={styles.new}>New</span>
          </div>
          <li>
            <NavLink className={styles.header__nav__link}>
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
            </NavLink>
          </li>

          <li>
            <NavLink className={styles.header__nav__link}>
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
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.header__nav__link}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={(styles.header__nav__link, styles.register)}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
