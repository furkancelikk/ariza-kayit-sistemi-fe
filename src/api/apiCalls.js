import axios from "axios";
import i18n from "i18next";

export const signUp = body => {
    return axios.post("/api/1.0/user", body);
};

export const login = creds => {
    return axios.post("/api/1.0/auth", creds);
};

export const logout = () => {
    return axios.post("/api/1.0/logout");
};

export const getUsers = (currentPage = 0, pageSize = 5) => {
    return axios.get(`/api/1.0/user?currentPage=${currentPage}&pageSize=${pageSize}`);
};

export const getUserByUsername = (username) => {
    return axios.get(`/api/1.0/user/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/user/${username}`, body);
}

export const createFaultRecord = (post) => {
    return axios.post("/api/1.0/posts", post);
};

export const getPosts = (username, currentPage = 0, pageSize = 5) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get(path + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};


export const getOldPosts = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}`);
};

export const getNewPostCount = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}?count=true`);
};

export const getNewPosts = (username, id) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts"
    return axios.get( `${path}/${id}?direction=after`);
};

export const postAttachment = (attachment) => {
    return axios.post("/api/1.0/file/postAttachment", attachment);
};

export const deletePost = (id) => {
    return axios.delete(`/api/1.0/posts/${id}`);
};

export const deleteUser = (username) => {
    return axios.delete(`/api/1.0/user/${username}`);
};

export const setAuthorizationHeader = ({isLogged, token}) => {
    axios.defaults.headers["accept-language"] = i18n.language;
    if (isLogged) {
        const authorizationHeaderValue = `Bearer ${token}`;
        axios.defaults.headers["AUTHORIZATION"] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers["AUTHORIZATION"];
    }
};

export const setAxiosDefaultLanguage = (lang) => {
    axios.defaults.headers["accept-language"] = lang;
};