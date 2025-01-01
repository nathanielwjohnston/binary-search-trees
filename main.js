import { Tree } from "./binary-tree.mjs";

function getRandomNumbersArray() {
  const array = [];

  const maxNumber = 100;
  const size = 20;

  function getRandomNumber() {
    return Math.floor(Math.random() * maxNumber);
  }
  let i = 0;
  while (i < 20) {
    array.push(getRandomNumber());
    i += 1;
  }

  return array;
}

function printElements(node) {
  process.stdout.write(node.value + " ");
}

const tree = Tree(getRandomNumbersArray());

console.log(tree.isBalanced()); // true

tree.levelOrder(printElements);
console.log();
tree.preOrder(printElements);
console.log();
tree.postOrder(printElements);
console.log();
tree.inOrder(printElements);
console.log();

tree.insert(102);
tree.insert(106);
tree.insert(108);
tree.insert(110);

console.log(tree.isBalanced()); // false

tree.rebalance();

console.log(tree.isBalanced()); // true

tree.levelOrder(printElements);
console.log();
tree.preOrder(printElements);
console.log();
tree.postOrder(printElements);
console.log();
tree.inOrder(printElements);
console.log();
