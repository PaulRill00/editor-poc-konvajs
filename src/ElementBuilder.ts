import Konva from "konva";
import { Editor } from "./Editor";

type BoundOptions = {
    innerBounds?: boolean;
    outerBounds?: boolean;
}

export class ElementBuilder {
    constructor(private readonly editor: Editor) {}

    addRect({ innerBounds, outerBounds, ...options }: Konva.RectConfig & BoundOptions) {
        const rect = new Konva.Rect(options);

        if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(rect);
        if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(rect);

        this.editor.addToUserLayer(rect);
    }

    addImage({ innerBounds, outerBounds, src, ...options }: Omit<Konva.ImageConfig, 'image'> & BoundOptions & { src: string }) {
        const imageObj = new Image();
        imageObj.onload = () => {

            const image = new Konva.Image({
                ...options,
                image: imageObj
            });

            if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(image);
            if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(image);

            this.editor.addToUserLayer(image);

        }
        imageObj.src = src;
    }

    addText({ innerBounds, outerBounds, ...options }: Konva.TextConfig & BoundOptions) {
        const text = new Konva.Text(options);

        if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(text);
        if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(text);

        this.editor.addToUserLayer(text);
    } 
}