// stores/walletStore.ts
import { create } from 'zustand';
import {Contract, Signer} from 'ethers';

interface WalletStore {
    isConnected: boolean;
    userAddress: string;
    signer: Signer | null;
    contract: Contract | null;
    setIsConnected: (isConnected: boolean) => void;
    setUserAddress: (address: string) => void;
    setSigner: (signer: Signer | null) => void;
    setContract: (contract: Contract | null) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
    isConnected: false,
    userAddress: '',
    signer: null,
    contract: null,

    setIsConnected: (isConnected: boolean) => set({ isConnected }),
    setUserAddress: (address: string) => set({ userAddress: address }),
    setSigner: (signer: Signer | null) => set({ signer }),
    setContract: (contract: Contract | null) => set({ contract })
}));

export default useWalletStore;

