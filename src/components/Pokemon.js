import React, {useContext, useMemo, useState} from "react";
import FavoriteContext from "../contexts/favoritesContext";
import Button from '@mui/material/Button';

const Pokemon = (props) => {
    const [heartBox, setHeartBox] = useState("🖤");
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);
    const {pokemon} = props;

    const heartColor = useMemo(() => {
        if(favoritePokemons.includes(pokemon.name)){
            setHeartBox("❤️");
        } else {
            setHeartBox("🖤");
        }
    },[favoritePokemons])

    const onHeartClick = () => {   
        updateFavoritePokemons(pokemon.name)
    }

    return (
    <div className="pokemon-card">
        <div className="pokemon-image-container">
            <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image"/>
        </div>
        <div className="card-body">
            <div className="card-top">
                <h3>{pokemon.name}</h3>
                <div>#{pokemon.id}</div>
            </div>
            <div className="card-bottom">
                <div className="card-type">
                    {pokemon.types.map((type, index) => {
                        return(
                        <Button variant="outlined" size="small" key={index} className="pokemon-type-text">{type.type.name}</Button>
                        )
                    })}
                </div>
                <button className="pokemon-heart-btn" onClick={onHeartClick}>
                    {heartBox}
                </button>
            </div>
        </div>
    </div>)
}

export default Pokemon;