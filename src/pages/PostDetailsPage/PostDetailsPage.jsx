import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/Api";
import { UserPost } from "../../components/UserPost";
import Spinner from "../../components/Spinner";
import dayjs from "dayjs"; // yarn add dayjs
import "dayjs/locale/ru";
dayjs.locale("ru");

export const PostDetailsPage = ({ isLoading, currentUser, onPostLike }) => {

    const [posts, setPosts] = useState([]);
    const { _id, image, likes, tags, comments, title, author, text, created_at, updated_at } = posts;
    const dataCreated = dayjs(created_at).format("DD-MM-YYYY HH:mm");
    const dataLastEdit = dayjs(updated_at).format("dddd, DD-MMMM-YYYY HH:mm");

    const { postID } = useParams();


    useEffect(() => {
        api.getPostById(postID)
            .then((postData) => {
                setPosts(postData);
            })
    }, [])

    return (
        <>
            {isLoading
                ? <Spinner />
                : <UserPost {...posts} currentUser={currentUser} onPostLike={onPostLike}/>
            }
        </>
    );
}; 