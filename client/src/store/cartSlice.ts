import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CartItem {
    img: String;
    Title: String;
    Price: String;
    Quantity: String;
    Description: String;
}

interface cartState {
    RestaurantName: String,
    userid: String,
    cart: CartItem[]
}

const initialState: cartState = {
    RestaurantName: ' ',
    userid: ' ',
    cart: []
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setrestaurant(state: any, action: PayloadAction<String>) {
            state.RestaurantName = action.payload;
            state.userid = action.payload;
        },
        addToCart(state: any, action: PayloadAction<CartItem[]>) {
            state.cart.push(...action.payload);
        },
        removeCart(state, action: PayloadAction<String>) {
            state.cart = state.cart.filter(item => item.Title !== action.payload);
        },
        emptycart(state) {
            state.cart = []
        }
    }
})

export const { setrestaurant, addToCart, removeCart, emptycart } = CartSlice.actions
export default CartSlice.reducer