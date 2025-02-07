import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../../App.css'
function ManagerDashboard() {
  return (
    <div className='p-2'>
      <h3 className='text-center'>MANAGER DASHBOARD</h3>
      <div className='text-center'>
        <Link to="addProduct" className='btn btn-second me-3'>Add Product</Link>
        <Link to="orders" className='btn btn-white'>View Orders</Link>
      </div>
      <Outlet/>
    </div>
  )
}

export default ManagerDashboard
