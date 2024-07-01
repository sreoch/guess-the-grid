// src/components/Grid.tsx
import React, { useState } from 'react';
import './styles/Grid.css';
import { GridProps } from './types';

const Grid: React.FC<GridProps> = ({
	rows,
	columns,
	data,
	rowHeaders,
	columnHeaders,
	onCellSubmit,
	onCellChange, // Add onCellChange function
}) => {
	// const onCellSubmit = (id: number, value: string) => {
	// 	if (else,) {
	// 		// Perform submit logic here
	// 	}
	// }

	return (
		<div className='grid-container'>
			<div className='grid-header-row'>
				<div className='grid-header-cell'></div>
				{columnHeaders.map((header) => (
					<div
						key={header.id}
						className='grid-header-cell'
						title={header.tooltip}
					>
						{header.imageUrl && (
							<img src={header.imageUrl} alt={header.label} />
						)}
						<span>{header.label}</span>
					</div>
				))}
			</div>
			{data.map((row, rowIndex) => (
				<div key={rowIndex} className='grid-row'>
					<div
						className='grid-header-cell'
						title={rowHeaders[rowIndex].tooltip}
					>
						{rowHeaders[rowIndex].imageUrl && (
							<img
								src={rowHeaders[rowIndex].imageUrl}
								alt={rowHeaders[rowIndex].label}
							/>
						)}
						<span>{rowHeaders[rowIndex].label}</span>
					</div>
					{row.map((cell) => (
						<div
							key={cell.id}
							className={`grid-cell ${cell.isCorrect ? 'correct' : ''}`}
							onClick={() => onCellClick(cell.id)}
						>
							<input
								type='text'
								className='grid-cell-input'
								// value={cell.value}
								onChange={(e) => onCellChange(cell.id, e.target.value)}
							/>
							{/* {cell.value && <span>{cell.value}</span>} */}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Grid;
