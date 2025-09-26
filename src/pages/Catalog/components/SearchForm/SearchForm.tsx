import { useEffect, useState } from "react";
import CustomSelect from "../../../../components/form/CustomSelect/CustomSelect";
import { fetchBrands } from "../../../../services/CarService";
import styles from "./SearchForm.module.css";
import { generatePriceOptions } from "../../../../utils/options";
import RangeInput from "../../../../components/form/RangeInput/RangeInput";
import Button from "../../../../components/ui/Button/Button";

interface SearchFormProps {
  onSearch: (params: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [isBrandsError, setIsBrandsError] = useState<boolean>(false);
  const [brand, setBrand] = useState<string | undefined>();
  const [rentalPrice, setRentalPrice] = useState<string | undefined>();
  const [minMileage, setMinMileage] = useState<string | undefined>();
  const [maxMileage, setMaxMileage] = useState<string | undefined>();

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
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
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
          onChange={(val) => setBrand(val)}
        />
      </div>

      <div className={`${styles.item} ${styles.price}`}>
        <div className={styles.label}>Price/ 1 hour</div>
        <CustomSelect
          options={generatePriceOptions(15, 10, 30)}
          placeholder="Choose a price"
          textBeforeValue="To $"
          className={styles.priceSelect}
          onChange={(val) => setRentalPrice(val)}
        />
      </div>

      <div className={`${styles.item} ${styles.mileage}`}>
        <div className={styles.label}>Car mileage / km</div>
        <RangeInput
          onChange={({ from, to }) => {
            setMinMileage(from ? from.toString() : undefined);
            setMaxMileage(to ? to.toString() : undefined);
          }}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button className={styles.button} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
