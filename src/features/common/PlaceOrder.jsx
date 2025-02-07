import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import './nav.css'
import { usePlaceorderMutation } from '../../services/orderApi'
import { useSelector } from 'react-redux';
function PlaceOrder() {
    const [placeorderFn] = usePlaceorderMutation();
    const {username,role}=useSelector((state)=>state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const [filterCart,setFilterCart]=useState([]);
    useEffect(() => {
      setFilterCart(cartItems.filter((item) => item.usernamer === username|| item.role === role));
      console.log('Filtered Cart Items for the user:', filterCart);
  }, [cartItems, username]);
    function placeorder(){
        const order = {
            username : filterCart[0].usernamer,
            cartItems
        }
        placeorderFn(order).then((res)=>{console.log("res",res)})
    }
  return (
    <div className='p-3'>
      <h4>Are You Sure to Place Order</h4>
      <button className='btn btn-success me-3' onClick={placeorder}>Yes Place Order</button>
      <Link to='' className='btn btn-blue'>Cancel</Link>
    </div>
  )
}

export default PlaceOrder
