import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext, useEffect, useRef } from 'react'
import { IconsContext } from '../../contexts/IconsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const Icons = () => {
    const { cart, wishList } = useContext(IconsContext);
    const cartRef = useRef();
    const wishListRef = useRef();
    const navigate = useNavigate()

    const logOut = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true, credentials: 'include' })
            .then(() => {

                navigate('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (cartRef && cartRef.current) {
            cartRef.current.classList.toggle("active");

        }
        setTimeout(() => {
            if (cartRef && cartRef.current) {
                cartRef.current.classList.toggle("active");

            }
        }, 1000);
    }, [cart]);
    useEffect(() => {

        if (wishListRef && wishListRef.current) {
            wishListRef.current.classList.toggle("active");

        }
        setTimeout(() => {
            if (wishListRef && wishListRef.current) {
                wishListRef.current.classList.toggle("active");

            }
        }, 1000);

    }, [wishList]);
    return (
        <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex ms-auto gap-3 ms-auto">

                    <Link className="btn btn-outline-dark  rounded-pill" to="/ecommerce/wish-list">
                        <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" ref={wishListRef} />
                        WishList
                        <span className="badge bg-dark text-white ms-1">{wishList?.products ? wishList.products.length : 0}</span>
                    </Link>
                    <Link className="btn btn-outline-dark rounded-pill " to="/ecommerce/cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="me-1 text-primary" ref={cartRef} />
                        Cart
                        <span className="badge bg-dark text-white ms-1 ">{cart ? cart.length : 0}</span>
                    </Link>

                    <Link className="border rounded-circle" >
                        <span className="badge bg-dark text-white ms-1 "></span>
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <FontAwesomeIcon icon={faUser} className="me-1 text-white" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => logOut()}>LogOut</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Nav>
            </Navbar.Collapse>
        </>
    )
}

export default Icons
