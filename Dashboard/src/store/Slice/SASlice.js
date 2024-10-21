import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const SASlice = createSlice({
    name: "applications",
    initialState: {
        softwareApplications: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        getAllSoftwareApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.softwareApplications = [];
        },
        getAllSoftwareApplicationsSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.softwareApplications = action.payload;
        },
        getAllSoftwareApplicationsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.softwareApplications = state.softwareApplications;
        },
        addNewsoftwareApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewsoftwareApplicationsSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        addNewsoftwareApplicationsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        deletesoftwareApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deletesoftwareApplicationsSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        deletesoftwareApplicationsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        resetSASlice(state, action) {
            state.error = null;
            state.softwareApplications = state.softwareApplications;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.softwareApplications = state.softwareApplications;
        },
    }
})

export const getAllSoftwareApplications = () => async (dispatch) => {
    dispatch(
        SASlice.actions.getAllSoftwareApplicationsRequest()
    );
    try {
        const response = await axios.get(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/softwareapplication/getall",
            { withCredentials: true }
        );
        dispatch(
            SASlice.actions.getAllSoftwareApplicationsSuccess(
                response.data.softwareApplications
            )
        );
        dispatch(SASlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            SASlice.actions.getAllSoftwareApplicationsFailed(
                error.response.data.message
            )
        );
    }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
    dispatch(SASlice.actions.addNewsoftwareApplicationsRequest());
    try {
        const response = await axios.post(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/softwareapplication/add",
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(
            SASlice.actions.addNewsoftwareApplicationsSuccess(
                response.data.message
            )
        );
        dispatch(SASlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            SASlice.actions.addNewsoftwareApplicationsFailed(
                error.response.data.message
            )
        );
    }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
    dispatch(
        SASlice.actions.deletesoftwareApplicationsRequest()
    );
    try {
        const response = await axios.delete(
            `https://mern-stack-portfolio-6r58.onrender.com/api/v1/softwareapplication/delete/${id}`,
            {
                withCredentials: true,
            }
        );
        dispatch(
            SASlice.actions.deletesoftwareApplicationsSuccess(
                response.data.message
            )
        );
        dispatch(SASlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            SASlice.actions.deletesoftwareApplicationsFailed(
                error.response.data.message
            )
        );
    }
};

export const clearAllSoftwareAppErrors = () => (dispatch) => {
    dispatch(SASlice.actions.clearAllErrors());
};

export const resetSASlice = () => (dispatch) => {
    dispatch(SASlice.actions.resetSASlice());
};

export default SASlice.reducer