import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Modal } from "@mui/material";
import style from './styles.module.css';


export const ButtonCreatePost = ( onSendPost ) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dataNewPost, setDataNewPost] = useState({
        image: "",
        title: "",
        text: "",
        tags: []
    });
    
    const updateDataNewPost = (e) => {
        e.target.name == "tags"
            ? setDataNewPost({
                ...dataNewPost,
                [e.target.name]: e.target.value.split(",")
            })
            : setDataNewPost({
                ...dataNewPost,
                [e.target.name]: e.target.value
            })
    } // при вводе в инпут данные попадают в объект

    const handleSendPostSubmitClick = (e) => {
        e.preventDefault();
        if (dataNewPost.title !== "" && dataNewPost.text !== "") {
            onSendPost(dataNewPost);
            handleClose();
        } else {
            alert("Заполните обязательные поля");
        }
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }

    return (
            <div>
                <Button style={{ paddingRight: 15 }}
                    variant="contained"
                    sx={{ display: "flex" }}
                    onClick={handleOpen}
                >Create post
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        onSubmit={handleSendPostSubmitClick}
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={styleModal}
                    >
                        <Box>
                            <TextField
                                onChange={updateDataNewPost}
                                required
                                multiline
                                name="image"
                                label="Image URL"
                                variant="outlined"
                                sx={{ '& > :not(style)': { m: 1, width: '47ch' } }}
                            />
                            <TextField
                                onChange={updateDataNewPost}
                                required
                                multiline
                                rows={4}
                                name="title"
                                label="Title"
                                variant="outlined"
                                sx={{ '& > :not(style)': { m: 1, width: '47ch' } }}
                            />
                            <TextField
                                onChange={updateDataNewPost}
                                required
                                multiline
                                rows={7}
                                name="text"
                                label="Text"
                                variant="outlined"
                                sx={{ '& > :not(style)': { m: 1, width: '47ch' } }}
                            />
                            <TextField
                                onChange={updateDataNewPost}
                                name="tags"
                                label="Tags"
                                variant="outlined"
                                sx={{ '& > :not(style)': { m: 1, width: '47ch' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ p: 2, m: 1, width: '54ch' }}
                            >Send post
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
    );
};
