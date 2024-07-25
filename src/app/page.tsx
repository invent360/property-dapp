"use client";

import {Button} from "primereact/button";
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const newContract = async () => {
        router.push(`/signatories`)
    }

  return (
      <div className="flex items-center justify-center  w-screen h-screen">
          <Button label="Create new Contract" icon="pi pi-users" iconPos="right" onClick={newContract}/>
      </div>
  );
}
