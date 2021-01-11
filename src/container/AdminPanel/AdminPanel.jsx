import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminContext } from '../../contexts/AdminContext';
import './AdminPanel.css'


const AdminPanel = () => {
    const { products, getProducts, delProduct, getProductToEdit } = useContext(adminContext)

    useEffect(() => {
        getProducts()
    }, [])

    console.log(products)
    return (
        <div>
            <div className="container">
                <div className="admin-panel">
                    <div className="admin__name">
                        <h1>ADMIN PANEL</h1>
                    </div>
                </div>
                <div className="add-panel">
                    <div><Link to="/admin-panel-add"><button>ADD PRODUCT</button></Link></div>
                </div>
                <table style={{ textAlign: 'center' }}>
                    <thead className="table__name">
                        <tr>
                            <th>~</th>
                            <th>image</th>
                            <th>name</th>
                            <th>автор</th>
                            <th>жанр</th>
                            <th>pages</th>
                            <th>price</th>
                            <th>Описание</th>
                            <th>~</th>
                            <th>~</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td><a href={item.image}><img style={{ maxWidth: '100px' }} src={item.photo} alt="" /></a></td>
                                <td>{item.name}</td>
                                <td>{item.author}</td>
                                <td>{item.genre}</td>
                                <td>{item.pages}</td>
                                <td>{item.price}</td>
                                <td style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.description}</td>
                                <td><button onClick={() => delProduct(item.id)}>DEL</button></td>
                                <td><Link to="/admin-panel-edit"><button onClick={() => getProductToEdit(item.id)}>EDIT</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;