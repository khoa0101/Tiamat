
const Character = require("../char.js");
const { Burning } = require("../skills/status.js");
class Wizard extends Character{
  constructor(id, side = "player", charType = "Wizard", level = 1, currentHealth = 30, maxHealth = 30, AP = 4, APRec = 4, power = 15, armor = 10,
    initiative = 14, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 2,
    barrier = 0, barrierDecay = 10, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
    maxXP = 100, xpReward = 0){
    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, 
      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, 
      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  
      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, 
      energyMod, holyMod,  darkMod,  talents, conditions, xp, 
      maxXP, xpReward, 'fire');
    this.fireBall(); 
  };

  fireBall(){
    let affinity = 'fire';
    let img = `../../../dist/images/skill_image/pyrokinetic_fireball-icon.png`;
    let description = `Summon a fireball dealing ${this.damageCal(affinity, 1, 10)} ${affinity} damage to all enemies and applies Burning.`;
    let status = [new Burning(this, 3)];
    this.addSkill(img,'Fireball', description, 2, 2, 4, 'enemy', 10, 1, false, 0, affinity, status);
  }
}

module.exports = Wizard;