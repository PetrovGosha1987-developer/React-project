import React, { useState } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";

import style from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const _Pagination = () => {

    return (
        <div className={style.listing} >
            <Stack spacing={2}>
                <Pagination
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </div >

    );
};
export default _Pagination;