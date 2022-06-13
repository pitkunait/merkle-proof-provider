import { generateTree, getAddressScoreFromJson } from "./treeUtils";

const addressScore = getAddressScoreFromJson('./src/tree/tree.json');
const merkleTree = generateTree(addressScore);
const root = merkleTree.getHexRoot();

console.log(root);
