"use client";

import useWalletStore from "../store/walletStore";
import React, { useRef, useState, FormEvent } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

export default function Home() {

    const { isConnected, userAddress, contract } = useWalletStore();// Access the state
    const [visible, setVisible] = useState<boolean>(false);

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [agreement, setAgreement] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setVisible(false)
        console.log({
            address1,
            address2,
            address3,
            agreement
        });

        if (contract){
            const transaction = await contract.submit(address1, agreement);
            await transaction.wait();
            console.log("transaction completed...!")
        }
    }

  return (
      <>
          <Card title="Connected Wallet" className="mt-4">
              <p>Connected: {isConnected ? <i className="pi pi-check"></i> : <i className="pi pi-times"></i>}</p>
              <p>User Address: {userAddress}</p>
          </Card>
          <Button className="mt-2" label="Create Contract" icon="pi pi-address-book" iconPos="right" onClick={() => setVisible(true)}/>
          <Card title="Contracts" className="mt-4">

          </Card>
          <Dialog header="New Contractual Agreement" visible={visible} style={{width: '50vw'}} onHide={() => {
              if (!visible) return;
              setVisible(false);
          }}>
              <div className="card">
                  <div className="grid grid-nogutter">

                      <form onSubmit={handleSubmit} className="grid formgrid">
                          <div className="col-12 field mb-4">
                              <input
                                  id="address1"
                                  placeholder="Address 1"
                                  type="text"
                                  className="p-inputtext w-full"
                                  value={address1}
                                  onChange={(e) => setAddress1(e.target.value)}
                              />
                          </div>
                          <div className="col-12 field mb-4">
                              <input
                                  id="address2"
                                  placeholder="Address 2"
                                  type="text"
                                  className="p-inputtext w-full"
                                  value={address2}
                                  onChange={(e) => setAddress2(e.target.value)}
                              />
                          </div>
                          <div className="col-12 field mb-4">
                              <input
                                  id="address3"
                                  placeholder="Address 3"
                                  type="text"
                                  className="p-inputtext w-full"
                                  value={address3}
                                  onChange={(e) => setAddress3(e.target.value)}
                              />
                          </div>
                          <div className="col-12 field mb-4">
                              <InputTextarea
                                  className="p-inputtextarea w-full"
                                  placeholder="Agreement"
                                  value={agreement}
                                  rows={5}
                                  cols={30}
                                  onChange={(e) => setAgreement(e.target.value)}
                              />
                          </div>
                          <div className="col-12 field mb-4">
                              <Button
                                  className="flex-order-1 lg:flex-order-2"
                                  label="Submit"
                                  icon="pi pi-fw pi-check"
                                  iconPos="right"
                                  type="submit"
                              />
                          </div>
                      </form>
                  </div>
              </div>

          </Dialog>
      </>

  );
}
