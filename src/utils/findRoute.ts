type Vertex = { row: number; col: number };
type Edge = { to: Vertex; weight: number };


type Graph = Array<Array<Array<Edge>>>;

function convertPosition(position: string): Vertex | null {
  const columnLabels = "ABCDEFGH";
  const [columnChar, rowChar] = position.toUpperCase().split("");

  const row = parseInt(rowChar, 10) - 1;
  const col = columnLabels.indexOf(columnChar);

  if (row >= 0 && row < 8 && col >= 0 && col < 8) {
    return { row, col };
  }

  return null;
}

function revertPosition(position: Vertex): string | null {
  const columnLabels = "ABCDEFGH";

  if (position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8) {
    const columnChar = columnLabels[position.col];
    const rowChar = (position.row + 1).toString();
    return `${columnChar}${rowChar}`;
  }

  return null;
}

export function createChessboard(): Graph {
  const numRows = 8;
  const numCols = 8;

  const graph: Graph = [];
  for (let row = 0; row < numRows; row++) {
    graph[row] = [];
    for (let col = 0; col < numCols; col++) {
      graph[row][col] = [];

      const neighbors: Array<[number, number]> = [
        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
        [row, col - 1],                     [row, col + 1],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
      ];

      for (const [r, c] of neighbors) {
        if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
          graph[row][col].push({ to: { row: r, col: c }, weight: 1 });
        }
      }
    }
  }

  return graph;
}


const chessboardGraph = createChessboard();

export function findRoute(start:string, end:string, end1:string){
  const {distance:distance1, path: path1} = dijkstra(chessboardGraph, convertPosition(start)!, convertPosition(end)!);

  const {distance:distance2, path: path2} = dijkstra(chessboardGraph, convertPosition(end)!, convertPosition(end1)!);

    // total path
    const totalpath = [...path1, ...path2];

    // calculate total time

    const res = totalpath.map((el) => revertPosition(el))

    if(res == null){
      return []
    }

    return res;
}

function dijkstra(graph: Graph, start: Vertex, end: Vertex): { distance: number, path: Array<Vertex> } {
  const numRows = graph.length;
  const numCols = graph[0].length;

  const dist: Array<Array<number>> = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(Number.MAX_VALUE));
  const visited: Array<Array<boolean>> = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(false));
  const previous: Array<Array<Vertex | null>> = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null));

  dist[start.row][start.col] = 0;

  while (true) {
    let minDist = Number.MAX_VALUE;
    let minVertex: Vertex | null = null;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (!visited[row][col] && dist[row][col] < minDist) {
          minDist = dist[row][col];
          minVertex = { row, col };
        }
      }
    }

    if (minVertex === null) {
      break;
    }

    const { row, col } = minVertex;
    visited[row][col] = true;

    if (row === end.row && col === end.col) {
      // Reconstruct the path
      const path: Array<Vertex> = [];
      let current: Vertex | null = end;
      while (current !== null) {
        path.unshift(current);
        current = previous[current.row][current.col];
      }
      return { distance: dist[end.row][end.col], path };
    }

    for (const { to, weight } of graph[row][col]) {
      const { row: nextRow, col: nextCol } = to;
      const newDist = dist[row][col] + weight;

      if (newDist < dist[nextRow][nextCol]) {
        dist[nextRow][nextCol] = newDist;
        previous[nextRow][nextCol] = { row, col };
      }
    }
  }

  return { distance: -1, path: [] }; // If no path exists
}


