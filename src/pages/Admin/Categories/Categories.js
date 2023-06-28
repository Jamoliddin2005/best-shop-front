import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../../../components/Loading/Loading'
import classes from "./Categories.module.css"
import Category from './Category/Category'
import CategoryAdd from './CategoryAdd/CategoryAdd'
const Categories = ({ getCategory,
    loading,
    setLoading,
    contacts,
    setContacts }) => {

    const [name_uz, setName_uz] = useState('')
    const [name_ru, setName_ru] = useState('')
    const [photo, setPhoto] = useState('https://bref.sh/img/logo-null.png')
    const [photoone, setPhotoOne] = useState('https://bref.sh/img/logo-null.png')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (name_uz && name_ru && photo && contacts) {
            e.preventDefault()
            try {
                e.preventDefault()
                toast.success("Categoriya qo'shildi");
                const dataCategory = new FormData()
                dataCategory.append('name_uz', name_uz)
                dataCategory.append('name_ru', name_ru)
                dataCategory.append('photo', photo)
                const fileInput = document.querySelector("#photoInputAdd");
                fileInput.value = "";
                setName_uz("")
                setName_ru("")
                const { data } = await axios.post(
                    `${process.env.REACT_APP_URL}/add/addCategory`,
                    dataCategory,
                    {
                        headers: {
                            "Authorization": sessionStorage.getItem("token")
                        }
                    }
                );
                // 
                setContacts(data.data)
                setPhotoOne('https://bref.sh/img/logo-null.png')
            } catch (error) {
                return toast.error("ERROR!!!")
            }
        } else {
            e.preventDefault()
            toast.error("Mahsulotlarni to'liq kiriting!!!");
        }
    }

    const deleteCategory = async (id) => {
        const res = window.confirm("Bu Categoriya o'chirib tashlansinmi?")
        if (res) {
            toast.success("Categoriya o'chirib tashlandi")
            const { data } = await axios.delete(`${process.env.REACT_APP_URL}/delete/Categories/delete/` + id, {
                headers: {
                    "Authorization": sessionStorage.getItem("token")
                }
            })
            setContacts(data.data);
        }
    }

    return (
        <div className={classes.Categories}>
            <h1 className={classes.title}>Categories</h1>
            <div className={classes.row}>
                <div className={classes.addCategory}>
                    <CategoryAdd photoone={photoone}
                        setPhotoOne={setPhotoOne} name_ru={name_ru} name_uz={name_uz} photo={photo} setName_uz={setName_uz} setName_ru={setName_ru} setPhoto={setPhoto} onSubmitHandler={onSubmitHandler} />
                </div>
                <div className={classes.categories}>
                    {contacts.length
                        ? loading ? <Loading />
                            : contacts.map((item, index) => (
                                item.photo && <Category getCategory={getCategory} deleteCategory={deleteCategory} id={item._id} key={index} name_uz={item.name_uz} name_ru={item.name_ru} photo={item.photo} />
                            ))
                        : <h2>Categoriyalar yo'q</h2>}

                </div>
            </div>
        </div>
    )
}

export default Categories