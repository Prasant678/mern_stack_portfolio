import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const skillSlice = createSlice({
    name: "Skills",
    initialState: {
        loading: false,
        error: null,
        message: null,
        skills: []
    },
    reducers: {
        getAllSkillsRequest(state, action){
            state.loading = true;
            state.error = null;
            state.skills = [];
        },
        getAllSkillsSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.skills = action.payload;
        },
        getAllSkillsFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.skills =state.skills;
        },
        addSkillRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addSkillSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addSkillFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteSKillRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteSKillSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteSKillFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateSkillRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateSkillSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        updateSkillFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetSkillSlice(state, action){
            state.loading = false;
            state.error = null;
            state.message = null;
            state.skills = state.skills
        },
        clearAllErrors(state, action){
            state.error = null;
            state.skills = state.skills;
        }
    }
})

export const getAllSkills = () => async(dispatch) =>{
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
        const { data } = await axios.get("https://mern-stack-portfolio-6r58.onrender.com/api/v1/skill/getall",
            {withCredentials: true}
        )
        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));
    }
}

export const addNewSkill = (data) => async(dispatch) => {
    dispatch(skillSlice.actions.addSkillRequest());
    try {
        const response = await axios.post("https://mern-stack-portfolio-6r58.onrender.com/api/v1/skill/add",
            data,
            {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}}
        )
        dispatch(skillSlice.actions.addSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.addSkillFailed(error.response.data.message));
    }
}

export const updateSkill = (id, proficiency) => async(dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const response = await axios.put(`https://mern-stack-portfolio-6r58.onrender.com/api/v1/skill/update/${id}`,
            { proficiency },
            {withCredentials: true, headers: {"Content-Length": "application/json"}}
        )
        dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
    }
}

export const deleteSkill = (id) => async(dispatch) => {
    dispatch(skillSlice.actions.deleteSKillRequest());
    try {
        const response = await axios.delete(`https://mern-stack-portfolio-6r58.onrender.com/api/v1/skill/delete/${id}`,
            {withCredentials: true}
        )
        dispatch(skillSlice.actions.deleteSKillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.deleteSKillFailed(error.response.data.message));
    }
}

export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
}

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
}

export default skillSlice.reducer