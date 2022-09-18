import React from 'react';
import {Link} from "react-router-dom";
import ProfileImage from "./ProfileImage";

const UserListItem = (props) => {
    const {user} = props;
    return (
        <Link to={`/user/${user.username}`} className="list-group-item list-group-item-action d-flex">
            <div className="d-flex align-items-center">
                <ProfileImage image={user?.image} alt={user?.username} width={32} height={32} className="rounded-circle"/>
            </div>
            <div className="mx-2 d-flex align-items-center">
                {`${user.displayName}@${user.username}`}
            </div>

        </Link>
    );
};

export default UserListItem;