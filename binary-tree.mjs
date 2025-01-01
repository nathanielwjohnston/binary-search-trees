function Node(value) {
  let left = null;
  let right = null;
  return { value, left, right };
}

export function Tree(array) {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function removeDuplicates(array) {
    const newArray = [];
    for (let element of array) {
      if (!newArray.includes(element)) {
        newArray.push(element);
      }
    }

    return newArray;
  }

  function sortArray(array) {
    array.sort((a, b) => a - b);
    return array;
  }

  function buildTree(array) {
    if (array.length <= 0) {
      return null;
    }

    const mid = Math.floor((array.length - 1) / 2);
    const root = Node(array[mid]);
    // Slice includes the first value, but not the second (only up to)
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1, array.length));

    return root;
  }

  const dedupedArray = removeDuplicates(array);
  const sortedArray = sortArray(dedupedArray);

  let root = buildTree(sortedArray);

  function insert(value) {
    function checkNode(currentNode, value) {
      if (currentNode.value === value) {
        return;
      } else if (currentNode.value > value) {
        if (currentNode.left === null) {
          currentNode.left = Node(value);
          return;
        }
        checkNode(currentNode.left, value);
        return;
      } else if (currentNode.value < value) {
        if (currentNode.right === null) {
          currentNode.right = Node(value);
          return;
        }
        checkNode(currentNode.right, value);
        return;
      }
    }

    checkNode(root, value);
  }

  function deleteItem(value) {
    function getSuccessor(nodeToDelete) {
      // Inorder successor will be in rh subtree
      let currentNode = nodeToDelete.right;

      while (true) {
        if (!currentNode.left) {
          break;
        }
        currentNode = currentNode.left;
      }

      return currentNode;
    }

    function deleteNode(node, value) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          // No children
          return null;
        } else if (node.left && !node.right) {
          // One child - left child
          node = node.left;
          return node;
        } else if (node.right && !node.left) {
          // One child - right child
          node = node.right;
          return node;
        } else {
          const successor = getSuccessor(node);
          node.value = successor.value;
          node.right = deleteNode(node.right, successor.value);
        }
      } else {
        if (node.value < value) {
          // Rh subtree
          node.right = deleteNode(node.right, value);
        } else if (node.value > value) {
          // Lh subtree
          node.left = deleteNode(node.left, value);
        }
      }

      return node;
    }

    root = deleteNode(root, value);
  }

  function find(value) {
    let node = root;

    while (node && node.value !== value) {
      if (value > node.value) node = node.right;
      if (value < node.value) node = node.left;
    }

    return node;
  }

  function levelOrder(callback, rootNode = root) {
    if (!callback) {
      throw new Error("Callback required");
    }

    let node;
    let queue = [];

    queue.push(rootNode);

    while (queue.length !== 0) {
      node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  function recursiveLevelOrder(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }

    function recursion(callback, queue) {
      if (queue.length === 0) {
        return;
      }

      let node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      recursion(callback, queue);
    }

    let queue = [];
    queue.push(root);

    recursion(callback, queue);
  }

  function inOrder(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }

    function traverse(node, callback) {
      // Left subtree
      if (node.left) traverse(node.left, callback);
      // Node
      callback(node);
      // Right subtree
      if (node.right) traverse(node.right, callback);
    }

    traverse(root, callback);
  }

  function preOrder(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }

    function traverse(node, callback) {
      // Node
      callback(node);
      // Left subtree
      if (node.left) traverse(node.left, callback);
      // Right subtree
      if (node.right) traverse(node.right, callback);
    }

    traverse(root, callback);
  }

  function postOrder(callback) {
    if (!callback) {
      throw new Error("Callback required");
    }

    function traverse(node, callback) {
      // Left subtree
      if (node.left) traverse(node.left, callback);
      // Right subtree
      if (node.right) traverse(node.right, callback);
      // Node
      callback(node);
    }

    traverse(root, callback);
  }

  function height(node) {
    if (!node) {
      return null;
    }

    let lastLeaf;
    levelOrder((currentNode) => {
      lastLeaf = currentNode;
      if (currentNode === node) {
        return;
      }
    }, node);

    let currentNode = node;
    let height = 0;

    while (currentNode !== lastLeaf) {
      height += 1;
      if (lastLeaf.value > currentNode.value) currentNode = currentNode.right;
      if (lastLeaf.value < currentNode.value) currentNode = currentNode.left;
    }

    return height;
  }

  function depth(node) {
    if (!node) {
      return null;
    }

    let depth = 0;

    let currentNode = root;
    while (currentNode !== node) {
      depth += 1;
      if (node.value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return depth;
  }

  function isBalanced() {
    function checkBalance(node) {
      // check balance of child nodes
      if (node.left) {
        if (!checkBalance(node.left)) return false;
      }

      if (node.right) {
        if (!checkBalance(node.right)) return false;
      }
      // check balance of current node
      let tempHeight;

      tempHeight = height(node.left);
      const leftHeight = tempHeight ? tempHeight : 0;
      tempHeight = height(node.right);
      const rightHeight = tempHeight ? tempHeight : 0;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return true;
    }

    return checkBalance(root);
  }

  function rebalance() {
    if (isBalanced()) {
      return;
    }

    const treeArray = [];
    inOrder((node) => {
      treeArray.push(node.value);
    });

    root = buildTree(treeArray);
  }

  return {
    insert,
    deleteItem,
    find,
    levelOrder,
    recursiveLevelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
