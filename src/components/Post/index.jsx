import React, {  useState, useEffect, useRef} from "react";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, Grid, Box, SvgIcon, MenuItem, Paper, MenuList, Popper, Grow, ClickAwayListener } from '@mui/material';
import { Favorite, MoreHoriz, ExpandMore, PanoramaFishEye, DeleteOutline, CreateOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import dayjs from "dayjs";
import 'dayjs/locale/ru';

import style from './styles.module.css';
dayjs.locale('ru')


const ExpandMoreStyle = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
  }));

  export const Post = ({ onPostLike, onDeletePost, currentUser, _id, image, likes, tags, comments, title, author: { avatar, name, email }, text, created_at, updated_at }) => {
    const dataCreated = dayjs(created_at).format("DD-MM-YYYY HH:mm");
    const dataLastEdit = dayjs(updated_at).format("dddd, DD-MMMM-YYYY HH:mm");
    const isLiked = likes.some(id => id === currentUser._id);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleMoreHoriz = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseMoreHoriz = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDownMoreHoriz(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleLikeClick() {
        onPostLike({ _id, likes })
    }
    function handleDeletePostClick() {
        onDeletePost(_id);
    }
    return (
        <Grid className={style.grid} container item xs={12} sm={6} md={4}>
            <Card className={style.card} sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar src={avatar && avatar} aria-label="recipe">
                            {!avatar && name.slice(0, 1)}
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleMoreHoriz}
                            >
                                <MoreHoriz />
                            </IconButton>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseMoreHoriz}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDownMoreHoriz}
                                                >
                                                    <MenuItem onClick={handleDeletePostClick}>
                                                        <DeleteOutline sx={{ mr: "2px", mb: "5px" }} />
                                                        Delete
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <CreateOutlined sx={{ mr: "2px", mb: "5px" }} />
                                                        Edit
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    }

                    title={
                        <Typography variant="body1">
                            {name}
                        </Typography>
                    }
                    subheader={email}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="body2" noWrap color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>

                <CardActions sx={{ marginTop: "auto" }} disableSpacing >
                    {likes.length
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
                            {!!likes.length && <Typography color="text.secondary" sx={{ fontSize: "1.25rem", pr: 1.7, pt: 0.6, pl: 0.3 }}>{likes.length}</Typography>}
                        </Box>
                        : <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                            <SvgIcon>
                                {isLiked
                                    ? <Favorite sx={{ color: "red" }} />
                                    : <Favorite />}
                            </SvgIcon>
                        </IconButton>
                    }
                    <ExpandMoreStyle
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-label="show more"
                    >
                        <ExpandMore />
                    </ExpandMoreStyle>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {text}
                        </Typography>
                    </CardContent>
                </Collapse>
                <Box component="div" sx={{ pl: 2, pt: 2 }}>
                    <Typography sx={{ pl: 0, mb: 2 }} paragraph variant="caption" color="text.secondary">
                        Tags: {tags.map((item) =>
                            <Box
                                key={item}
                                component="span"
                                sx={{
                                    ml: 1,
                                    p: 0.5,
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    borderRadius: "5px",
                                    background: "#f7f7f7"
                                }}>
                                {item}
                            </Box>)}
                    </Typography>
                </Box>
                <Box component="span" sx={{ pl: 2, display: "flex" }}>
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
                <Box component="span" sx={{ pl: 2, display: "flex" }}>
                    <PanoramaFishEye sx={{ color: "red", fontSize: "small", mt: 0.2 }} />
                    <Typography
                        sx={{ pl: 1 }}
                        paragraph
                        variant="caption"
                        color="text.secondary"
                    >
                        Last edit: {dataLastEdit}
                    </Typography>
                </Box>
            </Card>
        </Grid>
    );
};