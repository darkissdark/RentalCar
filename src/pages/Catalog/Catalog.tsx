import { useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Container from "../../components/ui/Container/Container";
import style from "./Catalog.module.css";
import { CarsList } from "../Catalog/components/CarsList/CarsList";
import Button from "../../components/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCarsAsync, resetCars } from "../../store/slices/carsSlice";
import { setFilters } from "../../store/slices/filtersSlice";
import type { FetchCarsParams } from "../../types/car";

export function Catalog() {
  const dispatch = useAppDispatch();
  const { cars, loading, loadingMore, error, currentPage, hasMorePages } =
    useAppSelector((state) => state.cars);
  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCarsAsync({ params: {}, page: 1, append: false }));
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

  const showLoadMoreButton =
    !loading && !loadingMore && hasMorePages && cars.length > 0;
  const showNoMoreCars =
    !loading && !loadingMore && !hasMorePages && cars.length > 0;

  return (
    <Container>
      <h1 className="visually-hidden">Cars list</h1>
      <div className={style.center}>
        <SearchForm onSearch={handleSearch} />
      </div>

      {error && (
        <p className={style.center}>
          Failed to load cars. Please try again later.
        </p>
      )}

      {!loading && cars.length === 0 && !error && (
        <p className={style.center}>No cars found.</p>
      )}

      {loading ? (
        <p className={style.center}>Loading cars...</p>
      ) : (
        <CarsList cars={cars} />
      )}

      <div className={style.center}>
        {showLoadMoreButton && (
          <Button
            variant="secondary"
            className={style.loadMore}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        )}

        {showNoMoreCars && (
          <p className={`${style.center} ${style.pb}`}>
            No more cars available.
          </p>
        )}
      </div>
    </Container>
  );
}

export default Catalog;
