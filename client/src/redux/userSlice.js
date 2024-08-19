import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}


export const userSlice = createSlice({
    name: 'user', // Name of slice
    initialState, // Note: initialState is an object called state
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload //action refers to an obj & payload refers to the data
            // `currentUser` is a property of the `state` object in Redux.
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription:(state, action)=>{
            if(state.currentUser.subscribedUsers.includes(action.payload)){
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex((userId)=>userId===action.payload),1)
            }else{
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    },
})


export const { loginStart, loginSuccess, loginFailure, logout,subscription } = userSlice.actions
export default userSlice.reducer

    //  Explanation: 
    //  - An "action" in Redux is a plain JavaScript object that represents an intention to change the state. 
    //  - In this code block, the "payload" in the loginSuccess reducer refers to the data that is being passed along with the action to update the currentUser state.