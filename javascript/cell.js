class Cell {
  constructor(id){
    this.state = false;
    this.id = id;
    this.parentIds = [];
    this.siblingIds = [];
    this.childIds = [];
    this.nextState = false;
  }

  addParentId(parent) {
    this.parentIds.push(parent.id);
    parent.addChild(this);
  }

  addChildId(child) {
    this.childIds.push(child.id);
    // child.addParent(this); this causes a loop
  }

  addRightSiblingId(sibling) {
    this.siblingIds.push(sibling.id);
    sibling.addLeftSibling(this);
  }

  addLeftSiblingId(sibling) {
    this.siblingIds.unshift(sibling.id);
  }

  neighborIds() {
    return (this.parentIds).concat(this.siblingIds).concat(this.childIds);
  }

  //these methods are specifically so that the first cell's childIds
  //are arranged clockwise

  addSecondParentId(parent) {
    this.parentIds.push(parent.id);
    parent.addSharedChild(this);
  }

  addSharedChildId(child) {
    this.childIds.unshift(child.id);
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
