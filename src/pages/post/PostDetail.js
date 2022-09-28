import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {createComment, getAllPostComment, getPostByID} from "../../api/apiCalls";
import PostListItem from "../../components/PostListItem";
import Spinner from "../../components/Spinner";
import Input from "../../components/Input";
import ButtonWithProgress from "../../components/ButtonWithProgress";
import {format} from "timeago.js";
import {useTranslation} from "react-i18next";
import ProfileImage from "../../components/ProfileImage";
import {toastSuccess} from "../../shared/notifyToast";

const PostDetail = () => {

    const params = useParams();
    const history = useHistory();
    const {i18n} = useTranslation();
    const pathPostID = params.postID;
    const [apiCall, setApiCall] = useState(false);
    const [commentApiCall, setCommentApiCall] = useState(false);
    const [post, setPost] = useState();
    const [errors, setErrors] = useState({});
    const [isFailure, setIsFailure] = useState({
        status: false,
        message: ""
    });
    const [commentList, setCommentList] = useState([]);
    const [context, setContext] = useState()

    useEffect(() => {
        const getCategory = async () => {
            setApiCall(true);
            try {
                const response = await getPostByID(pathPostID);
                setIsFailure(fail => ({...fail, status: false, message: ""}));
                setPost(response.data);
                const res = await getAllPostComment(response.data.id);
                setCommentList(res.data);
            } catch (error) {
                // history.push("/");
                if (error.response.data.status == 404)
                    setIsFailure(fail => ({...fail, status: true, message: error.response.data.message}));
                else
                    setIsFailure(fail => ({...fail, status: true, message: "Something went wrong"}));
            }
            setApiCall(false);
        }

        getCategory();
    }, []);

    useEffect(() => {
        setErrors(err => ({...err, context: undefined}));
    }, [context])

    if (apiCall) {
        return (
            <Spinner/>
        )
    }

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

    const saveComment = async () => {
        setCommentApiCall(true);
        try {
            const body = {
                context,
                postID: post?.id
            }
            const response = await createComment(body);
            setContext("");
            setCommentList(list => [response.data, ...list]);
        } catch (err) {
            if (err.response.data.validationErrors) {
                setErrors(err.response.data.validationErrors)
            }
        }
        setCommentApiCall(false);
    }

    const onPostDeleteSuccess = (id) => {
        toastSuccess("Post Deleted");
        history.push("/");
    }

    return (
        <div className="row">
            {
                (!apiCall && post && !isFailure.status) &&
                <>
                    <div className={commentList.length > 0 ? "col-12 col-md-6" : "col-12"}>
                        <PostListItem post={post} setPost={setPost} onPostDeleteSucces={onPostDeleteSuccess} isEditable={true}/>
                        {
                            !post.isResolved &&
                            <div>
                            <textarea className={errors.context ? "form-control is-invalid mb-3" : "form-control mb-3"}
                                      rows={10}
                                      value={context}
                                      onChange={(event) => {
                                          setContext(event.target.value);
                                      }}
                                      placeholder="Comment..."
                            />
                                <div className="invalid-feedback">{errors.context}</div>

                                <div className="text-right mb-3">
                                    <ButtonWithProgress disabled={commentApiCall} onClick={saveComment}
                                                        isApiCall={commentApiCall} text="Submit"/>
                                </div>
                            </div>
                        }
                    </div>
                    {
                        commentList.length > 0 &&
                        <div className="col-12 col-md-6">
                            {
                                commentList.map(com => (
                                    <div className="card mb-3" key={com.id}>
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 d-flex justify-content-between align-items-center">
                                                <Link to={`/user/${com.user.username}`}
                                                      className="text-body d-inline-flex align-items-center text-decoration-none">
                                                    <ProfileImage image={com.user.image} width={32} height={32} className="rounded-circle"/>
                                                    <h6 className="m-0 ml-1">{com.user.displayName} <span
                                                        className="text-black-50 small">@{com.user.username}</span></h6>
                                                </Link>
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{com.context}</p>
                                            <div className="text-right text-black-50">
                                                {format(com.date, i18n.language)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </>

            }
        </div>

    );
};

export default PostDetail;