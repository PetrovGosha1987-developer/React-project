import React, { useState } from "react";
import { postData } from "./posts";

import { CardHeader} from './components/Header';
import Breadcrumbs from "./components/Breadcrumbs";
import { UpperTextFirst } from "./components/UpperTextFirst";
import { TextSecond } from "./components/TextSecond";
import  ButtonCreatePost  from "./components/ButtonCreatePost";
import { PostsList } from "./components/PostsList";
import Pagination from "./components/Pagination";
import { CardFooter } from "./components/Footer";

import { Container, Box, Typography } from "@mui/material";
import { Grid  } from '@mui/material';

export const App = () => { 
  const [posts, setPosts] = useState(postData);

  const [amount, setAmount] = useState(postData.length);

  return (
    <>
      <Container maxWidth="lg">
        <CardHeader />
        <Breadcrumbs />
        <UpperTextFirst />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSecond />
          <ButtonCreatePost />
        </Box>
        <PostsList postsData={posts} />
        <Pagination />
        <CardFooter />
      </Container>
    </>
  );
};