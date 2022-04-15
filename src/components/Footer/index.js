import React from "react";
import './styles.css';
import logo from './img/logo.svg'

export const CardFooter = () => {
	return (
		<footer className="footer">
			<div className="container">
				<img src={logo} alt="логотип" className='logo-icon' />
				Design ©2022 Created by PetrovGosha
				<img src={logo} alt="логотип" className='logo-icon' />
			</div>
		</footer >
	);
};

