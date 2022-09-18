import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ProfileImage from "../components/ProfileImage";
import Input from "../components/Input";
import {updateUser} from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {updateSuccess} from "../redux/AuthActions";

const ProfileCard = (props) => {

    const [user, setUser] = useState({...props.user});
    const [editMode, setEditMode] = useState(false);
    const [editable, setEditable] = useState(false);
    const [isApiCall, setIsApiCall] = useState(false);
    const [errors, setErrors] = useState(false);
    const [displayName, setDisplayName] = useState();
    const [image, setImage] = useState();
    const params = useParams();
    const dispatch = useDispatch();
    const pathUsername = params.username;
    const {username} = useSelector(store => ({username: store.username}));

    useEffect(() => {
        setEditable(pathUsername == username)
    }, [pathUsername, username])

    useEffect(() => {
        setErrors(err => ({...err, displayName: undefined}));
    }, [displayName])

    useEffect(() => {
        if (editMode === false) {
            setDisplayName(null);
            setImage(null);
        } else if (editMode === true)
            setDisplayName(user?.displayName);
    }, [editMode])

    const onSave = async () => {
        setIsApiCall(true);
        const body = {
            displayName,
            image: image?.split(",")[1]
        }
        try {
            const response = await updateUser(pathUsername, body);
            dispatch(updateSuccess(response.data))
            setEditMode(false);
            setUser(response.data);
        } catch (error) {
            if (error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
            }
        }
        setIsApiCall(false);
    }

    const onChangeFile = (event) => {
        setErrors(err => ({...err, image: undefined}));
        if (event.target.files.length < 1){
            setImage(null);
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImage image={user?.image} tempimage={image} alt={user?.username} width={150} height={150}
                              className="rounded-circle shadow"/>
            </div>
            <div className="card-body">
                <h4>{user?.displayName} <span className="text-black-50 small">@{user?.username}</span></h4>
                {
                    (editable && !editMode) &&
                    <button onClick={() => setEditMode(true)} className="btn btn-success d-inline-flex"><span
                        className="material-icons" style={{fontSize: 25}}>edit</span>Edit
                    </button>
                }
                {
                    (editable && editMode) &&
                    <>
                        <Input label="Profile Image" name="image" type="file"
                               onChange={onChangeFile} error={errors?.image}/>
                        <Input label="Display Name" name="displayName" defaultValue={user?.displayName}
                               onChange={(event) => setDisplayName(event.target.value)} error={errors?.displayName}/>
                        <div className="text-center">
                            <button disabled={isApiCall} onClick={() => setEditMode(false)}
                                    className="btn btn-danger d-inline-flex"><span
                                className="material-icons">cancel</span> Cancel
                            </button>
                            <ButtonWithProgress className="btn btn-success d-inline-flex ml-3 align-items-center" disabled={isApiCall}
                                                onClick={onSave} isApiCall={isApiCall}
                                                text={isApiCall ? "Save" : <><span
                                                    className="material-icons">save</span> Save</>}/>
                        </div>
                    </>

                }
            </div>
        </div>
    );
};

export default ProfileCard;