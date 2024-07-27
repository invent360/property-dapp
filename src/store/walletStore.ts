// stores/walletStore.ts
import { create } from 'zustand';
import { Signer } from 'ethers';

interface WalletStore {
    isConnected: boolean;
    userAddress: string;
    signer: Signer | null;
    setIsConnected: (isConnected: boolean) => void;
    setUserAddress: (address: string) => void;
    setSigner: (signer: Signer | null) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
    isConnected: false,
    userAddress: '',
    signer: null,

    setIsConnected: (isConnected: boolean) => set({ isConnected }),
    setUserAddress: (address: string) => set({ userAddress: address }),
    setSigner: (signer: Signer | null) => set({ signer })
}));

export default useWalletStore;

