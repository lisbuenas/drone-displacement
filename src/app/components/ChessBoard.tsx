import React from "react";

// TODO: trigger click events
export interface ChessBoardProps{
  onClick:(data:string) => void
}

const Chessboard = ({onClick}) => {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const squares:any = [];

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < columns.length; col++) {
      const isDark = (row + col) % 2 === 1;
      const squareName = `${columns[col]}${rows[row]}`;
      squares.push(
        <div
          key={squareName}
          className={`flex items-center justify-center w-12 h-12 ${
            isDark ? "bg-gray-600" : "bg-gray-300"
          }`}
        >
          <span className={`${isDark ? "text-white" : "text-black"}`} onClick={() => onClick(squareName)}>
            {squareName}
          </span>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <div className="w-12 h-12" />
        {columns.map((column) => (
          <div key={column} className="flex items-center justify-center w-12 h-12">
            <span className="text-gray-700">{column}</span>
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row} className="flex">
          <div className="flex items-center justify-center w-12 h-12">
            <span className="text-gray-700">{row}</span>
          </div>
          {squares.splice(0, 8)}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;