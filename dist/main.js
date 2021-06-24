/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/character/char.js":
/*!*******************************!*\
  !*** ./src/character/char.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Skill = __webpack_require__(/*! ./skills/skill.js */ \"./src/character/skills/skill.js\"); \n\nfunction Character(id, side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,\n  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [],  xp = 0,\n  maxXP = 100, xpReward = 0, normalAttackType = 'physical', skills = []) {\n    skills.unshift(new Skill(\n      'Attack',\n      `Attack an enemy for ${this.damageCal(this.normalAttackType, 1, 10)} ${this.normalAttackType} damage`,\n      2, 1, 'enemy'));\n    this.id = id;\n    this.level = level;\n    this.active = true;\n    this.alive = true;\n    this.side = side;\n    this.charType = charType;\n    this.currentHealth = currentHealth;\n    this.maxHealth = maxHealth;\n    this.AP = AP;\n    this.APMax = 6;\n    this.APRec = APRec;\n    this.power = power;\n    this.armor = armor;\n    this.maxArmor = armor;\n    this.initiative = initiative;\n    this.critChance = critChance;\n    this.critDamage = critDamage;\n    this.damageMod = damageMod;\n    this.healMod = healMod;\n    this.cdMod = cdMod;\n    this.lifesteal = lifesteal;\n    this.regen = regen;\n    this.barrier = barrier;\n    this.maxBarrier = barrier;\n    this.barrierDecay = barrierDecay;\n    this.physicalRes = physicalRes;\n    this.fireRes = fireRes;\n    this.waterRes = waterRes;\n    this.lightningRes = lightningRes;\n    this.poisonRes = poisonRes;\n    this.energyRes = energyRes;\n    this.holyRes = holyRes;\n    this.darkRes = darkRes;\n    this.normalAttackType = normalAttackType;\n    this.physicalMod = physicalMod;\n    this.fireMod = fireMod;\n    this.waterMod = waterMod;\n    this.lightningMod = lightningMod;\n    this.poisonMod = poisonMod;\n    this.energyMod = energyMod;\n    this.holyMod = holyMod;\n    this.darkMod = darkMod;\n    this.talents = talents;\n    this.conditions = conditions;\n    this.skills = skills;\n    this.xp = xp;\n    this.maxXP = maxXP;\n    this.xpReward = xpReward;\n}\n\nCharacter.prototype.render = function(el, i){\n  const img = document.createElement(\"img\");\n  const div = document.createElement('div');\n  const healthContainer = document.createElement('div');\n  const healthBar = document.createElement('div');\n  const armor = document.createElement('div');\n  const barrier = document.createElement('div');\n  div.setAttribute('value', i);\n  healthBar.classList.add('health-bar');\n  healthContainer.classList.add('health-container');\n  armor.classList.add('armor');\n  barrier.classList.add('barrier');\n  healthBar.value = this.currentHealth;\n  healthBar.max = this.maxHealth;\n  healthBar.innerHTML = `${this.currentHealth}/${this.maxHealth}`;\n  armor.value = this.armor;\n  armor.max = this.armor;\n  armor.innerHTML =  `${this.armor}`;\n  barrier.value = this.barrier;\n  barrier.max = this.barrier;\n  barrier.innerHTML = `${this.barrier}`;\n  img.src = `./dist/images/${this.charType.toLowerCase()}-portrait.png`;\n  div.classList.add('character');\n  div.setAttribute('id', `${this.charType}-${i}`);\n  div.appendChild(img);\n  healthContainer.appendChild(healthBar);\n  healthContainer.appendChild(armor);\n  healthContainer.appendChild(barrier);\n  div.appendChild(healthContainer);\n  if (this.side === 'player'){\n    this.renderSkills(div);\n  }\n  el.appendChild(div);\n  if (this.armor < 1){\n    armor.classList.add('hidden');\n  }\n  if (this.barrier < 1){\n    barrier.classList.add('hidden');\n  }\n}\n\nCharacter.prototype.renderSkills = function(el){\n  const ul = document.createElement('ul');\n  ul.classList.add('skills-container');\n  ul.setAttribute('id', `${this.charType}-${this.id}-skills`);\n  this.skills.forEach((skill, i) => {\n    const li = document.createElement('li');\n    li.innerHTML = skill.name;\n    li.classList.add('skill');\n    li.setAttribute('value', i);\n    ul.appendChild(li);\n  })\n  el.appendChild(ul);\n}\n\nCharacter.prototype.renderPortrait = function(){\n  const img = document.createElement('img');\n  img.src=`./dist/images/${this.charType.toLowerCase()}-portrait.png`;\n  if (this.side === \"enemy\"){\n    img.classList.add(\"enemy\");\n  } else {\n    img.classList.add(\"player\");\n  } \n  return img; \n}\n\nCharacter.prototype.renderTurn = function(i){\n  let el = document.getElementById(`${this.charType}-${i}`);\n  let health = el.getElementsByClassName(`health-bar`)[0];\n  let armor = el.getElementsByClassName(`armor`)[0];\n  let barrier = el.getElementsByClassName(`barrier`)[0];\n  health.innerHTML = `${this.currentHealth}/${this.maxHealth}`;\n  armor.innerHTML =  `${this.armor}`;\n  barrier.innerHTML = `${this.barrier}`;\n  if (this.armor < 1){\n    armor.classList.add('hidden');\n  } else {\n    armor.classList.remove('hidden');\n  }\n  if (this.barrier < 1){\n    barrier.classList.add('hidden');\n  } else {\n    barrier.classList.remove('hidden');\n  }\n};\n\nCharacter.prototype.printInfo = function(){\n  const div = document.getElementById('info-display');\n  const img = document.getElementsByClassName('info-image')[0];\n  const ul = document.getElementsByClassName('info-container')[0];\n  const level = document.getElementById('level');\n  const charType = document.getElementById('charType');\n  const maxHealth = document.getElementById('maxHealth');\n  const armor = document.getElementById('armor');\n  const barrier = document.getElementById(`barrier`);\n  const initiative = document.getElementById(`initiative`);\n  const power = document.getElementById(`power`);\n  const critChance = document.getElementById(`critChance`);\n  const critDamage = document.getElementById(`critDamage`);\n  const damageMod = document.getElementById(`damageMod`);\n  const healMod = document.getElementById(`healMod`);\n  const cdMod = document.getElementById(`cdMod`);\n  const lifesteal = document.getElementById(`lifesteal`);\n  const regen = document.getElementById(`regen`);\n  const physicalRes = document.getElementById(`physicalRes`);\n  const fireRes = document.getElementById(`fireRes`);\n  const waterRes = document.getElementById(`waterRes`);\n  const lightningRes = document.getElementById(`lightningRes`);\n  const poisonRes = document.getElementById(`poisonRes`);\n  const energyRes = document.getElementById(`energyRes`);\n  const holyRes = document.getElementById(`holyRes`);\n  const darkRes = document.getElementById(`darkRes`);\n  const physicalMod = document.getElementById(`physicalMod`);\n  const fireMod = document.getElementById(`fireMod`);\n  const waterMod = document.getElementById(`waterMod`);\n  const lightningMod = document.getElementById(`lightningMod`);\n  const poisonMod = document.getElementById(`poisonMod`);\n  const energyMod = document.getElementById(`energyMod`);\n  const holyMod = document.getElementById(`holyMod`);\n  const darkMod = document.getElementById(`darkMod`);\n  const talents = document.getElementById(`talents`);\n  const conditions = document.getElementById(`conditions`);\n\n  img.src=`./dist/images/${this.charType.toLowerCase()}.png`;\n  img.classList.remove('hidden');\n  if (this.side === \"enemy\"){\n    img.classList.remove('player');\n    img.classList.add(\"enemy\");\n  } else {\n    img.classList.remove('enemy');\n    img.classList.add(\"player\");\n  }\n  ul.classList.remove('hidden');\n  level.innerHTML = `Level: ${this.level}`;\n  charType.innerHTML = `${this.charType}`;\n  maxHealth.innerHTML = `Health: ${this.currentHealth}/${this.maxHealth}`;\n  armor.innerHTML = `Armor: ${this.armor}`;\n  barrier.innerHTML = `Barrier: ${this.barrier}`;\n  power.innerHTML = `Power: ${this.power}`;\n  initiative.innerHTML = `Initiative: ${this.initiative}`;\n  critChance.innerHTML = `Critical Chance: ${this.critChance * 100}%`;\n  critDamage.innerHTML = `Critical Damage: ${this.critDamage * 100}%`;\n  damageMod.innerHTML = `Damage Modifier: ${this.damageMod * 100}%`;\n  healMod.innerHTML = `Healing Modifier: ${this.healMod * 100}%`;\n  cdMod.innerHTML = `Cooldown Reduction: ${this.cdMod * 100}%`;\n  lifesteal.innerHTML = `Lifesteal Reduction: ${this.lifesteal * 100}%`;\n  regen.innerHTML = `Health Regeneration: ${this.regen}/turn`;\n  physicalRes.innerHTML = `Physical Damage Resistance: ${this.physicalRes * 100}%`;\n  fireRes.innerHTML = `Fire Damage Resistance: ${this.fireRes * 100}%`;\n  waterRes.innerHTML = `Water Damage Resistance: ${this.waterRes * 100}%`;\n  lightningRes.innerHTML = `Lightning Damage Resistance: ${this.lightningRes * 100}%`;\n  poisonRes.innerHTML = `Poison Damage Resistance: ${this.poisonRes * 100}%`;\n  energyRes.innerHTML = `Energy Damage Resistance: ${this.energyRes * 100}%`;\n  holyRes.innerHTML = `Holy Damage Resistance: ${this.holyRes * 100}%`;\n  darkRes.innerHTML = `Darkness Damage Resistance: ${this.darkRes * 100}%`;\n  physicalMod.innerHTML = `Physical Damage Modifier: ${this.physicalMod * 100}%`;\n  fireMod.innerHTML = `Fire Damage Modifier: ${this.fireMod * 100}%`;\n  waterMod.innerHTML = `Water Damage Modifier: ${this.waterMod * 100}%`;\n  lightningMod.innerHTML = `Lightning Damage Modifier: ${this.lightningMod * 100}%`;\n  poisonMod.innerHTML = `Poison Damage Modifier: ${this.poisonMod * 100}%`;\n  energyMod.innerHTML = `Energy Damage Modifier: ${this.energyMod * 100}%`;\n  holyMod.innerHTML = `Holy Damage Modifier: ${this.holyMod * 100}%`;\n  darkMod.innerHTML = `Darkness Damage Modifier: ${this.darkMod * 100}%`;\n  talents.innerHTML = `Talents: ` + (this.talents.length > 0 ? \"\" : \"None\");\n  conditions.innerHTML = `Current Conditions: ` + (this.conditions.length > 0 ? \"\" : \"None\");\n  div.scrollTop = 0;\n};\n\nCharacter.prototype.normalAttack = function(dmgType,target){\n  target.takeDamage(dmgType, this.damageCal(dmgType, 1, 1).bind(this));\n};\n\nCharacter.prototype.damageCal = function(dmgType, powerRatio, baseDmg){\n  let totalDamage = Math.floor((baseDmg + (this.power * powerRatio)) \n  * (1.0 + this[`${dmgType}Mod`]) * (1.0 + this.damageMod));\n  return totalDamage;\n}\n\nCharacter.prototype.takeDamage = function(dmgType ,dmg){\n  let damageRecieve = Math.floor(dmg * (1.0 - this[`${dmgType}Res`]));\n  if (damageRecieve < 0){\n    heal(this, -damageRecieve);\n  } else {\n    let remainder = damageRecieve;\n    if (this.barrier > 0){\n      remainder -= this.barrier;\n      this.barrier = this.barrier - damageRecieve;\n      if (this.barrier < 0) this.barrier = 0;\n    }\n    if (this.armor > 0 && remainder > 0){\n      let temp = this.armor;\n      this.armor -= remainder;\n      remainder -= temp;\n      if (this.armor < 0) this.armor = 0;\n    }\n    if (remainder > 0){\n      this.currentHealth = this.currentHealth - remainder;\n    }\n  }\n  this.checkDeath();\n  return damageRecieve;\n}\nCharacter.prototype.endTurn = function(){\n  this.AP += this.APRec;\n  if (this.AP > this.APMax){\n    this.AP = this.APMax;\n  }\n  this.heal(this.healCal(0, this.regen));\n  this.barrierDie();\n}\n\nCharacter.prototype.barrierDie = function(){\n  if (this.barrier > 0){\n    this.barrier -= this.barrierDecay;\n    if (this.barrier < 0){\n      this.barrier = 0;\n    } \n  }\n}\n\nCharacter.prototype.healCal = function(powerRatio, baseHeal){\n  let totalHeal = Math.floor((baseHeal + (this.power * powerRatio)) \n  * (1.0 + this.healMod));\n  return totalHeal;\n}\n\nCharacter.prototype.heal = function(healAmt){\n  let value = this.currentHealth + healAmt;\n  if ( value > this.maxHealth ){\n    this.currentHealth = this.maxHealth;\n    this.barrier += value - this.maxHealth;\n  } else {\n    this.currentHealth = value;\n  }\n}\n\nCharacter.prototype.checkDeath = function(character){\n  if (character.currentHealth < 0){\n    character.active = false;\n    character.alive = false;\n  }\n}\n\nmodule.exports = Character;\n\n//# sourceURL=webpack:///./src/character/char.js?");

