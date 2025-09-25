import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import { Container } from "../../components/ui/Container/Container";
import style from "./Catalog.module.css";
import { CarsList } from "../Catalog/components/CarsList/CarsList";
import { fetchCars } from "../../services/CarService";
import type { Car, FetchCarsParams } from "../../types/car";
import { Button } from "../../components/ui/Button/Button";

export function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, isError] = useState(false);
  const [empty, isEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSearchParams, setCurrentSearchParams] =
    useState<FetchCarsParams>({});

  const loadCars = async (
    params?: FetchCarsParams,
    page: number = 1,
    append: boolean = false
  ) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        isEmpty(false);
        isError(false);
      }

      const fetchParams = { ...params, page };
      const response = await fetchCars(fetchParams);

      if (response.totalCars === 0 && page === 1) {
        isEmpty(true);
        setCars([]);
      } else {
        if (append) {
          setCars((prevCars) => [...prevCars, ...response.cars]);
        } else {
          setCars(response.cars);
        }
      }

      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
    } catch (error) {
      isError(true);
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleSearch = (params: FetchCarsParams) => {
    setCurrentSearchParams(params);
    setCurrentPage(1);
    loadCars(params, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = +currentPage + 1;
    loadCars(currentSearchParams, nextPage, true);
    showNoMoreCars =
      !loading && !empty && !error && !hasMorePages && cars.length > 0;
  };

  const hasMorePages = currentPage < totalPages;
  const showLoadMoreButton = !loading && !empty && !error && hasMorePages;
  let showNoMoreCars = false;

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

      {empty && <p className={style.center}>No cars found.</p>}

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
