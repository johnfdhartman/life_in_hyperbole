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

export default Disc;
