import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';
import Footer from './Footer';
import { IconsContext } from '../../contexts/IconsContext'
import numberFormatter from '../utilities/numberFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Cart = () => {
    const { cart, setCart, wishList, setWishList } = useContext(IconsContext);

    const navigate = useNavigate()

    const updateQuantity = (product, value) => {
        // Find the product and update the qty
        let newCartList = cart.map((item) => {
            if (item === product) {
                return { ...item, quantity: parseInt(value) }
            }
            return item;
        })
        // Setear manualmente porque si no se renderiza el componente no obtiene del local(esto es solo para no perder al recargar)
        setCart(newCartList);

        localStorage.setItem("cartList", JSON.stringify(newCartList));
    }

    const removeItem = (product) => {
       
        // Remove the product
        let newCartList = cart.filter((item) => item !== product);
        setCart(newCartList);
        localStorage.setItem("cartList", JSON.stringify(newCartList));
    }

    /** 
     * TODO: MODIFY CONTROLLER 
     */
    const addToWishList = async (item) => {

        const data = {
            product: item._id,
            wishList: wishList._id
        }

        await axios.put(`http://localhost:8000/api/cart/${cart._id}/move-to-wish-list`, data, { withCredentials: true })
            .then((response) => {
                setCart(response.data.cart);
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    const totalAmount = () => {

        if (cart) {
            return cart.reduce((curr, next) => {
                return curr += next.price * next.quantity
            }, 0)
        } else {
            return 0;
        }
    }


    return (
        <>
            <Navbar renderIcons={false}></Navbar>
            <div className='container'>
                <h3 className='text-center'>My Cart</h3>
                <div className='row text-start'>
                    <div className='col-md-8'>
                        <div className='card mb-5'>
                            <div className='card-body p-5'>
                                <h5 className='fw-bold'>Items</h5>
                                <table className="table table-hover table-striped table-sm text-center table-borderless">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th className='col-2'>Quantity</th>
                                            <th>Price</th>
                                            <th>Total </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart && cart.map((item, index) => (
                                            <tr key={index} className="align-middle text-center">
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span>{item.name}</span><br />
                                                    <span className='text-muted small'>{item.description}</span>
                                                </td>
                                                <td className='col-2'>
                                                    <input type='number' min={1} className='form-control text-center' defaultValue={item.quantity} onInput={(e) => updateQuantity(item, e.target.value)} />
                                                </td>
                                                <td className='text-end'>{numberFormatter(item.price)}</td>
                                                <td className='text-end'>{numberFormatter(item.price * item.quantity)}</td>
                                                <td>
                                                    <span className='d-flex gap-3 justify-content-center'>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Move To Wish List</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faHeart} className="me-1 text-danger cursor-pointer" onClick={() => addToWishList(item)} />
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Delete from Cart</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="me-1 text-secondary cursor-pointer" onClick={() => removeItem(item)} />
                                                        </OverlayTrigger>
                                                    </span>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card-footer'>
                                <Link className="btn btn-outline-success" to="/ecommerce">
                                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Contine to Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-body p-5 text-start'>
                                <h5 className='fw-bold'>Summary</h5>
                                <div className='row justify-align-content-between'>
                                    <div className='col-md-6 fw-bold'>
                                        Total Item
                                    </div>
                                    <div className='col-md-6 text-end'>
                                        {cart ? cart.length : 0}
                                    </div>
                                </div>
                                <div className='row justify-align-content-between'>
                                    <div className='col-md-6 fw-bold'>
                                        Total Amount
                                    </div>
                                    <div className='col-md-6 text-end'>
                                        {numberFormatter(totalAmount())}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Cart





