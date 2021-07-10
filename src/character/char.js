const Game = require("../game.js");
const Skill = require(`./skills/skill.js`); 

function Character(id, side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,
  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,
  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, 
  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,
  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [],  xp = 0,
  maxXP = 100, xpReward = 0, normalAttackType = 'physical', skills = []) {
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
    this.maxBarrier = regen;
    this.barrierDecay = barrierDecay;
    this.physicalRes = physicalRes;
    this.fireRes = fireRes;
    this.waterRes = waterRes;
    this.lightningRes = lightningRes;
    this.poisonRes = poisonRes;
    this.energyRes = energyRes;
    this.holyRes = holyRes;
    this.darkRes = darkRes;
    this.normalAttackType = normalAttackType;
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
    skills.unshift(
      new Skill(this,
      `../../dist/images/skill_image/all_in-attack.png`,  
      'Basic Attack',
      `Attack an enemy for ${this.damageCal(this.normalAttackType, 1, 0)} ${this.normalAttackType} damage.`,
      2, 0, 1, 'enemy', 0, 1, true, 0, this.normalAttackType));
    this.skills = skills;

    this.aiTurn = this.aiTurn.bind(this);
}

Character.prototype.render = function(el, i){
  const img = document.createElement("img");
  const div = document.createElement('div');
  const imgContainer = document.createElement('div');
  const healthContainer = document.createElement('div');
  const healthBar = document.createElement('div');
  const healthText = document.createElement('i');
  const health = document.createElement('div');
  const armor = document.createElement('div');
  const armorText = document.createElement('i');
  const armorDisplay = document.createElement('div');
  const barrier = document.createElement('div');
  const barrierText = document.createElement('i');
  const barrierDisplay = document.createElement('div');
  div.setAttribute('value', i);
  healthBar.classList.add('health-bar');
  health.classList.add('health-green');
  healthContainer.classList.add('health-container');
  armorDisplay.classList.add('armor-silver');
  armor.classList.add('armor');
  barrierDisplay.classList.add('barrier-cyan');
  barrier.classList.add('barrier');
  healthBar.value = this.currentHealth;
  healthBar.max = this.maxHealth;
  healthText.innerHTML = `${this.currentHealth}/${this.maxHealth}`;
  armor.value = this.armor;
  armor.max = this.armor;
  armorText.innerHTML =  `${this.armor}`;
  barrier.value = this.barrier;
  barrier.max = this.barrier;
  barrierText.innerHTML = `${this.barrier}`;
  img.src = `./dist/images/${this.charType.toLowerCase()}-portrait.png`;
  div.classList.add('character');
  div.setAttribute('id', `${this.charType}-${i}`);
  imgContainer.appendChild(img);
  div.appendChild(imgContainer);
  healthBar.appendChild(healthText);
  healthBar.appendChild(health);
  armor.appendChild(armorText);
  armor.appendChild(armorDisplay);
  barrier.appendChild(barrierText);
  barrier.appendChild(barrierDisplay);
  healthContainer.appendChild(healthBar);
  healthContainer.appendChild(armor);
  healthContainer.appendChild(barrier);
  div.appendChild(healthContainer);
  if (this.side === 'player'){
    this.renderSkills(div);
  }
  el.appendChild(div);
  if (this.armor < 1){
    armor.style.opacity = 0;
  } else {
    healthText.style.opacity = 0;
  }
  if (this.barrier < 1){
    barrier.style.opacity = 0;
  } else {
    healthText.style.opacity = 0;
    armorText.style.opacity = 0;
  }
}

Character.prototype.renderSkills = function(el){
  const ul = document.createElement('ul');

  ul.classList.add('skills-container');
  ul.setAttribute('id', `${this.charType}-${this.id}-skills`);
  this.skills.forEach((skill, i) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('div');
    
    img.src = skill.image;
    li.appendChild(text);
    li.appendChild(img);
    li.classList.add('skill');
    li.setAttribute('value', i);
    ul.appendChild(li);
  })
  el.appendChild(ul);
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

