import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
