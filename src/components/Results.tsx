import { Country } from "../../gql/graphql";
import { useEffect, useState } from "react";
import CountriesTable from "./CountriesTable";

interface ResultsProps {
  countries: Country[];
  code: string;
}

const Results = ({ countries, code }: ResultsProps) => {
  const [countriesArray, setCountriesArray] = useState<Country[]>([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState<Country[]>([]);
  const COUNTRIES_QTY = 20;

  const [hasMore, setHasMore] = useState(false);

  //Update countries array when countries prop changes
  useEffect(() => {
    setCountriesToDisplay([]);
    setCountriesArray([]);

    //Map countries to countries array
    setCountriesArray(
      countries.map((country) => ({ name: country.name, code: country.code }))
    );
  }, [countries]);

  //Update countries to be displayed countries when countries array changes
  useEffect(() => {
    loadFunction();
  }, [countriesArray]);

  // Load more countries to be displayed if needed.
  const loadFunction = () => {
    const DisplayLength = countriesToDisplay.length;

    if (countriesArray.length - DisplayLength > COUNTRIES_QTY) {
      setCountriesToDisplay(
        countriesToDisplay.concat(
          countriesArray.slice(DisplayLength, DisplayLength + COUNTRIES_QTY)
        )
      );
      setHasMore(true);
      return;
    }

    setCountriesToDisplay(
      countriesToDisplay.concat(countriesArray.slice(DisplayLength))
    );
    setHasMore(false);
  };

  return (
    <div className="border rounded-xl py-3 bg-white">
      {countriesToDisplay.length > 0 ? (
        <CountriesTable
          countries={countriesToDisplay}
          hasMore={hasMore}
          loadFunction={loadFunction}
        />
      ) : (
        <h1 className="text-center">
          No countries found for code <strong>{code}</strong>
        </h1>
      )}
    </div>
  );
};

export default Results;
