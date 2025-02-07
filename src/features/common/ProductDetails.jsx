// import React, { useState,useEffect } from 'react'
// import { useGetProductDetailsByIdQuery } from '../../services/productApi'
// import { Link, useParams } from 'react-router-dom';
// import './nav.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from './cartSlice';

// function ProductDetails() {
//     const [errmsg,setErrmsg]=useState(false);
//     const [isincart,setIsInCart] = useState(false);
//     const [filterCart,setFilterCart]=useState([]);
//     const params = useParams();
//     const {isLoading,data} = useGetProductDetailsByIdQuery(params.id);
//     console.log(isLoading,data);
//     const dispatch = useDispatch();
//     const usernamer=useSelector((state)=>state.auth.username);
//     const { cartItems } = useSelector(state => state.cart);
//     console.log("cartItems",cartItems);
//     useEffect(() => {
//         setFilterCart(cartItems.filter((item) => item.usernamer === usernamer));
//         console.log('Filtered Cart Items for the user:', filterCart);
//     }, [cartItems, usernamer]);
//     // function IsInCart(){
//     //     return cartItems.find((item) => item.id === params.id);
//     // }
//     useEffect(() => {
//         const productInCart = filterCart.some(item => item._id === data?._id);
//         setIsInCart(productInCart);
//     }, [filterCart, data]);
//     function addtocart(){
//         if(usernamer){
//         dispatch(addToCart({...data,count:1,usernamer}));
//         setIsInCart(prev => !prev);
//         }else{
//             setErrmsg(prev => !prev);
//         }
//     }
//     console.log("err",errmsg);
//   return (
//     <div className='border border-2 ms-4 mt-4 me-4 bg-light'>
//         <div className='ms-4 mt-5'>
//             <div className='d-flex p-4'>
//                 <div className='col-4 me-5 border border-2 shadow-sm'>
//                     <img src={data?.imgUrl} style={{height:'400px',width:'350px'}} />
//                 </div>
//                 <div className='col-8 ms-5 w-50'>
//                     <div className='border border-2 p-2 shadow-sm'>
//                         <h4>Name : {data?.name}</h4>
//                         <h4>Price : &#8377; {data?.price}</h4>
//                         <h4>Company : {data?.company}</h4>
//                         <h4>Category : {data?.category}</h4>
//                     </div>
//                     <div>
//                         <div className='mt-3 border border-2 p-2 shadow-sm'>
//                             <h4>Description  :</h4>
//                             <p>{data?.description}</p>
//                         </div>
//                     </div>
//                     <div className='d-flex mt-3 border border-2 p-2 shadow-sm'>
//                         <div className='me-1'>
//                             {
//                                 isincart ? (
//                                     <Link to='/cart'><button className='btn info shadow-sm'>Go To Cart</button></Link>
//                                 ) : (
//                                     <>
//                                     <button className='btn btn-warning shadow-sm' onClick={addtocart}>Add To Cart</button>
//                                     {errmsg && <Link to='/login' style={{color:"red"}}>Login for add to cart</Link>}
//                                     </>
//                                 )
//                             }
//                         </div>
//                         <div className='ms-3'>
//                             <Link><button className='btn btn-pink'>Save Product</button></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ProductDetails

// import React, { useState, useEffect } from 'react';
// import { useGetProductDetailsByIdQuery } from '../../services/productApi';
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from './cartSlice';
// import { ShoppingCart, Heart } from 'lucide-react';
// import './ProductDetails.css';

// function ProductDetails() {
//     const [errmsg, setErrmsg] = useState(false);
//     const [isincart, setIsInCart] = useState(false);
//     const [filterCart, setFilterCart] = useState([]);
//     const params = useParams();
//     const { isLoading, data } = useGetProductDetailsByIdQuery(params.id);
//     const dispatch = useDispatch();
//     const usernamer = useSelector((state) => state.auth.username);
//     const { cartItems } = useSelector(state => state.cart);

//     useEffect(() => {
//         setFilterCart(cartItems.filter((item) => item.usernamer === usernamer));
//     }, [cartItems, usernamer]);

//     useEffect(() => {
//         const productInCart = filterCart.some(item => item._id === data?._id);
//         setIsInCart(productInCart);
//     }, [filterCart, data]);

//     function addtocart() {
//         if (usernamer) {
//             dispatch(addToCart({ ...data, count: 1, usernamer }));
//             setIsInCart(prev => !prev);
//         } else {
//             setErrmsg(prev => !prev);
//         }
//     }

//     if (isLoading) {
//         return (
//             <div className="loading-container">
//                 <div className="loading-spinner"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="product-details-container">
//             <div className="product-details-content">
//                 <div className="product-image-section">
//                     <div className="product-image-wrapper">
//                         <img src={data?.imgUrl} alt={data?.name} className="product-image" />
//                     </div>
//                 </div>
                
//                 <div className="product-info-section">
//                     <div className="product-header">
//                         <h1 className="product-name">{data?.name}</h1>
//                         <div className="product-price">₹{data?.price}</div>
//                     </div>

//                     <div className="product-meta">
//                         <div className="meta-item">
//                             <span className="meta-label">Brand:</span>
//                             <span className="meta-value">{data?.company}</span>
//                         </div>
//                         <div className="meta-item">
//                             <span className="meta-label">Category:</span>
//                             <span className="meta-value">{data?.category}</span>
//                         </div>
//                     </div>

//                     <div className="product-description">
//                         <h2>Description</h2>
//                         <p>{data?.description}</p>
//                     </div>

