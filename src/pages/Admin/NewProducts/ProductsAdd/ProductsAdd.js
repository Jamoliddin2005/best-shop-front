import React from 'react'
import classes from "./ProductsAdd.module.css"
import translate from "../../../../components/translate/translate"

const ProductsAdd = ({
    setName_uz,
    setName_ru,
    setPrice,
    setDesc_uz,
    setDesc_ru,
    setCategoryId,
    setPhoto,
    CreateProductHandler,
    name_uz,
    name_ru,
    price,
    desc_uz,
    desc_ru,
    categoryId,
    photoone,
    setPhotoOne,
    loading,
    setLoading,
    contacts,
    setContacts,
}) => {
    const imageHandler = (e) => {
        setPhoto(e.target.files)
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPhotoOne(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const deleteImages = (e) => {
        setPhoto("")
        setPhotoOne("https://bref.sh/img/logo-null.png")
    }
    return (
        <div className={classes.ProductsAdd}>
            <h1 className={classes.title}>New Products</h1>
            <form className={classes.form} encType="multipart/form-data">
                <label className={classes.label} htmlFor="ProductNameUz">Product Name Uz</label>
                <input className={classes.input} type="text" name="name" id="ProductNameUz" placeholder='Product Name Uz' value={name_uz} onChange={(e) => setName_uz(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductNameRu">Product Name RU</label>
                <input className={classes.input} type="text" name="name" id="ProductNameRu" placeholder='Product Name Ru' value={name_ru} onChange={(e) => setName_ru(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductPrice">Product Price</label>
                <input className={classes.input} type="number" name="price" id="ProductPrice" placeholder='Product Price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductDesc_uz">Product Description Uz</label>
                <input className={classes.input} type="text" name="desc" id="ProductDesc_uz" placeholder='Product Description Uz' value={desc_uz} onChange={(e) => setDesc_uz(e.target.value)} required />
                <label className={classes.label} htmlFor="ProductDesc_ru">Product Description RU</label>
                <input className={classes.input} type="text" name="desc" id="ProductDesc_ru" placeholder='Product Description Ru' value={desc_ru} onChange={(e) => setDesc_ru(e.target.value)} required />
                <label className={classes.label} htmlFor="categoryId">Product Category</label>
                <div className={classes.categoryDiv}>
                    {loading ?
                        <h3 className={classes.textLoading}>Loading...</h3> :
                        <select className={classes.input} name="categoryId" id="categoryId" onChange={(e) => setCategoryId(e.target.value)} required>
                            <option hidden>Category</option>
                            {contacts.map((item, index) => (
                                item._id && <option key={index} value={item._id} id={item._id}>{translate(item.name_ru, item.name_uz)}</option>
                            ))}
                        </select>
                    }
                </div>
                <label className={classes.label} htmlFor="ProductPhoto">Product Photo</label>
                <input className={classes.input} type="file" accept='image/*' multiple name="photo" id="ProductPhoto" onChange={imageHandler} required />
                <button className={classes.btn} type='button' onClick={CreateProductHandler}>Create Product</button>
                <div className={classes.images}>
                    <img src={photoone} alt="" className={classes.img} />
                    <button type='reset' className={classes.hover} onClick={deleteImages} >
                        <i className="fa-solid fa-trash-can deleteIcon"></i>
                    </button>
                </div>
            </form >
        </div >
    )
}

export default ProductsAdd