Character.prototype.renderFrame = function(i){
  let el = document.getElementById(`${this.charType}-${i}`);
  let health = el.querySelector(`.health-bar i`);
  let healthBar = el.querySelector('.health-green');
  let armor = el.querySelector(`.armor i`);
  let armorBar = el.querySelector('.armor-silver');
  let barrier = el.querySelector(`.barrier i`);
  let barrierBar = el.querySelector('.barrier-cyan');

  healthBar.style.width = `${this.currentHealth/ this.maxHealth * 100}%`;
  armorBar.style.width = `${this.armor/this.maxArmor * 100}%`;
  barrierBar.style.width = `${this.barrier/this.maxBarrier * 100}%`;
  health.innerHTML = `${this.currentHealth}/${this.maxHealth}`;
  armor.innerHTML =  `${this.armor}`;
  barrier.innerHTML = `${this.barrier}`;
  if (this.armor < 1){
    armor.parentNode.style.opacity = 0;
    health.style.opacity = 1;
  } else {
    armor.parentNode.style.opacity = 1;
    health.style.opacity = 0;
  }

  if (this.barrier < 1){
    barrier.parentNode.style.opacity = 0;
    armor.style.opacity = 1;
  } else {
    armor.style.opacity = 0;
    barrier.parentNode.style.opacity = 1;
    health.style.opacity = 0;
  }

  if (this.side === 'player'){
    let skills = [...el.querySelectorAll(`#${this.charType}-${this.id}-skills div`)];
    skills.forEach((skill) => {
      let index = skill.parentNode.getAttributeNode('value').value;
      let CD = this.skills[index].remainingCD;
      skill.innerHTML = `${CD < 1 ? "" : CD}`;
    })
  }
};

Character.prototype.printInfo = function(){
  const div = document.getElementById('info-display');
  const skill = document.getElementsByClassName('skill-info-container')[0];
  const img = document.getElementsByClassName('info-image')[0];
  const ul = document.getElementsByClassName('info-container')[0];
  const level = document.getElementById('level');
  const charType = document.getElementById('charType');
  const maxHealth = document.getElementById('maxHealth');
  const armor = document.getElementById('armor');
  const barrier = document.getElementById(`barrier`);
  const initiative = document.getElementById(`initiative`);
  const power = document.getElementById(`power`);
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
  img.classList.remove('hidden');
  img.classList.remove('skill-image-info')
  if (this.side === "enemy"){
    img.classList.remove('player');
    img.classList.add("enemy");
  } else {
    img.classList.remove('enemy');
    img.classList.add("player");
  }
  
  ul.classList.remove('hidden');
  skill.classList.add('hidden');

  level.innerHTML = `Level: ${this.level}`;
  charType.innerHTML = `${this.charType}`;
  maxHealth.innerHTML = `Health: ${this.currentHealth}/${this.maxHealth}`;
  armor.innerHTML = `Armor: ${this.armor}`;
  barrier.innerHTML = `Barrier: ${this.barrier}`;
  power.innerHTML = `Power: ${this.power}`;
  initiative.innerHTML = `Initiative: ${this.initiative}`;
  critChance.innerHTML = `Critical Chance: ${this.critChance * 100}%`;
  critDamage.innerHTML = `Critical Damage: ${this.critDamage * 100}%`;
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
  talents.innerHTML = `Talents: ` + (this.talents.length > 0 ? this.printArray(this.talents) : "None");
  conditions.innerHTML = `Current Conditions: ` + (this.conditions.length > 0 ? this.printArray(this.conditions) : "None");
  div.scrollTop = 0;
};

Character.prototype.printArray = function(array){
  let result = "";

  for (let i = 0; i < array.length; i++){
    if ( i === array.length - 1){
      result += array[i].name + " " + 
      (array[i].remainingTurn ? array[i].remainingTurn : "");
    } else {
      result += array[i].name + " " + 
      (array[i].remainingTurn ? array[i].remainingTurn : "") + ", ";
    }
  }

  return result;
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
      this.barrier -= damageRecieve;
      if (this.barrier < 0) {
        this.barrier = 0;
      }
    }
    if (this.armor > 0 && remainder > 0){
      let temp = this.armor;
      this.armor -= remainder;
      remainder -= temp;
      if (this.armor < 0) {
        this.armor = 0;
      }
    }
    if (remainder > 0){
      this.currentHealth -= remainder;
      if (this.currentHealth < 0) this.currentHealth = 0;
    }
  }
  this.checkDeath();
  return damageRecieve;
}

