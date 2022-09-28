import * as ACTIONS from "./Constants";
import {login, logout, signUp} from "../api/apiCalls";

export const logoutSuccess = () => {
    return async function (dispatch) {
        try {
            const response = await logout();
        }catch (error){}

        dispatch({
            type: ACTIONS.LOGOUT_SUCCESS
        });
    }
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
};

export const updateSuccess = ({displayName, image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
};

export const loginHandler = (creds) => {
    return async function (dispatch) {
        const response = await login(creds);
        const authState = {
            ...response.data.user,
            password: creds.password,
            token: response.data.token
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signupHandler = (body, role) => {
    return async function (dispatch) {
        const response = await signUp(body, role);
        // await dispatch(loginHandler(body));
        return response;
    }
}