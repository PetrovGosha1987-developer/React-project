import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import style from './styles.module.css';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const _Breadcrumbs = () => {
    const tr = ' ';
    return (
        <div>
            <p/>
                <Link color="inherit" href="/"> HOME
                </Link>
                {tr} / {tr}
                <Link color="inherit" href="/"> All Posts
                </Link>
        </div>
    );
}

export default _Breadcrumbs;