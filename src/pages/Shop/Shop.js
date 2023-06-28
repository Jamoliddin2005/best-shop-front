import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading2 from '../../components/Loading2/Loading2'
import Brands from '../About/Brands/Brands'
import classes from "./Shop.module.css"

function Shop({ categories, loading }) {
    const [seasons] = useState([
        {
            name: "Spring",
            isActive: false,
            id: 1
        },
        {
            name: "Summer",
            isActive: false,
            id: 2
        },
        {
            name: "Autumn",
            isActive: false,
            id: 3
        },
        {
            name: "Winter",
            isActive: false,
            id: 4
        },
        {
            name: "All",
            isActive: true,
            id: 5
        },
    ])

    return (
        <div className={classes.ShoppingPage}>
            <div className="container">
                <div className={classes.row}>
                    <div className={classes.Left}>
                        <ul>
                            <h4>Gender</h4>
                            <li>
                                <Link to="/product/womans">Womans</Link>
                            </li>
                            <li>
                                <Link to="/product/mens">Mens</Link>
                            </li>
                            <li>
                                <Link to="/product/all">All</Link>
                            </li>
                        </ul>
                        <ul>
                            {loading ? (
                                <>
                                    <h4>Categories</h4>
                                    <div className={classes.LoadingDiv}>
                                        <Loading2 style={{ color: "#9bd85a", textAlign: "left", fontSize: "20px", marginTop: "20px", marginLeft: "10px", marginBottom: "30px" }} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h4>Categories</h4>
                                    {categories.map((item, index) => (
                                        item._id && <li key={index}>
                                            <Link to={`/category/${item._id}`}>{item.name}</Link>
                                        </li>
                                    ))}

                                </>
                            )}
                        </ul>
                        <ul>
                            <h4>Seasons</h4>
                            {seasons.map((item, index) => (
                                item.name && <li key={index} className={item.isActive ? classes.SeasonsActive : classes.noActive}>
                                    <Link to={"#"} onClick={(e) => {
                                        e.preventDefault()
                                    }}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.Right}>
                        <h1>Shopping Right</h1>
                    </div>
                </div>


            </div>
            <Brands />

        </div >
    )
}

export default Shop