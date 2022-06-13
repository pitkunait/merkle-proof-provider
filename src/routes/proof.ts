import express, { Request, Response } from 'express';
import { getProof, generateTree, getAddressScoreFromJson, getAddressPacked } from "../tree/treeUtils";

const router = express.Router();
const addressScore = getAddressScoreFromJson('./src/tree/tree.json');
const merkleTree = generateTree(addressScore);

interface GetProofRequest {
    address: string;
}

interface GetProofResponse {
    proof: string[];
    score: number;
}

router.post<GetProofRequest>('/get_proof', async (request: Request<{}, {}, GetProofRequest>, response: Response<GetProofResponse>, next) => {
    try {
        const {body} = request;
        let address;

        if (body.address) {
            address = body.address;
        } else {
            response.status(400).send();
            return;
        }

        const score = addressScore[address];
        if (!score) {
            response.status(400).send();
            return;
        }
        const proofReq = getAddressPacked(address, score);
        const proof = getProof(merkleTree, proofReq);
        response
            .status(200)
            .send({
                proof,
                score
            });
    } catch (e) {
        console.log(e);
        response.status(500).send();
    }

});


export default router;
