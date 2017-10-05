/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cell {
  constructor(id){
    this.state = false;
    this.id = id;
    this.parents = [];
    this.siblings = [];
    this.children = [];
    this.nextState = false;
  }

  addParent(parent) {
    this.parents.push(parent.id);
    parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child.id);
    // child.addParent(this); this causes a loop
  }

  addRightSibling(sibling) {
    this.siblings.push(sibling.id);
    sibling.addLeftSibling(sibling.id);
  }

  addLeftSibling(sibling) {
    this.siblings.unshift(sibling.id);
  }

  neighbors() {
    return (this.parents).concat(this.siblings).concat(this.children);
  }

  // findNextState(rule) {
  //   //rule is a callback that takes a number of on cells and returns true or false
  //   //true if the cell should turn on, false if it should turn off
  //   let numNeighborsOn = 0;
  //   this.neighbors().forEach((neighbor) => {
  //     numNeighborsOn += (neighbor.state ? 1 : 0);
  //   });
  //   this.nextState = rule(numNeighborsOn);
  // }

  updateState() {
    this.state = this.nextState;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cell);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell__ = __webpack_require__(0);


class Board {
  constructor(disc){
    this.cells = {};
    this.disc = disc;
  }

  addNode(cell){
    this.cells.push(cell);
  }

  populate(numLevels){
    //algorithm description:
    //1) create the first three cells and make them siblings of each other
    //save them as currentLevel
    //2) for each cell in currentLevel, create 4 cells, setting the first
    //adjacent to the second, the second to the third, etc. as to form
    //a 'border' around currentLevel. store currentLevel to the board,
    //then set this new 'level' of cells as currentLevel. repeat 2)
    //until n cells have been generated (may go over numCells)

    let currentLevel = [new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](0), new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](1), new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](2)];
    this.connectLevel.bind(this)(currentLevel);
    this.cells = {0: currentLevel[0], 1: currentLevel[1], 2: currentLevel[2]};
    for (let i = 1; i < numLevels; i++) {
      const newLevel = this.nextLevel.bind(this)(currentLevel);
      newLevel.forEach((cell) => {
        this.cells[cell.id] = cell;
      });
      currentLevel = newLevel;
    }
  }

  connectLevel(level) {
    // Takes a level of cells as an array, then makes each cell a sibling
    //of the cell to its right. this is stored as the *last* element
    //of the siblings array
    for (let i = 0; i < level.length; i++) {
      level[i].addRightSibling(level[(i+1) % level.length]);
    }
  }

  nextLevel(currentLevel) {

    //intuition: every non-starting cell has 2 siblings and a number
    //of parents. each vertex is associated is another cell, so
    //the remainder are children, which this function generates.
    // for each 'level', we generate
    //children for every vertex not otherwise associated.

    //each cell in currentLevel generates 7 - cell.parents.length - 1
    //cells. the last one of these cells is given an additional parent
    //of cell.siblings.last
    //then connectLevel is called
    console.log('currentLevel', currentLevel);
    let lastId = currentLevel[currentLevel.length - 1].id;
    let nextLevel = [];
    currentLevel.forEach( (currentCell) => {
      let numParents = currentCell.parents.length;
      let children = [];
      for (let i = 0; i < (7 - numParents - 3); i++) {
        lastId += 1;
        let child = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](lastId);
        console.log('new Cell', child);
        child.addParent(currentCell);
        children.push(child);
      }
      let rightSibling = currentCell.siblings[currentCell.siblings.length -1];
      children[children.length - 1].addParent(rightSibling);
      nextLevel = nextLevel.concat(children);
    });
    this.connectLevel(nextLevel);
    return nextLevel;
  }
}



/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disc__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cell__ = __webpack_require__(0);
//distance from center of polygon to middle of side
// let polyDistToSide = 0.44327230256253136;





