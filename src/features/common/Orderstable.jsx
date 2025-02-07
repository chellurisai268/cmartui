// import React from 'react'
// import { Link } from 'react-router-dom';
// import './nav.css'
// import { useAcceptorderMutation, useDeleteOrderMutation, useDeliverorderMutation, useDispatchorderMutation, useLazyGetAllOrdersQuery } from '../../services/orderApi';

// function Orderstable({orders}) {
//     console.log(orders);
//     const [delorderFn] = useDeleteOrderMutation();
//     const [getAllOrdersFn] = useLazyGetAllOrdersQuery();
//     const [acceptorderFn] = useAcceptorderMutation();
//     const [dispatchorderFn] = useDispatchorderMutation();
//     const [deliverorderFn] = useDeliverorderMutation();
//     function deleteOrder(id){
//         delorderFn(id).then((res)=>{ 
//             getAllOrdersFn();
//             console.log('delete',res);
//         } )
//     }
//     function acceptOrder(id){
//         acceptorderFn(id).then((res)=>{
//             getAllOrdersFn();
//             console.log(res);
//         })
//     }
//     function dispatchOrder(id){
//         dispatchorderFn(id).then((res)=>{
//             getAllOrdersFn();
//             console.log(res);
//         })
//     }
//     function deliverOrder(id){
//         deliverorderFn(id).then((res)=>{
//             getAllOrdersFn();
//             console.log(res);
//         })
//     }
//   return (
//     <div>
//      <h4>ORDERS TABLE</h4> 
//      <div className='px-5'>
//         <table className='table border border-2 me-2 shadow-sm'>
//             <thead className='table-light'>
//                 <tr>
//                     <th>Username</th>
//                     <th>No of Items</th>
//                     <th>View</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     orders?.map((o)=>{
//                         return (
//                             <tr key={o.i}>
//                                 <td>{o.username}</td>
//                                 <td>{o.cartItems.length}</td>
//                                 <td><Link to='' className='text-dark text-decoration-none'>View More</Link></td>
//                                 <td>{ [...o.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1 })[0].action }</td>
//                                 <td>
//                                     {
//                                         [...o.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].action === 'placed'
//                                         && <div>
//                                             <button className='me-2 btn btn-silver' onClick={()=>{acceptOrder(o._id)}}>Accept</button>
//                                             <button className='btn btn-orange' onClick={()=>{deleteOrder(o._id)}}>Delete</button>
//                                         </div>
//                                     }
//                                     {
//                                         [...o.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].action === 'accepted'
//                                         && <>
//                                             <button className='btn btn-silver' onClick={()=>{dispatchOrder(o._id)}}>Dispatch</button>
//                                         </>
//                                     }
//                                     {
//                                         [...o.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].action === 'dispatched' && <>
//                                             <button className='btn btn-silver' onClick={()=>{deliverOrder(o._id)}}>Deliver</button>
//                                         </>
//                                     }
//                                     {
//                                         [...o.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].action === 'delivered' && <>
//                                             <b>Delivered</b>
//                                         </>
//                                     }
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>
//      </div>
//     </div>
//   )
// }

// export default Orderstable

import React, { useState } from 'react';
import './nav.css';
import { useAcceptorderMutation, useDeleteOrderMutation, useDeliverorderMutation, useDispatchorderMutation, useLazyGetAllOrdersQuery } from '../../services/orderApi';

function Orderstable({orders}) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [delorderFn] = useDeleteOrderMutation();
    const [getAllOrdersFn] = useLazyGetAllOrdersQuery();
    const [acceptorderFn] = useAcceptorderMutation();
    const [dispatchorderFn] = useDispatchorderMutation();
    const [deliverorderFn] = useDeliverorderMutation();

    function deleteOrder(id){
        delorderFn(id).then((res)=>{ 
            getAllOrdersFn();
        });
    }

    function acceptOrder(id){
        acceptorderFn(id).then((res)=>{
            getAllOrdersFn();
        });
    }

    function dispatchOrder(id){
        dispatchorderFn(id).then((res)=>{
            getAllOrdersFn();
        });
    }

    function deliverOrder(id){
        deliverorderFn(id).then((res)=>{
            getAllOrdersFn();
        });
    }

    const handleViewMore = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className='px-2'>
            <h4 className='text-center'>ORDERS TABLE</h4> 
            <div className="table-responsive ">
                <table className='table shadow-sm'>
                    <thead className='table-light'>
                        <tr>
                            <th>Username</th>
                            <th>No of Items</th>
                            <th>View</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((o) => (
                                <tr key={o._id}>
                                    <td>{o.username}</td>
                                    <td>{o.cartItems.length}</td>
                                    <td>
                                        <button className='btn btn-link text-dark text-decoration-none p-0' onClick={() => handleViewMore(o)} data-bs-toggle="modal" data-bs-target="#orderDetailsModal">
                                            View More
                                        </button>
                                    </td>
                                    <td>{[...o.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action}</td>
                                    <td>
                                        {[...o.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action === 'placed' && (
                                            <div>
                                                <button className='me-2 btn btn-silver' onClick={() => acceptOrder(o._id)}>Accept</button>
                                                <button className='btn btn-orange' onClick={() => deleteOrder(o._id)}>Delete</button>
                                            </div>
                                        )}
                                        {[...o.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action === 'accepted' && (
                                            <button className='btn btn-silver' onClick={() => dispatchOrder(o._id)}>Dispatch</button>
                                        )}
                                        {[...o.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action === 'dispatched' && (
                                            <button className='btn btn-silver' onClick={() => deliverOrder(o._id)}>Deliver</button>
                                        )}
                                        {[...o.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action === 'delivered' && (
                                            <b>Delivered</b>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            <div className="modal fade" id="orderDetailsModal" tabIndex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="orderDetailsModalLabel">
                                Order Details - {selectedOrder?.username}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                selectedOrder && (
                                    <div>
                                        <div className="order-info mb-4">
                                            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                            <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                            <p>
                                                <strong>Current Status:</strong> 
                                                {[...selectedOrder.status].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0].action}
                                            </p>
                                        </div>
                                        <h6 className="mb-3">Order Items</h6>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Product</th>
                                                        <th>Category</th>
                                                        <th>Company</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        selectedOrder.cartItems.map((item) => (
                                                            <tr key={item._id}>
                                                                <td>
                                                                    <img src={item.imgUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                    />
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.category}</td>
                                                                <td>{item.company}</td>
                                                                <td>{item.count}</td>
                                                                <td>₹{item.price}</td>
                                                                <td>₹{item.price * item.count}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="6" className="text-end"><strong>Grand Total:</strong></td>
                                                        <td>
                                                            <strong>
                                                                ₹{selectedOrder.cartItems.reduce((total, item) => total + (item.price * item.count), 0)}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="status-timeline mt-4">
                                            <h6 className="mb-3">Order Timeline</h6>
                                            <div className="timeline-items">
                                                {
                                                    [...selectedOrder.status]
                                                    .sort((a, b) => b.timestamp - a.timestamp)
                                                    .map((status, index) => (
                                                        <div key={status._id} className="timeline-item">
                                                            <div className="d-flex justify-content-between">
                                                                <span className="text-capitalize"><strong>{status.action}</strong></span>
                                                                <span className="text-muted">
                                                                    {new Date(status.timestamp).toLocaleString()}
                                                                </span>
                                                            </div>
                                                            {index !== selectedOrder.status.length - 1 && <hr />}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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

export default Orderstable;