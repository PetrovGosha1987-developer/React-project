import React from "react";
import {  Box, Typography } from "@mui/material";


export const UpperTextFirst = ({ }) => {

    return (
            <div>
                <Box>
                    <Typography
                        color="black"
                        sx={{ pl: 1, pt: 2, mb: 0 }}
                        paragraph
                        variant="h6">
                        Welcome to Our Image Board!
                    </Typography>
                </Box>
            </div>
    );
};
