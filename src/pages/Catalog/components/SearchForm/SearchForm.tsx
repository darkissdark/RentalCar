import { useEffect, useState } from "react";
import CustomSelect from "../../../../components/form/CustomSelect/CustomSelect";
import { fetchBrands } from "../../../../services/CarService";
import style from "./SearchForm.module.css";
import { generatePriceOptions } from "../../../../utils/options";
import RangeInput from "../../../../components/form/RangeInput/RangeInput";
import { Button } from "../../../../components/ui/Button/Button";

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
  const [brand, setBrand] = useState<string | undefined>();
  const [rentalPrice, setRentalPrice] = useState<string | undefined>();
  const [minMileage, setMinMileage] = useState<string | undefined>();
  const [maxMileage, setMaxMileage] = useState<string | undefined>();

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetchBrands();
        setBrands(response);
      } catch (error) {
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
    <div className={style.searchForm}>
      <div className={`${style.item} ${style.brand}`}>
        <div className={style.label}>Car brand</div>
        <CustomSelect
          options={brands}
          placeholder="Choose a brand"
          onChange={(val) => setBrand(val)}
        />
      </div>

      <div className={`${style.item} ${style.price}`}>
        <div className={style.label}>Price/ 1 hour</div>
        <CustomSelect
          options={generatePriceOptions(20, 10)}
          placeholder="Choose a price"
          textBeforeValue="To $"
          onChange={(val) => setRentalPrice(val)}
        />
      </div>

      <div className={`${style.item} ${style.mileage}`}>
        <div className={style.label}>Car mileage / km</div>
        <RangeInput
          onChange={({ from, to }) => {
            setMinMileage(from ? from.toString() : undefined);
            setMaxMileage(to ? to.toString() : undefined);
          }}
        />
      </div>

      <div className={style.buttonWrapper}>
        <Button className={style.button} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
