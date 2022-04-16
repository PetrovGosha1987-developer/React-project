import React from "react";
import { Typography, Box, Avatar, CardMedia, CardActions, SvgIcon, IconButton } from "@mui/material";
import { Favorite, ExpandMore, PanoramaFishEye } from '@mui/icons-material';
import dayjs from "dayjs"; // yarn add dayjs
import "dayjs/locale/ru";
dayjs.locale("ru");








export const UserPost = ({ onPostLike, currentUser, _id, likes, author, text, title, image, tags, created_at, updated_at }) => {

    const isLiked = likes && likes.some(id => id === currentUser._id);
    const dataCreated = dayjs(created_at).format("DD-MM-YYYY HH:mm");
    const dataLastEdit = dayjs(updated_at).format("dddd, DD-MMMM-YYYY HH:mm");

    function handleLikeClick() {
        onPostLike({ _id, likes })
    }

    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Box sx={{ pl: 15 }}>
                    <Box component="div" sx={{ display: "flex", mb: 3 }}>
                        <Box sx={{ mr: "20px" }}>
                            <Avatar
                                src={author?.avatar && author.avatar}
                                aria-label="recipe"
                                sx={{ width: "100px", height: "100px" }}
                            >
                                {!author?.avatar && author?.name}
                            </Avatar>
                        </Box>
                        <Box>
                            <Box component="div">
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ fontSize: "1.2rem" }}
                                >
                                    {author?.name && <span>{author.name}</span>}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    sx={{ fontSize: "0.9rem", mb: 1 }}
                                >
                                    {author?.email && <span>{author.email}</span>}
                                </Typography>
                            </Box>
                            <Box>
                                <Box component="div" sx={{ display: "flex" }}>
                                    <PanoramaFishEye sx={{ color: "green", fontSize: "small", mt: 0.3 }} />
                                    <Typography
                                        sx={{ pl: 1, mb: 0.5 }}
                                        paragraph
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Created: {dataCreated}
                                    </Typography>
                                </Box>
                                <Box component="div" sx={{ display: "flex" }}>
                                    <PanoramaFishEye sx={{ color: "red", fontSize: "small", mt: 0.2 }} />
                                    <Typography
                                        sx={{ pl: 1, mb: 0 }}
                                        paragraph
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Last edit: {dataLastEdit}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <hr></hr>
                </Box>
                <Box sx={{ pl: 30 }}>
                    <Box component="div" sx={{ maxWidth: 800, mb: 1 }}>
                        <Typography variant="h6" color="text.secondary" >
                            {title}
                        </Typography>
                    </Box>
                    <Box component="div" sx={{ mr: "60px", mb: 2 }}>
                        <CardMedia
                            component="img"
                            image={image}
                            alt="Paella dish"
                        />
                    </Box>
                    <Box component="div" sx={{ maxWidth: 800, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                    </Box>
                    <Box sx={{pl: 2}}>
                        <CardActions sx={{ marginTop: "auto" }} disableSpacing >
                            {likes?.length
                                ? <Box
                                    component="span"
                                    sx={{
                                        display: "flex",
                                        background: "#f7f7f7",
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: "25px",
                                    }}>
                                    <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                                        <SvgIcon>
                                            {isLiked
                                                ? <Favorite sx={{ color: "red" }} />
                                                : <Favorite />}
                                        </SvgIcon>
                                    </IconButton>
                                    {!!likes?.length && <Typography color="text.secondary" sx={{ fontSize: "1.25rem", pr: 1.7, pt: 0.6, pl: 0.3 }}>{likes?.length}</Typography>}
                                </Box>
                                : <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                                    <SvgIcon>
                                        {isLiked
                                            ? <Favorite sx={{ color: "red" }} />
                                            : <Favorite />}
                                    </SvgIcon>
                                </IconButton>
                            }
                        </CardActions>
                    </Box>
                    <Box component="div" sx={{ pl: 3.3, pt: 2, mb: 2 }}>
                        <Typography
                            paragraph
                            variant="caption"
                            color="text.secondary"
                        >
                            Tags: {tags?.map((tag) =>
                                <Box
                                    key={tag}
                                    component="span"
                                    sx={{
                                        ml: 1,
                                        p: 0.5,
                                        border: "1px solid rgba(0, 0, 0, 0.1)",
                                        borderRadius: "5px",
                                        background: "#f7f7f7"
                                    }}>
                                    {tag}
                                </Box>)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}; 