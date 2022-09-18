import React, {useEffect, useState} from 'react';
import {getNewPostCount, getNewPosts, getOldPosts, getPosts} from "../api/apiCalls";
import PostListItem from "../components/PostListItem";
import Spinner from "../components/Spinner";
import {useParams} from "react-router-dom";

const PostList = (props) => {
    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0,
        last: true
    });
    const [isApiCall, setIsApiCall] = useState(false);
    const [newPostApiCall, setNewPostApiCall] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [newPostCount, setNewPostCount] = useState(0);
    const {username} = props;


    let firstPostID = 0;
    if (page.content.length > 0){
        firstPostID = page.content[0].id;
    }

    const loadPosts = async (number = 0, size = 5) => {
        setIsApiCall(true);
        setIsFailure(false);
        try {
            const response = await getPosts(username, number, size);
            // setPage(prevPage => ({
            //     ...response.data,
            //     content: [...prevPage.content, ...response.data.content]
            // }));
            setPage(response.data);
        } catch (error) {
            setIsFailure(true);
        }
        setIsApiCall(false);
    }

    const loadOldPosts = async () => {
        setIsApiCall(true);
        setIsFailure(false);
        const lastPostIndex = page.content.length - 1;
        const lastPostID = page.content[lastPostIndex].id;

        try {
            const response = await getOldPosts(username, lastPostID);
            setPage(prevPage => ({
                ...response.data,
                content: [...prevPage.content, ...response.data.content]
            }));
        } catch (error) {
            setIsFailure(true);
        }
        setIsApiCall(false);
    }

    const loadNewPosts = async () => {
        setNewPostApiCall(true);
        setIsFailure(false);
        try {
            const response = await getNewPosts(username, firstPostID);
            setPage(prevPage => ({
                ...prevPage,
                content: [...response.data, ...prevPage.content]
            }));
        } catch (error) {
            setIsFailure(true);
        }
        setNewPostApiCall(false);
        setNewPostCount(0);
    }



    useEffect(() => {
        loadPosts();
    }, []);

    // 5 saniyede bir yeni post atılmış mı kontrol eder
    useEffect(() => {
        const getCount = async () => {
            const response = await getNewPostCount(username, firstPostID);
            setNewPostCount(response.data.count);
        }

        let looper = setInterval(getCount, 5000);

        return function cleanUp(){
            clearInterval(looper);
        }
    }, [firstPostID]);

    const onPostDeleteSuccess = (id) => {
        setPage(prevState => ({
            ...prevState,
            content: prevState.content.filter(item => item.id !== id)
        }))
    }

    return (
        <div className="mt-3">
            <h5>Posts</h5>
            {
                page.content.length < 1 &&
                <div className="alert alert-secondary text-center">
                    {isApiCall ? <Spinner/> : "There are no posts"}
                </div>
            }
            {
                newPostCount !== 0 &&
                <div onClick={newPostApiCall ? () => {} : loadNewPosts} style={{cursor: "pointer"}} className="alert alert-secondary text-center mt-1">
                    {
                        newPostApiCall ? <Spinner/> : `There are ${newPostCount} new post${newPostCount > 1 ? "s" : ""}...`
                    }
                </div>
            }

            <div>
                {page.content.map((post, index) => (
                    <PostListItem post={post} key={index} onPostDeleteSucces={onPostDeleteSuccess}/>
                ))}
            </div>
            {
                !page.last &&
                <div onClick={isApiCall ? () => {} : loadOldPosts} style={{cursor: "pointer"}} className="alert alert-secondary text-center mt-1">
                    {
                        isApiCall ? <Spinner/> : "Load more..."
                    }
                </div>
            }
        </div>
    );
};

export default PostList;