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
      this.cells = [];
      cells.map( (cell) => {
        const newCell = Object.assign(newCell, cell);
        this.cells.push(newCell);
      });
      this.drawBoard.bind(this)();
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

  setNeighborCenters(cell, parent) {
    //Find the centers of all neighbor polygons without centers
    //and then set their centers
    //Assumes cell has a center
    let neighborCenters = [];
    let angleToParent = cell.center.hyperbolicAngleTo(parent.center);
    angleToParent = this.hCanv.normalize(angleToParent);
    for (let i = 0; i < 7; i++) {
      neighborCenters.push(cell.center.hyperbolicDistantPoint(
        this.distBetweenCenters,
        angleToParent * (i * Math.TAU/7)
      ));
    }
    //only map centers that do not already have a center
    for (let i = 0; i < 7; i++) {
      cell.neighbors().forEach ((neighbor) => {
        if (neighborCenters[i].hyperbolicDistanceTo(neighbor.center)
          <= (this.polyRadius / 2)) {
            neighbor.center = neighborCenters[i];
          }
      });
    }

  }

  drawPolygonFromVertex(cell, vertex, angleOfReflection) {
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

        //idea: root polygons store a direction for each side
        //when child polygon is generated, directions are saved as
        //the reflection of the parent's directions along the axis
        //they touch.
        //insight: a child polygon is the *relection* of the parent polygon
        //*along the axis they touch*
        //this should be sufficient

        //how to do: the reflected polygon can be constructed from the
        //reflected vertices. reflecting the vertices is easy: find the
        //line from the vertex perpendicularly intersecting the
        //dividing line, and double its length.
        //problem: there's no method to reflect a point across an axis.
        //either i have to construct that myself or use another option.

        //other options? -- rotation based -- algebraic
        //algebraic probably not feasible tbh.

      }
    });
  }

}

export default Disc;
