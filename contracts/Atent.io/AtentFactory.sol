// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./AtentFanTokens.sol";

contract AtentFactory is AccessControl {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    AtentFanTokens[] public fanTokens; //an array that contains different ERC20 tokens deployed
    mapping(uint256 => address) public indexToOwner; //index to ERC20 owner address
    
    event FanTokenCreated(uint256 index, address owner, address tokenContract); //emited when ERC20 token is deployed
    event FanTokenMinted(address owner, address tokenContract, uint amount); //emited when ERC20 token is minted

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);
        //_grantRole(MINTER_ROLE, msg.sender);
    }

    function deployAGFanTokensContract(string memory name, string memory symbol, uint64 maxSupply) public onlyRole(DEPLOYER_ROLE) returns (address) {
        AtentFanTokens ft = new AtentFanTokens(name, symbol, maxSupply);
        fanTokens.push(ft);
        indexToOwner[fanTokens.length - 1] = msg.sender;
        emit FanTokenCreated(fanTokens.length - 1, msg.sender, address(ft));
        return address(ft);
    }

    function mintFanTokens(uint256 projectId, address to, uint256 amount) public {
        require(indexToOwner[projectId] == msg.sender, "Minting by non-owner");
        fanTokens[projectId].mint(to, amount);
        emit FanTokenMinted(msg.sender, address(fanTokens[projectId]), amount);
    }

    function mintBatchFanTokens(uint256 projectId, address [] memory tos, uint256 [] memory amounts) public {
        require(indexToOwner[projectId] == msg.sender, "Minting by non-owner");
        require(tos.length == amounts.length, "Invalid Array Length");
        for (uint32 i; i < tos.length; i++) {
            mintFanTokens(projectId, tos[i], amounts[i]);
        }
    }

    function burnFanTokens(uint256 projectId, uint256 amount) public {
        fanTokens[projectId].transferFrom(msg.sender, indexToOwner[projectId], amount);
    }
}