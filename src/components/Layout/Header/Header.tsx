import styles from "./Header.module.css";
import { Container } from "../../ui/Container/Container";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.wrapper}>
        <Link to={"/"} className={styles.logo}>
          <img src="/logo.svg" alt="RentalCar" />
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.link}` : styles.link
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.link}` : styles.link
                }
                to={"/catalog"}
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
