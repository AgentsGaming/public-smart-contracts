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

```

## AGFT Factory (Mumbai)
- Address: **0x8f09D9441B81Ba8Ff4557C76C3AAf824f2EeD678**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/AGFTFactory.sol/AGFTFactory.json)
- [Read Contract](https://mumbai.polygonscan.com/address/0xb0a0B11c025eb5869f3a71D716e6f319077D89F5#code)
- TODO (javascript example from test)
```javascript

```