/***/ }),

/***/ "./src/character/classes/cleric.js":
/*!*****************************************!*\
  !*** ./src/character/classes/cleric.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Cleric extends Character{\n  constructor(id, side = \"player\", charType = \"Cleric\", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 20,\n    initiative = 12, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Cleric;\n\n//# sourceURL=webpack:///./src/character/classes/cleric.js?");

/***/ }),

/***/ "./src/character/classes/rogue.js":
/*!****************************************!*\
  !*** ./src/character/classes/rogue.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Rogue extends Character{\n  constructor(id, side = \"player\", charType = \"Rogue\", level = 1, currentHealth = 40, maxHealth = 40, AP = 4, APRec = 4, power = 18, armor = 20,\n    initiative = 18, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Rogue;\n\n//# sourceURL=webpack:///./src/character/classes/rogue.js?");

/***/ }),

/***/ "./src/character/classes/warrior.js":
/*!******************************************!*\
  !*** ./src/character/classes/warrior.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Warrior extends Character{\n  constructor(id, side = \"player\", charType = \"Warrior\", level = 1, currentHealth = 100, maxHealth = 100, AP = 4, APRec = 4, power = 10, armor = 20,\n    initiative = 11, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Warrior;\n\n//# sourceURL=webpack:///./src/character/classes/warrior.js?");

/***/ }),

