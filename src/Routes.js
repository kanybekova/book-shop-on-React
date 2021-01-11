import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPanel from './container/AdminPanel/AdminPanel';
import AdminPanelAdd from './container/AdminPanel/AdminPanelAdd';
import AdminPanelEdit from './container/AdminPanel/AdminPanelEdit';
import Body from './container/Body/Body';
import Cart from './container/Cart/Cart';
import Favorites from './container/Favorites/Favorites';
import Footer from './container/Footer/Footer';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import Navibar from './container/Navibar/Navibar';
import Pagination from './container/Pagination/Pagination';
import ProductDetails from './container/ProductDetails/ProductDetails';
import ProductsList from './container/ProductsList/ProductsList';
import SignIn from './container/SignIn/SignIn';
import SignUp from './container/SignUp/SignUp';
import AdminContextProvider from './contexts/AdminContext';
import AuthContextProvider from './contexts/AuthContext';
import ProductsContextProvider from './contexts/ProductsContext';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <ProductsContextProvider>
                    <Switch>
                        <Route exact path="/body" component={Body} />
                        <Route exact path="/product-details:id" component={ProductDetails} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/favorites" component={Favorites}/>
                        <Route exact path="/products-list" component={ProductsList} />
                        <Route exact path="/header" component={Header}/>
                        <Route exact path="/pagination" component={Pagination}/>
                        <Navibar/>
                    </Switch>
                </ProductsContextProvider>
                <AdminContextProvider>
                    <Switch>
                        <Route exact path="/admin-panel-add" component={AdminPanelAdd} />
                        <Route exact path="/admin-panel" component={AdminPanel} />
                        <Route exact path="/admin-panel-edit" component={AdminPanelEdit} />
                    </Switch>
                </AdminContextProvider>
                <AuthContextProvider>
                    <Switch>
                        <Route exact path="/footer" component={Footer} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                    </Switch>
                </AuthContextProvider>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Routes;