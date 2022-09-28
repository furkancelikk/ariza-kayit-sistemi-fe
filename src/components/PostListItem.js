import React, {useState} from 'react';
import ProfileImage from "./ProfileImage";
import {Link, useHistory} from "react-router-dom";
import {format} from "timeago.js"
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {deletePost, postUpdate} from "../api/apiCalls";
import Modal from "./Modal";
import {toastError, toastSuccess} from "../shared/notifyToast";
import ButtonWithProgress from "./ButtonWithProgress";

const PostListItem = (props) => {
    const loggedUsername = useSelector(store => store.username);
    const {post, setPost, onPostDeleteSucces, isEditable} = props;
    const {content, user, attachment} = post;
    const {i18n} = useTranslation();
    const history = useHistory();
    const formattedTime = format(post.timestamp, i18n.language);
    const [modalVisible, setModalVisible] = useState(false);
    const [isResolved, setIsResolved] = useState(false);
    const [deleteApiProgress, setDeleteApiProgress] = useState(false);
    const [updateApiProgress, setUpdateApiProgress] = useState(false);

    const onClickDelete = async () => {
        setDeleteApiProgress(true);
        const response = await deletePost(post.id);
        onPostDeleteSucces(post.id);
        setDeleteApiProgress(false);
        setModalVisible(false);
    }

    const onDeleteCancel = () => {
        setModalVisible(false);
    }

    const toPostDetail = () => {
        history.push(`/post/${post.id}`)
    }

    const updatePost = async () => {
        setUpdateApiProgress(true);
        try {
            const response = await postUpdate({id: post.id, isResolved});
            setPost(response.data);
            toastSuccess("Post Updated");
        }catch (error) {
            toastError("Something went wrong");
        }
        setUpdateApiProgress(false);
    }

    const onChange = (event) => {
        if (isEditable){
            setIsResolved(event.target.checked);
        }
    }

    return (
        <>
            <div className="card mb-3 p-3 post-item-card" >
                <div className="row no-gutters">

                    {
                        attachment &&
                        <div className="col-md-4 mb-3" onClick={toPostDetail} style={{cursor: "pointer"}}>
                            {/*<img src="..." className="card-img" alt="..." />*/}
                            <img className="card-img" src={`/images/attachment/${attachment?.name}`} alt="attachment"/>
                        </div>
                    }
                    <div className={attachment ? "col-md-8 d-flex flex-column pl-2" : "col-md-12 d-flex flex-column"}>

                        <div className="card-header">
                            <h5 className="card-title mb-0 d-flex justify-content-between align-items-center">
                                <Link to={`/user/${user.username}`}
                                      className="text-body d-inline-flex align-items-center text-decoration-none">
                                    <ProfileImage image={user.image} width={32} height={32} className="rounded-circle"/>
                                    <h6 className="m-0 ml-1">{user.displayName} <span
                                        className="text-black-50 small">@{user.username}</span></h6>
                                </Link>
                                {
                                    loggedUsername === user?.username &&
                                    <button onClick={() => setModalVisible(true)} className="btn btn-delete-link small" style={{outline: "none"}}>
                                        <span className="material-icons">delete</span>
                                    </button>
                                }
                            </h5>
                        </div>
                        <div className="card-body pl-0 post-item-content d-flex flex-column" onClick={toPostDetail}>

                            <p className="card-text flex-grow-1">
                                {content}
                            </p>
                            <div className="text-right">
                                <p className="card-text">
                                    <div className="d-flex justify-content-between flex-wrap text-muted">
                                        {
                                            post.isResolved &&
                                            <span className="d-flex align-items-center"><span className="material-icons text-success">check_circle</span>Resolved</span>
                                        }
                                        {
                                            (!post.isResolved && isEditable) &&
                                            <div className="text-body d-flex align-items-center flex-wrap">
                                                <div className="form-check mr-3" style={{fontSize: "1.1em"}}>
                                                    <input className="form-check-input text-success" type="checkbox" value={post.isResolved}
                                                           id="isResolved"
                                                           name="isResolved"
                                                           onChange={onChange}
                                                           style={{height: "1em", width: "1em"}}
                                                    />
                                                    <label className="form-check-label" htmlFor="isResolved">
                                                        Resolved
                                                    </label>
                                                </div>
                                                <ButtonWithProgress disabled={updateApiProgress} onClick={updatePost} isApiCall={updateApiProgress} text="Submit"/>
                                                {/*<button className="btn btn-primary">Submit</button>*/}
                                            </div>
                                        }
                                        <span>{formattedTime}</span>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*ESKİ */}
            {/*<div className="card p-3">*/}
            {/*    <div className="d-flex justify-content-between">*/}
            {/*        <Link to={`/user/${user.username}`}*/}
            {/*              className="text-body d-inline-flex align-items-center text-decoration-none">*/}
            {/*            <ProfileImage image={user.image} width={32} height={32} className="rounded-circle"/>*/}
            {/*            <h6 className="m-0 ml-1">{user.displayName} <span*/}
            {/*                className="text-black-50 small">@{user.username}</span></h6>*/}
            {/*        </Link>*/}
            {/*        {*/}
            {/*            loggedUsername === user?.username &&*/}
            {/*            <button onClick={() => setModalVisible(true)} className="btn btn-delete-link" style={{outline: "none"}}>*/}
            {/*                <span className="material-icons">delete</span>*/}
            {/*            </button>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <div className="container py-2">*/}

            {/*        <div className={attachment ? "row" : ""}>*/}
            {/*            <div className="col-12 mb-2">*/}
            {/*                {content}*/}
            {/*            </div>*/}
            {/*            {*/}
            {/*                attachment &&*/}
            {/*                <div className="col-12 d-flex align-items-center justify-content-center">*/}
            {/*                    {*/}
            {/*                        attachment.fileType?.startsWith("image") ?*/}
            {/*                            // style={{objectFit: "contain", height: "300px", width: "150px"}}*/}
            {/*                            <img className="img-fluid"*/}
            {/*                                 src={`/images/attachment/${attachment.name}`} alt="attachment"/>*/}
            {/*                            :*/}
            {/*                            <span>Unknown file</span>*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div className="text-right text-black-50 mt-2">*/}
            {/*            {formattedTime}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Modal title="Delete Post" visible={modalVisible} onCancel={onDeleteCancel} onSubmit={onClickDelete} apiCall={deleteApiProgress}
                   submitText="Delete" submitBtnClass="btn-danger"
                   message={
                       <div className="word-wrap">
                           <div className="font-weight-bold">
                               Are you sure to delete post?
                           </div>
                           <span>{content}</span>
                           {
                               (attachment && attachment?.fileType?.startsWith("image")) &&
                               <div>
                                   <img src={`/images/attachment/${attachment.name}`} alt="attachment"
                                        className="img-fluid"/>
                               </div>
                           }
                       </div>
                   }
            />
        </>
    );
};

export default PostListItem;