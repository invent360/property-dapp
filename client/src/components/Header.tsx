"use client";

import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import {useRef} from "react";
import {Toast} from "primereact/toast";
import {MenuItem} from "primereact/menuitem";
import {useRouter} from "next/navigation";
import WalletConnector from "./WalletConnector";

function Header() {
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: async () => {
               router.push(`/`)
            }
        },
        {
            label: 'Signatories',
            icon: 'pi pi-users',
            command: async () => {
                router.push(`/signatories`)
            }
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="10" className="mr-2 h-4rem"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
        </div>
    );
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex items-center justify-between relative">
                <Menubar className="h-4rem" model={items} start={start} end={end} />
                <WalletConnector />
                <Toast ref={toast} />
            </div>
        </header>
    )
}

export default Header
