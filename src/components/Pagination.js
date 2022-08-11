import React from "react";

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props;
    return (
        <div className="pagination-container">
            <button className="button-left" onClick={onLeftClick}><div>👈</div></button>
            <div>{page} de {totalPages}</div>
            <button className="button-right" onClick={onRightClick}><div>👉</div></button>
        </div>
    )
}

export default Pagination;