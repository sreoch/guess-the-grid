export interface GridProps {
	rows: number;
	columns: number;
	data: CellData[][];
	rowHeaders: HeaderData[];
	columnHeaders: HeaderData[];
	onCellSubmit: (id: number, value: string) => void;
	onCellChange: (id: number, value: string) => void;
}

export interface CellData {
	id: number;
	value: string;
	isCorrect: boolean;
	imageUrl?: string;
	tooltip?: string;
}

export interface HeaderData {
	id: number;
	label: string;
	imageUrl?: string;
	tooltip?: string;
}
