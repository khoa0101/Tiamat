
const Character = require("../char.js");
const { Burning, MultiStrike, Chilled, ArmorBoost, Poisoned } = require("../skills/status.js");
class Wizard extends Character{
  constructor(id, side = "player", charType = "Wizard", level = 1, currentHealth = 30, maxHealth = 30, AP = 4, APRec = 4, power = 15, armor = 10,
    initiative = 14, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 2,
    barrier = 0, barrierDecay = 5, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
    maxXP = 100, xpReward = 0){
    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, 
      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, 
      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  
      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, 
      energyMod, holyMod,  darkMod,  talents, conditions, xp, 
      maxXP, xpReward, 'fire');
    this.mageArmor();
    this.fireBall(); 
    this.hailStrike();
    this.poisonWave();
  };

  fireBall(){
    let affinity = 'fire';
    let img = `./dist/images/skill_image/pyrokinetic_fireball-icon.png`;
    let description = `Summon a fireball dealing ${this.damageCal(affinity, 1, 10)} ${affinity} damage to all enemies and applies Burning for 2 turns.`;
    let status = [new Burning(this, 2)];
    this.addSkill(img,'Fireball', description, 2, 2, 4, 'enemy', 10, 1, false, 0, affinity, status);
  }

  hailStrike(){
    let affinity = `water`;
    let damage = this.damageCal(affinity, 0.4, 4);
    let img = `./dist/images/skill_image/hydrosophist-11-0.png`;
    let description = `Hail falls from the sky, dealing ${damage} ${affinity} damage to all enemies for 3 turns and applies Chilled for 3 turn.`;
    let status = [
      new MultiStrike(this, 3, damage, affinity, false, `Hail Strike`, description),
      new Chilled(this, 3)
    ];
    this.addSkill(img, 'Hail Strike', description, 2, 6, 4, 'enemy', 4, 0.4, false, false, affinity, status);
  }

  mageArmor(){
    let statDescription = `Increase maximum mage armor by 30, and grants 15 barrier every turn.`; 
    let description = `Conjure an enchanted armor, increasing maximum armor by 30 and grants 15 barrier every turn for 3 turns.`;
    let armor = new ArmorBoost(this, 3, 30, true, false, "Mage Armor", statDescription);
    armor.activate = function(target){
      target.maxBarrier += (this.armor / 2);
      target.barrier += (this.armor / 2);
      this.remainingTurn--;
    }
    let img = `./dist/images/skill_image/summoning_circle_of_protection-icon.png`;
    let status = [armor];
    this.addSkill(img, `Mage Armor`, description, 2, 5, 1, "self", 0, 0, false, 0, null, status);
  }

  poisonWave(){
    let affinity = `poison`;
    let damage = this.damageCal(affinity, 1, 5);
    let img = `./dist/images/skill_image/geomancer-14-15.png`;
    let description = `Poison erupts from you, dealing ${damage} ${affinity} damage and applies poison for 3 turns.`;
    let status = [new Poisoned(this, 3)];
    this.addSkill(img, `Poison Wave`, description, 2, 2, 4, `enemy`, 5, 1, false, 0, affinity, status);
  }
}

module.exports = Wizard;