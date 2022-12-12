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
        const [owner, operator, user] = await ethers.getSigners();
        const price = 0;
        const AgentsGaming = await ethers.getContractFactory("AgentsGaming");
        const AGFTFactory = await ethers.getContractFactory("AGFTFactory");
        const AGMarket = await ethers.getContractFactory("AGMarket");
        const agentsGaming = await AgentsGaming.deploy();
        const agftFactory = await AGFTFactory.deploy();
        const agMarket = await AGMarket.deploy(owner.address, ethers.utils.parseEther(price.toString()), agftFactory.address, agentsGaming.address);

        await agftFactory.grantRole(keccak256("DEPLOYER_ROLE"), agMarket.address);

        return { agentsGaming, agMarket, owner, operator, user };
    }

    describe("Deployment", function () {
        it("Should set the right symbol", async function () {
            const { agentsGaming } = await loadFixture(deployAgentsGaming);
            expect(await agentsGaming.symbol()).to.equal("AGNT");
        });

        it("Should mint by owner", async function () {
            const { agentsGaming, user } = await loadFixture(deployAgentsGaming);
            await agentsGaming.mint(user.address, ethers.utils.parseEther("1"));         
            expect(await agentsGaming.balanceOf(user.address)).to.equal(ethers.utils.parseEther("1"));    
            expect(await agentsGaming.totalSupply()).to.equal(ethers.utils.parseEther("1")); 
        });

        it("Should mint by operator", async function () {
            const { agentsGaming, operator, user } = await loadFixture(deployAgentsGaming);
            await agentsGaming.grantRole(keccak256("MINTER_ROLE"), operator.address);
            await agentsGaming.connect(operator).mint(user.address, ethers.utils.parseEther("1"));
            expect(await agentsGaming.balanceOf(user.address)).to.equal(ethers.utils.parseEther("1")); 
            expect(await agentsGaming.totalSupply()).to.equal(ethers.utils.parseEther("1"));
        });

        it("Should fail by max supply", async function () {
            const { agentsGaming, user } = await loadFixture(deployAgentsGaming);
            expect(await agentsGaming.mint(user.address, ethers.utils.parseEther("100000000"))).to.be.revertedWith(
                'ERC20Capped: cap exceeded');
        });

    });

    describe("Create Fan Tokens", function () {
        it("Should transfer some fan tokens to the owner", async function () {
            const { agMarket, operator, user } = await loadFixture(deployAgentsGaming);
            await agMarket.connect(operator).createProject("Social Test", "TST", 1000);
            await agMarket.connect(operator).mintFanToken(0, user.address, 100);
        });
    });

});

