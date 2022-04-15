import React from "react";
import { Typography, Box, Avatar, Fab } from "@mui/material";




export const UserInfo = ({ user }) => {
    const styleUserInfo = {
        textAlign: "end",
        marginRight: "15px",
        marginBottom: "15px",
    }

    return (
        <Box component="div" sx={{ display: "flex", justifyContent: "end" }}>
            <Box component="div" sx={styleUserInfo}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontSize: "1.25rem" }}
                >
                    {user.name && <span>{user.name} : {user.about}</span>}
                </Typography>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ fontSize: "0.875rem" }}
                >
                    {user.email && <span>{user.email}</span>}
                </Typography>
            </Box>
            <Box component="div">
                <Fab
                    size="small"
                    aria-label="add"
                    sx={{ position: "realtive", mr: "15px", mt: "10px" }}
                >
                    <Avatar
                        // sx={{ mr: "15px", mt: "10px" }}
                        src={user.avatar && user.avatar}
                        aria-label="recipe"
                        sx={{ position: "absolute" }}
                    >
                        {!user.avatar && user.name}
                    </Avatar>
                </Fab>
            </Box>
        </Box>

    );
};