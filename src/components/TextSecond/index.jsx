import React from "react";
import {  Box, Typography } from "@mui/material";


export const TextSecond = ({ }) => {

    return (
            <div>
                <Box>
                    <Typography
                        color="black"
                        sx={{ pl: 0, pt: 2 }}
                        paragraph
                        variant="h7">
                        We're stoked that you're here. 🥳
                    </Typography>
                </Box>
            </div>
    );
};
