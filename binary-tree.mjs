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

  console.log(sortedArray);

  let root = buildTree(sortedArray);

  prettyPrint(root);
  return {};
}
