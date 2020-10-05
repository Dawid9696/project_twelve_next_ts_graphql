/** @format */

import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { BikeProps } from "../pages/index";

type BikeProp = { bike: BikeProps };

const BikeCard: React.FC<BikeProp> = ({ bike }) => {
	return (
		<AppBikeCard>
			<Link as={`/Bike/${bike.id}`} href='/Bike/[Bike]'>
				{bike.bikeName}
			</Link>
		</AppBikeCard>
	);
};

export default React.memo(BikeCard);

const AppBikeCard = styled.div`
	margin: 10px;
	padding: 10px;
	box-sizing: border-box;
	width: 60vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	color: ${(props) => props.theme.colors.main};
	background-color: ${(props) => props.theme.backgroundColor2};
`;
