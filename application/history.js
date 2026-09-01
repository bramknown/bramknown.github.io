/** Simple undo/redo stack of ImageData snapshots (active layer only for memory) */
export class History {
  constructor(max = 30) {
    this.max = max;
    this.stack = [];
    this.index = -1;
  }

  push(imageData) {
    // Drop redo branch
    this.stack = this.stack.slice(0, this.index + 1);
    this.stack.push(imageData);
    if (this.stack.length > this.max) {
      this.stack.shift();
    } else {
      this.index++;
    }
  }

  canUndo() {
    return this.index > 0;
  }

  canRedo() {
    return this.index < this.stack.length - 1;
  }

  undo() {
    if (!this.canUndo()) return null;
    this.index--;
    return this.stack[this.index];
  }

  redo() {
    if (!this.canRedo()) return null;
    this.index++;
    return this.stack[this.index];
  }

  clear() {
    this.stack = [];
    this.index = -1;
  }
}