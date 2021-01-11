import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { productsContext } from '../../contexts/ProductsContext';
import Navibar from '../Navibar/Navibar';
import '../Favorites/Favorites.css'

const Favorites = () => {

    const {cartFavorites, getFavorites, changeCountFavoriteProducts,addAndDeleteProductInCart, checkProductInCart} = useContext(productsContext)

    useEffect(() => {
        getFavorites()
    }, [])
    console.log(cartFavorites)

    return (
        <>
            <Navibar/>
            {!cartFavorites ? (
            <>
                <h3>Ваши избранные</h3>
                <div style={{ display: 'flex', justifyContent:"center" }}>
                    <div style={{height:"200px"}}>
            
                </div>
                <div style={{textAlign: 'start', marginTop:"20px"}}>
                    <h5 style={{color:"gray"}}>Список ваших избранных пуст</h5>
                </div>
                </div>
            </>
            ):(
                cartFavorites.totalPrice ?
                <div>
                     <Container>
                    <div    >
                        {cartFavorites.products.map((item)=>(
                            <div key={item.product.id} style={{display:"flex", padding:"3%", borderBottom:"1px solid rgba(173, 170, 170, 0.747)"}} className="favorite-cards">
                                <img className="favorite-img" style={{maxWidth: "15%", borderRadius: "2%" }} src={item.product.photo} alt=""/>
                                <div className="favorite-description" style={{display:"flex", flexDirection:"column", alignItems:"start", marginLeft:"30px"}}>
                                    <h5>{item.product.name}</h5>
                                    <p>Автор:{item.product.author}</p>
                                    <p>Жанр:{item.product.genre}</p>

                                    <button style={{ backgroundColor: checkProductInCart(item.product.id) ? "red" : "#573ba3" }} onClick={() => addAndDeleteProductInCart(item.product)}>В корзину</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
                </div>
                :
                <>
                <h3>избранные</h3>
                <div style={{ display: 'flex', justifyContent:"center" }}>
                    <div style={{height:"200px"}}>
            
                    </div>
                    <div style={{textAlign: 'start', marginTop:"20px"}}>
                        <h5 style={{color:"gray"}}>Список ваших избранных пуст</h5>
                    </div>
                </div>
            </>
            )}
        </>
    );
};

export default Favorites;