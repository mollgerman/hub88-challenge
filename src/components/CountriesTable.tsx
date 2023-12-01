import InfiniteScroll from "react-infinite-scroll-component";
import { Country } from "../../gql/graphql";

interface CountriesTableProps {
  countries: Country[];
  loadFunction: () => void;
  hasMore: boolean;
}

const CountriesTable = ({
  countries,
  loadFunction,
  hasMore,
}: CountriesTableProps) => {
  
  return (
    <InfiniteScroll
      className="flex flex-col justify-center"
      dataLength={countries.length}
      next={loadFunction}
      hasMore={hasMore}
      scrollThreshold={0.9}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <table className=" rounded-md">
        <thead>
          <tr>
            <th className="w-[5rem] pb-2 text-lg">Code</th>
            <th className="pb-2 text-lg">Name</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr
              key={country.code}
              className="transition duration-200 hover:ease-out hover:bg-[#06bce12b] rounded-md"
            >
              <td className="w-[4rem] py-1 text-center border-y border-grey-600">
                {country.code}
              </td>
              <td className="text-center py-1 border-y border-grey-600">
                {country.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default CountriesTable;
