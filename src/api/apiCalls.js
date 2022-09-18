import axios from "axios";
import i18n from "i18next";

export const signUp = body => {
    return axios.post("/api/1.0/user", body, {headers: {"accept-language": i18n.language}});
};

export const login = creds => {
    return axios.post("/api/1.0/auth", {}, {auth: creds, headers: {"accept-language": i18n.language}});
};

export const getUsers = (currentPage = 0, pageSize = 5) => {
    return axios.get(`/api/1.0/user?currentPage=${currentPage}&pageSize=${pageSize}`, {headers: {"accept-language": i18n.language}});
};

export const getUserByUsername = (username) => {
    return axios.get(`/api/1.0/user/${username}`, {headers: {"accept-language": i18n.language}});
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/user/${username}`, body, {headers: {"accept-language": i18n.language}});
}

export const createFaultRecord = (post) => {
    return axios.post("/api/1.0/posts", post, {headers: {"accept-language": i18n.language}});
};

export const getPosts = (username, currentPage = 0, pageSize = 5) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get(path + `?currentPage=${currentPage}&pageSize=${pageSize}`, {headers: {"accept-language": i18n.language}});
};


export const getOldPosts = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}`, {headers: {"accept-language": i18n.language}});
};

export const getNewPostCount = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}?count=true`, {headers: {"accept-language": i18n.language}});
};

export const getNewPosts = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}?direction=after`, {headers: {"accept-language": i18n.language}});
};

export const postAttachment = (attachment) => {
    return axios.post("/api/1.0/file/postAttachment", attachment, {headers: {"accept-language": i18n.language}});
};

export const deletePost = (id) => {
    return axios.delete(`/api/1.0/posts/${id}`,  {headers: {"accept-language": i18n.language}});
};

export const setAuthorizationHeader = ({username, password, isLogged}) => {
    if (isLogged) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers["AUTHORIZATION"] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers["AUTHORIZATION"];
    }
};