import React from "react";
import { Button } from "@mui/material";
import style from './styles.module.css';


export const _Button = () => {
    function handleCreatePost(){
        console.log("Есть контакт");
    }
    
    return (
        <>
            <Button variant="contained" onClick={handleCreatePost}>Create post</Button>
        </>
    );
};
export default _Button;
