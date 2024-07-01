import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import { CellData, HeaderData } from './types';
import playersData from './ProData.json';

// Function to get unique headers
const getUniqueHeaders = (players: any[], key: string): HeaderData[] => {
	const allItems = players.flatMap((player) =>
		key === 'nationality' || key === 'position' ? [player[key]] : player[key]
	);
	return Array.from(new Set(allItems)).map((item, index) => ({
		id: index + 1,
		label: item,
		imageUrl: '', //addimg url?
		tooltip: item,
	}));
};

// Function to select random items from a list
const selectRandomItems = (
	items: HeaderData[],
	count: number
): HeaderData[] => {
	const shuffled = items.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

// Function to select valid headers for a 3x3 grid
const selectValidHeaders = (
	players: any[],
	teams: HeaderData[],
	countries: HeaderData[],
	requiredCount: number
) => {
	const validTeams: HeaderData[] = [];
	const validCountries: HeaderData[] = [];

	for (let team of teams) {
		const validCountriesForTeam = countries.filter((country) =>
			players.some(
				(player) =>
					player.pastTeams.includes(team.label) &&
					player.nationality === country.label
			)
		);
		if (validCountriesForTeam.length >= requiredCount) {
			validTeams.push(team);
		}
	}

	for (let country of countries) {
		const validTeamsForCountry = teams.filter((team) =>
			players.some(
				(player) =>
					player.pastTeams.includes(team.label) &&
					player.nationality === country.label
			)
		);
		if (validTeamsForCountry.length >= requiredCount) {
			validCountries.push(country);
		}
	}

	const selectedTeams = selectRandomItems(validTeams, requiredCount);
	const selectedCountries = selectRandomItems(validCountries, requiredCount);

	return { selectedTeams, selectedCountries };
};

export const GameBoard: React.FC = () => {
	const [gridData, setGridData] = useState<CellData[][]>([]);
	const [rowHeaders, setRowHeaders] = useState<HeaderData[]>([]);
	const [columnHeaders, setColumnHeaders] = useState<HeaderData[]>([]);

	useEffect(() => {
		const players = playersData.players;

		// Extract unique headers
		const uniqueTeams = getUniqueHeaders(players, 'pastTeams');
		const uniqueNationalities = getUniqueHeaders(players, 'nationality');

		// Select valid headers for a 3x3 grid
		const { selectedTeams, selectedCountries } = selectValidHeaders(
			players,
			uniqueTeams,
			uniqueNationalities,
			3
		);

		// Combine all possible valid combinations
		const allValidCombinations: {
			team: string;
			country: string;
		}[] = [];
		for (let team of selectedTeams) {
			for (let country of selectedCountries) {
				const matchingPlayers = players.filter(
					(player) =>
						player.pastTeams.includes(team.label) &&
						player.nationality === country.label
				);
				if (matchingPlayers.length > 0) {
					allValidCombinations.push({
						team: team.label,
						country: country.label,
					});
				}
			}
		}

		// Build the initial grid data for a 3x3 grid
		const initialData: CellData[][] = selectedTeams.map((team, rowIndex) => {
			return selectedCountries.map((country, columnIndex) => {
				const matchingPlayer = players.find(
					(player) =>
						player.pastTeams.includes(team.label) &&
						player.nationality === country.label
				);
				return {
					id: rowIndex * selectedCountries.length + columnIndex,
					value: matchingPlayer ? matchingPlayer.name : '',
					isCorrect: false,
				};
			});
		});

		// Set headers and grid data
		setRowHeaders(selectedTeams);
		setColumnHeaders(selectedCountries);
		setGridData(initialData);
	}, []);

	// const handleCellClick = (id: number) => {
	// 	// setGridData((prevData) =>
	// 	// 	prevData.map((row) =>
	// 	// 		row.map((cell) =>
	// 	// 			cell.id === id ? { ...cell, isCorrect: !cell.isCorrect } : cell
	// 	// 		)
	// 	// 	)
	// 	// );
	// };

	return (
		<div>
			<h1>Guess the Grid - Dota Edition</h1>
			<Grid
				rows={rowHeaders.length}
				columns={columnHeaders.length}
				data={gridData}
				rowHeaders={rowHeaders}
				columnHeaders={columnHeaders}
				// onCellS={handleCellClick} // Pass the cell click handler to the Grid component
			/>
		</div>
	);
};
