import axios from "axios";
import * as actions from "./actions"

const defaultState = {
    users: [],
    token: "perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL",
}

export default (state = defaultState, actionParametr) => {
    switch (actionParametr.type) {
        case actions.GET_USERS:
            return { ...state, users: actionParametr.users };
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