import { Tree } from "./binary-tree.mjs";

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.deleteItem(6345);
tree.insert(24);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
