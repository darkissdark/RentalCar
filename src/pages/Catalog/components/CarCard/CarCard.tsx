import style from "./CarCard.module.css";
import type { Car } from "../../../../types/car";
import {
  formatCarLocation,
  formatThousandsSeparator,
} from "../../../../utils/formatters";
import { LinkButton } from "../../../../components/ui/LinkButton/LinkButton";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <section className={style.card}>
      <div className={style.imageWrap}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={style.image}
          loading="lazy"
        />
      </div>
      <div className={style.titleWrap}>
        <h2 className={style.title}>
          {car.brand} <span className={style.modelColor}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <p className={style.title}>${car.rentalPrice}</p>
      </div>
      <p className={style.chips}>
        {formatCarLocation(car.address, "|")}&nbsp;|&nbsp;
        <span className={style.chipsLine}>
          {car.rentalCompany}&nbsp;|&nbsp;
        </span>
        <span className={style.chipsLine}>
          {car.type} | {formatThousandsSeparator(car.mileage)} km
        </span>
      </p>
      <LinkButton className={style.button} to={`/cars/${car.id}`}>
        Read more
      </LinkButton>
    </section>
  );
};

export default CarCard;
