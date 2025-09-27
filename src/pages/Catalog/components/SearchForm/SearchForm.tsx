import { useEffect, useState } from "react";
import CustomSelect from "../../../../components/form/CustomSelect/CustomSelect";
import { fetchBrands } from "../../../../services/CarService";
import styles from "./SearchForm.module.css";
import { generatePriceOptions } from "../../../../utils/options";
import RangeInput from "../../../../components/form/RangeInput/RangeInput";
import Button from "../../../../components/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  setBrand,
  setRentalPrice,
  setMileageRange,
} from "../../../../store/slices/filtersSlice";

interface SearchFormProps {
  loading: boolean;
  onSearch: (params: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }) => void;
}

export function SearchForm({ loading, onSearch }: SearchFormProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const [brands, setBrands] = useState<string[]>([]);
  const [isBrandsError, setIsBrandsError] = useState<boolean>(false);

  useEffect(() => {
    const getBrands = async () => {
      try {
        setIsBrandsError(false);
        const response = await fetchBrands();
        setBrands(response);
      } catch (error) {
        setIsBrandsError(true);
        console.error("Failed to fetch brands:", error);
      }
    };

    getBrands();
  }, []);

  const handleSearch = () => {
    onSearch({
      brand: filters.brand,
      rentalPrice: filters.rentalPrice,
      minMileage: filters.minMileage,
      maxMileage: filters.maxMileage,
    });
  };

  return (
    <div className={styles.searchForm}>
      <div className={`${styles.item} ${styles.brand}`}>
        <div className={styles.label}>Car brand</div>
        <CustomSelect
          options={brands}
          isError={isBrandsError}
          placeholder="Choose a brand"
          value={filters.brand}
          onChange={(val) => dispatch(setBrand(val))}
        />
      </div>

      <div className={`${styles.item} ${styles.price}`}>
        <div className={styles.label}>Price/ 1 hour</div>
        <CustomSelect
          options={generatePriceOptions(15, 10, 30)}
          placeholder="Choose a price"
          textBeforeValue="To $"
          className={styles.priceSelect}
          value={filters.rentalPrice}
          onChange={(val) => dispatch(setRentalPrice(val))}
        />
      </div>

      <div className={`${styles.item} ${styles.mileage}`}>
        <div className={styles.label}>Car mileage / km</div>
        <RangeInput
          initialFrom={
            filters.minMileage ? parseInt(filters.minMileage) : undefined
          }
          initialTo={
            filters.maxMileage ? parseInt(filters.maxMileage) : undefined
          }
          onChange={({ from, to }) => {
            dispatch(
              setMileageRange({
                min: from ? from.toString() : undefined,
                max: to ? to.toString() : undefined,
              })
            );
          }}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          disabled={loading}
          className={styles.button}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
