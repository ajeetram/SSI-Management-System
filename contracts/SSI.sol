// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SSI {
    constructor()  {}

    struct Certificate {
        string candidate_name;
        string org_name;
        string course_name;
        address candidate_add;
        uint256 expiration_date;
    }

     struct Access
    {
        address user;
        bool access;
    }
    mapping(address=>Access[])accessList;
    mapping(address=>mapping(address=>bool))ownership;
    mapping(address=>mapping(address=>bool))previousData;


    mapping(bytes32 => Certificate) public certificates;

    event certificateGenerated(bytes32 _certificateId);

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
                result := mload(add(source, 32))
        }
    }

    function generateCertificate(
        string memory _id,
        string memory _candidate_name,
        string memory _org_name, 
        string memory _course_name,
        address _candidate_add, 
        uint256 _expiration_date) public {
        bytes32 byte_id = stringToBytes32(_id);
        require(certificates[byte_id].expiration_date == 0, "Certificate with given id already exists");
        certificates[byte_id] = Certificate(_candidate_name, _org_name, _course_name,_candidate_add, _expiration_date);
        emit certificateGenerated(byte_id);
    }

    function getData(string memory _id) public view returns(string memory, string memory, string memory,address, uint256) {
        bytes32 byte_id = stringToBytes32(_id);
        Certificate memory temp = certificates[byte_id];
        require(msg.sender==temp.candidate_add || ownership[temp.candidate_add][msg.sender],"You are not the owner");
        require(temp.expiration_date != 0, "No data exists");
        return (temp.candidate_name, temp.org_name, temp.course_name, temp.candidate_add,temp.expiration_date);
    }

     function allow(address user) external{
        ownership[msg.sender][user]=true;
        if(previousData[msg.sender][user]==true)
        {
            for(uint i=0;i<accessList[msg.sender].length;i++)
            {
                if(accessList[msg.sender][i].user == user)
                {
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else
        {
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]==true;
        }
    }

    function disAllow(address user) public{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++)
        {
            if(accessList[msg.sender][i].user==user)
            {
                accessList[msg.sender][i].access=false;

            }
        }
    }

    function shareAccess() public view returns(Access[] memory)
    {
        return accessList[msg.sender];
    }
}