/** @format */

import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";

const BIKES = gql`
	query bikes($queries: QueryAllBikesInput) {
		bikes(queries: $queries) {
			id
			bikeName
			bikeModel
			bikeFrame
			bikeColor
			bikeYear
			bikeType
			bikePrice
			bikeTransport
			bikePhotos
			bikeSale
			bikeSaleNewPrice
		}
	}
`;

const Home: React.FC = () => {
	const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery(BIKES, {
		variables: {
			queries: {
				skip: 0,
				limit: 5,
				lowPrice: 0,
				sort: -1,
				highPrice: 20000,
			},
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "cache-and-network",
	});

	return (
		<React.Fragment>
			<Head>
				<title>SSR</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Shop>
				<Filter></Filter>
				<ShopContent></ShopContent>
			</Shop>
		</React.Fragment>
	);
};

export default Home;

const Shop = styled.section`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Filter = styled.section`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const ShopContent = styled.section`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
