import React from 'react';
import UserList from "./UserList";
import PostSubmit from "./post/PostSubmit";
import {useSelector} from "react-redux";
import PostList from "./post/PostList";
import Post from "./post/Post";
import * as UserRole from "../shared/UserRole";
import CategoryList from "./category/CategoryList";
import Category from "./category/Category";
import UserPage from "./user/UserPage";
import ProfileCard from "./user/ProfileCard";

const HomePage = () => {
    const {isLogged, role, username} = useSelector(store => ({
        isLogged: store.isLogged,
        role: store.role,
        username: store.username
    }))

    return (
        <div>
            <div className="container"></div>
            <div className="row">
                {
                    isLogged &&
                    <>
                        <div className="col-12 col-sm-6 mb-4">
                            {
                                role == UserRole.ADMIN &&
                                <PostList/>
                            }
                            {
                                role == UserRole.PERSONNEL &&
                                <Category/>
                            }
                            {
                                role == UserRole.USER &&
                                <PostSubmit/>
                            }
                        </div>
                        <div className="col-sm-6 col-12">
                            {
                                role == UserRole.ADMIN &&
                                <UserList/>
                            }
                            {
                                role == UserRole.PERSONNEL &&
                                <PostList/>
                            }
                            {
                                role == UserRole.USER &&
                                <PostList username={username}/>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default HomePage;