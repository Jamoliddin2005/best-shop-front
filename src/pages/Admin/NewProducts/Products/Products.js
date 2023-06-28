import React from 'react'
import Currency from '../../../../components/Currency/Currency'
import NameLength from '../../../../components/NameLength/NameLength'
import translate from '../../../../components/translate/translate'
import classes from "./Products.module.css"

const Products = ({
    name_uz,
    name_ru,
    price,
    photo,
    ProductDelete,
    id,
    ProductMore
}) => {

    return (
        <div className={classes.Products}>
            <div className={classes.photo} onClick={() => ProductMore(id)}>
                {photo[0] && <img className={classes.img} src={"/uploads/" + photo[0]} alt="" />}
            </div>
            <div className={classes.center}>
                <div className={classes.name_price}>
                    <h4 className={classes.h3} onClick={() => ProductMore(id)}>{translate(NameLength(name_ru, 25), NameLength(name_uz, 30))}</h4>
                    <button className={classes.btn} onClick={() => ProductDelete(id)}>Delete</button>
                    <h5 className={classes.price} onClick={() => ProductMore(id)}>{Currency(price)}</h5>
                </div>
            </div>
        </div>
    )
}

export default Products