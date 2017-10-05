import Board from './board';
import Cell from './cell';
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
      let newCell = new Cell();
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
    //only map centers that do not already have a center
    console.log(cell.neighbors());
    for (let i = 0; i < 7; i++) {
      cell.neighbors().forEach ((neighbor) => {
        if (neighborCenters[i].hyperbolicDistanceTo(neighbor.center)
          <= (this.polyRadius / 2)) {
            neighbor.center = neighborCenters[i];
          }
      });
    }

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
      if (!cell.polygon) {

      }
    });
  }

}

export default Disc;