//                     <div className="product-actions">
//                         {
//                             isincart ? (
//                                 <Link to="/cart" className="goto-cart-btn">
//                                     <ShoppingCart size={20} />
//                                     View in Cart
//                                 </Link>
//                             ) : (
//                                 <div className="add-to-cart-wrapper">
//                                     <button className="add-to-cart-btn" onClick={addtocart}>
//                                         <ShoppingCart size={20} />
//                                         Add to Cart
//                                     </button>
//                                     {
//                                         errmsg && (
//                                             <Link to="/login" className="login-prompt">
//                                                 Please login to add to cart
//                                             </Link>
//                                         )
//                                     }
//                                 </div>
//                             )
//                         }
//                         <button className="save-product-btn">
//                             <Heart size={20} />
//                             Save for Later
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useGetProductDetailsByIdQuery } from '../../services/productApi';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './cartSlice';
import { ShoppingCart, Heart } from 'lucide-react';
import './ProductDetails.css';

function ProductDetails() {
    const [errmsg, setErrmsg] = useState(false);
    const [isincart, setIsInCart] = useState(false);
    const [filterCart, setFilterCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderUsername, setOrderUsername] = useState('');
    const [orderCount, setOrderCount] = useState(1);
    const params = useParams();
    const { isLoading, data } = useGetProductDetailsByIdQuery(params.id);
    const dispatch = useDispatch();
    const usernamer = useSelector((state) => state.auth.username);
    const userRole = useSelector((state) => state.auth.role);
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        setFilterCart(cartItems.filter((item) => item.usernamer === usernamer));
    }, [cartItems, usernamer]);

    useEffect(() => {
        const productInCart = filterCart.some(item => item._id === data?._id);
        setIsInCart(productInCart);
    }, [filterCart, data]);

    function addtocart() {
        if (usernamer) {
            dispatch(addToCart({ ...data, count: 1, usernamer ,role:userRole}));
            setIsInCart(prev => !prev);
        } else {
            setErrmsg(prev => !prev);
        }
    }

    function handleManagerOrder() {
        if (orderUsername && orderCount > 0) {
            dispatch(addToCart({ ...data, count: orderCount, usernamer: orderUsername,role:userRole }));
            console.log("cartadd",{ ...data, count: orderCount, usernamer: orderUsername ,role:userRole});
            setShowModal(false);
        }
    }

    if(isLoading){
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="product-details-container">
            <div className="product-details-content">
                <div className="product-image-section">
                    <div className="product-image-wrapper">
                        <img src={data?.imgUrl} alt={data?.name} className="product-image" />
                    </div>
                </div>
                
                <div className="product-info-section">
                    <div className="product-header">
                        <h1 className="product-name">{data?.name}</h1>
                        <div className="product-price">₹{data?.price}</div>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="meta-label">Brand:</span>
                            <span className="meta-value">{data?.company}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{data?.category}</span>
                        </div>
                    </div>

                    <div className="product-description">
                        <h2>Description</h2>
                        <p>{data?.description}</p>
                    </div>

                    <div className="product-actions">
                        {
                            isincart ? (
                                <Link to="/cart" className="goto-cart-btn">
                                    <ShoppingCart size={20} />
                                    View in Cart
                                </Link>
                            ) : (
                                <div className="add-to-cart-wrapper">
                                    <button className="add-to-cart-btn" onClick={addtocart}>
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                    {
                                        errmsg && (
                                            <Link to="/login" className="login-prompt">
                                                Please login to add to cart
                                            </Link>
                                        )
                                    }
                                </div>
                            )
                        }
                        {/* <button className="save-product-btn">
                            <Heart size={20} />
                            Save for Later
                        </button> */}
                        {   
                            userRole === "Manager" && (
                            <button className="btn btn-managerorder" onClick={() => setShowModal(true)} data-bs-toggle="modal" data-bs-target="#orderDetailsModal">
                                Order for User
                            </button>
                            )
                        }
                    </div>
                    {/* {userRole === "Manager" && (
                        <button className="manager-order-btn" onClick={() => setShowModal(true)} data-bs-toggle="modal" data-bs-target="#orderDetailsModal">
                            Order for User
                        </button>
                    )} */}
                </div>
            </div>
            {/* {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Manager Order</h2>
                        <label>Username:</label>
                        <input type="text" value={orderUsername} onChange={(e) => setOrderUsername(e.target.value)} />
                        <label>Count:</label>
                        <input type="number" value={orderCount} onChange={(e) => setOrderCount(Number(e.target.value))} min="1" />
                        <button onClick={handleManagerOrder}>Submit Order</button>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )} */}
             <div className="modal fade" id="orderDetailsModal" tabIndex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className='text-center'>Manager Order</h5>
                            <label htmlFor="orderUsername" className="form-label">Username:</label>
                            <input type="text" value={orderUsername} id="orderUsername"
                                   onChange={(e) => setOrderUsername(e.target.value)} 
                                   className="form-control form-control-sm" /> <br />
                            <label htmlFor="orderCount" className="form-label">Count:</label>
                            <input type="number" value={orderCount} id="orderCount"
                                   className="form-control form-control-sm" min="1"
                                   onChange={(e) => setOrderCount(Number(e.target.value))} /> <br />
                            <button onClick={handleManagerOrder} className="btn btn-submit w-100 btn-sm">Submit Order</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> 
    

        </div>
    );
}

export default ProductDetails;