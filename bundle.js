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
  constructor(){
    this.state = false;
    this.parents = [];
    this.siblings = [];
    this.children = [];
    this.nextState = false;
    this.polygon = null;
  }

  addParent(parent) {
    this.parents.push(parent);
    parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child);
    // child.addParent(this); this causes a loop
  }

  addRightSibling(sibling) {
    this.siblings.push(sibling);
    sibling.addLeftSibling(sibling);
  }

  addLeftSibling(sibling) {
    this.siblings.unshift(sibling);
  }

  neighbors() {
    return (this.parents).concat(this.siblings).concat(this.children);
  }

  findNextState(rule) {
    //rule is a callback that takes a number of on cells and returns true or false
    //true if the cell should turn on, false if it should turn off
    let numNeighborsOn = 0;
    this.neighbors().forEach((neighbor) => {
      numNeighborsOn += (neighbor.state ? 1 : 0);
    });
    this.nextState = rule(numNeighborsOn);
  }

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
    this.cells = [];
    this.disc = disc;
  }

  addNode(cell){
    this.cells.push(cell);
  }

  populate(numCells){
    //algorithm description:
    //1) create the first three cells and make them siblings of each other
    //save them as currentLevel
    //2) for each cell in currentLevel, create 4 cells, setting the first
    //adjacent to the second, the second to the third, etc. as to form
    //a 'border' around currentLevel. store currentLevel to the board,
    //then set this new 'level' of cells as currentLevel. repeat 2)
    //until n cells have been generated (may go over numCells)

    let currentLevel = [new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]()];
    this.connectLevel.bind(this)(currentLevel);
    while ((this.cells.length + currentLevel.length) < numCells) {
      const newLevel = this.nextLevel.bind(this)(currentLevel);
      this.cells = this.cells.concat(currentLevel);
      this.cells = this.cells.concat(newLevel);
      currentLevel = newLevel;
    }
  }

  // secondLevel(root) {
  //   let newCell;
  //   let nextLevel = [];
  //   for (let i = 0; i < 7; i++) {
  //     newCell = new Cell();
  //     newCell.addNeighbor(root);
  //     nextLevel.push(newCell);
  //   }
  //   this.connectLevel(nextLevel);
  //   return nextLevel;
  // }

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
    let nextLevel = [];
    currentLevel.forEach( (currentCell) => {
      let numParents = currentCell.parents.length;
      let children = [];
      for (let i = 0; i < (7 - numParents - 3); i++) {
        let child = new __WEBPACK_IMPORTED_MODULE_0__cell__["a" /* default */]();
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
    if (!this.cells) {
      this.cells = cells;
      this.drawBoard.bind(this)();
    } else {
      console.log('warning: receiveCells called when Disc.cells already exists');
    }
  }
  drawFirstThree(cells) {
    //takes an array of the three root cells
    const firstMid = this.hCanv.Point
      .givenHyperbolicPolarCoordinates(this.polyRadius, Math.PI * 0.5);
    for (let i = 0; i < cells.length; i++) {
      const mid = firstMid.rotateAboutOrigin(i * (Math.TAU/3));
      const poly = this.hCanv.Polygon.givenHyperbolicNCenterRadius(
        7, mid, this.polyRadius, (i * Math.TAU/3) + Math.TAU * (3/4)
      );
      const path = this.canvas.pathForHyperbolic(poly);
      cells[i].polygon = poly;
      this.canvas.stroke(path);
    }
  }

  drawBoard() {
    let firstThree = this.cells.slice(0,3);
    this.cells.forEach( (cell) => {
      if (!cell.polygon) {
        //draw the cell given the parent
        //how do?
        //first: find the center of the new cell
        //second: rotate the new cell correctly
        //seems unlikely that the first part can be achieved for all
        //cells without the second part.
        //find a way for a parent with a correct rotation and position
        //to generate children with correct rotation and position
        //idea: get pairs of vertices to represent the side of a child polygon
        //reflect the midpoint of the parent across the side to get the
        //child midpoint. then get rotation such that the vertices of
        //child will touch the vertex pair specified. (how???)
      }
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Disc);


/***/ })
/******/ ]);