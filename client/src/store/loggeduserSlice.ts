import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface userState {
    id: String | null
}

const initialState: userState = {
    id: null,
}

const LoginedUserSlice = createSlice({
    name: 'logineduser',
    initialState,
    reducers: {
        loggeduser(state: any, action: PayloadAction<String>) {
            const st = state;
            st.id = action.payload
        },
        removeuser(state: userState) {
            const st = state;
            st.id = null;
        }
    }
})

export const { loggeduser, removeuser } = LoginedUserSlice.actions
export default LoginedUserSlice.reducer