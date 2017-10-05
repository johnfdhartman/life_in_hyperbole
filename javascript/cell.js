class Cell {
  constructor(id){
    this.state = false;
    this.id = id;
    this.parents = [];
    this.siblings = [];
    this.children = [];
    this.nextState = false;
  }

  addParent(parent) {
    this.parents.push(parent.id);
    parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child.id);
    // child.addParent(this); this causes a loop
  }

  addRightSibling(sibling) {
    this.siblings.push(sibling.id);
    sibling.addLeftSibling(sibling.id);
  }

  addLeftSibling(sibling) {
    this.siblings.unshift(sibling.id);
  }

  neighbors() {
    return (this.parents).concat(this.siblings).concat(this.children);
  }

  // findNextState(rule) {
  //   //rule is a callback that takes a number of on cells and returns true or false
  //   //true if the cell should turn on, false if it should turn off
  //   let numNeighborsOn = 0;
  //   this.neighbors().forEach((neighbor) => {
  //     numNeighborsOn += (neighbor.state ? 1 : 0);
  //   });
  //   this.nextState = rule(numNeighborsOn);
  // }

  updateState() {
    this.state = this.nextState;
  }
}

export default Cell;
