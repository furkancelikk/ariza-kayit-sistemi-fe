import axios from "axios";
import i18n from "i18next";
import * as UserRole from "../shared/UserRole";

export const signUp = (body, role) => {
    let path = (role == UserRole.USER) ? "/api/1.0/user" : "/api/1.0/personnels";
    // path = (role == UserRole.PERSONNEL) &&  "/api/1.0/personnels";
    return axios.post(path, body);
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

export const getPosts = (username = null, currentPage = 0, pageSize = 5) => {
    const path = username ? `/api/1.0/posts/user/${username}` : "/api/1.0/posts";
    return axios.get(path + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};

export const getPostByID = (id) => {
    return axios.get(`/api/1.0/posts/get/${id}`);
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

export const postUpdate = ({id, isResolved}) => {
    const body ={id, isResolved};
    return axios.put(`/api/1.0/posts`, body);
};

export const deleteUser = (username) => {
    return axios.delete(`/api/1.0/user/${username}`);
};

export const getCategories = (all = false, currentPage = 0, pageSize = 5) => {
    return axios.get("/api/1.0/categories" + `?currentPage=${currentPage}&pageSize=${pageSize}&all=${all}`);
};

export const createNewCategory = (category) => {
    return axios.post("/api/1.0/categories", category);
};

export const deleteCategoryByID = (categoryID) => {
    return axios.delete(`/api/1.0/categories/${categoryID}`);
};

export const getOldCategories = (id) => {
    return axios.get( `/api/1.0/categories/${id}`);
};

export const createComment = (comment) => {
    return axios.post("/api/1.0/comments", comment);
};

export const getAllPostComment = (postID) => {
    return axios.get(`/api/1.0/comments/post/${postID}`);
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