/***/ "./src/character/classes/wizard.js":
/*!*****************************************!*\
  !*** ./src/character/classes/wizard.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Wizard extends Character{\n  constructor(id, side = \"player\", charType = \"Wizard\", level = 1, currentHealth = 30, maxHealth = 30, AP = 4, APRec = 4, power = 15, armor = 10,\n    initiative = 14, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward, 'fire');\n  };\n}\n\nmodule.exports = Wizard;\n\n//# sourceURL=webpack:///./src/character/classes/wizard.js?");

/***/ }),

/***/ "./src/character/enemies/slime.js":
/*!****************************************!*\
  !*** ./src/character/enemies/slime.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\n\nclass Slime extends Character{\n  constructor(id, side = \"enemy\", charType = \"Slime\", level = 1, currentHealth = 30, maxHealth = 30, AP = 4, APRec = 4, power = 5, armor = 0,\n    initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 0, lifesteal = 0, regen = 5,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(id, side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Slime;\n\n//# sourceURL=webpack:///./src/character/enemies/slime.js?");

/***/ }),

/***/ "./src/character/skills/skill.js":
/*!***************************************!*\
  !*** ./src/character/skills/skill.js ***!
  \***************************************/
/***/ ((module) => {

eval("class Skill {\n  constructor(name, description, AP, targetSize, targetType){\n    this.name = name;\n    this.description = description;\n    this.AP = AP;\n    this.targetSize = targetSize;\n    this.targetType = targetType;\n  }\n}\n\nmodule.exports = Skill;\n\n//# sourceURL=webpack:///./src/character/skills/skill.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Slime = __webpack_require__(/*! ./character/enemies/slime.js */ \"./src/character/enemies/slime.js\");\nconst Rogue = __webpack_require__(/*! ./character/classes/rogue.js */ \"./src/character/classes/rogue.js\");\nconst Cleric = __webpack_require__(/*! ./character/classes/cleric.js */ \"./src/character/classes/cleric.js\");\nconst Warrior = __webpack_require__(/*! ./character/classes/warrior.js */ \"./src/character/classes/warrior.js\");\nconst Wizard = __webpack_require__(/*! ./character/classes/wizard.js */ \"./src/character/classes/wizard.js\");\n\nfunction Game(){\n  this.start = false;\n  this.players = new Array(4);\n  this.enemies = new Array(4);\n  this.turns = [];\n  this.currentTurn = this.turns[0];\n  this.gameOver = false;\n}\n\nGame.prototype.addEnemy = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    this.enemies[i] = new Slime(i);\n  }\n};\n\nGame.prototype.addAllies = function(){\n  this.players[0] = new Warrior(0);\n  this.players[1] = new Cleric(1);\n  this.players[2] = new Wizard(2);\n  this.players[3] = new Rogue(3);\n}\n\nGame.prototype.setTurn = function(){\n  this.players.forEach((player) => {\n    this.turns.push(player);\n  });\n  this.enemies.forEach((enemy) => {\n    this.turns.push(enemy);\n  });\n\n  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);\n  this.turns = this.turns.reverse();\n  this.currentTurn = this.turns[0];\n};\n\nGame.prototype.checkTurn = function(){\n  for (let i = 0; i < this.turns.length; i++){\n    if (!this.turns[i].alive){\n      this.turns.splice(i, 1);\n      i--;\n    };\n  }\n};\n\nGame.prototype.nextTurn = function(){\n  let temp = this.turns.shift();\n  temp.endTurn();\n  this.turns.push(temp);\n  this.currentTurn = this.turns[0];\n  this.win();\n  this.lose();\n};\n\nGame.prototype.win = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    if (this.enemies[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n};\n\nGame.prototype.lose = function(){\n  for (let i = 0; i < this.players.length; i++){\n    if (this.players[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass GameView{\n  constructor(game){\n    this.game = game;\n  }\n\n  setupView(){\n    const grid = document.getElementById('game-view');\n    const ap = document.getElementById('ap-display');\n    const info = document.getElementById('info-display');\n    const endTurn = document.createElement('button');\n    const returnToMenu = document.createElement('button');\n    ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;\n    endTurn.setAttribute('id', 'end-turn');\n    endTurn.innerHTML = \"End Turn\"\n    returnToMenu.setAttribute('id', 'return-to-menu');\n    returnToMenu.innerHTML = \"Return to menu\";\n    const navBar = document.getElementById('nav-bar');\n    const turns = document.getElementById('turn-display');\n    const ally = document.getElementById('ally-team');\n    const enemy = document.getElementById('enemy-team');\n    const currentTurn = this.game.currentTurn;\n    navBar.append(returnToMenu);\n    grid.append(endTurn);\n    this.charInfoDisplay(info);\n    for (let i = 0; i < this.game.players.length; i++){\n      this.game.players[i].render(ally, i);\n    }\n    for (let i = 0; i < this.game.enemies.length; i++){\n      this.game.enemies[i].render(enemy, i);\n    }\n    for (let i = 0; i < this.game.turns.length; i++){\n      turns.appendChild(this.game.turns[i].renderPortrait());\n    }\n    \n    if (currentTurn.side === 'player'){\n      const currentTurnSkills = document.getElementById(`${currentTurn.charType}-${currentTurn.id}-skills`);\n      this.currentTurn(currentTurnSkills);\n    }\n\n    returnToMenu.addEventListener('click', () => {\n      const menuModal = document.getElementsByClassName(\"menu\")[0];\n      const startButton = document.getElementById(\"start\");\n      menuModal.classList.remove(\"hidden\");\n      if (this.game.start){\n        startButton.value = \"\";\n      }\n    })\n\n    endTurn.addEventListener('click', () => {\n      this.game.nextTurn();\n      for (let i = 0; i < this.game.players.length; i++){\n        this.game.players[i].renderTurn(i);\n      }\n      for (let i = 0; i < this.game.enemies.length; i++){\n        this.game.enemies[i].renderTurn(i);\n      }\n      ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;\n      if (this.game.currentTurn.side === `enemy`){\n        ap.classList.add('hide');\n      } else {\n        ap.classList.remove('hide');\n      }\n      const temp = turns.firstChild;\n      turns.removeChild(turns.firstChild);\n      turns.appendChild(temp);\n    });\n\n    ally.childNodes.forEach( child => {\n      child.childNodes[0].addEventListener('click', () => {\n        this.game.players[child.getAttributeNode('value').value].printInfo(); \n      })\n    });\n\n    enemy.childNodes.forEach( child => {\n      child.childNodes[0].addEventListener('click', () => {\n        this.game.enemies[child.getAttributeNode('value').value].printInfo(); \n      })\n    });\n\n  }\n\n  charInfoDisplay(el){\n    const ul = document.createElement('ul');\n    const img = document.createElement('img');\n    const level = document.createElement('li');\n    const charType = document.createElement('h3');\n    const maxHealth = document.createElement('li');\n    const armor = document.createElement('li');\n    const barrier = document.createElement(`li`);\n    const power = document.createElement(`li`);\n    const initiative = document.createElement(`li`);\n    const critChance = document.createElement(`li`);\n    const critDamage = document.createElement(`li`);\n    const damageMod = document.createElement(`li`);\n    const healMod = document.createElement(`li`);\n    const cdMod = document.createElement(`li`);\n    const lifesteal = document.createElement(`li`);\n    const regen = document.createElement(`li`);\n    const physicalRes = document.createElement(`li`);\n    const fireRes = document.createElement(`li`);\n    const waterRes = document.createElement(`li`);\n    const lightningRes = document.createElement(`li`);\n    const poisonRes = document.createElement(`li`);\n    const energyRes = document.createElement(`li`);\n    const holyRes = document.createElement(`li`);\n    const darkRes = document.createElement(`li`);\n    const physicalMod = document.createElement(`li`);\n    const fireMod = document.createElement(`li`);\n    const waterMod = document.createElement(`li`);\n    const lightningMod = document.createElement(`li`);\n    const poisonMod = document.createElement(`li`);\n    const energyMod = document.createElement(`li`);\n    const holyMod = document.createElement(`li`);\n    const darkMod = document.createElement(`li`);\n    const talents = document.createElement(`li`);\n    const conditions = document.createElement(`li`);\n    \n    ul.classList.add('info-container', 'hidden');\n    img.classList.add('info-image', 'hidden');\n    level.setAttribute('id', 'level');\n    charType.setAttribute('id', 'charType');\n    maxHealth.setAttribute('id', 'maxHealth');\n    armor.setAttribute('id', 'armor');\n    barrier.setAttribute('id', 'barrier');\n    power.setAttribute('id', 'power');\n    initiative.setAttribute('id', 'initiative');\n    critChance.setAttribute('id', 'critChance');\n    critDamage.setAttribute('id', 'critDamage');\n    damageMod.setAttribute('id', 'damageMod');\n    healMod.setAttribute('id', 'healMod');\n    cdMod.setAttribute('id', 'cdMod');\n    lifesteal.setAttribute('id', 'lifesteal');\n    regen.setAttribute('id', 'regen');\n    physicalRes.setAttribute('id', \"physicalRes\");\n    fireRes.setAttribute('id', \"fireRes\");\n    waterRes.setAttribute('id', \"waterRes\");\n    lightningRes.setAttribute('id', \"lightningRes\");\n    poisonRes.setAttribute('id', \"poisonRes\");\n    energyRes.setAttribute('id', \"energyRes\");\n    holyRes.setAttribute('id', \"holyRes\");\n    darkRes.setAttribute('id', \"darkRes\");\n    physicalMod.setAttribute('id', \"physicalMod\");\n    fireMod.setAttribute('id', \"fireMod\");\n    waterMod.setAttribute('id', \"waterMod\");\n    lightningMod.setAttribute('id', \"lightningMod\");\n    poisonMod.setAttribute('id', \"poisonMod\");\n    energyMod.setAttribute('id', \"energyMod\");\n    holyMod.setAttribute('id', \"holyMod\");\n    darkMod.setAttribute('id', \"darkMod\")\n    talents.setAttribute('id', \"talents\");\n    conditions.setAttribute('id', \"conditions\");\n    \n    ul.appendChild(charType);\n    ul.appendChild(level);\n    ul.appendChild(maxHealth);\n    ul.appendChild(armor);\n    ul.appendChild(barrier);\n    ul.appendChild(power);\n    ul.appendChild(initiative);\n    ul.appendChild(critChance);\n    ul.appendChild(critDamage);\n    ul.appendChild(damageMod);\n    ul.appendChild(healMod);\n    ul.appendChild(cdMod);\n    ul.appendChild(lifesteal);\n    ul.appendChild(regen);\n    ul.appendChild(physicalRes);\n    ul.appendChild(fireRes);\n    ul.appendChild(waterRes);\n    ul.appendChild(lightningRes);\n    ul.appendChild(poisonRes);\n    ul.appendChild(energyRes);\n    ul.appendChild(holyRes);\n    ul.appendChild(darkRes);\n    ul.appendChild(physicalMod);\n    ul.appendChild(fireMod);\n    ul.appendChild(waterMod);\n    ul.appendChild(lightningMod);\n    ul.appendChild(poisonMod);\n    ul.appendChild(energyMod);\n    ul.appendChild(holyMod);\n    ul.appendChild(darkMod);\n    ul.appendChild(talents);\n    ul.appendChild(conditions);\n    el.appendChild(img);\n    el.appendChild(ul);\n  }\n\n  skillInfoDisplay(el){\n    const div = document.createElement('div');\n    const titleContainer = document.createElement('div');\n    const title = document.createElement('h4');\n    const cost = document.createElement('i');\n    const description = document.createElement('p');\n    \n    title.classList.add('skill-name');\n    cost.classList.add('skill-cost');\n    titleContainer.classList.add('skill-name-container');\n    description.classList.add('skill-description');\n    div.classList.add('skill-info-container');\n\n    titleContainer.appendChild(title);\n    titleContainer.appendChild(cost);\n    div.appendChild(titleContainer);\n    div.appendChild(description);\n  }\n\n  currentTurn(el){\n    el.childNodes.forEach((child) => {\n      const index = child.getAttributeNode('value').value;\n      if (this.game.currentTurn.AP > this.game.currentTurn.skills[index].AP){\n        console.log(this.game.currentTurn.skills[index].AP);\n        child.classList.add('active');\n      }\n    })\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./src/sound.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  const menuModal = document.getElementsByClassName(\"menu\");\n  const soundButton = document.getElementById(\"music\");\n  const startButton = document.getElementById(\"start\");\n  const teamButton = document.getElementById(\"team\");\n  const tutorialButton = document.getElementById(\"tutorial\");\n  const creditButton = document.getElementById(\"credits\");\n  const closeX = document.getElementsByClassName(\"close-x\");\n  const tutorialPage = document.getElementById(\"tutorial-page\");\n  const creditPage = document.getElementById(\"credit-screen\");\n  const teamPage = document.getElementById(\"team-management\");\n  const music = new Sound;\n  const game = new Game;\n  const gameView = new GameView(game);\n  music.menuMusic.volume = 0.2;\n\n  startButton.addEventListener('click', () => {\n    menuModal[0].classList.add(\"hidden\");\n    if (!game.start){\n      game.start = true;\n      game.addAllies();\n      game.addEnemy();\n      game.setTurn();\n      gameView.setupView();\n    } else {\n      menuModal[0].value = 'Resume Game';\n    }\n  });\n\n  creditButton.addEventListener('click', () => {\n    creditPage.classList.remove(\"hidden\");\n    closeX[0].addEventListener('click', () => {\n      creditPage.classList.add(\"hidden\");\n    });\n  });\n\n  teamButton.addEventListener('click', () => {\n    teamPage.classList.remove(\"hidden\");\n    closeX[1].addEventListener('click', () => {\n      teamPage.classList.add(\"hidden\");\n    });\n  });\n\n  tutorialButton.addEventListener('click', () => {\n    tutorialPage.classList.remove(\"hidden\");\n    closeX[2].addEventListener('click', () => {\n      tutorialPage.classList.add(\"hidden\");\n    });\n  });\n\n  soundButton.addEventListener(\"click\", (song) => {\n    music.playAudio(music.menuMusic);\n    if (music.menuMusic.paused){\n      soundButton.value = \"Unmute\";\n    } else {\n      soundButton.value = \"Mute\";\n    }\n  })\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/***/ ((module) => {

eval("function Sound(){\n  this.menuMusic = new Audio(\"../dist/sounds/BBS_menu.mp3\");\n  this.menuMusic.loop = true;\n}\n\nSound.prototype.playAudio = function(audio){\n  if (audio.paused){ \n    audio.play();\n  }\n  else {\n    audio.pause();\n  } \n}\n\nmodule.exports = Sound;\n\n//# sourceURL=webpack:///./src/sound.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;