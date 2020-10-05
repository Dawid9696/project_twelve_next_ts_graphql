/** @format */

import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

//IMPORTS
import BikeCard from "../components/BikeCard";

export interface BikeProps {
	id: string;
	bikeModel: string;
	bikeName: string;
	bikePhotos: [string];
	bikePrice: number;
	bikeSale: boolean;
}

const BIKES = gql`
	query bikes($skip: Int!, $limit: Int!) {
		bikes(skip: $skip, limit: $limit) {
			id
			bikeName
			bikeModel
			bikePrice
			bikePhotos
			bikeSale
		}
	}
`;

const Home: React.FC = () => {
	const [limit, setLimit] = useState(10);
	const count = useSelector((state) => state.count);
	const dispatch = useDispatch();

	const increment = () =>
		dispatch({
			type: "INCREMENT",
		});
	const decrement = () =>
		dispatch({
			type: "DECREMENT",
		});
	const reset = () =>
		dispatch({
			type: "RESET",
		});

	const { loading, error, data, fetchMore, networkStatus } = useQuery(BIKES, {
		variables: {
			skip: 0,
			limit,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <div>Error</div>;
	if (loading) return <div>Loading</div>;

	return (
		<React.Fragment>
			<Head>
				<title>SHOP</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Shop>
				<Filter></Filter>
				<Link href={"/AddBike"} scroll passHref>
					<StyledLink>Dodaj Rower</StyledLink>
				</Link>
				<Counter>
					<div>Wyników: {data.bikes.length}</div>
					<div>Aktualna liczba: {count}</div>
					<CounterOptions>
						<button onClick={increment}>Dodaj</button>
						<button onClick={decrement}>Odejmij</button>
					</CounterOptions>
					<div onClick={() => setLimit(count)}>Zapisz</div>
				</Counter>
				<ShopContent>
					{data.bikes.map((bike: BikeProps) => (
						<BikeCard key={bike.id} bike={bike} />
					))}
				</ShopContent>
			</Shop>
		</React.Fragment>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	const reduxStore = initializeStore();
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: BIKES,
		variables: {
			skip: 0,
			limit: 10,
		},
	});

	return {
		props: {
			initialReduxState: reduxStore.getState(),
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
};

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

const StyledLink = styled.a`
	margin: 10px;
	padding: 0px;
	color: ${(props) => props.theme.colors.main};
`;

const Counter = styled.section`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: ${(props) => props.theme.colors.main};
`;

const CounterOptions = styled.section`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	color: ${(props) => props.theme.colors.main};
`;

const ShopContent = styled.section`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
