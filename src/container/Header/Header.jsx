import React, { useContext, useState } from 'react';
import './Header.css';
import Navibar from '../Navibar/Navibar';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { productsContext } from '../../contexts/ProductsContext';
// import Navibar from '../Navibar/Navibar';



const Header = () => {

    const { searchingProducts } = useContext(productsContext)
    const [searchValue, setSearchValue] = useState('')
    console.log(searchValue)



    return (
        <>
            <Navibar />
            <div className="home">
                <div className="home__text">
                    <h1 className="title-header">Поддержи отечественный магазин. <br /> Покупай книги онлайн на Kitep.kg</h1>
                </div>
                <div className="home__container">
                    <Link to="/products-list">
                        <form className="searchInput">
                            <input disabled="true" type="text" placeholder="Поиск" />
                                <button>
                                    <SearchIcon />
                                </button>
                        </form>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;