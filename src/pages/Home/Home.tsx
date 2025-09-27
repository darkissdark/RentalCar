import styles from "./Home.module.css";
import Button from "../../components/ui/Button/Button";

export function Home() {
  return (
    <section className={styles.wrapper}>
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/home/hero-desktop.webp 1x, /assets/home/hero-desktop@2x.webp 2x"
          type="image/webp"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/home/hero-desktop.jpg 1x, /assets/home/hero-desktop@2x.jpg 2x"
          type="image/jpeg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/home/hero-tablet.webp 1x, /assets/home/hero-tablet@2x.webp 2x"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/home/hero-tablet.jpg 1x, /assets/home/hero-tablet@2x.jpg 2x"
          type="image/jpeg"
        />
        <source
          srcSet="/assets/home/hero-mobile.webp 1x, /assets/home/hero-mobile@2x.webp 2x"
          type="image/webp"
        />
        <source
          srcSet="/assets/home/hero-mobile.jpg 1x, /assets/home/hero-mobile@2x.jpg 2x"
          type="image/jpeg"
        />
        <img
          src="/assets/home/hero-mobile.jpg"
          alt="RentalСar"
          className={styles.image}
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className={styles.textWrapper}>
        <h1 className={styles.mainTitle}>Find your perfect rental car</h1>
        <h2 className={styles.subTitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Button as="link" to="/catalog" className={styles.button}>
          View Catalog
        </Button>
      </div>
    </section>
  );
}

export default Home;
