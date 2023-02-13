import Konva from "konva";
import { Bounds } from "./Bounds";

export class Editor {

    private boundingLayer: Konva.Layer;
    private userLayer: Konva.Layer;

    constructor(private readonly stage: Konva.Stage, private readonly bounds: Bounds) {
        this.userLayer = new Konva.Layer();
        this.stage.add(this.userLayer);
        this.boundingLayer = this.createBoundingLayer();
    }

    getStage(): Konva.Stage {
        return this.stage;
    }

    getBounds(): Bounds {
        return this.bounds;
    }

    addToUserLayer(element: Konva.Shape) {
        this.userLayer.add(element);
    }

    toggleBoundingLayer() {
        this.boundingLayer.visible(!this.boundingLayer.visible());
    }

    protected createBoundingLayer() {
        const layer = new Konva.Layer();
        const inset = this.bounds.getInsetBounds();

        const innerLine = new Konva.Line({
            points: [
                inset.x, inset.y, // top left
                this.stage.width() - inset.x, inset.y, // top right
                this.stage.width() - inset.x, this.stage.height() - inset.y, // bottom right
                inset.x, this.stage.height() - inset.y,
                inset.x, inset.y // top left again
            ],
            strokeWidth: 1.5,
            stroke: 'green',
            lineCap: 'round',
            lineJoin: 'round',
            dash: [8, 7],
            draggable: false
        })

        const outerLine = new Konva.Line({
            points: [
                0, 0, // top left
                this.stage.width(), 0, // top right
                this.stage.width(), this.stage.height(), // bottom right
                0, this.stage.height(),
                0, 0 // top left again
            ],
            strokeWidth: 1.5,
            stroke: 'red',
            lineCap: 'round',
            lineJoin: 'round',
            dash: [8, 7],
            draggable: false
        })

        layer.add(innerLine);
        layer.add(outerLine);
        this.stage.add(layer);

        return layer;
    }

}