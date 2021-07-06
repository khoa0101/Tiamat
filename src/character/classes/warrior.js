
const Character = require("../char.js");
const ArmorBoost = require("../skills/armorboost.js");
class Warrior extends Character{
  constructor(id, side = "player", charType = "Warrior", level = 1, currentHealth = 100, maxHealth = 100, AP = 4, APRec = 4, power = 10, armor = 20,
    initiative = 11, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 5,
    barrier = 0, barrierDecay = 10, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
    maxXP = 100, xpReward = 0){
    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, 
      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, 
      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  
      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, 
      energyMod, holyMod,  darkMod,  talents, conditions, xp, 
      maxXP, xpReward);
    this.armorUp();
  };

  armorUp(){
    let description = `Shield yourself to gain an additional ${this.healCal(0, 30)} armor.`;
    let image = `../../../dist/images/skill_image/warfare_deflective_barrier-icon.png`
    this.skills.push(new ArmorBoost(this, image, `Shield Up!`, description, 2, 2, 1, "self", 30, 0));
    console.log(this.skills[1]);
  }
}

module.exports = Warrior;