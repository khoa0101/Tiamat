
const Character = require("../char.js");
const { Poisoned, Stunned } = require("../skills/status.js");
class Rogue extends Character{
  constructor(id, side = "player", charType = "Rogue", level = 1, currentHealth = 40, maxHealth = 40, AP = 4, APRec = 4, power = 18, armor = 20,
    initiative = 18, critChance = 0.2, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 2,
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
    this.backStab();
    this.daggerStorm();
    this.corruptedBlade();
    this.barrage();
  };

  backStab(){
    let description = `Move behind the target and strike for ${this.damageCal(this.normalAttackType, 1, 0) * this.critDamage} ${this.normalAttackType} critical damage.`
    let img = `../../../dist/images/skill_image/scoundrel_vault-icon.png`;
    this.addSkill(img, `Back Stab`, description, 2, 4, 1, 'enemy', 0, 1, true, 1, this.normalAttackType);
  }

  daggerStorm(){
    let baseDmg = 0;
    let scaling = 1.2;
    let description = `Throw a barrage of daggers at all enemies, dealing ${this.damageCal(this.normalAttackType, scaling, baseDmg)} ${this.normalAttackType} damage.
    This ability can critically hit and recieve a 20% bonus critical hit chance.`;
    let img = `../../../dist/images/skill_image/scoundrel-15-7.png`;
    this.addSkill(img, `Dagger Volley`, description, 6, 4, 4, 'enemy', baseDmg, scaling, true, 0.2, this.normalAttackType);
  }

  corruptedBlade(){
    let affinity = this.normalAttackType;
    let damage = this.damageCal(affinity, 0.5, this.power);
    let description = `Stab your target with a poisoned blade, dealing ${damage} ${affinity} damage and applies Poisoned for 2 turns. This ability can critically hit.`;
    let img = `../../../dist/images/skill_image/scoundrel-14-20.png`;
    let status = [new Poisoned(this, 3)];
    this.addSkill(img, `Corrupted Blade`, description, 2, 4, 1, `enemy`, this.power, 0.5, true, 0, affinity, status);
  }

  barrage(){
    let affinity = this.normalAttackType;
    let damage = this.damageCal(affinity, 2, this.power);
    let description = `Perform a horrific combo on your target, stunning it for 1 turn and deals ${damage} ${affinity} damage. This ability can critically hit.`
    let status = [new Stunned(this, 1)];
    let img = `../../../dist/images/skill_image/scoundrel-15-6.png`;
    this.addSkill(img, `Horrific Barrage`, description, 4, 6, 1, `enemy`, this.power, 2, true, 0, affinity, status);
  }
}

module.exports = Rogue;