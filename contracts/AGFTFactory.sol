// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./AGFanTokens.sol";

contract AGFTFactory is AccessControl {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    AGFanTokens[] public fanTokens; //an array that contains different ERC20 tokens deployed
    mapping(uint256 => address) public indexToContract; //index to contract address mapping
    mapping(uint256 => address) public indexToOwner; //index to ERC20 owner address
    
    event FanTokenCreated(uint256 index, address owner, address tokenContract); //emited when ERC20 token is deployed
    event FanTokenMinted(address owner, address tokenContract, uint amount); //emited when ERC20 token is minted

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEPLOYER_ROLE, msg.sender);
        //_grantRole(MINTER_ROLE, msg.sender);
    }

    function deployAGFanTokensContract(string memory name, string memory symbol, uint64 maxSupply) public onlyRole(DEPLOYER_ROLE) returns (address) {
        AGFanTokens ft = new AGFanTokens(name, symbol, maxSupply);
        fanTokens.push(ft);
        indexToContract[fanTokens.length - 1] = address(ft);
        indexToOwner[fanTokens.length - 1] = tx.origin;
        emit FanTokenCreated(fanTokens.length - 1, tx.origin, address(ft));
        return address(ft);
    }

    function mintFanTokens(uint256 projectId, address to, uint256 amount) public {
        require(indexToOwner[projectId] == tx.origin, "Minting by non-owner");
        fanTokens[projectId].mint(to, amount);
        emit FanTokenMinted(msg.sender, address(fanTokens[projectId]), amount);
    }
}