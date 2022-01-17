import axios from "axios";
import * as actions from "./actions"

const defaultState = {
    users: [],
    token: "perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL",
    issues: [],
    filtredIssues: [],
    workItems: []
}

export default (state = defaultState, actionParametr) => {
    switch (actionParametr.type) {
        case actions.GET_USERS:
            return { ...state, users: actionParametr.users };
        case actions.GET_ISSUES:
            return { ...state, issues: actionParametr.issues };
        case actions.GET_FILTRED_ISSUES:
            return { ...state, filtredIssues: actionParametr.filtredIssues };
        case actions.GET_WORKITEMS:
            return { ...state, workItems: actionParametr.workItems };
        default:
            return state;
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        await axios
            .get("/api/admin/users", {
                params: {
                    fields: "id,login,name,email",
                },
                headers: {
                    Authorization: "Bearer " + defaultState.token,
                },
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
        await axios
            .get("/api/issues", {
                params: {
                    fields: "id,summary,project(name)",
                },
                headers: {
                    Authorization: "Bearer " + defaultState.token,
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
        await axios
            .get("/api/issues", {
                params: {
                    fields: "id,summary,project(name)",
                    query: "project:{" + name + "}",
                },
                headers: {
                    Authorization: "Bearer " + defaultState.token,
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
        await axios
            .get("/api/issues/" + id + "/timeTracking/workItems", {
                params: {
                    fields: "author(id,name),creator(id,name),date,duration(id,minutes,presentation),id,name,text,type(id,name)"
                },
                headers: {
                    Authorization: "Bearer " + defaultState.token,
                },
            })
            .then((res) => {
                dispatch({ type: actions.GET_WORKITEMS, workItems: res.data })
            });
    } catch (error) {
        console.log(error)
    }
}