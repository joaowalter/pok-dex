import React,{ useEffect, useState } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { FavoriteProvider } from './contexts/favoritesContext';

const favoritesKey = "f";
function App() {

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itensPerPage = 24;
  const fetchPokemons = async () => {
    try{
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async(pokemon) => {
        return await getPokemonData(pokemon.url)
      });

      const results = await Promise.all(promises);

      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    }catch(error){
      console.log("fetchPokemons error: ", error)
    }

  }
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [page])

  useEffect(() => {
    fetchPokemons();
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updateFavorites.slice(favoriteIndex, 1);
    } else {
      updateFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites);
  }

  const onSearchHandler = async (pokemon) => {
    if(!pokemon){
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      setLoading(false)
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons}}
    >
    <div>
      <Navbar />
      <Searchbar onSearch={onSearchHandler} />
      {notFound ? (
        <div className='not-found-text'> Pokémon não encontrado </div>
      ) :
      <Pokedex 
      pokemons={pokemons} 
      loading={loading} 
      page={page}
      setPage={setPage}
      totalPages={totalPages} 
      />}
    </div>
      </FavoriteProvider>
  );
}

export default App;
