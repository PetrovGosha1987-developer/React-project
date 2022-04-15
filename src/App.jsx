import React, { useState, useEffect } from "react";
import api from './utils/Api';

import { CardHeader} from './components/Header';
import { UserInfo } from "./components/UserInfo";
import Breadcrumbs from "./components/Breadcrumbs";
import { UpperTextFirst } from "./components/UpperTextFirst";
import { TextSecond } from "./components/TextSecond";
import { ButtonCreatePost }  from "./components/ButtonCreatePost";
import { PostsList } from "./components/PostsList";
import Pagination from "./components/Pagination";
import { CardFooter } from "./components/Footer";


import { Container, Box, Typography } from "@mui/material";
import { Grid  } from '@mui/material';

export const App = () => { 
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getAllPosts(), api.getUserInfo()])
      .then(([postData, userData]) => {
        setPosts(postData);
        setCurrentUser(userData);
      })
  }, []);

  const handleUpdateUser = (userUpdate) => {
    api.setUserInfo(userUpdate)
      .then((newUserData) => {setCurrentUser(newUserData)})
  }

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

  return (
    <>
      <Container maxWidth="lg">
        <CardHeader user={currentUser} opUpdataUser={handleUpdateUser} />
        <UserInfo user={currentUser} />
        <Breadcrumbs />
        <UpperTextFirst />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSecond />
          <ButtonCreatePost user={currentUser} onSendPost={handleCreateNewPost}/>
        </Box>
        <PostsList postsData={posts} currentUser={currentUser} onPostLike={handlePostLike} onDeletePost={handleDeletePost} />
        <Pagination />
        <CardFooter />
      </Container>
    </>
  );
};