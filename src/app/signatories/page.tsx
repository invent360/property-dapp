"use client";

import dotenv from 'dotenv';
import {useEffect, useState} from "react";
import {ContractServiceImpl} from "@/service/provider/ethereum.service";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CHAIN_URL = process.env.NEXT_PUBLIC_CHAIN_URL;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;


export default function Home() {

    const [currentAccount, setCurrentAccount] = useState('');
    const [contractName, setContractName] = useState('');
    let contractService: ContractService;

    useEffect(() => {

        if (!API_KEY) throw new Error('Chain API key is missing');
        if (!CHAIN_URL) throw new Error('Chain Url is missing');
        if (!CONTRACT_ADDRESS) throw new Error('Contract address is missing');

        contractService = new ContractServiceImpl(API_KEY, CHAIN_URL, CONTRACT_ADDRESS)

        getData();
    }, []);

    // @ts-ignore

    const getData = async() => {
        const contractName = await contractService.getSignatories();
        setContractName(contractName)
        console.log(contractName);
    };

    return (
        <div>
            <h4>Contract name: {contractName}</h4>
        </div>
    );
}
