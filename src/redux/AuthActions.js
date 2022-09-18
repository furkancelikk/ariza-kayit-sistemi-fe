import * as ACTIONS from "./Constants";
import {login, signUp} from "../api/apiCalls";

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
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
            ...response.data,
            password: creds.password
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signupHandler = body => {
    return async function (dispatch) {
        const response = await signUp(body);
        await dispatch(loginHandler(body));
        return response;
    }
}