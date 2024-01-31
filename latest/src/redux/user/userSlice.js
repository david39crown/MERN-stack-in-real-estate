/* definition Of create state slice
        In Redux, a state slice is a way to organize and manage a specific part of the
         overall application state. State slices are typically created using the 
         createSlice function from the Redux Toolkit, a set of utility functions that 
         simplify common Redux patterns.

          This particular slice is designed to manage the state related to user authentication,
          including the current user, loading state, and error information.

*/
 
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser:null,
    error: null,
    isLoading :false,
}
const userSlice=createSlice ({
    name:'user',
    initialState,
    reducers:{  //that define how the state should be updated in response to different actions.
        signInStart:(state)=>
        {
            //Sets the loading flag to true to indicate that an authentication process has started.
            state.isLoading=true
        },
        signInSuccess:(state,action)=>
    
        {
            // Updates the state with the authenticated currentUser, sets loading to false, 
            //and clears any previous errors.
            state.currentUser=action.payload
            state.isLoading=false
            state.error=null
        },
        signInFailure:(state,action)=>
        {
           /*  Updates the state by clearing the currentUser, setting loading to false,
             and storing the error information. */
            state.currentUser=action.payload
            state.isLoading=false
        }
    }
})
export const {signInStart,signInSuccess,signInFailure}=userSlice.actions
export default  userSlice.reducer;
// export selectors
