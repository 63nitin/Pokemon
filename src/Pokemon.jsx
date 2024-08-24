import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./index.css";

export const Pokemon = () => {
  // ****** useState Hook to manage the different data state  *****

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // ***** API link with Limit  *****

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  // *****  Function for feching the API data  ******

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);

      const data = await res.json();
      // console.log(data);

      // **** Addition function to fetch the deatails of the data  ******

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url)
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      // console.log(detailedPokemonData)

      // ***** Function to handle the Promises  *****

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      // **** Error Handling ****
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  // **** useEffect hook to show the onscreen effect of the code ****
  useEffect(() => {
    fetchPokemon();
  }, []);

  // **** search functionality using filter in Javascript *****

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // ***** condition for loading state *****

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  // **** conditon for Error *****

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
