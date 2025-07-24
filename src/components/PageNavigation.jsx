import { NavLink } from "react-router-dom";
import styles from "./PageNavigation.module.css";
import Logo from "./Logo";

function PageNavigation() {
  return (
    <nav className={styles.nav}>
      <Logo />{" "}
      <ul>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
