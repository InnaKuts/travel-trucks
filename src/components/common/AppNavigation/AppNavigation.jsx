import { NavLink } from "react-router-dom";
import logoImage from "../../../assets/logo.png";
import styles from "./AppNavigation.module.css";

const AppNavigation = ({ className = "" }) => {
  return (
    <header className={`${styles.navigation} ${className}`}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          <img
            src={logoImage}
            alt="TravelTrucks"
            className={styles.logoImage}
          />
        </NavLink>
      </div>

      <div className={styles.spacer}></div>

      <nav className={styles.menu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          Catalog
        </NavLink>
      </nav>

      <div className={styles.spacer}></div>
    </header>
  );
};

export default AppNavigation;
