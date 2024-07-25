import {ethers} from "ethers";
import {CONTRACT_ABI} from "@/constants/chain.constants";

export class ContractServiceImpl implements ContractService{

    constructor(public apiKey: string, public chainUrl: string, public contractAddress: string) {}

    approveContract(transactionId: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    getContracts(): Promise<any> {
        return Promise.resolve(undefined);
    }

    rejectContract(transactionId: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    submitContract(signatoryAddress: string, contractDetails: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getSignatories(): Promise<string> {

        const url = `${this.chainUrl}${this.apiKey}`;

        const contractABI = CONTRACT_ABI

        const provider = new ethers.providers.JsonRpcProvider(url);

        try {
            const contract = new ethers.Contract(this.contractAddress, contractABI, provider)
            const contractName = await contract.name();
            return contractName;
        } catch (error) {
            console.error("Error fetching balance:", error);
            return "Error fetching balance";
        }
    }
}
