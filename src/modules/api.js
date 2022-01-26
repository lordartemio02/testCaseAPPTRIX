import axios from 'axios';
import * as actions from "./actions"

const token = "perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL"

const api = axios.create({
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const getUsers = () => async (dispatch) => {
    try {
        await api
            .get("/api/admin/users", {
                params: {
                    fields: "id,login,name,email",
                }
            })
            .then((res) => {
                dispatch({ type: actions.GET_USERS, users: res.data })
            });
    } catch (error) {
        console.log(error)
    }
}
export const getIssues = () => async (dispatch) => {
    try {
        await api
            .get("/api/issues", {
                params: {
                    fields: "id,summary,project(name)",
                },
            })
            .then((res) => {
                dispatch({ type: actions.GET_ISSUES, issues: res.data })
            });
    } catch (error) {
        console.log(error)
    }
}
export const getFiltredIssues = (name) => async (dispatch) => {
    try {
        await api
            .get("/api/issues", {
                params: {
                    fields: "id,summary,project(name)",
                    query: "project:{" + name + "}",
                },
            })
            .then((res) => {
                dispatch({ type: actions.GET_FILTRED_ISSUES, filtredIssues: res.data })
            });
    } catch (error) {
        console.log(error)
    }
}
export const getWorkItems = (id) => async (dispatch) => {
    try {
        await api
            .get("/api/issues/" + id + "/timeTracking/workItems", {
                params: {
                    fields: "author(id,name),creator(id,name),date,duration(id,minutes,presentation),id,name,text,type(id,name)"
                },
            })
            .then((res) => {
                dispatch({ type: actions.GET_WORKITEMS, workItems: res.data })
            });
    } catch (error) {
        console.log(error)
    }
}



export default api;


