import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const emailSlice = createSlice({
    name: "emails",
    initialState:{
        loading: false,
        error: null,
        message: null,
        emails: []
    },
    reducers: {
        getAllEmailsRequest(state, action){
            state.loading = true;
            state.error = null;
            state.emails = [];
        },
        getAllEmailsSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.emails = action.payload;
        },
        getAllEmailsFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.emails = state.emails;
        },
        deleteEmailRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteEmailSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteEmailFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetEmailSlice(state, action){
            state.loading = false;
            state.emails = state.emails;
            state.message = null;
            state.error = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.emails = state.emails;
        }
    }
})

export const getAllEmails = () => async(dispatch) => {
    dispatch(emailSlice.actions.getAllEmailsRequest());
    try {
        const { data } = await axios.get("https://mern-stack-portfolio-6r58.onrender.com/api/v1/email/getall",
            { withCredentials: true}
        )
        dispatch(emailSlice.actions.getAllEmailsSuccess(data.emails));
        dispatch(emailSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(emailSlice.actions.getAllEmailsFailed(error.response.data.message))
    }
}

export const deleteEmail = (id) => async(dispatch) => {
    dispatch(emailSlice.actions.deleteEmailRequest());
    try {
        const { data } = await axios.delete(`https://mern-stack-portfolio-6r58.onrender.com/api/v1/email/delete/${id}`,
            {withCredentials: true}
        )
        dispatch(emailSlice.actions.deleteEmailSuccess(data.message));
        dispatch(emailSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(emailSlice.actions.deleteEmailFailed(error.response.data.message));
    }
}

export const clearAllEmailErrors = ()=> (dispatch) => {
    dispatch(emailSlice.actions.clearAllErrors());
}

export const resetEmailsSlice = () => (dispatch) => {
    dispatch(emailSlice.actions.resetEmailSlice());
}

export default emailSlice.reducer