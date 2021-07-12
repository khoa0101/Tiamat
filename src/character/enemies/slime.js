const Character = require("../char.js");

class Slime extends Character{
  constructor(id, side = "enemy", charType = "Slime", level = 1, currentHealth = 100, maxHealth = 100, AP = 4, APRec = 4, power = 5, armor = 0,
    initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 20,
    barrier = 0, barrierDecay = 5, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 2, energyRes = 0, 
    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
    maxXP = 100, xpReward = 0){
    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, 
      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, 
      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  
      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, 
      energyMod, holyMod,  darkMod,  talents, conditions, xp, 
      maxXP, xpReward, `poison`);
  };
}

module.exports = Slime;