class Cell {
  constructor(id){
    this.state = false;
    this.id = id;
    this.parents = [];
    this.siblings = [];
    this.children = [];
    this.nextState = false;
  }

  addParentId(parent) {
    console.log('parent', parent);
    this.parents.push(parent.id);
    parent.addChild(this);
  }

  addChildId(child) {
    this.children.push(child.id);
    // child.addParent(this); this causes a loop
  }

  addRightSiblingId(sibling) {
    this.siblings.push(sibling.id);
    sibling.addLeftSibling(this);
  }

  addLeftSiblingId(sibling) {
    this.siblings.unshift(sibling.id);
  }

  neighborIds() {
    return (this.parents).concat(this.siblings).concat(this.children);
  }

  //these methods are specifically so that the first cell's children
  //are arranged clockwise

  addSecondParentId(parent) {
    this.parents.push(parent.id);
    parent.addSharedChild(this);
  }

  addSharedChildId(child) {
    this.children.unshift(child.id);
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
