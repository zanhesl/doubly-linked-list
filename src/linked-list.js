const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
  }

  append(data) {
    if (this.length) {
      const newTail = new Node(data, this._tail)
      this._tail.next = newTail;
      this._tail = newTail;
    } else {
      const newTail = new Node(data)
      this._head = newTail;
      this._tail = newTail;
    }
    this.length ++;

    return this;
  }

  head() {
    if (this._head){
      return this._head.data;
    }
    return null;
  }

  tail() {
    if (this._tail){
      return this._tail.data;
    }
    return null;
  }

  at(index) {
    let currentElement = this._head;
    let i = 0;
    while (i < index) {
      currentElement = currentElement.next;
      i+=1;
    }
    return currentElement.data;
  }

  atNode(index) {
    let currentElement = this._head;
    let i = 0;
    while (i < index) {
      currentElement = currentElement.next;
      i+=1;
    }
    return currentElement;
  }

  insertAt(index, data) {
    this.length++;
    if (!index) {
      const insertedNode = new Node(data, null, this.atNode(index));
      this._head = insertedNode;
      this.atNode(index).prev = insertedNode;
      return this;
    }
    const insertedNode = new Node(data, this.atNode(index-1), this.atNode(index));
    this.atNode(index-1).next = insertedNode;
    this.atNode(index).prev = insertedNode;
    return this;
  }

  isEmpty() {
    if (this.length) {
      return false;
    }
    return true;
  }

  clear() {
    this.length = 0;
    this._head = null;
    this._tail = null;
    return this;
  }

  deleteAt(index) {
    this.length--;
    if (this.length === 0) {
      this.clear();
      return this;
    }
    switch (index) {
      case this.length - 1:
        this.atNode(index - 1).next = null;
        this._tail = this.atNode(index - 1);
        break;
      case 0:
        this.atNode(index + 1).prev = null;
        this._head = this.atNode(index + 1);
        break;
      default:
        this.atNode(index - 1).next = this.atNode(index + 1);
        this.atNode(index + 1).prev = this.atNode(index - 1);
    }
    return this;
  }

  reverse() {
    let currentElement = this._head;
    for (let i = 0; i < this.length; i++) {
      currentElement.next = [currentElement.prev, currentElement.prev = currentElement.next][0];
      currentElement = currentElement.prev
    }
    this._head = [this._tail, this._tail = this._head][0];

    return this;
  }

  indexOf(data) {
    for (let i = 0; i < this.length; i++) {
      if (this.at(i) === data) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = LinkedList;
const list = new LinkedList();
list.append(4).reverse().deleteAt(0).clear().insertAt(0, 3);
