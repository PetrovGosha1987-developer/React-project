import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { CurrentUserContext } from './context/CurrentUserContext';
import { CurrentPostsContext } from "./context/CurrentPostsContext";
import api from "./utils/Api";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";
import { CardHeader } from "./components/Header";
import { TextSecond } from "./components/TextSecond";
import { UpperTextFirst } from "./components/UpperTextFirst";
import { ButtonCreatePost } from "./components/ButtonCreatePost";
import Breadcrumbs from "./components/Breadcrumbs";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { PostDetailsPage } from "./pages/PostDetailsPage/PostDetailsPage";
import { CardFooter } from "./components/Footer";
import { UserInfo } from "./components/UserInfo";

const theme = createTheme({
    palette: {
        primary: {
            main: "#444444",
        },
        secondary: {
            main: "#ff2626",
        },
    }
})

export const App = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // пагинация----------------------------------------------------------------
    const [pagination, setPagination] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9); // количество постов на страницу
    const lastPostsIndex = currentPage * postsPerPage;
    const firstPostsIndex = lastPostsIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostsIndex, lastPostsIndex);
    const endPage = Math.ceil(posts.length / postsPerPage);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const prevPage = () => setCurrentPage(prev => {
        if (prev === 1) {
            return prev;
        }
        return prev - 1;
    });
    const nextPage = () => setCurrentPage(next => {
        if (next === endPage) {
            return next;
        }
        return next + 1;
    });
    //--------------------------------------------------------------------------

    useEffect(() => {
        setIsLoading(true);
        setPagination(true);
        Promise.all([api.getAllPosts(), api.getUserInfo()])
            .then(([postsData, userData]) => {
                setPosts(postsData);
                setCurrentUser(userData);
                // setPostID(postData);
            })
            .catch(err => alert(err))
            .finally(() => {
                setTimeout(() => setIsLoading(false), 1000);
                setPagination(false);
            })
    }, []);

    function handlePostLike({ _id, likes }) {
        const isLiked = likes.some(id => id === currentUser._id);
        api.changeLikeStatus(_id, isLiked)
            .then((newPost) => {
                const newPostState = posts.map(post => {
                    return post._id === newPost._id ? newPost : post;
                })
                setPosts(newPostState);
            })
    }

    function handleCreateNewPost(userData) {
        api.createNewPost(userData)
            .then((newPostData) => {
                setPosts(prevState => [...prevState, newPostData])
            })
    }

    function handleDeletePost(postId) {
        api.deletePostById(postId)
            .then((newPostData) => {
                const newPostState = posts.filter(post => {
                    return post._id !== newPostData._id;
                })
                setPosts(newPostState);
            })
    }

    function handleSendNewAvatar(dataAvatar) {
        api.changeAvatar(dataAvatar)
            .then((newDataAvatar) => {
                setCurrentUser(newDataAvatar);
            })
    }

    return (
        <CurrentPostsContext.Provider value={{ posts }}>
            <CurrentUserContext.Provider value={currentUser}>
                <ThemeProvider theme={theme}>
                    <Container maxWidth="lg"
                        sx={{
                            display: "flex",
                            minHeight: "100vh",
                            flexDirection: "column",
                        }}>
                        <CardHeader />
                        <UserInfo user={currentUser} />
                        <Breadcrumbs/>
                        <UpperTextFirst />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextSecond />
                            <ButtonCreatePost user={currentUser} onSendPost={handleCreateNewPost} />
                        </Box>
                        <Box sx={{ flex: "1 0 auto" }}>
                            <Routes>
                                <Route path="/" element={
                                    <PostsPage
                                        paginate={paginate}
                                        prevPage={prevPage}
                                        nextPage={nextPage}
                                        isLoading={isLoading}
                                        pagination={pagination}
                                        postsData={currentPosts}
                                        totalPosts={posts.length}
                                        postsPerPage={postsPerPage}
                                        onPostLike={handlePostLike}
                                        onDeletePost={handleDeletePost}
                                        onSendPost={handleCreateNewPost}
                                    />
                                } />
                                <Route path="/post/:postID" element={
                                    <PostDetailsPage
                                        // postData={postID}
                                        isLoading={isLoading}
                                        currentUser={currentUser}
                                        onPostLike={handlePostLike}
                                    />
                                } />
                                <Route path="*" element={
                                    <Typography sx={{ textAlign: "center", fontSize: "50px" }}>404 Error: Страница не найдена</Typography>
                                } />
                            </Routes>
                        </Box>
                        <CardFooter />
                    </Container>
                </ThemeProvider>
            </CurrentUserContext.Provider>
        </CurrentPostsContext.Provider>
    );
}; 