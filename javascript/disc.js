import Board from './board';
import Cell from './cell';

class Disc {
  constructor(board){
    this.polyRadius = 0.63;
    this.canvas = HyperbolicCanvas.create('#hyperbolic-canvas', 'main-canvas');
    this.polygons = [];
    this.board = board;
  }

  populateDisc(){

  }

}

export default Disc;
