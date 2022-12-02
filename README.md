# Agents Gaming

## AGNT Contract (Mumbai)
- Name: AgentsGaming
- Symbol: AGNT
- MaxSupply: 100000000
- Address: **0xa1C6E299c761011c9ca5193b2Aaab7898A23929b**
- [ABI File](https://github.com/rpmaya/AgentsGaming/blob/main/artifacts/contracts/AgentsGaming.sol/AgentsGaming.json)
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
    const agentsGamingContract = new ethers.Contract(agentsGamingAddress, IagentsGaming, signer); 
    
    const tx = await agentsGaming.mint(buyerAddress, ethers.utils.parseEther(amount)); 
    await tx.wait();
}
```

