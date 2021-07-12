const Character = require("../char.js");
const { ArmorBoost } = require("../skills/status.js");

class Cleric extends Character{
  constructor(id, side = "player", charType = "Cleric", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 20,
    initiative = 12, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 4,
    barrier = 0, barrierDecay = 5, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
    maxXP = 100, xpReward = 0){
    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, 
      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, 
      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  
      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, 
      energyMod, holyMod,  darkMod,  talents, conditions, xp, 
      maxXP, xpReward);
    this.smite();
    this.healAlly();
    this.massHeal();
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
    this.addSkill(img, `Healing Ritual`, description, 4, 4, 4, 'ally', 20, 1);
  }

  smite(){
    let affinity = `holy`;
    let img = `../../../dist/images/skill_image/aerotheurge_lightning_bolt-icon.png`;
    let description = `Summon heaven's lightning to smite your enemies for ${this.damageCal(affinity, 1, 5)} ${affinity} damage.${" "} 
    This ability can critically hit and has a 30% bonus critical chance.`;
    this.addSkill(img, `Smite`, description, 4, 5, 4, 'enemy', 5, 1, true, 0.3, affinity);
  }

  mendArmor(){
    let img = `../../../dist/images/skill_image/geomancer_mend_metal-icon.png`;
    let description = `Mend the armors of all alies, restoring ${this.healCal(0, 10)} armor every turn for 3 turns.`
    let status = [new ArmorBoost(this, 3, 10, false, true, `Mend Armor`, description)]
    this.addSkill(img, `Mend Armor`, description, 4, 5, 4, 'ally', 0, 0, false, 0, null, status);
  }

}

module.exports = Cleric;