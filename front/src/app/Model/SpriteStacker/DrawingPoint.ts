export class DrawingPoint { 
    constructor(data: Partial<DrawingPoint>){
        Object.assign(this, data);
    }
    x: number;
    y: number;
    color: string;
    layer: number;
    transparent: boolean;
}