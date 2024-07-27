// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.24 and less than 0.9.0
pragma solidity ^0.8.24;

contract Property {

    address[] public signatories;

    uint public minimumRequiredSignatories;

    struct Transaction {
        address signatory;
        string agreement;
        bool isExecuted;
    }
    Transaction[] public transactions;

    mapping(uint => mapping (address => bool)) public approved;

    mapping(address => bool) public isSignatory;


    modifier onlySignatory(){
        require(isSignatory[msg.sender], "not a valid signatory");
        _;
    }

    modifier transactionExists(uint _transactionId){
        require(_transactionId < transactions.length, "transaction does not exist");
        _;
    }

    modifier notApproved(uint _transactionId){
        require(!approved[_transactionId][msg.sender], "transaction already approved by signatory");
        _;
    }

    modifier notExecuted(uint _transactionId){
        require(!transactions[_transactionId].isExecuted, "transaction already executed");
        _;
    }


    constructor(address[] memory _signatories, uint _minSignatoriesRequired){
        require(_signatories.length >1, "at least one signatory required");
        require(_minSignatoriesRequired > 0 && _minSignatoriesRequired <= _signatories.length, "minimum number of signatories not met");

        for( uint i; i<_signatories.length; i++){
            address signatory = _signatories[i];
            require(signatory != address(0), "invalid signatory, signatory address should nit be empty");
            require(!isSignatory[signatory], "signatory is none unique");

            isSignatory[signatory] = true;
            signatories.push(signatory);
        }
        minimumRequiredSignatories = _minSignatoriesRequired;
    }



    //Events
    event Submit(uint indexed transactionId, address indexed initiator, string contractDetails);
    event Approve(uint indexed transactionId, address indexed signatory);
    event Revoke(uint indexed transactionId, address indexed signatory);
    event Execute(uint indexed transactionId);



    function submit(address _initiator, string memory _agreementDetails) public onlySignatory {
        require(bytes(_agreementDetails).length > 0, "contract details cannot be empty");
        agreement = _agreementDetails;

        Transaction memory transaction = Transaction({
            signatory: _initiator,
            agreement: _agreementDetails,
            isExecuted: false
        });

        transactions.push(transaction);

        emit Submit(transactions.length -1, msg.sender, agreement);
    }

    function approve(uint _transactionId) external onlySignatory  transactionExists(_transactionId) notApproved(_transactionId) notExecuted(_transactionId){
        approved[_transactionId][msg.sender] = true;
        emit Approve(_transactionId, msg.sender);

        if (_getApprovalCount(_transactionId) >= minimumRequiredSignatories){
            _execute(_transactionId);
        }
    }


    function _getApprovalCount(uint _transactionId) internal view returns (uint count) {
        for(uint i; i< signatories.length; i++){
            if (approved[_transactionId][signatories[i]]){
                count += 1;
            }
        }
    }

    function _execute(uint _transactionId) internal  transactionExists(_transactionId) notExecuted(_transactionId){
        require(_getApprovalCount(_transactionId) >= minimumRequiredSignatories, "number of approvals less that minimum required");
        Transaction storage transaction = transactions[_transactionId];

        //Persist transaction data to blockchain

        transaction.isExecuted = true;

        emit Execute(_transactionId);
    }
}
