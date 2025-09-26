import styles from "./CarHeadingSection.module.css";
import { type Car } from "../../../../types/car";

import {
  formatCarLocation,
  formatThousandsSeparator,
} from "../../../../utils/formatters";

export const CarHeadingSection = ({ car }: { car: Car }) => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.titlePrimary}>
          {car.brand} {car.model}, {car.year}
        </span>
        <span className={styles.titleSecondary}>Id: {car.id.slice(0, 5)}</span>
      </h1>
      <ul className={styles.info}>
        <li className={styles.infoItem}>
          <svg className={styles.icon} width="16" height="16">
            <use xlinkHref="/assets/sprite.svg#icon-location"></use>
          </svg>
          {formatCarLocation(car.address)}
        </li>
        <li className={styles.infoItem}>
          Mileage: {formatThousandsSeparator(car.mileage)} km
        </li>
      </ul>
      <div className={styles.price}>${car.rentalPrice}</div>
      <div>{car.description}</div>
    </section>
  );
};

export default CarHeadingSection;
