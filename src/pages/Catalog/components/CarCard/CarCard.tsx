import styles from "./CarCard.module.css";
import type { Car } from "../../../../types/car";
import { formatThousandsSeparator } from "../../../../utils/formatters";
import LinkButton from "../../../../components/ui/LinkButton/LinkButton";
import FavoriteButton from "../../../../components/ui/FavoriteButton/FavoriteButton";

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  return (
    <section className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          width={1280}
          height={1024}
          loading={index < 1 ? "eager" : "lazy"}
          fetchPriority={index < 1 ? "high" : "low"}
        />
        <FavoriteButton id={car.id} className={styles.favoriteButton} />
      </div>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>
          {car.brand} <span className={styles.modelColor}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <p className={styles.title}>${car.rentalPrice}</p>
      </div>
      <p className={styles.chips}>
        <span className={styles.chipsItem}>{car.address.split(",")[1]}</span>
        <span className={styles.chipsItem}>{car.address.split(",")[2]}</span>
        <span className={styles.chipsItem}>{car.rentalCompany}</span>
        <span>
          <span className={`${styles.capitalize} ${styles.chipsItem}`}>
            {car.type}
          </span>
          {formatThousandsSeparator(car.mileage)} km
        </span>
      </p>
      <LinkButton className={styles.button} to={`/catalog/${car.id}`}>
        Read more
      </LinkButton>
    </section>
  );
};

export default CarCard;
