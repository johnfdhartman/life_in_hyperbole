import Board from './board';
import Cell from './cell';
import merge from 'lodash/merge';
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
    this.cells = merge({}, cells);
  }

  drawFirstThree() {
    //takes an array of the three root cells

    const firstMid = this.hCanv.Point
      .givenHyperbolicPolarCoordinates(this.polyRadius, Math.PI * 0.5);
    for (let i = 0; i < 3; i++) {
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

  findCenterlessChildren(cell, parent) {
    //Find the centers of all neighbor polygons without centers
    //and then set their centers
    //Assumes cell has a center
    // let neighborCenters = [];
    // let angleToParent = cell.center.hyperbolicAngleTo(parent.center);
    // angleToParent = this.hCanv.Angle.normalize(angleToParent);
    // for (let i = 0; i < 7; i++) {
    //   console.log('this.distBetweenCenters', this.distBetweenCenters);
    //   neighborCenters.push(cell.center.hyperbolicDistantPoint(
    //     this.distBetweenCenters,
    //     angleToParent * (i * Math.TAU/7)
    //   ));
    // }

    //insights: a pair of siblings cannot share more than one child

    //1) every non-root cell is spawned by one of its parents
    //2) the children in the cell.children array are stored clockwise
    //3) thus the adjacency properties between a cell's children are easy

    //4) by the time we are rendering the cell's children, we have already
    //rendered its siblings
    //5) so we only need to bother assigning centers to its children
    //6) starting with the line to the cell's parent, we rotate *clockwise*
    // by TAU/7 radians until we generate a point that is more than polyRadius/2
    //away from a pre=assigned center
    //then we map the next k centers to the cell's k unassigned children
    let unCenteredChildIds = [];
    let assignedNeighbors = [];
    cell.childIds.forEach( (childId) => {
      if (this.cells[childId].center) {
        assignedNeighbors.push(this.cells[childId]);
      } else{
        unCenteredChildIds.push(this.cells[childId]);
      }
    });

    let angleToParent = cell.center.hyperbolicAngleTo(parent.center);
    angleToParent = this.hCanv.Angle.normalize(angleToParent);
    for (let i = 0; i < 6; i++) {
      let neighborCenter = cell.center.hyperbolicDistantPoint(
        this.distBetweenCenters,
        angleToParent * (i * Math.TAU/7)
      );
      if (
        !assignedNeighbors.any( (neighbor) => (
          (neighbor.center.hyperboliDistanceTo(neighborCenter)
            < this.polyRadius/2)
        ))
      ) {
        this.setChildCenters.bind(this)(cell, unCenteredChildIds, neighborCenter);
        break;
      }
    }
  }

  setChildCenters(parent, unCenteredChildIds, firstChildCenter){
    firstChildCenter = this.hCanv.Angle.normalize(firstChildCenter);
    for (let i = 0; i < unCenteredChildIds.length; i++) {
      let childCenter = parent.center.hyperbolicDistantPoint(
        this.distBetweenCenters,
        firstChildCenter * (i * Math.TAU/7)
      );
      this.cells[unCenteredChildIds[i]].center = childCenter;
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
      for (let i = 0; i < 7; i++) {
      }
    });
  }

}

export default Disc;
