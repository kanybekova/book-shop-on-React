import React, { useContext, useEffect, useState } from 'react';
import { adminContext } from '../../contexts/AdminContext';
import './AdminPanelEdit.css'

const AdminPanelEdit = (props) => {

    const { productToEdit, editProduct } = useContext(adminContext)
    const [newProduct, setNewProduct] = useState(productToEdit)

    useEffect(() => {
        setNewProduct(productToEdit)
    }, [productToEdit])

    function updateProduct(e) {
        let obj = {
            ...newProduct,
            [e.target.name]: e.target.value
        }
        setNewProduct(obj)
    }

    function validateInput() {
        if (!newProduct.genre || !newProduct.name.trim() || !newProduct.author.trim() || !newProduct.pages.trim() || !newProduct.price.trim() || !newProduct.description.trim() || !newProduct.photo.trim()) {
            return alert("Заполните поля!!!")
        }
        else {
            editProduct(newProduct, props.history)
        }
    }

    return (
        <>
            {newProduct ? (
                <div className="edit__panel">
                    <select defaultValue={newProduct.genre} name="genre" id="" onChange={updateProduct}>
                        <option value="">Выбрать категорию</option>
                        <option value="business">Бизнес книги</option>
                        <option value="classicLiterature ">Классическая литература</option>
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
                    <input className="inputs" value={newProduct.name} onChange={updateProduct} placeholder="название" name="name" type="text" />
                    <input className="inputs" value={newProduct.author} onChange={updateProduct} placeholder="автор" name="author" type="text" />
                    <input className="inputs" value={newProduct.pages} onChange={updateProduct} placeholder="обьем" name="pages" type="text" />
                    <input className="inputs" value={newProduct.price} onChange={updateProduct} placeholder="цена" name="price" type="text" />
                    <input className="inputs" value={newProduct.description} onChange={updateProduct} placeholder="описание" name="description" type="text" />
                    <input className="inputs" value={newProduct.photo} onChange={updateProduct} placeholder="фото" name="photo" type="text" />
                    <button className="inputs" onClick={validateInput}>Edit</button>
                </div>

            ) : (
                    <h1>loading</h1>
                )}
        </>
    );
};

export default AdminPanelEdit;