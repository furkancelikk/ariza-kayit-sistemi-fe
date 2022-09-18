import React, {useState} from 'react';
import ProfileImage from "./ProfileImage";
import {Link} from "react-router-dom";
import {format} from "timeago.js"
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {deletePost} from "../api/apiCalls";
import Modal from "./Modal";

const PostListItem = (props) => {
    const loggedUsername = useSelector(store => store.username);
    const {post, onPostDeleteSucces} = props;
    const {content, user, attachment} = post;
    const {i18n} = useTranslation();
    const formattedTime = format(post.timestamp, i18n.language);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteApiProgress, setDeleteApiProgress] = useState(false);

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

    return (
        <>
            <div className="card p-3">
                <div className="d-flex justify-content-between">
                    <Link to={`/user/${user.username}`}
                          className="text-body d-inline-flex align-items-center text-decoration-none">
                        <ProfileImage image={user.image} width={32} height={32} className="rounded-circle"/>
                        <h6 className="m-0 ml-1">{user.displayName} <span
                            className="text-black-50 small">@{user.username}</span></h6>
                    </Link>
                    {
                        loggedUsername === user?.username &&
                        <button onClick={() => setModalVisible(true)} className="btn btn-delete-link" style={{outline: "none"}}>
                            <span className="material-icons">delete</span>
                        </button>
                    }
                </div>
                <div className="container py-2">
                    <div className={attachment ? "row" : ""}>
                        <div className="col-12 mb-2">
                            {content}
                        </div>
                        {
                            attachment &&
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                {
                                    attachment.fileType?.startsWith("image") ?
                                        // style={{objectFit: "contain", height: "300px", width: "150px"}}
                                        <img className="img-fluid"
                                             src={`/images/attachment/${attachment.name}`} alt="attachment"/>
                                        :
                                        <span>Unknown file</span>
                                }
                            </div>
                        }
                    </div>
                    <div className="text-right text-black-50 mt-2">
                        {formattedTime}
                    </div>
                </div>
            </div>
            <Modal visible={modalVisible} onCancel={onDeleteCancel} onSubmit={onClickDelete} apiCall={deleteApiProgress}
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