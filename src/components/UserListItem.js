import React from 'react';
import {Link} from "react-router-dom";
import ProfileImage from "./ProfileImage";

const UserListItem = (props) => {
    const {user} = props;
    return (
        <Link to={`/user/${user.username}`} className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <ProfileImage image={user?.image} alt={user?.username} width={32} height={32} className="rounded-circle"/>
                <div className="mx-2">
                    {user.displayName}<span className="text-black-50 small"> @{user.username}</span>
                </div>
            </div>
            <div>
                {user.role}
            </div>

        </Link>
    );
};

export default UserListItem;