import React, { useState } from "react";
import { Box } from "@mui/material";
import { UpperTextFirst } from "../../components/UpperTextFirst";
import { TextSecond } from "../../components/TextSecond";
import { ButtonCreatePost }  from "../../components/ButtonCreatePost";
import { PostsList } from "../../components/PostsList";
import Pagination from "../../components/Pagination";
import { SceletonLoading } from "../../components/Sceleton";

export const PostsPage = ({isLoading, onSendPost, pagination, postsData, onPostLike, onDeletePost, paginate, prevPage, nextPage,totalPosts, postsPerPage }) => {
    const [posts, setPosts] = useState([]);

    const styleUserInfo = {
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        marginBottom: "10px",
        marginRight: "15px",
    }

    return (
        <>
            {isLoading
                ? <SceletonLoading />
                : <Box >
                    <PostsList
                        pagination={pagination}
                        postsData={postsData}
                        onPostLike={onPostLike}
                        onDeletePost={onDeletePost}
                    />
                    <Pagination
                        paginate={paginate}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        totalPosts={totalPosts}
                        postsPerPage={postsPerPage}
                    />
                    </Box>
            }
        </>
    );
}; 