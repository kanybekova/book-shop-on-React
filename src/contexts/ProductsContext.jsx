import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { API_PRODUCTS } from '../helpers/constants'
import { calcSubPrice, calcTotalPrice } from '../helpers/CalcPrice'

export const productsContext = React.createContext()

const INIT_STATE = {
    products: [],
    // searchProducts: [],
    productsBusiness: [],
    productsClassicLiterature: [],
    productsChildrensBook: [],
    productsFantasy: [],
    productDetails: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    productsCountInFavorites: JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')).products.length : 0,
    cartData: {},
    cartFavorites: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_DATA":
            return { ...state, products: action.payload }
        case "GET_PRODUCTS_BUSINESS":
            return { ...state, productsBusiness: action.payload }
        case "GET_PRODUCTS_CLASSIC":
            return { ...state, productsClassicLiterature: action.payload }
        case "GET_PRODUCTS_CHILDREN":
            return { ...state, productsChildrensBook: action.payload }
        case "GET_PRODUCTS_FANTASY":
            return { ...state, productsFantasy: action.payload }
        case "GET_PRODUCT_TO_EDIT":
            return { ...state, productDetails: action.payload }
        case "GET_CART":
            return { ...state, cartData: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productsCountInCart: action.payload }
        case "GET_PRODUCTS_BY_SEARCH":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_FAVORITES":
            return { ...state, productsCountInFavorites: action.payload }
        case "GET_FAVORITES":
            return { ...state, cartFavorites: action.payload }
        case "CLEAR_CART_AFTER_PAY":
            return {...state, productsCountInCart: 0}
        default:
            return state
    }
}

