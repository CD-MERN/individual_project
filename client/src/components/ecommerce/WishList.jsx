import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';
import Footer from './Footer';
import { IconsContext } from '../../contexts/IconsContext'
import numberFormatter from '../utilities/numberFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Cart = () => {
    const { cart, setCart, wishList, setWishList } = useContext(IconsContext);

    const deleteFromWishList = async (product) => {

        const data = {
            product: product._id,
        }

        await axios.delete(`http://localhost:8000/api/wish-list/${wishList._id}`, { data: data, withCredentials: true })
            .then((response) => {
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            });
    }

    const moveToCart = async (product) => {

        try {
            // Find if the product already exists in the cartList
            let item = cart.find(item => item._id === product._id);
            let newCartList = [];

            // If exists update qty
            if (item) {
                item.quantity++;
                newCartList = [...cart];
            } else {
                // If not -> add product
                const data = (({ _id, name, price, description }) => ({ _id, name, price, description }))(product);
                data.quantity = 1;
                // console.log({data: data});
                newCartList = [...cart, data];
            }

            setCart(newCartList);

            localStorage.setItem("cartList", JSON.stringify(newCartList));

            // Remover el item del wishlist
            deleteFromWishList(product);
            
        } catch (error) {
            console.log("Error", error);
        } 
    }

    return (
        <>
            <Navbar renderIcons={false}></Navbar>
            <div className='container'>
                <h3 className='text-center'>My WishList</h3>
                <div className='row text-start'>
                    <div className='col-md-12'>
                        <div className='card mb-5'>
                            <div className='card-body p-5'>
                                <h5 className='fw-bold'>Items</h5>
                                <table className="table table-hover table-striped table-sm text-center table-borderless">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Stock </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishList?.products && wishList.products.map((item, index) => (
                                            <tr key={index} className="align-middle text-center">
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span>{item.name}</span><br />
                                                    <span className='text-muted small'>{item.description}</span>
                                                </td>

                                                <td className='text-end'>{numberFormatter(item.price)}</td>
                                                <td className='text-end'>{item.stock}</td>
                                                <td>
                                                    <span className='d-flex gap-3 justify-content-center'>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Move To Cart</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faShoppingCart} className="me-1 text-primary cursor-pointer" onClick={() => moveToCart(item)} />
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Delete from WishList</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="me-1 text-secondary cursor-pointer" onClick={() => deleteFromWishList(item)} />
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
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Cart





