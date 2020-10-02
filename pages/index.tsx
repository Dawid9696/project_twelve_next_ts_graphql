/** @format */

import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
import Head from "next/head";
import styled from "styled-components";

const BIKES = gql`
	query bikes($skip: Int!, $limit: Int!) {
		bikes(skip: $skip, limit: $limit) {
			id
			bikeName
			bikeModel
		}
	}
`;

const Home = () => {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(BIKES, {
		variables: {
			skip: 0,
			limit: 20,
		},
		notifyOnNetworkStatusChange: true,
	});

	console.log(data);

	return (
		<React.Fragment>
			<Head>
				<title>SSR</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Shop>
				<Filter></Filter>
				<ShopContent>fgdf</ShopContent>
			</Shop>
		</React.Fragment>
	);
};

export default Home;

export async function getStaticProps() {
	// const reduxStore = initializeStore()
	const apolloClient = initializeApollo();
	// const { dispatch } = reduxStore

	// dispatch({
	//   type: 'TICK',
	//   light: true,
	//   lastUpdate: Date.now(),
	// })

	await apolloClient.query({
		query: BIKES,
		variables: {
			skip: 0,
			limit: 10,
		},
	});

	return {
		props: {
			// initialReduxState: reduxStore.getState(),
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
}

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
