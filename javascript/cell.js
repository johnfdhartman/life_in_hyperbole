class Cell {
  constructor(depth){
    this.state = false;
    this.parents = [];
    this.siblings = [];
    this.children = [];
    this.nextState = false;
    this.polygon = null;
  }

  addParent(parent) {
    this.parents.push(parent);
    parent.addChild(this);
  }

  addChild(child) {
    this.children.push(child);
    // child.addParent(this); this causes a loop
  }

  addRightSibling(sibling) {
    this.siblings.push(sibling);
    sibling.addLeftSibling(sibling);
  }

  addLeftSibling(sibling) {
    this.siblings.unshift(sibling);
  }

  neighbors() {
    return (this.parents).concat(this.siblings).concat(this.children);
  }

  findNextState(rule) {
    //rule is a callback that takes a number of on cells and returns true or false
    //true if the cell should turn on, false if it should turn off
    let numNeighborsOn = 0;
    this.neighbors().forEach((neighbor) => {
      numNeighborsOn += (neighbor.state ? 1 : 0);
    });
    this.nextState = rule(numNeighborsOn);
  }

  updateState() {
    this.state = this.nextState;
  }
}

export default Cell;
