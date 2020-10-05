/** @format */

import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

const Navbar: React.FC = () => {
	return (
		<AppNavbar>
			<Link href={"/"}>Shop</Link>
		</AppNavbar>
	);
};

export default Navbar;

const AppNavbar = styled.div`
	margin: 0px;
	padding: 15px;
	box-sizing: border-box;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	color: ${(props) => props.theme.colors.main};
	background-color: ${(props) => props.theme.backgroundColor2};
`;
