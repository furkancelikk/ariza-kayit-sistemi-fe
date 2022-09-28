import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {getUsers} from "../api/apiCalls";
import UserListItem from "../components/UserListItem";
import Spinner from "../components/Spinner";

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0
    });
    const [isApiCall, setIsApiCall] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const {t} = useTranslation();

    const loadUsers = async (number = 0, size = 5) => {
        setIsApiCall(true);
        setIsFailure(false);
        try {
            const response = await getUsers(number, size);
            setPage(response.data);
        }catch (error){
            setIsFailure(true);
        }
        setIsApiCall(false);
    }

    useEffect(() => {
        loadUsers();
    }, [])

    const onClickNext = () => {
        loadUsers(page.number + 1);
    }

    const onClickBack = () => {
        loadUsers(page.number - 1);
    }


    let actionDiv = (
        <div className="">
            {
                page.first === false && <button className="btn btn-lg btn-light" onClick={onClickBack}> {"<"} </button>
            }
            {
                page.last === false &&
                <button className="btn btn-lg btn-light float-right" onClick={onClickNext}> > </button>
            }

        </div>
    );

    if (isApiCall) {
        actionDiv = (
            <Spinner/>
        )
    }

    return (
        <div>
            <div className="card">
                <div className="card-header bg-info">
                    <h5 className="card-title text-center text-light">Users</h5>
                </div>
                <div>
                    <div className="list-group-flush">
                        {page.content.map(user => (
                            <UserListItem user={user} key={user.username}/>
                        ))}
                    </div>
                    {actionDiv}
                    {isFailure && <div className="text-center text-danger m-3">Load Failure</div>}
                </div>
            </div>
        </div>
    );
};

export default UserList;