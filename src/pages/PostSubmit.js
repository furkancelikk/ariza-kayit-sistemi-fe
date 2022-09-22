import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import ProfileImage from "../components/ProfileImage";
import {Link} from "react-router-dom";
import {createFaultRecord, postAttachment} from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import {fa, tr} from "timeago.js/lib/lang";
import AutoUploadImage from "../components/AutoUploadImage";

const PostSubmit = () => {

    const {image, displayName, isLogged, username} = useSelector(store => ({
        image: store.image,
        displayName: store.displayName,
        isLogged: store.isLogged,
        username: store.username
    }));

    const [newImage, setNewImage] = useState();
    const [attachmentID, setAttachmentID] = useState();
    const [isFocused, setIsFocused] = useState(false);
    const [isApiCall, setIsApiCall] = useState(false);
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isFocused) {
            setContent("");
            setNewImage(null);
            setAttachmentID(null);
        }
    }, [isFocused])

    useEffect(() => {
        setErrors({});
    }, [content])


    const handleClickSave = async () => {
        setIsApiCall(true);
        const post = {
            content,
            attachmentID
        };
        try {
            const response = await createFaultRecord(post);
            setIsFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
        setIsApiCall(false);
    }

    const uploadFile = async (file) => {
        setFileUploadProgress(true);
        const attachment = new FormData();
        attachment.append("file", file);
        try {
            const response = await postAttachment(attachment);
            setAttachmentID(response.data.id);
        } catch (error) {

        }
        setFileUploadProgress(false);
    }

    const onChangeFile = (event) => {
        setErrors(err => ({...err, image: undefined}));
        if (event.target.files.length < 1) {
            setNewImage(null);
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className="card p-2 mb-4">
            <div className="mb-2">
                <Link className="d-inline-flex align-items-center text-body text-decoration-none"
                      to={"user/" + username}>
                    <ProfileImage image={image} width={32} height={32} className="rounded-circle"/>
                    <p className="m-0 ml-1">{displayName} <span className="text-black-50 small">@{username}</span></p>
                </Link>
            </div>
            <textarea className={errors.content ? "form-control is-invalid" : "form-control"} rows={isFocused ? 5 : 1}
                      onFocus={() => setIsFocused(true)}
                      value={content}
                      onChange={(event) => {
                          setContent(event.target.value);
                          // event.target.style.height = event.target.scrollHeight+"px";
                      }}
                // style={{height: "min-content"}}
            />

            <div className="invalid-feedback">{errors.content}</div>
            {isFocused &&
                <>
                    {/*label="Choose Image"*/}
                    <Input error={errors?.image} name="image" onChange={onChangeFile} type="file"/>
                    {
                        newImage &&
                        <AutoUploadImage image={newImage} uploading={fileUploadProgress}/>
                        // <img src={newImage} alt="attachment" className="img-thumbnail" />
                    }
                    <div className="text-right mt-2">
                        <button disabled={isApiCall || fileUploadProgress} onClick={() => setIsFocused(false)}
                                className="btn btn-danger d-inline-flex"><span
                            className="material-icons">cancel</span>Cancel
                        </button>
                        <ButtonWithProgress className="btn btn-info d-inline-flex ml-2 align-items-center"
                                            disabled={isApiCall || fileUploadProgress}
                                            onClick={handleClickSave} isApiCall={isApiCall}
                                            text={isApiCall ? "Save" : <><span
                                                className="material-icons">save</span> Submit</>}/>
                    </div>
                </>
            }
        </div>
    );
};

export default PostSubmit;