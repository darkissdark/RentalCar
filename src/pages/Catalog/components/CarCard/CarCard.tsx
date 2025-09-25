import style from "./CarCard.module.css";
import type { Car } from "../../../../types/car";
import { formatThousandsSeparator } from "../../../../utils/formatters";
import LinkButton from "../../../../components/ui/LinkButton/LinkButton";
import FavoriteButton from "../../../../components/ui/FavoriteButton/FavoriteButton";

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
        <FavoriteButton id={car.id} className={style.favoriteButton} />
      </div>
      <div className={style.titleWrap}>
        <h2 className={style.title}>
          {car.brand} <span className={style.modelColor}>{car.model}</span>,{" "}
          {car.year}
        </h2>
        <p className={style.title}>${car.rentalPrice}</p>
      </div>
      <p className={style.chips}>
        <span className={style.chipsItem}>{car.address.split(",")[1]}</span>
        <span className={style.chipsItem}>{car.address.split(",")[2]}</span>
        <span className={style.chipsItem}>{car.rentalCompany}</span>
        <span>
          <span className={`${style.capitalize} ${style.chipsItem}`}>
            {car.type}
          </span>
          {formatThousandsSeparator(car.mileage)} km
        </span>
      </p>
      <LinkButton className={style.button} to={`/catalog/${car.id}`}>
        Read more
      </LinkButton>
    </section>
  );
};

export default CarCard;
