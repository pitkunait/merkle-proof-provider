import fs from 'fs';
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";


interface AddressScore {
    [address: string]: number,
}

export const getAddressScoreFromJson = (jsonPath: string): AddressScore =>
    JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

export const getAddressPacked = (address: string, score: number) =>
    ethers.utils.solidityPack(['address', 'uint256'], [address, score]);

export const generateTree = (data: AddressScore) => {
    const leaves = Object.entries(data).map(([key, value]) => getAddressPacked(key, value));
    return new MerkleTree(leaves, keccak256, {hashLeaves: true, sortPairs: true});
};

export const getProof = (tree: MerkleTree, account: string) => tree.getHexProof(keccak256(account));