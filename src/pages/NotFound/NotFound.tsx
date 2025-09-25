import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
