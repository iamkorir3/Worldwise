import { NavLink } from "react-router-dom";
import styles from "./PageNavigation.module.css";

function PageNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
