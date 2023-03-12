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
import toast, { Toaster } from 'react-hot-toast';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';


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
     * * Changed
     */
    const addToWishList = async (product) => {

        // Get the product to add/move in the wishlist
        const data = {
            product: product._id,
        }

        // Update the wishlist
        await axios.put(`http://localhost:8000/api/wish-list/${wishList._id}`, data, { withCredentials: true })
            .then((response) => {
                setWishList(response.data.wishList);
                // Remove the product from the cart
                removeItem(product)
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

    const purchase = () => {

        // Get all ids of the products
        const data = {
            products: cart.map(item => { return { product: item._id, quantity: item.quantity } })
        }

        axios.post(`http://localhost:8000/api/order`, data, { withCredentials: true })
            .then(() => {
                // Clean cartList
                // console.log(response);
                setCart([]);
                localStorage.removeItem("cartList");

                // Update loading toast
                toast.success('Order confirmed succesfully');

                // Para que no desaparezca el toast rapido
                setTimeout(function () {
                    navigate("/ecommerce");
                }, 1); //Time before execution
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }


    return (
        <>
            <Toaster />
            <Navbar renderIcons={false}></Navbar>
            <Container className='mb-5'>
                <h3 className='text-center my-3'>My Cart</h3>

                <Row>
                    <Col xs={12} lg={8}>
                        <Card className='mb-5 shadow'>
                            <Card.Body className='p-5'>
                                <h5 className='fw-bold'>Items</h5>
                                <hr />

                                <Table hover striped size='sm' borderless className="text-center" responsive>
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
                                                <td>
                                                    <input type='number' min={1} className='form-control text-center' defaultValue={item.quantity} onInput={(e) => updateQuantity(item, e.target.value)} />
                                                </td>
                                                <td className='text-end'>{numberFormatter(item.price)}</td>
                                                <td className='text-end'>{numberFormatter(item.price * item.quantity)}</td>
                                                <td>
                                                    <span className='d-flex gap-3 justify-content-center'>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Move To Wish List</Tooltip>}>
                                                            <FontAwesomeIcon icon={faHeart} className="me-1 text-danger cursor-pointer" onClick={() => addToWishList(item)} />
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={<Tooltip>Delete from Cart</Tooltip>}>
                                                            <FontAwesomeIcon icon={faTrash} className="me-1 text-secondary cursor-pointer" onClick={() => removeItem(item)} />
                                                        </OverlayTrigger>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                            </Card.Body>
                            <Card.Footer>
                                <Link className="btn btn-outline-success" to="/ecommerce">
                                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Contine to Shopping
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Card className='shadow'>
                            <Card.Body className='p-5 text-start'>
                                <h5 className='fw-bold'>Summary</h5>
                                <hr />
                                <Row>
                                    <Col className='fw-bold'>
                                        Items
                                    </Col>
                                    <Col className='text-end'>
                                        {cart ? cart.length : 0}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='fw-bold'>
                                        Total
                                    </Col>
                                    <Col className='text-end'>
                                        {numberFormatter(totalAmount())}
                                    </Col>
                                </Row>

                                <div className="d-grid mt-4">
                                    {cart.length > 0 && <Button variant="primary" size='lg' onClick={purchase}>Purchase</Button>}
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </>
    )
}

export default Cart





