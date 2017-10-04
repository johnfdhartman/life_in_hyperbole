//distance from center of polygon to middle of side
// let polyDistToSide = 0.44327230256253136;

import Board from './board';
import Disc from './disc';
import Cell from './cell';

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  window.board = board;
  let disc = new Disc(board);
  window.disc = disc;
});


// let centerPoly = hypCanv.Polygon.givenHyperbolicNCenterRadius(7,
//    hypCanv.Point.ORIGIN, polyRadius, Math.TAU / 7);
// let centerPath = canvas.pathForHyperbolic(centerPoly);
// canvas.stroke(centerPath);

// let mid1 = hypCanv.Point.givenHyperbolicPolarCoordinates(polyRadius, Math.PI * 0.5);
// let mid2 = mid1.rotateAboutOrigin(Math.TAU/3);
// let mid3 = mid2.rotateAboutOrigin(Math.TAU/3);
//
// let poly1 = hypCanv.Polygon.givenHyperbolicNCenterRadius(7, mid1, polyRadius, Math.TAU * (3/4));
// let poly2 = hypCanv.Polygon.givenHyperbolicNCenterRadius(7, mid2, polyRadius,
//   (Math.TAU/3) + Math.TAU * (3/4));
// let poly3 = hypCanv.Polygon.givenHyperbolicNCenterRadius(7, mid3, polyRadius,
//   2*(Math.TAU/3) + Math.TAU * (3/4));
//
// let path1 = canvas.pathForHyperbolic(poly1);
// canvas.stroke(path1);
// let path2 = canvas.pathForHyperbolic(poly2);
// canvas.stroke(path2);
// let path3 = canvas.pathForHyperbolic(poly3);
// canvas.stroke(path3);


// canvas.setContextProperties({ fillStyle: '#DD4814' });
// let center = hypCanv.Point.ORIGIN;
// let polygon = hypCanv.Polygon.givenHyperbolicNCenterRadius(7,center,0.5);
// console.log(polygon.getVertices());
//
// let path = canvas.pathForHyperbolic(polygon);
// canvas.stroke(path);
//
// let vertices = polygon.getVertices();
// let midpoint = hypCanv.Point.hyperbolicBetween(vertices[0],vertices[1]);
//
// console.log(midpoint.hyperbolicDistanceTo(center));
//
// console.log('midpoint.getX(), midpoint.getY()', midpoint.getX(), midpoint.getY());
//
// let newPoint = hypCanv.Point.givenCoordinates(2*midpoint.getX(), 2*midpoint.getY());
//
// let newPolygon = hypCanv.Polygon.givenHyperbolicNCenterRadius(7,newPoint,0.5);
// let newPath = canvas.pathForHyperbolic(newPolygon);
// canvas.stroke(newPath);


//find the distance from the center of a polygon to the center of an edge
//first, get the midpoint between two vertices
//then find the distance between that point and the center of the polygon
