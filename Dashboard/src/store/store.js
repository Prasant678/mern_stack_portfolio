import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice"
import messageReducer from "./Slice/messageSlice"
import timelineReducer from "./Slice/timelineSlice"
import skillReducer from "./Slice/skillSlice"
import SAReducer from "./Slice/SASlice"
import projectReducer from "./Slice/projectSlice"
import emailReducer from "./Slice/emailSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        softwareApplications: SAReducer,
        project: projectReducer,
        emails: emailReducer
    }
})