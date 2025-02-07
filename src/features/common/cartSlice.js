import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : JSON.parse(window.localStorage.getItem('cartItems')) || []
}

export const cartSlice = createSlice({
    name : 'cartSlice',
    initialState,
    reducers : {
        addToCart:(state,action)=>{
            state.cartItems.push(action.payload)
            window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        incItem: (state,action) => {
            console.log(action)
            var x = state.cartItems.map((item)=>{
                if(item._id === action.payload){
                    item.count++;
                }
                return item;
            })
            console.log(x)
            window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        decItem : (state,action) => {
            console.log(action);
            var  y = state.cartItems.map((item)=>{
                if(item._id === action.payload){
                    item.count--;
                }
                return item;
            })
            console.log(y)
            window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        removeFromCart : (state,action) => {
            console.log(state.cartItems);
            const remove = state.cartItems.filter(item => item._id !== action.payload);
            state.cartItems = remove;
            window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        clearCart : (state) => {
            state.cartItems = [];
            window.localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart,incItem,decItem,removeFromCart,clearCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;