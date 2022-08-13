import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
    const {pokemons, loading, page, setPage, totalPages} = props;
    const onLeftClickHandler = () => {
        if(page > 0){
            setPage(page-1)
        }
    }
    const onRightClickHandler = () => {
        if(page+1 !== totalPages){
            setPage(page+1)
        }
    }
    return (
        <div>
            {loading ? (
            <div>Carregando, aguarde...</div>
            ) : (
                <div className="pokedex-grid">
                {pokemons && pokemons.map((pokemon, index) => {
                    return (<Pokemon pokemon={pokemon} key={index} />)
                })}
            </div>
            )}
            <Pagination 
                    page={page+1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                />
        </div>
        
    );
};

export default Pokedex