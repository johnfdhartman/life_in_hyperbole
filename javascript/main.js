var canvas = HyperbolicCanvas.create('#hyperbolic-canvas', 'main-canvas');


canvas.setContextProperties({ fillStyle: '#DD4814' });
let center = HyperbolicCanvas.Point.ORIGIN;
let polygon = HyperbolicCanvas.Polygon.givenHyperbolicNCenterRadius(7,center,10);
let lines = polygon.getLines();
polygon._lines = lines;

let path = canvas.pathForHyperbolic(polygon);
console.log(HyperbolicCanvas.canvases);
canvas.stroke(path);
