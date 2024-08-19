import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'video', // Name of slice
    initialState, // Note: initialState is an object called state
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.currentVideo = action.payload //action refers to an obj & payload refers to the data
            // `currentUser` is a property of the `state` object in Redux.
        },
        fetchFailure: (state) => {
            state.loading = false
            state.error = true
        },
        fetchFailure: (state) => {
            state.loading = false
            state.error = true
        },
        like:(state,action)=>{
            //If user id is not in likes array
            if(!state.currentVideo.likes.includes(action.payload)){
                state.currentVideo.likes.push(action.payload)
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userId)=>userId===action.payload),1)
            }
        },
        dislike:(state,action)=>{
            // If user id is not in dislikes array
            if(!state.currentVideo.dislikes.includes(action.payload)){
                state.currentVideo.dislikes.push(action.payload)
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId)=>userId===action.payload),1)
            }
        },
    },
})


export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions
export default videoSlice.reducer

    //  Explanation: 
    //  - An "action" in Redux is a plain JavaScript object that represents an intention to change the state. 
    //  - In this code block, the "payload" in the loginSuccess reducer refers to the data that is being passed along with the action to update the currentUser state.