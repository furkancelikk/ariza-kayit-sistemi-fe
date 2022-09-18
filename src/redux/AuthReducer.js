import * as ACTIONS from "./Constants";

const defaultState = {
    isLogged: false,
    username: null,
    displayName: null,
    image: null,
    password: null
};

const authReducer = (state = {...defaultState}, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS){
        return defaultState;
    }
    else if (action.type === ACTIONS.LOGIN_SUCCESS){
        return {
            ...action.payload,
            isLogged: true
        };
    }
    else if (action.type === ACTIONS.UPDATE_SUCCESS){
        return {
            ...state,
            ...action.payload
        };
    }
    return state;
}

export default authReducer;