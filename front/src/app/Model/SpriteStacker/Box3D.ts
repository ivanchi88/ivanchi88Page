import { LineSegments, Mesh } from 'three';

export class Box3D {
    constructor(data: Partial<Box3D>){
        Object.assign(this, data);
    }

    cube: Mesh;
    edges: LineSegments;
    color: string;
    layer: number;
    transparent: boolean;
}