function Character(id, side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,
  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,
  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,
  maxXP = 100, xpReward = 0) {
  this.id = id;
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
  this.maxArmor = armor;
  this.initiative = initiative;
  this.critChance = critChance;
  this.critDamage = critDamage;
  this.damageMod = damageMod;
  this.healMod = healMod;
  this.cdMod = cdMod;
  this.lifesteal = lifesteal;
  this.regen = regen;
  this.barrier = barrier;
  this.maxBarrier = barrier;
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

Character.prototype.render = function(el, i){
  const img = document.createElement("img");
  const div = document.createElement('div');
  const healthContainer = document.createElement('div');
  const healthBar = document.createElement('div');
  const armor = document.createElement('div');
  const barrier = document.createElement('div');
  div.setAttribute('value', i);
  healthBar.classList.add('health-bar');
  healthContainer.classList.add('health-container');
  armor.classList.add('armor');
  barrier.classList.add('barrier');
  healthBar.value = this.currentHealth;
  healthBar.max = this.maxHealth;
  healthBar.innerHTML = `${this.currentHealth}/${this.maxHealth}`;
  armor.value = this.armor;
  armor.max = this.armor;
  armor.innerHTML =  `${this.armor}`;
  barrier.value = this.barrier;
  barrier.max = this.barrier;
  barrier.innerHTML = `${this.barrier}`;
  img.src = `./dist/images/${this.charType.toLowerCase()}-portrait.png`;
  div.classList.add('character');
  div.setAttribute('id', `${this.charType}-${i}`);
  div.appendChild(img);
  healthContainer.appendChild(healthBar);
  healthContainer.appendChild(armor);
  healthContainer.appendChild(barrier);
  div.appendChild(healthContainer);
  el.appendChild(div);
  if (this.armor < 1){
    armor.classList.add('hidden');
  }
  if (this.barrier < 1){
    barrier.classList.add('hidden');
  }
}

Character.prototype.renderPortrait = function(){
  const img = document.createElement('img');
  img.src=`./dist/images/${this.charType.toLowerCase()}-portrait.png`;
  if (this.side === "enemy"){
    img.classList.add("enemy");
  } else {
    img.classList.add("player");
  } 
  return img; 
}

Character.prototype.renderTurn = function(i){
  let el = document.getElementById(`${this.charType}-${i}`);
  let health = el.getElementsByClassName(`health-bar`)[0];
  let armor = el.getElementsByClassName(`armor`)[0];
  let barrier = el.getElementsByClassName(`barrier`)[0];
  health.innerHTML = `${this.currentHealth}/${this.maxHealth}`;
  armor.innerHTML =  `${this.armor}`;
  barrier.innerHTML = `${this.barrier}`;
  if (this.armor < 1){
    armor.classList.add('hidden');
  } else {
    armor.classList.remove('hidden');
  }
  if (this.barrier < 1){
    barrier.classList.add('hidden');
  } else {
    barrier.classList.remove('hidden');
  }
};

Character.prototype.printInfo = function(){
  const img = document.getElementsByClassName('info-image')[0];
  const ul = document.getElementsByClassName('info-container')[0];
  const level = document.getElementById('level');
  const charType = document.getElementById('charType');
  const maxHealth = document.getElementById('maxHealth');
  const armor = document.getElementById('armor');
  const barrier = document.getElementById(`barrier`);
  const initiative = document.getElementById(`initiative`);
  const critChance = document.getElementById(`critChance`);
  const critDamage = document.getElementById(`critDamage`);
  const damageMod = document.getElementById(`damageMod`);
  const healMod = document.getElementById(`healMod`);
  const cdMod = document.getElementById(`cdMod`);
  const lifesteal = document.getElementById(`lifesteal`);
  const regen = document.getElementById(`regen`);
  const physicalRes = document.getElementById(`physicalRes`);
  const fireRes = document.getElementById(`fireRes`);
  const waterRes = document.getElementById(`waterRes`);
  const lightningRes = document.getElementById(`lightningRes`);
  const poisonRes = document.getElementById(`poisonRes`);
  const energyRes = document.getElementById(`energyRes`);
  const holyRes = document.getElementById(`holyRes`);
  const darkRes = document.getElementById(`darkRes`);
  const physicalMod = document.getElementById(`physicalMod`);
  const fireMod = document.getElementById(`fireMod`);
  const waterMod = document.getElementById(`waterMod`);
  const lightningMod = document.getElementById(`lightningMod`);
  const poisonMod = document.getElementById(`poisonMod`);
  const energyMod = document.getElementById(`energyMod`);
  const holyMod = document.getElementById(`holyMod`);
  const darkMod = document.getElementById(`darkMod`);
  const talents = document.getElementById(`talents`);
  const conditions = document.getElementById(`conditions`);

  img.src=`./dist/images/${this.charType.toLowerCase()}.png`;
  if (this.side === "enemy"){
    img.classList.remove('player');
    img.classList.add("enemy");
  } else {
    img.classList.remove('enemy');
    img.classList.add("player");
  }
  ul.classList.remove('hidden');
  level.innerHTML = `Level: ${this.level}`;
  charType.innerHTML = `${this.charType}`;
  maxHealth.innerHTML = `Health: ${this.currentHealth}/${this.maxHealth}`;
  armor.innerHTML = `Armor: ${this.armor}`;
  barrier.innerHTML = `Barrier: ${this.barrier}`;
  initiative.innerHTML = `Initiative: ${this.initiative}`;
  critChance.innerHTML = `Critical Chance: ${this.critChance}`;
  critDamage.innerHTML = `Critical Damage: ${this.critDamage}`;
  damageMod.innerHTML = `Damage Modifier: ${this.damageMod * 100}%`;
  healMod.innerHTML = `Healing Modifier: ${this.healMod * 100}%`;
  cdMod.innerHTML = `Cooldown Reduction: ${this.cdMod * 100}%`;
  lifesteal.innerHTML = `Lifesteal Reduction: ${this.lifesteal * 100}%`;
  regen.innerHTML = `Health Regeneration: ${this.regen}/turn`;
  physicalRes.innerHTML = `Physical Damage Resistance: ${this.physicalRes * 100}%`;
  fireRes.innerHTML = `Fire Damage Resistance: ${this.fireRes * 100}%`;
  waterRes.innerHTML = `Water Damage Resistance: ${this.waterRes * 100}%`;
  lightningRes.innerHTML = `Lightning Damage Resistance: ${this.lightningRes * 100}%`;
  poisonRes.innerHTML = `Poison Damage Resistance: ${this.poisonRes * 100}%`;
  energyRes.innerHTML = `Energy Damage Resistance: ${this.energyRes * 100}%`;
  holyRes.innerHTML = `Holy Damage Resistance: ${this.holyRes * 100}%`;
  darkRes.innerHTML = `Darkness Damage Resistance: ${this.darkRes * 100}%`;
  physicalMod.innerHTML = `Physical Damage Modifier: ${this.physicalMod * 100}%`;
  fireMod.innerHTML = `Fire Damage Modifier: ${this.fireMod * 100}%`;
  waterMod.innerHTML = `Water Damage Modifier: ${this.waterMod * 100}%`;
  lightningMod.innerHTML = `Lightning Damage Modifier: ${this.lightningMod * 100}%`;
  poisonMod.innerHTML = `Poison Damage Modifier: ${this.poisonMod * 100}%`;
  energyMod.innerHTML = `Energy Damage Modifier: ${this.energyMod * 100}%`;
  holyMod.innerHTML = `Holy Damage Modifier: ${this.holyMod * 100}%`;
  darkMod.innerHTML = `Darkness Damage Modifier: ${this.darkMod * 100}%`;
  talents.innerHTML = `Talents: ` + this.talents.length > 0 ? "" : "None";
  conditions.innerHTML = `Current Conditions: ` + this.conditions.length > 0 ? "" : "None";
};

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
    this.barrier += value - this.maxHealth;
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