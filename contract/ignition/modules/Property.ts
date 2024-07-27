/*import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PropertyModule = buildModule("PropertyModule", (m) => {

  const property = m.contract("Property", [], {});

  return { property };
});

export default PropertyModule;*/

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PropertyModule = buildModule("PropertyModule", (m) => {
  // Define constructor arguments
  const signatories: string[] = [
    "0x6b1EAAbD11B9Ea39de0FF7526D282c4Ec83Cab9f",
    "0xD11420a663092511F51864D35a67e5F6592AcE10",
    // Add more addresses as needed
  ];
  const minSignatoriesRequired: number = 2;

  // Deploy the contract with constructor arguments
  const property = m.contract("Property", [signatories, minSignatoriesRequired], {});

  return { property };
});

export default PropertyModule;
