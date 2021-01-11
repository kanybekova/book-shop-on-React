import React, { useState, useContext, useEffect } from "react";
import { productsContext } from "../../contexts/ProductsContext";
import { calcSubPrice, calcTotalPrice } from "../../helpers/CalcPrice";
import deleteImg from "../img/delete.svg";
import "../Cart/Cart.css";
import Navibar from "../Navibar/Navibar";
import {
  Button,
  Container,
  Form,
  Modal,
  ModalBody,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PaymentForm from "../Payment/Payment";
import Check from "../Check/Check";

const Cart = (props) => {
  const {
    cartData,
    getCart,
    changeCountProducts,
    makeOrder,
    addAndDeleteProductInCart,
    deleteProductInCart,
    clearCartAfterPay,
  } = useContext(productsContext);
  useEffect(() => {
    getCart();
  }, []);

  function handleChangeCount(e, id) {
    changeCountProducts(e.target.value, id);
  }
  console.log(cartData);

  // const [contact, setContact] = useState({})
  // const { addContact } = useContext(contactsContext)
  // const [show, setShow] = useState(false)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => {
    setShow1(false);
    props.history.push("/");
    clearCartAfterPay();
  };
  // const handleClick = () => {
  //     addContact(contact)
  //     setShow(false)
  // }

  function switcher(obj) {
    console.log(obj);
    if (
      !obj.cvc.trim() ||
      !obj.expiry.trim() ||
      !obj.name.trim() ||
      !obj.number.trim()
    ) {
      return alert("Заполните поля");
    } else {
      handleClose();
      handleShow1();
      localStorage.setItem("cart", null);
    }
  }

  return (
    <>
      <Navibar />
      {!cartData ? (
        <>
          <h1>Корзина</h1>
          <div style={{ display: "flex" }}>
            <div>
              <img
                style={{ maxWidth: "200px" }}
                src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U="
                alt=""
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <h3>К сожалению ваша корзина пуста</h3>
              <p>
                Исправить это недоразумение очень просто: выберите в каталоге
                интересующий товар и нажмите кнопку «В корзину».
              </p>
              <Link to="/products-list">
                <button>Вернуться</button>
              </Link>
            </div>
          </div>
        </>
      ) : cartData.totalPrice ? (
        // <h1>Есть товары в корзине</h1>
        <div className="cart">
          <Container>
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="img-th" style={{ paddingBottom: "20px" }}></th>
                  <th className="title-th">Название</th>
                  <th>Количество</th>
                  <th>Цена</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartData.products.map((item) => (
                  <tr key={item.product.id}>
                    <td>
                      <img
                        className="cart-img"
                        style={{ width: "200px" }}
                        src={item.product.photo}
                      />
                    </td>
                    <td className="title-td">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "start",
                        }}
                      >
                        <h5>{item.product.name}</h5>
                        <p>Автор: {item.product.author}</p>
                        <p>Жанр: {item.product.genre}</p>
                      </div>
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChangeCount(e, item.product.id)}
                        value={item.count}
                        type="number"
                        value={item.count}
                      />
                    </td>
                    <td>{item.subPrice}сом</td>
                    <td className="cart-td">
                      {/* <button className="cart-btn" onClick={() => deleteProductInCart(item)}> */}
                      <img
                        style={{ cursor: "pointer" }}
                        className="delete-btn"
                        src={deleteImg}
                        alt=""
                        onClick={() => deleteProductInCart(item)}
                      />
                      {/* </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-makeOrder">
              <h5>Итого: {calcTotalPrice(cartData.products)}cом</h5>
              <button
                className="makeOrder-btn"
                onClick={(makeOrder, handleShow)}
              >
                Оплатить
              </button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Оплатить картой</Modal.Title>
              </Modal.Header>
              <ModalBody>
                <PaymentForm switcher={switcher} />
              </ModalBody>
            </Modal>

            {/* Second modal start*/}

            <Modal show={show1} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Чек</Modal.Title>
              </Modal.Header>
              <ModalBody>
                <Check />
              </ModalBody>
            </Modal>
          </Container>
        </div>
      ) : (
        <>
          <h1>Корзина</h1>
          <div style={{ display: "flex" }}>
            <div>
              <img
                style={{ maxWidth: "200px" }}
                src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U="
                alt=""
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <h3>К сожалению ваша корзина пуста</h3>
              <p>
                Исправить это недоразумение очень просто: выберите в каталоге
                интересующий товар и нажмите кнопку «В корзину».
              </p>
              <Link to="/products-list">
                <button>Вернуться</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Cart;
