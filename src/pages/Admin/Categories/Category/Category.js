import React from 'react'
import classes from "./Category.module.css"
import translate from "../../../../components/translate/translate"
const Category = ({ name_uz,
    name_ru, photo, deleteCategory, id, getCategory }) => {
    return (
        <div className={classes.category}>
            <div className={classes.imageDiv} onClick={() => getCategory(id)}>
                {photo && <img className={classes.image} src={`/uploads/${photo}`} alt="" />}
            </div>
            <h4 className={classes.name} onClick={() => getCategory(id)}>{translate(name_ru, name_uz)}</h4>
            <button className={classes.button} onClick={() => getCategory(id)}>GO SHOP</button>
            <button className={classes.button} onClick={(e) => deleteCategory(id)}>Delete</button>
        </div>
    )
}

export default Category