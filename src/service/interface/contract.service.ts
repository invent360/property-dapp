
interface ContractService {
     apiKey: string;
     chainUrl: string;
     contractAddress: string;
     submitContract(signatoryAddress: string, contractDetails: string): Promise<any>
     approveContract(transactionId: number): Promise<any>
     rejectContract(transactionId: number): Promise<any>
     getContracts(): Promise<any>
     getSignatories(): Promise<string>
}
