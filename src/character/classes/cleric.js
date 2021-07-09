const Character = require("../char.js");
// const ArmorHeal = require("../skills/armorboost.js");
class Cleric extends Character{
  constructor(id, side = "player", charType = "Cleric", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 20,
    initiative = 12, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 4,
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
    this.healAlly();
    this.massHeal();
    this.smite();
    this.mendArmor();
  };

  healAlly(){
    let description = `Heal an ally for ${this.healCal(1, 5)} health.`;
    let img = `../../../dist/images/skill_image/hydrosophist_restoration-icon.png`
    this.addSkill(img, `Heal`, description, 2, 2, 1, 'ally', 5, 1);
  }

  massHeal(){
    let description = `Heal all allies for ${this.healCal(1, 20)} health.`;
    let img = `../../../dist/images/skill_image/hydrosophist_healing_ritual-icon.png`;
    this.addSkill(img, `Healing Ritual`, description, 3, 4, 4, 'ally', 20, 1);
  }

  smite(){
    let affinity = `lightning`;
    let img = `../../../dist/images/skill_image/aerotheurge_lightning_bolt-icon.png`;
    let description = `Summon heaven's lightning to smite your enemies for ${this.damageCal(affinity, 1, 5)} ${affinity} damage.${" "} 
    This ability can crit and has a 30% bonus critical chance.`;
    this.addSkill(img, `Smite`, description, 4, 5, 4, 'enemy', 5, 1, true, 0.3, affinity);
  }

  mendArmor(){
    
  }

}

module.exports = Cleric;