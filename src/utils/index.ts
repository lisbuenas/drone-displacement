import { Vertex } from "@/app/types";

export function convertPosition(position: string): Vertex | null {
    const columnLabels = "ABCDEFGH";
    const [columnChar, rowChar] = position.toUpperCase().split("");
  
    const row = parseInt(rowChar, 10) - 1;
    const col = columnLabels.indexOf(columnChar);
  
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      return { row, col };
    }
  
    return null;
  }
  
  export function revertPosition(position: Vertex): string | null {
    const columnLabels = "ABCDEFGH";
  
    if (
      position.row >= 0 &&
      position.row < 8 &&
      position.col >= 0 &&
      position.col < 8
    ) {
      const columnChar = columnLabels[position.col];
      const rowChar = (position.row + 1).toString();
      return `${columnChar}${rowChar}`;
    }
  
    return null;
  }