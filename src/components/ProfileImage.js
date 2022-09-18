import React from 'react';
import defaultImage from "../assets/profile.png";

const ProfileImage = (props) => {

    const {image, tempimage} = props;
    let src = defaultImage;
    if (image)
        src = "/images/profile/" + image;

    return (
        <div>
            <img src={tempimage || src}
                 {...props}
                 style={{objectFit: "contain"}}
                onError={(event) => event.target.src = defaultImage}
            />
        </div>
    );
};

export default ProfileImage;