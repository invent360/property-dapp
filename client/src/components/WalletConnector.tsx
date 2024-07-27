// components/WalletConnector.tsx
import { useEffect } from 'react';
import {BrowserProvider, ethers} from 'ethers';
import useWalletStore from "@/store/walletStore";
import {Button} from "primereact/button";
import {CONTRACT_ABI} from "@/constants/chain.constants";

function WalletConnector() {
    const {
        userAddress,
        isConnected,
        setUserAddress,
        setIsConnected,
        setSigner,
        setContract
    } = useWalletStore()

    const connectWallet = async () => {
        const contractAddress = "0x46436dcb1b29b111a00bb61f5475b420ef1104eb";
        const contractABI = CONTRACT_ABI;

        try {
            if (!window.ethereum) throw new Error('MetaMask is not installed');

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
            const address = await signer.getAddress();
            setIsConnected(true);
            setUserAddress(address);

            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            setContract(contract)

            const network = await provider.getNetwork();
            const chainID = network.chainId;
            const sepoliaNetworkId = "11155111";

            if (chainID.toString() !== sepoliaNetworkId) {
                alert("Please switch your MetaMask to sepolia network");
                return;
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                const newAddress = accounts[0];
                setUserAddress(newAddress);
            } else {
                setIsConnected(false);
                setUserAddress('');
                setSigner(null);
            }
        };

        const handleChainChanged = () => {
            // Handle network changes if needed
            console.log('Network changed');
        };

        // Set up event listeners for MetaMask
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        // Clean up event listeners on component unmount
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, [setIsConnected, setUserAddress, setSigner]);

    const walletLabel: string = isConnected
        ? `${userAddress?.slice(0, 8)}...`
        : "Connect wallet";

    return(
        <Button
            className={`absolute right-0 bg-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-orange-400 ${
                isConnected ? `bg-[#008000] text-white cursor-not-allowed opacity-80` : `bg-[#ff6f61] text-white cursor-pointer transition-all duration-300 hover:bg-[#e65c50]`
            }`}
            label={walletLabel}
            icon="pi pi-wallet"
            iconPos="right"
            onClick={connectWallet}
        />
    );
};

export default WalletConnector;
