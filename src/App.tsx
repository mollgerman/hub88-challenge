import { useQuery } from "@apollo/client";
import Results from "./components/Results";

import { Country } from "../gql/graphql";
import { useState } from "react";
import { COUNTRIES } from "./queries/COUNTRIES";

function App() {
  const [code, setCode] = useState("");
  const regexCode = `(^${code})`;

  const handleInputChange = () => {
    const input = document.getElementById("inputCode") as HTMLInputElement;
    setCode(input.value.toUpperCase());
  };

  const { data, error, loading } = useQuery(COUNTRIES, {
    variables: { regexCode },
  });

  if (error) return <div>{error.toString()}</div>;

  return (
    <main className="flex flex-col min-h-screen  pt-[10vh] pb-[10vh]">
      <div className="w-[30rem] flex flex-col self-center  p-5 flex-grow gap-3 bg-white border rounded-3xl shadow-md">
        <input
          className="border px-3 py-1 rounded-full "
          id="inputCode"
          onChange={handleInputChange}
          type="text"
          placeholder="Filter by country code"
          autoComplete="off"
        />
        {loading ? (
          <p className="text-center m-3 text-xl">Loading...</p>
        ) : (
          <div>
            <Results countries={data?.countries as Country[]} code={code} />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
