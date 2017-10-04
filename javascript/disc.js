import Board from './board';
import Cell from './cell';

class Disc {
  constructor(){
    this.hCanv = HyperbolicCanvas;
    this.polyRadius = 0.63;
    this.canvas = this.hCanv.create('#hyperbolic-canvas', 'main-canvas');
    let center = this.hCanv.Point.CENTER;
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
      this.canvas.stroke(path);
    }
  }

}

export default Disc;
