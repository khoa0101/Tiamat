function Character(side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,
  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,
  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
  maxXP = 100, xpReward = 0) {
  this.level = level;
  this.active = true;
  this.alive = true;
  this.side = side;
  this.charType = charType;
  this.currentHealth = currentHealth;
  this.maxHealth = maxHealth;
  this.AP = AP;
  this.APRec = APRec;
  this.power = power;
  this.armor = armor;
  this.initiative = initiative;
  this.critChance = critChance;
  this.critDamage = critDamage;
  this.damageMod = damageMod;
  this.healMod = healMod;
  this.cdMod = cdMod;
  this.lifesteal = lifesteal;
  this.regen = regen;
  this.barrier = barrier;
  this.barrierDecay = barrierDecay;
  this.physicalRes = physicalRes;
  this.fireRes = fireRes;
  this.waterRes = waterRes;
  this.lightningRes = lightningRes;
  this.poisonRes = poisonRes;
  this.energyRes = energyRes;
  this.holyRes = holyRes;
  this.darkRes = darkRes;
  this.physicalMod = physicalMod;
  this.fireMod = fireMod;
  this.waterMod = waterMod;
  this.lightningMod = lightningMod;
  this.poisonMod = poisonMod;
  this.energyMod = energyMod;
  this.holyMod = holyMod;
  this.darkMod = darkMod;
  this.talents = talents;
  this.conditions = conditions;
  this.xp = xp;
  this.maxXP = maxXP;
  this.xpReward = xpReward;
}

function damageCal(character, dmgType, powerRatio, baseDmg){
  let totalDamage = Math.floor((baseDmg + (character.power * powerRatio)) 
  * (1.0 + character[`${dmgType}Mod`]) * (1.0 + character.damageMod));
  return totalDamage; 
}

function takeDamage(character, dmgType ,dmg){
  let damageRecieve = Math.floor(dmg * (1.0 - character[`${dmgType}Res`]));
  if (damageRecieve < 0){
    heal(character, -damageRecieve);
  } else {
    let remainder = damageRecieve;
    if (character.barrier > 0){
      remainder -= character.barrier;
      character.barrier = character.barrier - damageRecieve;
      if (character.barrier < 0) character.barrier = 0;
    }
    if (character.armor > 0 && remainder > 0){
      let temp = character.armor;
      character.armor -= remainder;
      remainder -= temp;
      if (character.armor < 0) character.armor = 0;
    }
    if (remainder > 0){
      character.currentHealth = character.currentHealth - remainder;
    }
  }
  checkDeath(character);
  return damageRecieve;
}

function healCal(character, powerRatio, baseHeal){
  let totalHeal = Math.floor((baseHeal + (character.power * powerRatio)) 
  * (1.0 + character.healMod));
  return totalHeal;
}

function heal(character, healAmt){
  let value = character.currentHealth + healAmt;
  if ( value > character.maxHealth ){
    character.currentHealth = character.maxHealth;
    character.barrier = value - character.maxHealth;
  } else {
    character.currentHealth = value;
  }
}

function checkDeath(character){
  if (character.currentHealth < 0){
    console.log(`${character.charType} has been defeated!`);
    character.active = false;
    character.alive = false;
  }
}

let player = new Character("player", "Wizard");
let slime = new Character("enemy", "Slime");
player.damageMod = 0.2;
player.fireMod = 0.2;
player.healMod = 0.2;
// slime.fireRes = 2;
slime.currentHealth = 20;
console.log(player);
console.log(slime);
let damageTotal = damageCal(player, "fire", 0.5, 100);
console.log(damageTotal);
console.log(takeDamage(slime, "fire", damageTotal));
console.log(slime.currentHealth);
console.log(slime.barrier);

