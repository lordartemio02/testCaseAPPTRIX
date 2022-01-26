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


