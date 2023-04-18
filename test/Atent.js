const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const keccak256 = require('keccak256');

describe("AgentsGaming", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAgentsGaming() {

        // Contracts are deployed using the first signer/account by default
        const [owner, operator, user1, user2] = await ethers.getSigners();
    
        const AGFTFactory = await ethers.getContractFactory("AtentFactory");
        const agftFactory = await AGFTFactory.deploy();

        await agftFactory.grantRole(keccak256("DEPLOYER_ROLE"), operator.address);

        return { agftFactory, owner, operator, user1, user2 };
    }


    describe("Create Fan Tokens free", function () {
        it("Should transfer some fan tokens to the owner", async function () {
            const { agftFactory, operator, user1, user2 } = await loadFixture(deployAgentsGaming);
            
            await agftFactory.connect(operator).deployAGFanTokensContract("Social Test", "TST", 1000);
            
            await agftFactory.connect(operator).mintBatchFanTokens(0, [user1.address, user2.address], [ethers.utils.parseEther("100"), ethers.utils.parseEther("200")]);
            
            const addressFanToken = await agftFactory.fanTokens(0);
            const fanToken = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", addressFanToken);
            expect(await fanToken.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("100"));
            expect(await fanToken.balanceOf(user2.address)).to.equal(ethers.utils.parseEther("200"));
            
            //TODO Aprove
            await fanToken.connect(user1).approve(agftFactory.address, ethers.utils.parseEther("10"));
            await agftFactory.connect(user1).burnFanTokens(0, ethers.utils.parseEther("10"));
            expect(await fanToken.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("90"));
        });
    });

});

