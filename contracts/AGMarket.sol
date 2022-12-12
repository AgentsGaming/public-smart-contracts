// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./AGFTFactory.sol";
import "./AgentsGaming.sol";

contract AGMarket is AccessControl {

    address private agTreasury;
    address private agFactory;
    address private agToken;
    uint256 private index;
    uint256 public agPrice;

    mapping(uint256 => address) public creators;

    event CreateProjectAccount(
        uint256 id,
        address owner,
        string name,
        string symbol,
        uint256 suppy,
        address contractAddress
    );

    constructor(
        address treasury,
        uint256 price,
        address factory,
        address token
    ) {
        require(treasury != address(0), "Invalid Address");
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        agTreasury = treasury;
        agFactory = factory;
        agToken = token;
        agPrice = price;
        index = 0;
    }

    function setPrice(uint256 price) public onlyRole(DEFAULT_ADMIN_ROLE) {
        agPrice = price;
    }

    function createProject(string memory name, string memory symbol, uint64 supply) public
    {
        //Check if name, symbol and supply are valid 
        require(
            bytes(name).length > 0 && bytes(symbol).length > 0 && supply > 0,
            "Invalid name, symbol or supply"
        );

        require(AgentsGaming(agToken).balanceOf(msg.sender) >= agPrice, "AGNT balance is not enough");

        creators[index] = msg.sender;
        if (agPrice > 0) {
            AgentsGaming(agToken).transferFrom(msg.sender, agTreasury, agPrice);
        }
        address fanTokenAddress = AGFTFactory(agFactory).deployAGFanTokensContract(name, symbol, supply);

        emit CreateProjectAccount(
            index++,
            msg.sender,
            name,
            symbol,
            supply,
            fanTokenAddress
        );
    }

    function mintFanToken(uint256 projectId, address to, uint256 amount) public 
    {
        require (creators[projectId] == msg.sender, "Call to mint by non-owner");
        AGFTFactory(agFactory).mintFanTokens(projectId, to, amount);
    }
}