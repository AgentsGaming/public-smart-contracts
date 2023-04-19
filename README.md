# Atent.io

## Atent Factory (Mumbai)
- Address: **0x762A2867EA4332C912a582037fCE07747eDe80dd**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/Atent.io/AtentFactory.sol/AtentFactory.json)
- [Read Contract](https://mumbai.polygonscan.com/address/0x762A2867EA4332C912a582037fCE07747eDe80dd#code)
```javascript
    import { ethers } from 'ethers';
    require('dotenv').config();
    import IFactory from './AgentsGaming.json';
    const factoryAddress = "0x762A2867EA4332C912a582037fCE07747eDe80dd";
    const TESTNET = "https://rpc-mumbai.maticvigil.com/"
    const provider = new ethers.providers.JsonRpcProvider(TESTNET);
    const wallet = new ethers.Wallet(process.env.PrivateKey1); //Get PrivateKey with dotenv (.env: PrivateKey1=xxx)
    const signer = wallet.connect(provider);

    const atentFactory = new ethers.Contract(factoryAddress, IFactory, signer);
    const internalAddress = "<address>";

    //Example of Create Fan Token
        //From signer = Organization1 wallet
        await atentFactory.grantRole(keccak256("DEPLOYER_ROLE"), internalAddress);
        await atentFactory.deployAGFanTokensContract("Social Test", "TST", 1000);
    //Example of Minting Fan Token
         //From signer = Organization1 wallet
        const projectId = 0;
        // From projectId = 0, sends 100 fanTokens to user1 and 200 fanTokens to user2
        await await atentFactory.mintBatchFanTokens(projectId, [user1Address, user2Address], [ethers.utils.parseEther("100"), ethers.utils.parseEther("200")]);
    //Example of Burning
        const addressFanToken = await atentFactory.fanTokens(projectId);
        const fanToken = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", addressFanToken);
        //From signer = User1 wallet
        await fanToken.approve(factoryAddress, ethers.utils.parseEther("10"));
        await agftFactory.burnFanTokens(projectId, ethers.utils.parseEther("10"));
        
```

# Agents Gaming

## AGNT Contract (Mumbai)
- Name: AgentsGaming
- Symbol: AGNT
- MaxSupply: 100000000
- Address: **0xa1C6E299c761011c9ca5193b2Aaab7898A23929b**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/AgentsGaming.sol/AgentsGaming.json)
- [Read Contract](https://mumbai.polygonscan.com/address/0xa1C6E299c761011c9ca5193b2Aaab7898A23929b#readContract)
- Call to mint() function:
```javascript
import { ethers } from 'ethers';
require('dotenv').config();
import IagentsGaming from './AgentsGaming.json';
const agentsGamingAddress = '0xa1C6E299c761011c9ca5193b2Aaab7898A23929b';
async function purchase(buyerAddress, amount) {
    /* From metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    */
    /* From server with private key */
    const TESTNET = "https://rpc-mumbai.maticvigil.com/"
    const provider = new ethers.providers.JsonRpcProvider(TESTNET);
    const wallet = new ethers.Wallet(process.env.PrivateKey); //Get PrivateKey with dotenv (.env: PrivateKey=xxx)
    const signer = wallet.connect(provider);
    /* Instance contract and call to function */
    const agentsGamingContract = new ethers.Contract(agentsGamingAddress, IagentsGaming, signer); 
    const tx = await agentsGaming.mint(buyerAddress, ethers.utils.parseEther(amount)); 
    await tx.wait();
}
```

## AG Market (Mumbai)
- Address: **0xb0a0B11c025eb5869f3a71D716e6f319077D89F5**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/AGMarket.sol/AGMarket.json)
- [Read Contract](https://mumbai.polygonscan.com/address/0x8f09D9441B81Ba8Ff4557C76C3AAf824f2EeD678#code)
- TODO (javascript example from test)
```javascript
    //...
    const agMarket = new ethers.Contract(agMarketAddress, IAGMarket, signer);
    const price = 1; // 1 AGFanToken to pay to create a new project, it can be 0 or greater.
    await agMarket.setPrice(ethers.utils.parseEther("1")); //It is setted by the owner of contract only

    const name = "Social Test";
    const symbol = "TST";
    const max_supply = 1000;
    await agMarket.createProject(name, symbol, max_supply); //It is called by users paying price setted

    const projectId = 0;
    const toUserAddress = "<address>";
    const amount = ethers.utils.parseEther("100")
    await agMarket.mintFanToken(projectId, toUserAddress, amount); //It is called by the same user who creates the project
    const addressFanToken = await agftFactory.fanTokens(projectId);
```

## AGFT Factory (Mumbai)
- Address: **0x8f09D9441B81Ba8Ff4557C76C3AAf824f2EeD678**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/AGFTFactory.sol/AGFTFactory.json)
- [Read Contract](https://mumbai.polygonscan.com/address/0xb0a0B11c025eb5869f3a71D716e6f319077D89F5#code)
- TODO (javascript example from test)
```javascript
    //...
    const userAddress = "<address>";
    const fanToken = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", addressFanToken); //Get addressFanToken from AGMarket Contract
    const bal = await fanToken.balanceOf(userAddress); //Examplo of use of fanToken like ERC20
```
