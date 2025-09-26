import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../services/CarService";
import type { Car } from "../../types/car";
import styles from "./CarDetails.module.css";
import Container from "../../components/ui/Container/Container";
import Loader from "../../components/ui/Loader/Loader";
import { isAxiosError } from "axios";
import NotFound from "../NotFound/NotFound";
import CarHeadingSection from "./components/CarHeadingSection/CarHeadingSection";
import СarCharacteristicList from "./components/СarCharacteristicList/СarCharacteristicList";
import { capitalizeFirstLetter } from "../../utils/formatters";
import BookingForm from "./components/CarBookingForm/BookingForm";
import { useIsMobile } from "../../hooks/useIsMobile";

export const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isMobile = useIsMobile();

  useEffect(() => {
    const loadCar = async () => {
      if (!id) {
        setError("true");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const carData = await fetchCarById(id);
        setCar(carData);
      } catch (error) {
        console.error("Failed to fetch car:", error);
        if (isAxiosError(error)) {
          if (error?.response?.data.message) {
            setError(error?.response?.data.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error || !car) {
    if (error === "Not found") {
      return <NotFound />;
    }
    return (
      <Container className={styles.waiter}>
        <p>Failed to load car details. Please try again later.</p>
      </Container>
    );
  }

  const carSpecifications = [
    { icon: "icon-calendar", text: `Year: ${car.year}` },
    { icon: "icon-car", text: `Type: ${capitalizeFirstLetter(car.type)}` },
    {
      icon: "icon-fuel-pump",
      text: `Fuel Consumption: ${car.fuelConsumption}`,
    },
    { icon: "icon-gear", text: `Engine Size: ${car.engineSize}` },
  ];

  return (
    <Container className={styles.carWrapper}>
      <div className={styles.carRightSide}>
        <CarHeadingSection car={car} />
        <СarCharacteristicList
          title="Rental Conditions:"
          items={car.rentalConditions.map((condition) => ({
            icon: "icon-check-circle",
            text: condition,
          }))}
        />
        <СarCharacteristicList
          title="Car Specifications:"
          items={carSpecifications}
        />
        <СarCharacteristicList
          title="Accessories and functionalities:"
          items={[...car.accessories, ...car.functionalities].map((item) => ({
            icon: "icon-check-circle",
            text: item,
          }))}
        />
      </div>
      <div className={styles.carLeftSide}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.carImage}
          loading="eager"
          fetchPriority="high"
        />
        {!isMobile && <BookingForm carId={car.id} />}
      </div>

      {isMobile && <BookingForm carId={car.id} />}
    </Container>
  );
};

export default CarDetails;
