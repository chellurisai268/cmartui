
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decItem, incItem, removeFromCart } from "./cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import "./Cart.css";
import { usePlaceorderMutation } from "../../services/orderApi";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn, username, role } = useSelector((state) => state.auth);
  const [filterCart, setFilterCart] = useState([]);
  const [placeorderFn] = usePlaceorderMutation();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    if (role === "Agent") {
      // For Agent, show all cart items
      setFilterCart(cartItems);
    } else {
      // For other roles (e.g., "Manager"), apply the filtering
      setFilterCart(
        cartItems.filter(
          (item) => item.usernamer === username || item.role === role
        )
      );
    }
  }, [cartItems, username, role]);


  function placeorder() {
    let selectedCartItems;
  
    // If the role is "Agent", no need to filter based on selected items.
    if (role === "Agent") {
      selectedCartItems = filterCart;  // Agent can order all items in the filtered cart
    } else {
      // For other roles, order only the selected items
      selectedCartItems = filterCart.filter((item) =>
        selectedItems.has(item._id)
      );
    }
  
    if (selectedCartItems.length === 0) {
      console.error("No items selected for order");
      return;
    }
  
    const order = {
      username: selectedCartItems[0].usernamer, // Assuming all selected items have the same username
      cartItems: selectedCartItems,
    };
  
    placeorderFn(order)
      .then((res) => console.log("Order Response:", res))
      .catch((err) => console.error("Order Error:", err));
  }

  function handleremovefromcart(item) {
    dispatch(removeFromCart(item._id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(item._id);
      return newSet;
    });
  }

  function handleItemSelect(itemId) {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }

  function handleSelectAll() {
    if (selectedItems.size === filterCart.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filterCart.map((item) => item._id)));
    }
  }

  if (filterCart.length === 0) {
    return (
      <div className="empty-cart">
        {/* <ShoppingBag size={64} /> */} <i className="bi bi-bag-dash icon-large"></i>
        <h2>Your cart is empty</h2>
        <button className="continue-shopping" onClick={() => navigate("/")}>
          {/* <ArrowLeft size={20} /> */} <i class="bi bi-arrow-left"></i>
          Continue Shopping
        </button>
      </div>
    );
  }

  // Calculate totals based on selected items if manager, otherwise use all items
  const itemsToCalculate =
    role === "Manager"
      ? filterCart.filter((item) => selectedItems.has(item._id))
      : filterCart;

  const subtotal = itemsToCalculate.reduce((a, b) => a + b.price * b.count, 0);

  let discount = 0;
  if (subtotal >= 1000 && subtotal < 5000) {
    discount = subtotal * 0.05;
  } else if (subtotal >= 5000 && subtotal < 10000) {
    discount = subtotal * 0.06;
  } else if (subtotal >= 10000) {
    discount = subtotal * 0.08;
  }

  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {
              role === "Manager" && (
                <div className="select-all-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === filterCart.length}
                      onChange={handleSelectAll}
                    />
                    <span>Select All Items</span>
                  </label>
                </div>
              )
          }
          {
            filterCart.map((item) => (
              <div key={item._id} className="cart-item">
                {
                    role === "Manager" && (
                      <div className="item-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item._id)}
                          onChange={() => handleItemSelect(item._id)}
                        />
                      </div>
                    )
                }
                <div className="image-cont">
                  <img src={item.imgUrl} alt={item.name} className="item-image" />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="item-price">₹{item.price}</p>
                    </div>
                    {
                      item.role === "Manager" && (
                        <p className="customer-name">{item.usernamer}</p>
                      )
                    }
                  </div>
                  <div className="item-actions">
                    <div className="quantity-selector">
                      <button onClick={() => dispatch(decItem(item._id))} className="quantity-btn" disabled={item.count === 1}>
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.count}</span>
                      <button onClick={() => dispatch(incItem(item._id))} className="quantity-btn">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => handleremovefromcart(item)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {
            role === "Manager" && (
              <p className="selected-items-count">
                Selected Items: {selectedItems.size} of {filterCart.length}
              </p>
            )
          }
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {
              discount > 0 && (
                <div className="summary-row discount">
                  <span>
                    Discount Applied ({((discount / subtotal) * 100).toFixed(0)}%)
                  </span>
                  <span>- ₹{discount.toFixed(2)}</span>
                </div>
              )
            }
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={()=>placeorder}
            disabled={ role === "Manager" ? selectedItems.size === 0 : filterCart.length === 0 }
            data-bs-toggle="modal" data-bs-target="#orderDetailsModal"> {" "} Place Order{" "}
          </button>
          <button className="continue-shopping" onClick={() => navigate("/")}>
            {/* <ArrowLeft size={20} /> */} <i class="bi bi-arrow-left"></i>
            Continue Shopping
          </button>
        </div>
      </div>
      <div className="modal fade" id="orderDetailsModal" tabIndex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="orderDetailsModalLabel">
                                Order Details - {selectedOrder?.username}
                            </h5> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="p-3">
              <h4>Are You Sure to Place Order</h4>
              <button className="btn btn-success me-3" onClick={placeorder}> Yes Place Order </button>
              <Link to="" className="btn btn-blue">Cancel</Link>
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

export default Cart;
