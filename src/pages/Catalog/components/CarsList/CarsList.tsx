import styles from "./CarsList.module.css";
import type { Car } from "../../../../types/car";
import CarCard from "../../components/CarCard/CarCard";

interface CarsListProps {
  cars: Car[];
}

export function CarsList({ cars }: CarsListProps) {
  return (
    <div className={styles.wrapper}>
      {cars.map((car, index) => (
        <CarCard car={car} index={index} key={car.id} />
      ))}
    </div>
  );
}

export default CarsList;
