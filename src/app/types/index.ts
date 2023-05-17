export interface Route{
    id: string;
    createdAt: number;
    route: string;
    totalTime:number;
}

export type Vertex = { row: number; col: number };
export type Edge = { to: Vertex; weight: number };

export type Graph = Array<Array<Array<Edge>>>;