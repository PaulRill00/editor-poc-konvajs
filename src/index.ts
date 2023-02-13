import Konva from "konva";

const design = { width: 420, height: 420 };

var stage = new Konva.Stage({
  container: "container",
  width: design.width,
  height: design.height
});

var layer = new Konva.Layer();

var hexagon = new Konva.RegularPolygon({
  x: design.width / 2,
  y: design.height / 2,
  sides: 6,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
  draggable: true
});

// add the shape to the layer
layer.add(hexagon);

// add the layer to the stage
stage.add(layer);

// save stage as a json string
var json = stage.toJSON();

console.log(json);
