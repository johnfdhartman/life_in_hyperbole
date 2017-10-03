class Board {
  constructor(){
    this.nodes = [];
    this.edges = {};
  }

  addNode(node){
    this.nodes.push(node);
  }

}

class Cell {
  constructor(){
    this.state = false;
    this.neighbors = [];
    this.nextState = false;
  }

  addNeighbor(node){
    this.neighbors.push(node);
    node.addNeighbor.bind(this)(this);
  }

  findNextState(rule) {
    //rule is a callback that takes a number of on cells and returns true or false
    //true if the cell should turn on, false if it should turn off
    let numNeighborsOn = 0;
    this.neighbors.forEach((neighbor) => {
      numNeighborsOn += (neighbor.state ? 1 : 0);
    })
    this.nextState = rule(numNeighborsOn);
  }

  updateState() {
    this.state = this.nextState;
  }
}
