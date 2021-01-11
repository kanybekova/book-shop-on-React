import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { productsContext } from '../../contexts/ProductsContext';
import Navibar from '../Navibar/Navibar';
import './ProductDetails.css'
import user from '../img/user (1).svg'

const ProductDetails = (props) => {
    const {
        getDetailsOfProduct,
        productDetails,
        addAndDeleteProductInCart,
        addAndDeleteProductInFavorites,
        getProductsBusiness,
        getProductsClassicLiterature,
        getProductsChildren,
        getProductsFantasy,
        sendComment,
        addAndDeleteLikes,
        checkProductInLikes,
        checkProductInCart,
        checkProductInFavorites
    } = useContext(productsContext)


    //comments start

    useEffect(() => {
        getDetailsOfProduct(props.match.params.id)
    }, [])

    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')

    const [newProduct, setNewProduct] = useState(productDetails)

    useEffect(() => {
        setNewProduct(productDetails)
    }, [productDetails])

    function handleSave(e) {
        let obj = {
            userName: value1,
            userComment: value2
        }
        if(!obj.userName.trim() || !obj.userComment.trim()){
            return alert("Заполните все поля")
        }
        sendComment(newProduct, obj)
        setValue1('')
        setValue2('')
    }

    //comments end

    return (
        <>
            {productDetails ?
                (
                    <div>
                        <Navibar />
                        <Container>
                            <div className="block-product-details">
                                <div>
                                    <img className="product-details-img" style={{ borderRadius: "2%", width: "300px" }} src={productDetails.photo} alt="" />
                                </div>
                                <div className="details-description">
                                    <h3 className="h3">{productDetails.name}</h3>
                                    <p>{productDetails.author} (автор)</p>
                                    <p>{productDetails.price} сомов</p>
                                    <button style={{ backgroundColor: checkProductInCart(productDetails.id) ? "red" : "#573ba3" }} onClick={() => addAndDeleteProductInCart(productDetails)} className="btn-add-to-cart">В корзину</button>
                                    <button style={{ backgroundColor: checkProductInFavorites(productDetails.id) ? "red" : "white", color: checkProductInFavorites(productDetails.id) ? "white" : "#573ba3" }} onClick={() => addAndDeleteProductInFavorites(productDetails)} className="btn-add-to-wishlist">В избранное</button>
                                    <p style={{ cursor: 'pointer', color: checkProductInLikes(productDetails.id) ? "red" : "black" }} onClick={() => addAndDeleteLikes(productDetails)}>Нравится {productDetails.likes}</p>
                                    <p className="detail-block-description">{productDetails.description}</p>
                                </div>
                            </div>
                            <div >
                                <h3 style={{ display: "flex", justifyContent: "start" }}>Отзывы</h3>
                                <div>
                                    <div>
                                        {productDetails.comments.map((item, index) => (
                                            <div key={`${index + 1}`}>
                                                <div className="user-name" style={{ display: "flex", alignItems: "center", textAlign: "left", padding: "3%", border: "1px solid #d5d5d5", marginBottom: "20px" }}>
                                                    <div className="user">
                                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                            <img className="user-icon" style={{ width: "5%", marginRight: "3%" }} src={user} alt="" />
                                                            <h5>{item.userName}</h5>
                                                        </div>
                                                        <div className="comment" style={{ marginLeft: " 8%", width: "80%" }}>
                                                            <span>
                                                                {item.userComment}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", margin: "30px", justifyContent: "center", alignItems: "center" }}>
                                    <input
                                        className="comment"
                                        style={{ border: "none", borderRadius: "0%", borderBottom: "1px solid gray", width: "40%" }}
                                        value={value1}
                                        onChange={(e) => setValue1(e.target.value)}
                                        name="userName"
                                        placeholder="Ваше имя"
                                        type="text"
                                    />
                                    <textarea
                                        className="comment"
                                        style={{ width: "40%", height: "200px", margin: "30px 0" }}
                                        value={value2}
                                        onChange={(e) => setValue2(e.target.value)}
                                        name="userComment"
                                        placeholder="Ваш отзыв"
                                        type="text">
                                    </textarea>
                                    <button className="save-comment-btn" onClick={handleSave}>Оставить отзыв</button>
                                </div>
                            </div>
                        </Container>
                    </div>
                )
                :
                (
                    <h2>Loading</h2>
                )}
        </>
    );
};

export default ProductDetails;