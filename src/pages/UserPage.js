import React, {useEffect, useState} from 'react';
import ProfileCard from "./ProfileCard";
import {getUserByUsername} from "../api/apiCalls";
import {useParams} from "react-router-dom";
import Spinner from "../components/Spinner";
import PostList from "./PostList";

const UserPage = () => {

    const [user, setUser] = useState();
    const [isFailure, setIsFailure] = useState({
        status: false,
        message: ""
    });
    const [isApiCall, setIsApiCall] = useState(false);
    const params = useParams();

    const loadUser = async () => {
        setIsApiCall(true);
        try {
            const response = await getUserByUsername(params.username);
            setUser(response.data);
            setIsFailure(fail => ({...fail, status: false, message: ""}));
        } catch (error) {
            if (error.response.data.status == 404)
                setIsFailure(fail => ({...fail, status: true, message: error.response.data.message}));
            else
                setIsFailure(fail => ({...fail, status: true, message: "Something went wrong"}));
        }
        setIsApiCall(false);
    }

    useEffect(() => {
        loadUser();
    }, [params.username]);

    if (isFailure.status) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons" style={{fontSize: '48px'}}>
                            error
                        </i>
                    </div>
                    {isFailure.message}
                </div>
            </div>
        )
    }

    if (isApiCall || user?.username !== params.username) {
        return (
            <Spinner/>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col mb-4">
                    <ProfileCard user={user}/>
                </div>
                <div className="col">
                    <PostList username={params.username}/>
                </div>
            </div>
        </div>
    );
};

export default UserPage;