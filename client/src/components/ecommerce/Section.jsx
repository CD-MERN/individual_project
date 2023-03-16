import React, { useState, useEffect } from 'react';
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import numberFormatter from '../utilities/numberFormatter';
import { IconsContext } from '../../contexts/IconsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeartCircleMinus, faHeart } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from 'react-hot-toast';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const Section = () => {
    const { cart, setCart, wishList, setWishList } = useContext(IconsContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        category: null,
        search: null
    });

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        searchProduct();
    }, [filter]);


    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => console.log("Error", error));
    }

    const fetchCategories = () => {
        axios.get('http://localhost:8000/api/categories', { withCredentials: true })
            .then((response) => {
                setCategories(response.data.categories)
            })
            .catch((error) => console.log("Error", error));
    }

    const searchProduct = async () => {
        await axios.get('http://localhost:8000/api/products/search', { params: filter, withCredentials: true })
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log("Error", error)
            });
    }

    /** 
     * * Changed, save to local added
     */
    const addProductToCart = (product) => {

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

            newCartList = [...cart, data];
        }

        // Setear manualmente porque si no se renderiza no obtiene del local(esto es solo para no perder al recargar)
        setCart(newCartList);

        // Save to local storage, se usa json stringify porque osino guarda como [object Object]
        localStorage.setItem("cartList", JSON.stringify(newCartList));

    }
    const addProductToWishList = async (product) => {

        const data = {
            product: product._id,
        }
        await axios.put(`http://localhost:8000/api/wish-list/${wishList._id}`, data, { withCredentials: true })
            .then((response) => {
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

    const manageFilterCategory = (categoryId) => {
        if (categoryId === filter.category) {
            setFilter({ ...filter, category: null })
        } else {
            setFilter({ ...filter, category: categoryId })
        }
    }

    const checkIsFavorite = (product) => {
        let flag = false
        if (wishList && wishList.products.length) {

            flag = wishList.products.some(item => item._id === product._id);
        }
        return flag;
    }

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


    return (
        <section >
            <div><Toaster /></div>
            <div className="container px-4 px-lg-5 mt-5">
                <Row>
                    <Col xs={12} md={4} xl={3} xxl={2} className='mb-5'>
                        <Accordion defaultActiveKey='0'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header><span className='fw-bold'>Categories</span></Accordion.Header>
                                <Accordion.Body className='p-0'>
                                    <ListGroup variant='flush'>
                                        {categories.map((category, idx) => (
                                            <ListGroup.Item action variant='light' onClick={() => manageFilterCategory(category._id)} key={idx}
                                                className={`px-2 d-flex justify-content-between align-items-start ${filter.category === category._id ? 'active' : ''} `} >

                                                <div className="ms-2 me-auto">{category.name}</div>
                                                {/* Cambia el color del icono si esta activo o no */}
                                                <Badge bg={filter.category === category._id ? 'light' : 'secondary'}
                                                    text={filter.category === category._id ? 'dark' : 'light'}
                                                    pill>{category.productsCount}</Badge>

                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col xs={12} md={8} xl={9} xxl={10}>

                        {products.length === 0 && <p className='text-center fs-2 text-secondary mb-5'>We don´t have any products under this category yet...</p>}

                        <Row xs={1} md={2} xl={3} xxl={4} className='overflow-auto'>

                            {products.map((product, idx) => (
                                <div className="col mb-5" key={idx}>
                                    <div className="card h-100 p-3 shadow rounded-4">
                                        {checkIsFavorite(product) ?
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip>This item is favorite ❤</Tooltip>}
                                            >
                                                <FontAwesomeIcon className=" bg-danger  text-white rounded-circle  position-absolute favorite p-1" icon={faHeart} />
                                            </OverlayTrigger>
                                            : ''}

                                        <div id={`carouselExampleControls${idx}`} className="carousel carousel-dark slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {product.images.map((image, idxImg) => (
                                                    <div className={`carousel-item text-center  ${idxImg === 0 ? 'active' : ''}`} key={idxImg} >
                                                        <LazyLoadImage
                                                            src={image}
                                                            className="d-block w-100 h-100"
                                                            style={{ maxHeight: '145px', minHeight: '145px' }}
                                                            effect="blur"
                                                        />
                                                    </div>

                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${idx}`} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${idx}`} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <h5 className="fw-bolder">{product.name}</h5>

                                                <div>{numberFormatter(product.price)}</div>
                                            </div>
                                        </div>
                                        <div className="card-footer border-top-0 bg-transparent">
                                            <div className="d-flex gap-3 justify-content-center">
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={<Tooltip>Add to Cart</Tooltip>}
                                                >
                                                    <button type='button' className="btn btn-outline-primary" onClick={() => addProductToCart(product)}><FontAwesomeIcon icon={faShoppingCart} /></button>
                                                </OverlayTrigger>

                                                {/* No Favorite - Add to wishlist */}
                                                {!checkIsFavorite(product) && (
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={<Tooltip>Add to Wish List</Tooltip>}
                                                    >
                                                        <button type='button' className="btn btn-outline-danger" onClick={() => addProductToWishList(product)}><FontAwesomeIcon icon={faHeart} /></button>
                                                    </OverlayTrigger>
                                                )}

                                                {/* Favorite - Remove to wishlist */}
                                                {checkIsFavorite(product) && (
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={<Tooltip>Remove from Wish List</Tooltip>}
                                                    >
                                                        <button type='button' className="btn btn-danger" onClick={() => deleteFromWishList(product)}><FontAwesomeIcon icon={faHeartCircleMinus} /></button>
                                                    </OverlayTrigger>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Section
