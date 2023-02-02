import React, { useState, useEffect } from 'react';

import './App.css';
import pokedex from './images/pokedex.png';

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('Loading...');
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [searchPokemon, setSearchPokemon] = useState(1);

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };

  const renderPokemon = async (pokemon) => {
    setPokemonName('Loading...');
    setPokemonNumber('');

    const data = await fetchPokemon(pokemon);

    if (data) {
      setPokemonImage(
        data['sprites']['versions']['generation-iv']['heartgold-soulsilver'][
          'front_default'
        ]
      );
      setPokemonName(data.name);
      setPokemonNumber(data.id);
      setInputValue('');
      setSearchPokemon(data.id);
    } else {
      setPokemonName('Not found :/');
      setPokemonNumber('');
    }
  };

  useEffect(() => {
    renderPokemon(searchPokemon);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    renderPokemon(inputValue.toLowerCase());
  };

  return (
    <main>
      <img src={pokemonImage} alt="pokemon" className="pokemon__image" />

      <h1 className="pokemon__data">
        <span className="pokemon__number">{pokemonNumber}</span> -
        <span className="pokemon__name">{pokemonName}</span>
      </h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="input__search"
          placeholder="Name or Number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </form>

      <div className="buttons">
        <button
          className="button btn-prev"
          onClick={() => setSearchPokemon(searchPokemon - 1)}
        >
          Prev &lt;
        </button>
        <button
          className="button btn-next"
          onClick={() => setSearchPokemon(searchPokemon + 1)}
        >
          Next &gt;
        </button>
        <button className="button btn-search" onClick={handleSubmit}>
          Search
        </button>
      </div>

      <img src={pokedex} alt="pokedex" className="pokedex" />
    </main>
  );
};

export default Pokemon;
