import React, { useEffect } from 'react'
import { useGetAllOrdersQuery, useLazyGetAllOrdersQuery } from '../../services/orderApi'
import Orderstable from './Orderstable';

function Orders() {
    const {isLoading,data : orders} = useGetAllOrdersQuery();
    
    const [getAllOrdersFn] = useLazyGetAllOrdersQuery();
    console.log(isLoading,orders);

    useEffect(()=>{
      getAllOrdersFn();
    },[])
  return (
    <div className='text-center mt-3'>
      {/* <h4>ORDERS</h4> */}
      <Orderstable orders={orders} />
    </div>
  )
}

export default Orders
