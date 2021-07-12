
const Character = require("../char.js");
const {ArmorBoost, ResistanceBoost, Stunned} = require("../skills/status.js");

const _RES_TYPES = [
  `fireRes`,
  `waterRes`,
  `lightningRes`,
  `poisonRes`,
  `energyRes`,
  `holyRes`,
  `darkRes`
]
class Warrior extends Character{
  constructor(id, side = "player", charType = "Warrior", level = 1, currentHealth = 100, maxHealth = 100, AP = 4, APRec = 4, power = 10, armor = 20,
    initiative = 11, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 5,
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
    this.armorUp();
    this.spinAttack();
    this.stomp();
    this.bolster();
  };

  armorUp(){
    let description = `Shield yourself to gain an additional ${this.healCal(0, 30)} armor.`;
    let image = `./dist/images/skill_image/warfare_deflective_barrier-icon.png`;
    let status = [new ArmorBoost(this, 3, this.healCal(0,30), true, false, "Shield Up!", description, false)];
    this.addSkill(image, `Shield Up!`, description, 2, 3, 1, "self", 0, 0, false, false, null, status);
  }

  spinAttack(){
    let baseDmg = 0;
    let scaling = 1;
    let description = `Spin around violently, dealing ${this.damageCal(this.normalAttackType, scaling, baseDmg)} ${this.normalAttackType} damage to all enemies.`;
    let img = `./dist/images/skill_image/warfare_whirlwind-icon.png`;
    this.addSkill(img, `Spin Attack`, description, 2, 3, 4, 'enemy', baseDmg, scaling, true, 0, this.normalAttackType);
  }

  stomp(){
    let baseDmg = 0;
    let scaling = 0.5;
    let description = `Stomp the ground, dealing ${this.damageCal(this.normalAttackType, scaling, baseDmg)} ${this.normalAttackType} damage and stunning all enemies.`;
    let img = `./dist/images/skill_image/warfare_battle_stomp-icon.png`;
    let status = [new Stunned(this, 1)];
    this.addSkill(img, `Battle Stomp`, description, 4, 4, 4, 'enemy', baseDmg, scaling, true, 0, this.normalAttackType, status);
  }

  bolster(){
    let description = `Bolster allies to endure, granting allies 25% increase in all damage resistances for 3 turns.`;
    let status = [new ResistanceBoost(this, 3, _RES_TYPES, 0.25, `Bolster Allies`, description, false)];
    let img = `./dist/images/skill_image/warfare_guardian_angel-icon.png`;
    this.addSkill(img, `Bolster Allies`, description, 4, 6, 4, 'ally', 0, 0, false, 0, null, status);
  }
}

module.exports = Warrior;