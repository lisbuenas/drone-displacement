type Nodes = Record<string, { edges: Record<string, number> }>;
type Point = { x: number; y: number };

type NodeRoute = {
  position: Point;
  gScore: number;
  fScore: number;
  cameFrom?: NodeRoute;
};

export function findRoute(
  startingNode: string,
  pickupNode: string,
  deliveryNode: string
): string[] {
  const nodes = createChessboardNodes();
  const startingPosition = getNodePosition(startingNode, nodes);
  
  if(Number.isNaN(startingPosition.x) || Number.isNaN(startingPosition.y)){
    return []
  }

  const pickupPosition = getNodePosition(pickupNode, nodes);
  const deliveryPosition = getNodePosition(deliveryNode, nodes);

  const startNode: NodeRoute = {
    position: startingPosition,
    gScore: 0,
    fScore: manhattanDistance(startingPosition, pickupPosition),
  };

  const goalNode: NodeRoute = {
    position: pickupPosition,
    gScore: 0,
    fScore: manhattanDistance(pickupPosition, deliveryPosition),
  };

  const openSet: NodeRoute[] = [startNode];
  const closedSet: NodeRoute[] = [];

  while (openSet.length > 0) {
    const current = getLowestFScoreNode(openSet);

    if (
      current.position.x === goalNode.position.x &&
      current.position.y === goalNode.position.y
    ) {
      return reconstructPath(current);
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);

    for (const neighbor of getNeighbors(current, nodes)) {
      if (
        closedSet.some(
          (n) =>
            n.position.x === neighbor.position.x &&
            n.position.y === neighbor.position.y
        )
      ) {
        continue;
      }

      const tentativeGScore =
        current.gScore + neighborDistance(current, neighbor);
      const neighborIndex = openSet.findIndex(
        (n) =>
          n.position.x === neighbor.position.x &&
          n.position.y === neighbor.position.y
      );

      if (neighborIndex === -1) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= openSet[neighborIndex].gScore) {
        continue;
      }

      neighbor.gScore = tentativeGScore;
      neighbor.fScore =
        neighbor.gScore +
        manhattanDistance(neighbor.position, goalNode.position);
      neighbor.cameFrom = current;
    }
  }

  return [];
}

function createChessboardNodes(): Nodes {
  const nodes: Nodes = {};

  for (let column = 1; column <= 8; column++) {
    for (let row = 1; row <= 8; row++) {
      const nodeName = String.fromCharCode(column + 64) + row;
      nodes[nodeName] = { edges: {} };

      if (column > 1 && row > 2) {
        nodes[nodeName].edges[
          String.fromCharCode(column - 1 + 64) + (row - 2)
        ] = 1;
      }
      if (column > 2 && row > 1) {
        nodes[nodeName].edges[
          String.fromCharCode(column - 2 + 64) + (row - 1)
        ] = 1;
      }
      if (column < 8 && row > 1) {
        nodes[nodeName].edges[
          String.fromCharCode(column + 2 + 64) + (row - 1)
        ] = 1;
      }
      if (column < 7 && row > 2) {
        nodes[nodeName].edges[
          String.fromCharCode(column + 1 + 64) + (row - 2)
        ] = 1;
      }
      if (column < 7 && row < 8) {
        nodes[nodeName].edges[
          String.fromCharCode(column + 1 + 64) + (row + 2)
        ] = 1;
      }
      if (column < 8 && row < 7) {
        nodes[nodeName].edges[
          String.fromCharCode(column + 2 + 64) + (row + 1)
        ] = 1;
      }
      if (column > 1 && row < 7) {
        nodes[nodeName].edges[
          String.fromCharCode(column - 1 + 64) + (row + 2)
        ] = 1;
      }
      if (column > 2 && row < 8) {
        nodes[nodeName].edges[
          String.fromCharCode(column - 2 + 64) + (row + 1)
        ] = 1;
      }
    }
  }

  return nodes;
}

function getNodePosition(nodeName: string, nodes: Nodes): Point {
  const column = nodeName.charCodeAt(0) - 64;
  const row = parseInt(nodeName.charAt(1), 10);
  return { x: column, y: row };
}

function manhattanDistance(point1: Point, point2: Point): number {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function neighborDistance(node1: NodeRoute, node2: NodeRoute): number {
  return node1.position.x === node2.position.x ||
    node1.position.y === node2.position.y
    ? 1
    : 1.5;
}

function getNeighbors(node: NodeRoute, nodes: Nodes): NodeRoute[] {
  const neighbors: NodeRoute[] = [];

  for (const [nodeName, distance] of Object.entries(
    nodes[nodeToNodeName(node.position)]?.edges ?? {}
  )) {
    const neighbor = {
      position: getNodePosition(nodeName, nodes),
      gScore: Infinity,
      fScore: Infinity,
    };

    neighbors.push(neighbor);
  }

  return neighbors;
}

function getLowestFScoreNode(nodes: NodeRoute[]): NodeRoute {
  let lowestFNode = nodes[0];

  for (const node of nodes) {
    if (node.fScore < lowestFNode.fScore) {
      lowestFNode = node;
    }
  }

  return lowestFNode;
}

function reconstructPath(current: NodeRoute): string[] {
  const path = [nodeToNodeName(current.position)];

  while (current.cameFrom) {
    current = current.cameFrom;
    path.push(nodeToNodeName(current.position));
  }

  return path.reverse();
}

function nodeToNodeName(position: Point): string {
  const column = String.fromCharCode(position.x + 64);
  const row = position.y;
  return column + row;
}


function isValidNode(nodeName: string): boolean {
    const columnCode = nodeName.charCodeAt(0);
    const row = parseInt(nodeName.charAt(1), 10);
    return (
      nodeName.length === 2 &&
      columnCode >= 65 &&
      columnCode <= 72 &&
      row >= 1 &&
      row <= 8
    );
  }