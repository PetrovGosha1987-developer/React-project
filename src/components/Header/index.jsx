import React from 'react';
import AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logoHeader from './img/logoHeader.svg'
import cat from './img/cat.svg'

import style from './styles.module.css';

export const CardHeader = ({childer, user}) => { 
  

  return (
    <AppBar position="static" style={{ background: '#ffffff' }}>
    <Toolbar>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
      <a href="https://react-learning.ru/">Remix</a>
      <img src={logoHeader} alt="голова" className='logo-header' />
      </Typography>
      <img src={cat} alt="кот" className='logo-header' />
      <a href="https://learn-reactjs.ru/home">Home</a>
      <a href="https://remix.run/docs/en/v1">Remix Docs</a>
      <a href="https://github.com/PetrovGosha1987-developer">GitHub</a>
    </Toolbar>
  </AppBar>
  );  
};