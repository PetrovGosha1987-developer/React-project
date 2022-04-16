import React from "react";
import { Post } from "../Post";
import { Grid } from "@mui/material";
import style from "./styles.module.css";


export const PostsList = ({ onPostLike, onDeletePost, postsData, pagination }) => {

    if(pagination){
        return <h2>Loading...</h2>
    }

    return (
        <div className={style["post-list"]}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 1, md: 2 }}>
                {postsData.map(({ __v, ...post }) => <Post key={post._id} {...post} onPostLike={onPostLike} onDeletePost={onDeletePost} />)}
            </Grid>
        </div>
    );
};