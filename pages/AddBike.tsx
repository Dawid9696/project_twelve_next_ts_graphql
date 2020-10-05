/** @format */

import Head from "next/head";
import React from "react";
import styled from "styled-components";

const AddBike: React.FC = () => {
	return (
		<React.Fragment>
			<Head>
				<title>ADD BIKE</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<AppAddBike>Dodaj rower</AppAddBike>;
		</React.Fragment>
	);
};

export default React.memo(AddBike);

const AppAddBike = styled.div`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: ${(props) => props.theme.colors.main};
`;
