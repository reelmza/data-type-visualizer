class STACK {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // Add element to top of stack
  push(element) {
    this.items[this.count] = element;
    console.log(`Added ${element} at index ${this.count}`);
    this.count += 1;
    return this.count - 1;
  }

  // Return and remove top element in stack
  // Return undefined if stack is empty
  pop() {
    // eslint-disable-next-line eqeqeq
    if (this.count == 0) return undefined;
    let deleteItem = this.items[this.count - 1];

    const newItems = this.items.filter((item) => item !== deleteItem);
    this.items = newItems;

    this.count -= 1;
    console.log(`${deleteItem} removed`);
    return deleteItem;
  }

  // Check top element in stack
  peek() {
    console.log(`Top element is ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  // Check if stack is empty
  isEmpty() {
    // eslint-disable-next-line eqeqeq
    console.log(this.count == 0 ? "Stack is empty" : "Stack is NOT empty");
    // eslint-disable-next-line eqeqeq
    return this.count == 0;
  }

  // Check size of stack
  size() {
    console.log(`${this.count} elements in stack`);
    return this.count;
  }

  // Print elements in stack
  print() {
    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }

  // Clear stack
  clear() {
    this.items = [];
    this.count = 0;
    console.log("Stack cleared..");
    return this.items;
  }
}
export default STACK;
// const stack = new STACK();

// stack.isEmpty();

// stack.push(100);
// stack.push(200);

// stack.peek();

// stack.push(300);

// console.log(stack.print());

// stack.pop();
// stack.pop();

// stack.clear();

// console.log(stack.print());

// stack.size();

// stack.isEmpty();
