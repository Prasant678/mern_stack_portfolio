import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        error: null,
        message: null,
        loading: false,
        singleProject: {}
    },
    reducers: {
        getAllProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.projects = []
        },
        getAllProjectsSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.projects = action.payload;
        },
        getAllProjectsFailed(state, action) {
            state.loading = true;
            state.error = action.payload;
            state.projects = state.projects;
        },
        addNewProjectRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        addNewProjectFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        deleteProjectRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        deleteProjectFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        updateProjectRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        updateProjectFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        resetProjectSlice(state, action) {
            state.error = null;
            state.projects = state.projects;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state = state.projects;
        },
    }
})

export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const response = await axios.get(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/getall",
            { withCredentials: true }
        );
        dispatch(
            projectSlice.actions.getAllProjectsSuccess(response.data.projects)
        );
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.getAllProjectsFailed(error.response.data.message)
        );
    }
};

export const addNewProject = (data) => async (dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.post(
            "https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/add",
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.addNewProjectFailed(error.response.data.message)
        );
    }
};
export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const response = await axios.delete(
            `https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/delete/${id}`,
            {
                withCredentials: true,
            }
        );
        dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.deleteProjectFailed(error.response.data.message)
        );
    }
};
export const updateProject = (id, newData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const response = await axios.put(
            `https://mern-stack-portfolio-6r58.onrender.com/api/v1/project/update/${id}`,
            newData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error);
        dispatch(
            projectSlice.actions.updateProjectFailed(error.response.data.message)
        );
    }
};

export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