const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    //product list


    const getProducts = async () => {
        const { data } = await axios(`${API_PRODUCTS}/products${window.location.search.replace(/%3D/, '')}`)
        console.log(data)
            dispatch({
                type: "GET_PRODUCTS_DATA",
                payload: data
            })
        // console.log(value)
        // if (!value) {
        //     const { data } = await axios(`${API_PRODUCTS}/products`)
        //     dispatch({
        //         type: "GET_PRODUCTS_DATA",
        //         payload: data
        //     })
        // }
        // else if (value.genre === "all" && value.price === "all") {
        //     const { data } = await axios(`${API_PRODUCTS}/products`)
        //     dispatch({
        //         type: "GET_PRODUCTS_DATA",
        //         payload: data
        //     })
        // }
        // else if (value.genre !== "all" && value.price === "all") {
        //     const { data } = await axios(`${API_PRODUCTS}/products?genre=${value.genre}`)
        //     dispatch({
        //         type: "GET_PRODUCTS_DATA",
        //         payload: data
        //     })
        // }
        // else if (value.genre === "all" && value.price !== "all") {
        //     const { data } = await axios(`${API_PRODUCTS}/products?price_lte=${value.price}`)
        //     console.log(data)
        //     dispatch({
        //         type: "GET_PRODUCTS_DATA",
        //         payload: data
        //     })
        // }
        // else if (value.genre !== "all" && value.price !== "all") {
        //     const { data } = await axios(`${API_PRODUCTS}/products?genre=${value.genre}&price_lte=${value.price}`)
        //     dispatch({
        //         type: "GET_PRODUCTS_DATA",
        //         payload: data
        //     })
        // }
    }



    const searchingProducts = async (value) => {
        const { data } = await axios(`${API_PRODUCTS}/products?q=${value}`)
        console.log(data)
        dispatch({
            type: "GET_PRODUCTS_BY_SEARCH",
            payload: data
        })
    }

    // const useFilter = (filter) => {

    // }

    // const filterProductsByPrice = (value) => {
    //     console.log(value)
    //     const data = []
    //     state.products.map(item => {
    //         if(item.price <= value){
    //             data.push(item)
    //         }
    //     })
    //     console.log(data)
    // dispatch({
    //     type: "FILTER_PRODUCTS_BY_PRICE"
    // })
    // }

    // body section

    async function getProductsBusiness() {
        const { data } = await axios(`${API_PRODUCTS}/products?genre=business&limit=3`)
        dispatch({
            type: "GET_PRODUCTS_BUSINESS",
            payload: data
        })
    }
    async function getProductsClassicLiterature() {
        const { data } = await axios(`${API_PRODUCTS}/products?genre=classicLiterature`)
        console.log(data)
        dispatch({
            type: "GET_PRODUCTS_CLASSIC",
            payload: data
        })
    }
    async function getProductsChildren() {
        const { data } = await axios(`${API_PRODUCTS}/products?genre=childrensBook`)
        dispatch({
            type: "GET_PRODUCTS_CHILDREN",
            payload: data
        })
    }
    async function getProductsFantasy() {
        const { data } = await axios(`${API_PRODUCTS}/products?genre=fantasy`)
        dispatch({
            type: "GET_PRODUCTS_FANTASY",
            payload: data
        })
    }

    // body section end

    // details page

    const getDetailsOfProduct = async (id) => {
        const { data } = await axios(`${API_PRODUCTS}/products/${id}`)
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    //details page end

    //products list

    //

    //cart start
    function addAndDeleteProductInCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }
        newProduct.subPrice = calcSubPrice(newProduct)

        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length > 0) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }

        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
    }

    function clearCartAfterPay(){
        dispatch({
            type: "CLEAR_CART_AFTER_PAY"
        })
    }

    function deleteProductInCart({product}){
        let cart = JSON.parse(localStorage.getItem("cart"))
        console.log(product.id)
        let newCart = cart.products.filter(item => item.product.id !== product.id)
        
        console.log(newCart)
        cart.products = newCart
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
        getCart()
    }
    //

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            };
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return newCart.length > 0 ? true : false
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    function changeCountProducts(count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }



    //favorites start
    function addAndDeleteProductInFavorites(product) {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        if (!favorites) {
            favorites = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }

        newProduct.subPrice = calcSubPrice(newProduct)

        let newFavorites = favorites.products.filter(item => item.product.id === product.id)
        if (newFavorites.length > 0) {
            favorites.products = favorites.products.filter(item => item.product.id !== product.id)
        }
        else {
            favorites.products.push(newProduct)
        }

        favorites.totalPrice = calcTotalPrice(favorites.products)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_FAVORITES",
            payload: favorites.products.length
        })
    }
    //

    function checkProductInFavorites(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!favorites) {
            favorites = {
                products: []
            };
        }
        let newFavorites = favorites.products.filter(item => item.product.id === id)
        return newFavorites.length > 0 ? true : false
    }

    function getFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        dispatch({
            type: "GET_FAVORITES",
            payload: favorites
        })
    }

    function changeCountFavoriteProducts(count, id) {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.products = favorites.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        localStorage.setItem('favorites', JSON.stringify(favorites))
        getFavorites()
    }

    //

    //pagination start
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(5)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            // const { data } = await axios(`${API_PRODUCTS}/products`)
            const data = state.products
            setPosts(data)
            setLoading(false)
        }
        fetchPosts()
    }, [state.products])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPosts = posts.length

    const paginate = pageNumber => setCurrentPage(pageNumber)

    // pagination end

    //comments start

    async function sendComment(product, value){
        console.log(value)
        product.comments.push(value)
        await axios.patch(`${API_PRODUCTS}/products/${product.id}`, product)
        getProducts()
    }

    // comments end

    //likes start

    async function addAndDeleteLikes(product){
            let likes = JSON.parse(localStorage.getItem("likes"))
            if (!likes) {
                likes = {
                    products: []
                }
            }
    
            let newProduct = {
                product: product
            }
    
            let newLikes = likes.products.filter(item => item.product.id === product.id)
            if (newLikes.length > 0) {
                likes.products = likes.products.filter(item => item.product.id !== product.id)
                product.likes -=1
                await axios.patch(`${API_PRODUCTS}/products/${product.id}`, product)
                getProducts()
            }
            else {
                likes.products.push(newProduct)
                product.likes +=1
                await axios.patch(`${API_PRODUCTS}/products/${product.id}`, product)
                getProducts()
            }
    
            localStorage.setItem("likes", JSON.stringify(likes))
            dispatch({
                type: "ADD_AND_DELETE_PRODUCT_IN_LIKES",
                payload: likes.products.length
            })


    }

    
    function checkProductInLikes(id) {
        let likes = JSON.parse(localStorage.getItem('likes'));
        if (!likes) {
            likes = {
                products: []
            };
        }
        let newLikes = likes.products.filter(item => item.product.id === id)
        return newLikes.length > 0 ? true : false
    }

    //likes end

    function makeOrder() {
        let cart = JSON.parse(localStorage.getItem('cart'))
    }


    return (
        <productsContext.Provider value={{
            products: state.products,
            searchProducts: state.searchProducts,
            productsBusiness: state.productsBusiness,
            productsClassicLiterature: state.productsClassicLiterature,
            productsChildrensBook: state.productsChildrensBook,
            productsFantasy: state.productsFantasy,
            productDetails: state.productDetails,
            cartData: state.cartData,
            cartFavorites: state.cartFavorites,
            productsCountInCart: state.productsCountInCart,
            productsCountInFavorites: state.productsCountInFavorites,
            totalPosts: totalPosts,
            currentPosts: currentPosts,
            loading: loading,
            postsPerPage: postsPerPage, 
            getProducts,
            getProductsBusiness,
            getProductsClassicLiterature,
            getProductsChildren,
            getProductsFantasy,
            getDetailsOfProduct,
            addAndDeleteProductInCart,
            checkProductInCart,
            getCart,
            changeCountProducts,
            makeOrder,
            searchingProducts,
            changeCountFavoriteProducts,
            getFavorites,
            checkProductInFavorites,
            addAndDeleteProductInFavorites,
            paginate,
            sendComment,
            addAndDeleteLikes,
            checkProductInLikes,
            deleteProductInCart,
            clearCartAfterPay

        }}>
            {children}
        </productsContext.Provider>
    );
};

export default ProductsContextProvider;