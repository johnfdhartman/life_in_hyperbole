import Board from './board';
import Cell from './cell';

class Disc {
  constructor(){
    this.polyRadius = 0.63;
    this.canvas = HyperbolicCanvas.create('#hyperbolic-canvas', 'main-canvas');
    this.polygons = [];
    this.board = new Board();
    this.board.populateBoard(20);
  }

  populateDisc(){

  }

}
