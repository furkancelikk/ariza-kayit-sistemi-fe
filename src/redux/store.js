import {applyMiddleware, compose, createStore} from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";


const secureLS = new SecureLS();

const getStateFromStorage = () => {

    const authState = secureLS.get("auth");

    let initState = {
        isLogged: false,
        username: null,
        displayName: null,
        image: null,
        password: null,
        role: null
    };
    if (authState) return authState;

    return initState;
}

const updateStateInStorage = (newState) => {
    secureLS.set("auth", newState);
}

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const initializeState = getStateFromStorage();
    setAuthorizationHeader(initializeState);
    const store = createStore(authReducer, initializeState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });
    return store;
}

export default configureStore;