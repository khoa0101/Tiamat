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
  this.APMax = 6;
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

Character.prototype.render = function(char, el){
  console.log(el);
  const img = document.createElement("img");
  const div = document.createElement('div');
  const healthBar = document.createElement('progress');
  const armor = document.createElement('progress');
  const barrier = document.createElement('progress');
  healthBar.value = this.currentHealth;
  healthBar.max = this.maxHealth;
  armor.value = this.armor;
  armor.max = this.armor;
  barrier.value = this.barrier;
  barrier.max = this.barrier;
  img.src = `./dist/images/${char.toLowerCase()}.png`;
  div.classList.add('character');
  div.setAttribute('id', char);
  div.appendChild(img);
  div.appendChild(healthBar);
  div.appendChild(armor);
  div.appendChild(barrier);
  el.appendChild(div);
}

Character.prototype.renderPortrait = function(char){
  const img = document.createElement(img);
  img.src=`./dist/images/${char.toLowerCase()}.png`;
  return img; 
}

Character.prototype.normalAttack = function(dmgType,target){
  target.takeDamage(dmgType, this.damageCal(dmgType, 1, 1).bind(this));
};

Character.prototype.damageCal = function(dmgType, powerRatio, baseDmg){
  let totalDamage = Math.floor((baseDmg + (this.power * powerRatio)) 
  * (1.0 + this[`${dmgType}Mod`]) * (1.0 + this.damageMod));
  return totalDamage; 
}

Character.prototype.takeDamage = function(dmgType ,dmg){
  let damageRecieve = Math.floor(dmg * (1.0 - this[`${dmgType}Res`]));
  if (damageRecieve < 0){
    heal(this, -damageRecieve);
  } else {
    let remainder = damageRecieve;
    if (this.barrier > 0){
      remainder -= this.barrier;
      this.barrier = this.barrier - damageRecieve;
      if (this.barrier < 0) this.barrier = 0;
    }
    if (this.armor > 0 && remainder > 0){
      let temp = this.armor;
      this.armor -= remainder;
      remainder -= temp;
      if (this.armor < 0) this.armor = 0;
    }
    if (remainder > 0){
      this.currentHealth = this.currentHealth - remainder;
    }
  }
  this.checkDeath();
  return damageRecieve;
}
Character.prototype.endTurn = function(){
  this.AP += this.APRec;
  if (this.AP > this.APMax){
    this.AP = this.APMax; 
  }
  this.heal(this.healCal(0, this.regen));
  this.barrierDie();
}

Character.prototype.barrierDie = function(){
  if (this.barrier > 0){
    this.barrier -= this.barrierDecay;
    if (this.barrier < 0){
      this.barrier = 0;
    } 
  }
}

Character.prototype.healCal = function(powerRatio, baseHeal){
  let totalHeal = Math.floor((baseHeal + (this.power * powerRatio)) 
  * (1.0 + this.healMod));
  return totalHeal;
}

Character.prototype.heal = function(healAmt){
  let value = this.currentHealth + healAmt;
  if ( value > this.maxHealth ){
    this.currentHealth = this.maxHealth;
    this.barrier = value - this.maxHealth;
  } else {
    this.currentHealth = value;
  }
}

Character.prototype.checkDeath = function(character){
  if (character.currentHealth < 0){
    character.active = false;
    character.alive = false;
  }
}

module.exports = Character;