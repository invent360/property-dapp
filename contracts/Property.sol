// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.24 and less than 0.9.0
pragma solidity ^0.8.24;

contract Property {

    struct Transaction {
        address signatory;
        string contractDetails;
        bool isExecuted;
    }

    Transaction[] public transactions;

    string details;
    address[] public signatories;
    mapping(address => bool) public isSignatory;
    uint public minimumRequiredSignatories;

    mapping(uint => mapping (address => bool)) public approved;

    //Only a signatory should be able to submit a transaction
    modifier onlySignatory(){
        require(isSignatory[msg.sender], "not a valid signatory");
        _;
    }

    modifier transactionExists(uint _transactionId){
        require(_transactionId < transactions.length, "transaction does not exist");
        _;
    }

    modifier notApproved(uint _transactionId){
        require(!approved[_transactionId][msg.sender], "transaction already approved");
        _;
    }

    modifier notExecuted(uint _transactionId){
        require(!transactions[_transactionId].isExecuted, "transaction already executed");
        _;
    }


    constructor(address[] memory _signatories, uint _minSignatoriesRequired){
        require(_signatories.length > 0, "signatories required");
        require(_minSignatoriesRequired > 0 && _minSignatoriesRequired <= signatories.length, "minimum number of signatories not met");

        for( uint i; i<_signatories.length; i++){
            address signatory = _signatories[i];
            require(signatory != address(0), "invalid signatory");
            require(!isSignatory[signatory], "signatory is none unique");

            isSignatory[signatory] = true;
            signatories.push(signatory);
            minimumRequiredSignatories = _minSignatoriesRequired;
        }
    }



    //Events
    event Submit(uint indexed transactionId, address indexed initiator, string contractDetails);
    event Approve(uint indexed transactionId, address indexed signatory);
    event Revoke(uint indexed transactionId, address indexed signatory);
    event Execute(uint indexed transactionId);



    function submit(address _signatory, string memory _details) external onlySignatory {
        require(bytes(_details).length > 0, "Contract details cannot be empty");
        details = _details;

        transactions.push(Transaction({
            signatory: _signatory,
            contractDetails: _details,
            isExecuted: false
        }));

        emit Submit(transactions.length -1, msg.sender, details);
    }

    function approve(uint _transactionId) external onlySignatory  transactionExists(_transactionId) notApproved(_transactionId) notExecuted(_transactionId){
        approved[_transactionId][msg.sender] = true;
        emit Approve(_transactionId, msg.sender);
    }

    function _getApprovalCount(uint _transactionId) private view returns (uint count) {
        for(uint i; i< signatories.length; i++){
            if (approved[_transactionId][signatories[i]]){
                count += 1;
            }
        }
    }

    function execute(uint _transactionId) external transactionExists(_transactionId) notExecuted(_transactionId){
        require(_getApprovalCount(_transactionId) >= minimumRequiredSignatories, "number of approvals less that minimum required");
        Transaction storage transaction = transactions[_transactionId];

        transaction.isExecuted = true;

        //Persist transaction data to blockchain

        emit Execute(_transactionId);
    }
}
