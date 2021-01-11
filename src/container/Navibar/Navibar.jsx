import React, { useContext } from 'react';
import './Navibar.css'
// import SearchIcon from '@material-ui/icons/Search';
import Logo from '../img/logo2.navibar.png';
import map from '../img/placeholder.svg'
import Instagram from '../img/instagram.svg';
import Facebook from '../img/facebook.svg';
import Twitter from '../img/twitter.svg';
import ShoppingBasket from '../img/navcart.svg';
import User from '../img/user.svg';
import { Link } from 'react-router-dom';
import { productsContext } from '../../contexts/ProductsContext';
import FavoriteIcon from '../img/heartNavbar.png'

const Navibar = () => {

    const { productsCountInCart, productsCountInFavorites } = useContext(productsContext)

    return (
        <>
            <div className="navibar">
                <Link to="/">
                    <img
                        className="navibar__logo"
                        src={Logo}
                    />
                </Link>

                <div className="navibar__right" >
                    {/* <div className="navibar__twitter">
                    <Link to="//">
                        <img style={{width:"30%"}} className="twitter"
                            src={Twitter}
                        />
                    </Link>
                </div>
                <div className="navibar__facebook">
                    <Link to="//">
                        <img style={{width:"30%"}} className="facebook"
                            src={Facebook}
                        />
                    </Link>
                </div> */}

                    <div className="navibar__all-products">
                        <Link to="/products-list">
                            <button>Все книги</button>
                        </Link>
                    </div>
                    <div className="navibar__instagram">
                        <Link to="/favorites">
                            <img className="instagram"
                                src={FavoriteIcon}
                            />
                            {/* <div>{productsCountInFavorites}</div> */}
                        </Link>
                    </div>
                    <div className="navibar__shoppingBasket">
                        <Link to="/cart">
                            <img style={{ width: "30px" }} className="shoppingBasket"
                                src={ShoppingBasket}
                            />
                            <div className="productsCount">{productsCountInCart}</div>
                        </Link>
                    </div>
                    <div className="navibar__user">
                        <Link to="/signin">
                            <img style={{ width: "30px" }} className="user"
                                src={User}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="btn-on-min">
                <div>
                    <button className="btn-all-books">Все книги</button>
                </div>
            </div>
        </>
    );
};

export default Navibar;