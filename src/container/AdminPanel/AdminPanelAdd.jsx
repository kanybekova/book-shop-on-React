import React, { useContext, useState } from 'react';
import { adminContext } from '../../contexts/AdminContext';
import './AdminPanelAdd.css'

const AdminPanelAdd = (props) => {
    const { addProduct } = useContext(adminContext)
    const [product, setProduct] = useState({})

    const createNewProduct = (e) => {
        let newObj = {
            ...product,
            comments: [],
            likes: 0,
            [e.target.name]: e.target.value
        }
        setProduct(newObj)
    }
    console.log(product)

    function validateInput() {
        if (!product.genre || !product.name.trim() || !product.author.trim() || !product.pages.trim() || !product.price.trim() || !product.description.trim() || !product.photo.trim()) {
            return alert("Заполните поля!!!")
        }
        else {
            addProduct(product, props.history)
        }
    }

    return (
        <div className="add__panel">
            <select name="genre" id="" onChange={createNewProduct}>
                <option value="">Выбрать категорию</option>
                <option value="business">Бизнес книги</option>
                <option value="classicLiterature">Классическая литература</option>
                <option value="foreignLiterature">Зарубежная литература</option>
                <option value="russianLiterature">Русская литература</option>
                <option value="childrensBook">Детские книги</option>
                <option value="detectives">Детективы</option>
                <option value="fantasy">Фантастика</option>
                <option value="adventure">Приключения</option>
                <option value="horrors">Ужасы</option>
                <option value="novels">Романы</option>
                <option value="thriller">Боевик</option>
                <option value="scienceAndEducation">Наука и образование</option>
            </select>
            <input className="inputs" onChange={createNewProduct} placeholder="название" name="name" type="text" />
            <input className="inputs" onChange={createNewProduct} placeholder="автор" name="author" type="text" />
            <input className="inputs" onChange={createNewProduct} placeholder="обьем" name="pages" type="text" />
            <input className="inputs" onChange={createNewProduct} placeholder="цена" name="price" type="text" />
            <input className="inputs" onChange={createNewProduct} placeholder="описание" name="description" type="text" />
            <input className="inputs" onChange={createNewProduct} placeholder="фото" name="photo" type="text" />
            <button className="inputs" onClick={validateInput}>Add</button>
        </div>
    );
};

export default AdminPanelAdd;