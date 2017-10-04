import Cell from './cell';

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

    let currentLevel = [new Cell(1), new Cell(1), new Cell(1)];
    let currentDepth = 1;
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
        let child = new Cell();
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



export default Board;
