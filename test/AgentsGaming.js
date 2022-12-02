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

        const AgentsGaming = await ethers.getContractFactory("AgentsGaming");
        const agentsGaming = await AgentsGaming.deploy();

        return { agentsGaming, owner, operator, user };
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


/*
    describe("Transfers", function () {
        it("Should transfer the funds to the owner", async function () {
            const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
                deployOneYearLockFixture
            );

            await time.increaseTo(unlockTime);

            await expect(lock.withdraw()).to.changeEtherBalances(
                [owner, lock],
                [lockedAmount, -lockedAmount]
            );
        });
    });
*/
});

