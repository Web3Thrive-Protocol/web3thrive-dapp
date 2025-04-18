const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// contract what to deploy here
const contractsToDeploy = {
  Escrow: true, // set to true/false or either deploy or not
  ProfileManager: true,
  LearningModule: true,
  Reputation: true,
};

module.exports = buildModule("MasterModule", (m) => {
  const deployed = {};

  if (contractsToDeploy.Escrow) {
    deployed.escrow = m.contract("Escrow", []);
  }

  if (contractsToDeploy.ProfileManager) {
    deployed.profileManager = m.contract("ProfileManager", []);
  }

  if (contractsToDeploy.LearningModule) {
    deployed.learningModule = m.contract("LearningModule", []);
  }

  if (contractsToDeploy.Reputation) {
    deployed.reputation = m.contract("Reputation", []);
  }

  return deployed;
});
