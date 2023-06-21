class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    let newNode = new Node(value);

    const searchTree = (node) => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      } else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };

    searchTree(this.root);
  }

  findMinNode(value) {
    console.log(value);
    let currentNode = value;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  removeNode(node, key) {
    // If the root is null exit
    if (node === null) return null;
    // If data to be delete is less than a roots data then move left
    else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // If data to be delete is greater than roots data then move right
    else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is equal to the current root's data then delete current node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      var aux = this.findMinNode(node.right);
      node.value = aux.value;

      // node.right = this.removeNode(node.right, aux.data);
      node.right = this.removeNode(node.right, aux.value);

      return node;
    }
  }

  dfsInorder() {
    let result = [];

    const traverse = (node) => {
      if (node.left) traverse(node.left);
      result.push(node.value);

      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  remove(value) {
    // root is re-initialized with root of a modified tree.
    this.root = this.removeNode(this.root, value);
  }

  findNode(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        console.log(true);
        return true;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    console.log(false);
    return false;
  }
}

export default BST;