document.addEventListener('DOMContentLoaded', () => {
  let disc = new __WEBPACK_IMPORTED_MODULE_1__disc__["a" /* default */]();
  window.disc = disc;
  let board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](disc);
  window.board = board;
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell__ = __webpack_require__(0);


//This class handles the rendering properties. game logic should
//not go here
class Disc {
  constructor(){
    this.hCanv = HyperbolicCanvas;
    this.polyRadius = 0.63;
    this.canvas = this.hCanv.create('#hyperbolic-canvas', 'main-canvas');
    let center = this.hCanv.Point.CENTER;
  }

  receiveCells(cells) {
    Object.freeze(cells);
    if (!this.cells) {
      this.cells = this.deepCloneCells(cells);
      this.drawBoard();
    } else {
      console.log('warning: receiveCells called when Disc.cells already exists');
    }
  }
  drawFirstThree() {
    //takes an array of the three root cells

    const firstMid = this.hCanv.Point
      .givenHyperbolicPolarCoordinates(this.polyRadius, Math.PI * 0.5);
    for (let i = 0; i < this.cells.length; i++) {
      const mid = firstMid.rotateAboutOrigin(i * (Math.TAU/3));
      // const poly = this.hCanv.Polygon.givenHyperbolicNCenterRadius(
      //   7, mid, this.polyRadius, (i * Math.TAU/3) + Math.TAU * (3/4)
      // );
      const poly = this.hCanv.Polygon.givenHyperbolicNCenterRadius(
        7, mid, this.polyRadius, (i * Math.TAU/3) + Math.TAU * (3/4)
      );
      const path = this.canvas.pathForHyperbolic(poly);
      this.cells[i].polygon = poly;
      this.cells[i].center = mid;
      this.canvas.stroke(path);
    }
    this.distBetweenCenters = firstMid.hyperbolicDistanceTo(this.cells[1].center);
  }

  deepCloneCells(cells) {
    //load copies into a new array
    //then save adjacencies in a new variable called neighbors
    //the parents, siblings and children properties are deleted from
    //the copy to keep things separate
    Object.freeze(cells);
    let newCells = [];
    cells.map( (cell) => {
      let newCell = new __WEBPACK_IMPORTED_MODULE_1__cell__["a" /* default */]();
      Object.assign(newCell, cell);
      this.cells.push(newCell);
    });

    newCells.each((newCell) => {
      const newCellIdx = newCells.indexOf(newCell);
      newCell.neighbors = [];
      newCell.neighbors().each( (neighbor) => {
        const neighborIdx = cells.indexOf(neighbor);
        newCell.neighbors.push(newCells[neighborIdx]);
      });
      delete newCell.parents;
      delete newCell.siblings;
      delete newCell.children;
    });
    return newCells;
  }

  setNeighborCenters(cell, parent) {
    //Find the centers of all neighbor polygons without centers
    //and then set their centers
    //Assumes cell has a center
    let neighborCenters = [];
    let angleToParent = cell.center.hyperbolicAngleTo(parent.center);
    angleToParent = this.hCanv.Angle.normalize(angleToParent);
    for (let i = 0; i < 7; i++) {
      console.log('this.distBetweenCenters', this.distBetweenCenters);
      neighborCenters.push(cell.center.hyperbolicDistantPoint(
        this.distBetweenCenters,
        angleToParent * (i * Math.TAU/7)
      ));
    }
    //get all the neighbors without centers
    //then iterate over neighborCenters, assigning centers
    //problem: how do i make sure it's the right center for the right polygon?
    //if a cell has two parents, we can see which neighborCenters the parent
    //if the cell's siblings have already been assigned centers, we can
    //cross reference with the cell's siblings
    //eek
    
  }



  drawPolygonFromVertex(cell, vertex) {
    //by now each cell has a center
    //given a center and a single vertex we can generate the
    //polygon
    let angleToVertex = cell.center.hyperbolicAngleTo(vertex);
    let vertices = [];
    for (let i = 0; i < 7; i++) {
      vertices.push(cell.center.hyperbolicDistantPoint(
        this.polyRadius,
        angleToVertex * (i * Math.TAU/7)
      ));
    }
    cell.poly = this.hypCanv.Polygon.givenVertices(vertices);
    const path = this.canvas.pathForHyperbolic(cell.poly);
    this.canvas.stroke(path);
  }



  drawBoard() {
    let firstThree = this.cells.slice(0,3);
    this.cells.forEach( (cell) => {
      for (let i = 0; i < 7; i++) {
      }
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Disc);


/***/ })
/******/ ]);