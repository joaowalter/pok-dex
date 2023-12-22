import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const Searchbar = (props) => {
    const [search, setSearch] = useState("charizard")
    const {onSearch} = props
    const onChangeHandler = (e) => {
        setSearch (e.target.value)
        if(e.target.value.length === 0){
            onSearch(undefined)
        }

    }

    const onButtonClickHandler = () => {
        onSearch(search)
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
            <TextField size="small" placeholder="Buscar pokémon" onChange={onChangeHandler} InputProps={{type: 'search',}}
          />

              
            </div>
            <div className="searchbar-button">
                <IconButton onClick={onButtonClickHandler} aria-label="Buscar">
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Searchbar