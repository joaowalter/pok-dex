import React from "react";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props;
    return (
        <div className="pagination-container">
            <IconButton  onClick={onLeftClick} aria-label="Página anterior">
        <NavigateBeforeIcon />
      </IconButton>
            <div className="pagination-numbers">{page} de {totalPages}</div>    
            <IconButton onClick={onRightClick} aria-label="Próxima página">
        <NavigateNextIcon />
      </IconButton>
        </div>
    )
}

export default Pagination;