import axios from 'axios';
import React, { useReducer } from 'react';
import { API_PRODUCTS } from '../helpers/constants'

export const adminContext = React.createContext()

const INIT_STATE = {
    products: [],
    productToEdit: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_DATA":
            return { ...state, products: action.payload }
        case "GET_PRODUCT_TO_EDIT":
            return { ...state, productToEdit: action.payload }
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async () => {
        const { data } = await axios(`${API_PRODUCTS}/products`)
        dispatch({
            type: "GET_PRODUCTS_DATA",
            payload: data
        })
    }

    const addProduct = async (products, history) => {
        await axios.post(`${API_PRODUCTS}/products`, products)
        history.push('/admin-panel')
    }

    const delProduct = async (id) => {
        await axios.delete(`${API_PRODUCTS}/products/${id}`)
        getProducts()
    }

    const getProductToEdit = async (id) => {
        const { data } = await axios(`${API_PRODUCTS}/products/${id}`)
        dispatch({
            type: "GET_PRODUCT_TO_EDIT",
            payload: data
        })
    }

    const editProduct = async (editedContact, history) => {
        await axios.patch(`${API_PRODUCTS}/products/${editedContact.id}`, editedContact)
        history.push('/admin-panel')
        getProducts()
    }

    return (
        <adminContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            addProduct,
            getProducts,
            delProduct,
            getProductToEdit,
            editProduct
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;