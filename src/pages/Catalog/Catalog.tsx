import { useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Container from "../../components/ui/Container/Container";
import styles from "./Catalog.module.css";
import { CarsList } from "../Catalog/components/CarsList/CarsList";
import Button from "../../components/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCarsAsync, resetCars } from "../../store/slices/carsSlice";
import { setFilters } from "../../store/slices/filtersSlice";
import type { FetchCarsParams } from "../../types/car";
import Loader from "../../components/ui/Loader/Loader";

export function Catalog() {
  const dispatch = useAppDispatch();
  const { cars, loading, loadingMore, error, currentPage, hasMorePages } =
    useAppSelector((state) => state.cars);
  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCarsAsync({ useStoredFilters: true }));
  }, [dispatch]);

  const handleSearch = (params: FetchCarsParams) => {
    dispatch(setFilters(params));
    dispatch(resetCars());
    dispatch(fetchCarsAsync({ params, page: 1, append: false }));
  };

  const handleLoadMore = () => {
    const nextPage = +currentPage + 1;
    dispatch(fetchCarsAsync({ params: filters, page: nextPage, append: true }));
  };

  const showLoadMoreButton = !loading && hasMorePages && cars.length > 0;
  const showNoMoreCars =
    !loading && !loadingMore && !hasMorePages && cars.length > 0;

  return (
    <Container>
      <h1 className="visually-hidden">Cars list</h1>
      <div className={styles.center}>
        <SearchForm loading={loading} onSearch={handleSearch} />
      </div>

      {error && (
        <p className={styles.center}>
          Failed to load cars. Please try again later.
        </p>
      )}

      {!loading && cars.length === 0 && !error && (
        <p className={styles.center}>No cars found.</p>
      )}

      {loading ? (
        <Loader className={styles.loader} />
      ) : (
        <CarsList cars={cars} />
      )}

      <div className={styles.center}>
        {showLoadMoreButton && (
          <Button
            variant="secondary"
            className={styles.loadMore}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        )}

        {showNoMoreCars && (
          <p className={`${styles.center} ${styles.pb}`}>
            No more cars available.
          </p>
        )}
      </div>
    </Container>
  );
}

export default Catalog;
