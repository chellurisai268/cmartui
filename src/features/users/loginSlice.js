import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: window.localStorage.getItem("token") ? true : false,
  role: window.localStorage.getItem("role") || null,
  username: window.localStorage.getItem("username"),
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.username = "";
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Log the cartItems to see its value
      console.log("cartItems before clear:", cartItems);
    
      // Clear everything from localStorage
      window.localStorage.clear();
    
      // Restore the cartItems to localStorage if it was previously set
      if (cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    
      // Check if the cartItems are restored correctly
      const restoredCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      console.log("cartItems after restore:", restoredCartItems);
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
const loginReducer = loginSlice.reducer;
export default loginReducer;
