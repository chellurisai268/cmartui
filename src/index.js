import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Signup from './features/users/Signup.jsx';
import Navbar from './features/common/Navbar.jsx';
import Login from './features/users/Login.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import AddProducts from './features/dashboard/AddProducts.jsx';
import Products from './features/common/Products.jsx';
import ProductDetails from './features/common/ProductDetails.jsx';
import Cart from './features/common/Cart.jsx';
import PlaceOrder from './features/common/PlaceOrder.jsx';
import Orders from './features/common/Orders.jsx';
import ProtectedRoute from './features/common/ProtectedRoute';
import SearchedProduct from './features/common/SearchProduct.jsx';
import Productscat from './features/common/ProductCat.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children : [
      {
        path : '/',
        element : <Navbar/>,
        children : [
          {
            path : '/login',
            element : <Login/>
          },
          {
            path : '/',
            element : <Products/>
          },
          {
            path : '/catp/:cat',
            element : <Productscat/>
          },
          {
            path : '/productdetails/:id',
            element : <ProductDetails/>
          },
          {
            path : '/cart',
            element : <ProtectedRoute element={<Cart />} />
          },
          {
            path : '/placeorder',
            element : <ProtectedRoute element={<PlaceOrder />} />
          },
          {
            path : '/dashboard',
            element : <ProtectedRoute element={<Dashboard />} />,
            children : [
              {
                path : '/dashboard/addproduct',
                element : <ProtectedRoute element={<AddProducts />} />,
              },
              {
                path : '/dashboard/orders',
                element : <ProtectedRoute element={<Orders />} />,
              }
            ]
          },
          {
            path: '/search/:searchTerm',
            element: <SearchedProduct />
          }
        ]
      }
    ]
  },
  {
    path : '/signup',
    element : <Signup/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

reportWebVitals();
