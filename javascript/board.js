import Cell from './cell';

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

    let currentLevel = [new Cell(0), new Cell(1), new Cell(2)];
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
        let child = new Cell(lastId);
        child.addParent(currentCell);
        children.push(child);
      }
      let rightSibling = this.cells[currentCell.siblings[currentCell.siblings.length -1]];
      children[children.length - 1].addParent(rightSibling);
      nextLevel = nextLevel.concat(children);
    });
    this.connectLevel(nextLevel);
    return nextLevel;
  }
}



export default Board;