Character.prototype.startTurn = function(){
  this.conditions.forEach(condi => {
    setTimeout(condi.activate(this), 1000);
  })
}

Character.prototype.endTurn = function(){
  if(this.alive){
    this.AP += this.APRec;
    if (this.AP > this.APMax){
      this.AP = this.APMax;
    }
    this.skills.forEach(skill => {
      skill.remainingCD -= 1;
      if (skill.remainingCD < 0){
        skill.remainingCD = 0;
      }
    });

    for (let i = 0; i < this.conditions.length; i++){
      if (this.conditions[i].remainingTurn < 1){
        this.conditions[i].remove(this);
        this.conditions.splice(i, 1);
        i--;
      };
    }
    this.heal(this.healCal(0, this.regen));
    this.barrierDie();
  }
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
  if (value > this.maxHealth){
    this.currentHealth = this.maxHealth;
    this.barrier += value - this.maxHealth;
    if (this.barrier > this.maxBarrier) this.maxBarrier = this.barrier;
  } else {
    this.currentHealth = value;
  }
}

Character.prototype.checkDeath = function(){
  if (this.currentHealth <= 0){
    this.alive = false;
    for (let i = 0; i < this.conditions.length; i++){
      this.conditions[i].remove(this);
      this.conditions.splice(i, 1);
      i--;
    }
    if (GAME.currentTurn === this){
      GAME.nextTurn();
    }
  }
}

Character.prototype.addSkill = function(img, name, description, AP, cd, 
  targetNum, targetType, basePower, scaling, crit = false, bonusCrit = 0, affinity = null, status = []){
    this.skills.push(new Skill(this, img, name, description, AP, cd, targetNum, targetType,
      basePower, scaling, crit, bonusCrit, affinity, status));
}

Character.prototype.aiTurn = function(){
  if (GAME.currentTurn.side === 'player') return;
  let endTurn = document.getElementById('end-turn');
  endTurn.disabled = true;
  let currentTurn = GAME.currentTurn;
  let done = false;
  while(!done){
    if (currentTurn.AP < 2) done = true 
    else {
      let skills = currentTurn.skills;
      let skillIndex = Math.floor(Math.random() * (skills.length));
      while (currentTurn.AP > 1 && skills[skillIndex].AP > currentTurn.AP){
        skillIndex = Math.floor(Math.random() * (skills.length));
      }
      let skillToUse = skills[skillIndex];
      let targets, targetIndex;
      currentTurn.AP -= skillToUse.AP;
      
      if (skillToUse.targetType === 'enemy'){
        if (skillToUse.targetNum < 2){
          targets = GAME.players;
          targetIndex = Math.floor(Math.random() * targets.length);
          while (!targets[targetIndex].alive){
            targetIndex = targetIndex = Math.floor(Math.random() * targets.length);
          }
          skillToUse.performSkill(targets[targetIndex]);
        } else {
          targets.forEach(target => {
            skillToUse.performSkill(target);
          })
        }
      } else if (skillToUse.targetType === 'self') {
        skillToUse.performSkill(currentTurn);
      } else {
        if (skillToUse.targetNum < 2){
          targets = GAME.enemies;
          targetIndex = Math.floor(Math.random() * targets.length);
          while (!targets[targetIndex].alive){
            targetIndex = targetIndex = Math.floor(Math.random() * targets.length);
          }
          skillToUse.performSkill(targets[targetIndex]);
        } else {
          targets.forEach(target => {
            skillToUse.performSkill(target);
          })
        }
      }       
    }
  }

  GAME.nextTurn();
  GAME_VIEW.renderFrame();
  
  if (!GAME.gameOver && GAME.currentTurn.side === 'enemy') setTimeout(this.aiTurn, 1500);
  else if (GAME.currentTurn.side === 'player'){
    endTurn.disabled = false;
    const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
    GAME_VIEW.currentTurn(currentTurnSkills);
  }
}

module.exports = Character;