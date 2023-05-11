"use client"
import React from 'react';

// extension to allow multiple size
const Board = ({ columns = 8, rows = 8 }:any) => {
    const gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const gridTemplateRows = `repeat(${rows}, 1fr)`;
  
    return (
      <div className="grid" style={{ gridTemplateColumns, gridTemplateRows }}>
        {/* Render cells */}
        {Array.from({ length: rows * columns }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 flex items-center justify-center"
          >
            {/* Render cell contents */}

            A
          </div>
        ))}
      </div>
    );
  };
  
  export default Board;