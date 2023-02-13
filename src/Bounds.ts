import Konva from "konva";

export class Bounds {
    constructor(private readonly stage: Konva.Stage) {}

    getInsetBounds(): { x: number, y: number; } {
        return { x: 10, y: 10 };
    }

    addOnDragOuterBounds(element: Konva.Shape) {
        this.addOnDragBounds(element, 0, 0);
    }

    addOnDragInsetBounds(element: Konva.Shape) {
        this.addOnDragBounds(element, this.getInsetBounds().x, this.getInsetBounds().y);
    }

    private addOnDragBounds(element: Konva.Shape, insetX: number, insetY: number) {
        const minY = insetY;
        const maxY = this.stage.height() - insetY;
        const minX = insetX;
        const maxX = this.stage.width() - insetX;

        element.on('dragmove', () => {
            const width = element.width();
            const height = element.height();

            let currentX = element.x();
            let currentY = element.y();

            if (currentX < minX) currentX = minX;
            if (currentX + width > maxX) currentX = maxX - width;
            if (currentY < minY) currentY = minY;
            if (currentY + height > maxY) currentY = maxY - height;

            element.x(currentX);
            element.y(currentY);
        });
    }
}