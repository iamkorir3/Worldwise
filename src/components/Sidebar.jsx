import styles from "./sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
// import PageNavigation from "./PageNavigation";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copyright {new Date().getFullYear()}
          by Worldwise Inc
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
